import { NextResponse } from 'next/server';
import { ALL_INSTITUTIONS_DIRECTORY, InstitutionDetail } from '../../../src/utils/autocompleteData';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get('q') || '').trim().toLowerCase();
  const country = (searchParams.get('country') || '').trim().toLowerCase();
  const category = searchParams.get('category') || 'All';

  if (!q && category === 'All' && !country) {
    return NextResponse.json({
      results: ALL_INSTITUTIONS_DIRECTORY.slice(0, 20),
      total: ALL_INSTITUTIONS_DIRECTORY.length,
      source: 'local',
    });
  }

  const queryWords = q.split(/\s+/).filter(Boolean);

  // 1. Search local curated database first (super fast & rich with aliases)
  const localMatches = ALL_INSTITUTIONS_DIRECTORY.filter((inst) => {
    if (category !== 'All' && inst.category !== category) return false;
    if (country && !inst.country.toLowerCase().includes(country)) return false;

    if (queryWords.length === 0) return true;

    const searchable = `${inst.name} ${inst.shortName} ${inst.aliases.join(' ')} ${inst.city} ${inst.state} ${inst.country} ${inst.category}`.toLowerCase();
    return queryWords.every((w) => searchable.includes(w));
  });

  // 2. If query is provided, also query global universities dataset for exhaustive coverage
  let globalRemoteMatches: InstitutionDetail[] = [];
  if (q.length >= 2) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2200);

      const targetUrl = country
        ? `http://universities.hipolabs.com/search?name=${encodeURIComponent(q)}&country=${encodeURIComponent(country)}`
        : `http://universities.hipolabs.com/search?name=${encodeURIComponent(q)}`;

      const res = await fetch(targetUrl, {
        signal: controller.signal,
        headers: { 'User-Agent': 'DualEngineResumeBuilder/1.0' },
        next: { revalidate: 3600 }, // Cache responses for 1 hour
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          globalRemoteMatches = data.map((item: any) => {
            const isIndia = item.country?.toLowerCase() === 'india';
            const stateProv = item['state-province'] || '';
            const domain = item.domains?.[0] || '';

            return {
              name: item.name,
              shortName: item.name,
              aliases: domain ? [domain] : [],
              city: stateProv || item.country || '',
              state: stateProv || item.country || '',
              country: item.country || 'Global',
              category: isIndia ? 'Top Private / Deemed' : 'Global',
              tier: 'Recognized',
            } as InstitutionDetail;
          });
        }
      }
    } catch {
      // Graceful fallback to local matches if network query times out or fails
    }
  }

  // 3. Deduplicate by standardized lowercase name
  const seenNames = new Set<string>();
  const combinedResults: InstitutionDetail[] = [];

  // Local curated matches have higher priority
  for (const item of localMatches) {
    const key = item.name.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (!seenNames.has(key)) {
      seenNames.add(key);
      combinedResults.push(item);
    }
  }

  // Then append remote matches
  for (const item of globalRemoteMatches) {
    const key = item.name.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (!seenNames.has(key)) {
      seenNames.add(key);
      combinedResults.push(item);
    }
  }

  return NextResponse.json({
    results: combinedResults.slice(0, 30),
    total: combinedResults.length,
    source: globalRemoteMatches.length > 0 ? 'hybrid_global' : 'local_curated',
  });
}
