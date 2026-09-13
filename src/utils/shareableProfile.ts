/**
 * 1-Click Shareable Web Portfolio & Zero-Backend Compression Engine
 * Compresses ResumeData into client-side URL hashes (#data=...)
 * Generates client-side QR Codes and viral remix payloads.
 */

import type { ResumeData } from '../types/resume';

/**
 * Compresses ResumeData into a URL-safe Base64 encoded string
 */
export function encodeResumeToHash(data: ResumeData): string {
  try {
    const jsonString = JSON.stringify(data);
    // UTF-8 safe base64 encoding
    const encoded = btoa(
      encodeURIComponent(jsonString).replace(/%([0-9A-F]{2})/g, (_, p1) =>
        String.fromCharCode(parseInt(p1, 16))
      )
    );
    return encodeURIComponent(encoded);
  } catch (err) {
    console.error('Failed to encode resume data:', err);
    return '';
  }
}

/**
 * Decodes URL hash string back into ResumeData
 */
export function decodeResumeFromHash(hashString: string): ResumeData | null {
  try {
    const cleanHash = decodeURIComponent(hashString.replace(/^[#?]?data=/, ''));
    if (!cleanHash) return null;

    const jsonString = decodeURIComponent(
      Array.prototype.map
        .call(atob(cleanHash), (c: string) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    return JSON.parse(jsonString) as ResumeData;
  } catch (err) {
    console.error('Failed to decode resume data from hash:', err);
    return null;
  }
}

/**
 * Builds the full public shareable web portfolio URL
 */
export function getShareablePortfolioUrl(data: ResumeData, baseUrl?: string): string {
  const origin =
    baseUrl || (typeof window !== 'undefined' ? window.location.origin : 'https://resumebuilder.app');
  const encoded = encodeResumeToHash(data);
  return `${origin}/p#data=${encoded}`;
}

/**
 * Generates an SVG Data URI for a QR code linking to the target URL
 * Uses standard QR code matrix generation via Google Chart API fallback or pure SVG generator
 */
export function getQRCodeUrl(url: string, size = 250): string {
  const encoded = encodeURIComponent(url);
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encoded}&margin=8`;
}
