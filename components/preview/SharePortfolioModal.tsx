'use client';

import React, { useState, useMemo } from 'react';
import {
  X,
  Share2,
  Copy,
  Check,
  ExternalLink,
  QrCode,
  Download,
  Linkedin,
  Twitter,
  MessageCircle,
  Globe,
  Lock,
} from 'lucide-react';
import { useResumeStore } from '../../src/store/useResumeStore';
import { getShareablePortfolioUrl, getQRCodeUrl } from '../../src/utils/shareableProfile';

interface SharePortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SharePortfolioModal({ isOpen, onClose }: SharePortfolioModalProps) {
  const resume = useResumeStore();
  const [copied, setCopied] = useState(false);

  const portfolioUrl = useMemo(() => {
    return getShareablePortfolioUrl(resume);
  }, [resume]);

  const qrCodeUrl = useMemo(() => {
    return getQRCodeUrl(portfolioUrl, 300);
  }, [portfolioUrl]);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(portfolioUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShareLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(portfolioUrl)}`, '_blank');
  };

  const handleShareTwitter = () => {
    const text = encodeURIComponent(`Check out my interactive resume and portfolio: ${portfolioUrl}`);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(`Check out my resume & portfolio: ${portfolioUrl}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm animate-fade-in no-print">
      <div className="bg-white rounded-xl shadow-xl border border-zinc-200 w-full max-w-lg flex flex-col overflow-hidden animate-scale-up">

        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-zinc-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center">
              <Share2 className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-zinc-900 tracking-tight">Share Portfolio</h2>
              <p className="text-[11px] text-zinc-400 mt-0.5 flex items-center gap-1">
                <Lock className="w-3 h-3" />
                Private URL — data encoded in the hash, never stored on a server
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 rounded-lg transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* URL Field */}
          <div>
            <label className="block text-[11px] font-semibold text-zinc-500 uppercase tracking-wider mb-2">
              Your live portfolio URL
            </label>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2 text-xs text-zinc-600 font-mono truncate select-all">
                {portfolioUrl}
              </div>
              <button
                type="button"
                onClick={handleCopyLink}
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 shrink-0 ${
                  copied
                    ? 'bg-zinc-900 text-white'
                    : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700'
                }`}
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>

          {/* QR Code */}
          <div className="flex items-center gap-4 p-4 bg-zinc-50 rounded-xl border border-zinc-100">
            <div className="w-24 h-24 bg-white rounded-lg border border-zinc-200 flex items-center justify-center p-1.5 shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={qrCodeUrl}
                alt="Resume QR Code"
                className="w-full h-full object-contain rounded"
              />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5">
                <QrCode className="w-3.5 h-3.5 text-zinc-500" />
                <h4 className="text-xs font-semibold text-zinc-800">Scan to open on mobile</h4>
              </div>
              <p className="text-[11px] text-zinc-500 leading-relaxed">
                Share at career fairs, interviews, or anywhere recruiters can scan on their phone.
              </p>
              <a
                href={qrCodeUrl}
                download="resume-qr-code.png"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-zinc-600 hover:text-zinc-900 transition"
              >
                <Download className="w-3 h-3" />
                Download QR Code
              </a>
            </div>
          </div>

          {/* Social Share */}
          <div>
            <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-2">Share directly</p>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={handleShareLinkedIn}
                className="py-2 px-3 bg-zinc-50 hover:bg-zinc-100 text-zinc-700 border border-zinc-200 rounded-lg text-xs font-medium transition flex items-center justify-center gap-1.5"
              >
                <Linkedin className="w-3.5 h-3.5 text-[#0a66c2]" />
                LinkedIn
              </button>
              <button
                type="button"
                onClick={handleShareTwitter}
                className="py-2 px-3 bg-zinc-50 hover:bg-zinc-100 text-zinc-700 border border-zinc-200 rounded-lg text-xs font-medium transition flex items-center justify-center gap-1.5"
              >
                <Twitter className="w-3.5 h-3.5" />
                X / Twitter
              </button>
              <button
                type="button"
                onClick={handleShareWhatsApp}
                className="py-2 px-3 bg-zinc-50 hover:bg-zinc-100 text-zinc-700 border border-zinc-200 rounded-lg text-xs font-medium transition flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                WhatsApp
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-zinc-100 px-6 py-3 flex items-center justify-between">
          <a
            href={portfolioUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium text-zinc-500 hover:text-zinc-900 flex items-center gap-1 transition"
          >
            <Globe className="w-3.5 h-3.5" />
            Open in new tab
            <ExternalLink className="w-3 h-3" />
          </a>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-zinc-900 hover:bg-black text-white font-semibold rounded-lg text-xs transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
