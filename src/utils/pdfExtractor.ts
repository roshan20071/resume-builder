/**
 * Client-Side PDF Text Extractor for Resume Uploads
 * Extracts full text, headings, and bullet points from PDF files.
 */

/**
 * Extracts raw text from a PDF File or ArrayBuffer using pdfjs-dist / CDN fallback
 */
export async function extractTextFromPDF(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();

  try {
    // Attempt to load and use pdfjs-dist dynamically in client
    const pdfjsLib = await import('pdfjs-dist');
    
    // Set worker source
    if (pdfjsLib.GlobalWorkerOptions) {
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version || '4.10.38'}/build/pdf.worker.min.mjs`;
    }

    const loadingTask = pdfjsLib.getDocument({
      data: new Uint8Array(arrayBuffer),
      useWorkerFetch: false,
      useSystemFonts: true,
    });

    const pdfDocument = await loadingTask.promise;
    const numPages = pdfDocument.numPages;
    const extractedLines: string[] = [];

    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      const page = await pdfDocument.getPage(pageNum);
      const textContent = await page.getTextContent();
      
      let lastY: number | null = null;
      let currentLine = '';

      for (const item of textContent.items as Array<{ str?: string; transform?: number[]; hasEOL?: boolean }>) {
        if (!item.str) continue;

        const currentY = item.transform ? Math.round(item.transform[5]) : null;

        // If Y coordinate changes significantly, it's a new line
        if (lastY !== null && currentY !== null && Math.abs(currentY - lastY) > 4) {
          if (currentLine.trim()) {
            extractedLines.push(currentLine.trim());
          }
          currentLine = item.str;
        } else {
          // Same line: add space if needed
          if (currentLine && !currentLine.endsWith(' ') && !item.str.startsWith(' ')) {
            currentLine += ' ' + item.str;
          } else {
            currentLine += item.str;
          }
        }

        lastY = currentY;
      }

      if (currentLine.trim()) {
        extractedLines.push(currentLine.trim());
      }
    }

    const fullText = extractedLines.join('\n');
    if (fullText.trim().length > 20) {
      return cleanExtractedPDFText(fullText);
    }
  } catch (pdfJsErr) {
    console.warn('pdfjs-dist extraction failed, falling back to binary stream extractor:', pdfJsErr);
  }

  // Fallback: Binary Text Decoder for PDF Streams
  return fallbackPDFBinaryExtractor(arrayBuffer);
}

/**
 * Fallback binary text scanner for unencrypted PDF text streams
 */
function fallbackPDFBinaryExtractor(buffer: ArrayBuffer): string {
  try {
    const bytes = new Uint8Array(buffer);
    const textDecoder = new TextDecoder('utf-8', { fatal: false });
    const rawString = textDecoder.decode(bytes);

    const textPieces: string[] = [];

    // Match text blocks inside PDF parentheses: (Text here) Tj or [(T)(e)(x)(t)] TJ
    const tjRegex = /\(([^)]+)\)\s*Tj/g;
    let match: RegExpExecArray | null;
    while ((match = tjRegex.exec(rawString)) !== null) {
      if (match[1] && match[1].trim()) {
        textPieces.push(match[1].trim());
      }
    }

    const arrayRegex = /\[([^\]]+)\]\s*TJ/g;
    while ((match = arrayRegex.exec(rawString)) !== null) {
      const inner = match[1];
      const parts = inner.match(/\(([^)]+)\)/g);
      if (parts) {
        const combined = parts.map((p) => p.slice(1, -1)).join('');
        if (combined.trim()) {
          textPieces.push(combined.trim());
        }
      }
    }

    if (textPieces.length > 5) {
      return cleanExtractedPDFText(textPieces.join('\n'));
    }
  } catch (err) {
    console.error('Fallback PDF extractor error:', err);
  }

  return '';
}

/**
 * Normalizes common PDF formatting artifacts, ligatures, and bullets
 */
function cleanExtractedPDFText(text: string): string {
  return text
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/\u0000/g, '') // remove null bytes
    .replace(/ﬁ/g, 'fi')
    .replace(/ﬂ/g, 'fl')
    .replace(/ﬀ/g, 'ff')
    .replace(/ﬃ/g, 'ffi')
    .replace(/ﬄ/g, 'ffl')
    .replace(/[\u2022\u2023\u25E6\u2043\u2219]/g, '• ') // normalize bullet symbols
    .replace(/[ \t]+/g, ' ') // normalize spaces
    .replace(/\n{3,}/g, '\n\n') // normalize excessive newlines
    .trim();
}
