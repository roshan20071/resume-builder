'use client';

import React, { useState } from 'react';
import {
  X,
  Github,
  Search,
  Star,
  GitFork,
  Code2,
  Check,
  Sparkles,
  Loader2,
  ExternalLink,
  Plus,
} from 'lucide-react';
import { useResumeStore } from '../../src/store/useResumeStore';

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics?: string[];
  updated_at: string;
}

interface GitHubImportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GitHubImportModal({ isOpen, onClose }: GitHubImportModalProps) {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [selectedRepoIds, setSelectedRepoIds] = useState<Set<number>>(new Set());

  const addProject = useResumeStore((s) => s.addProject);
  const projects = useResumeStore((s) => s.projects);

  if (!isOpen) return null;

  const fetchUserRepos = async () => {
    const cleanUser = username.trim().replace(/^https?:\/\/github\.com\//, '').replace(/\/$/, '');
    if (!cleanUser) return;

    setLoading(true);
    setError(null);
    setRepos([]);
    setSelectedRepoIds(new Set());

    try {
      const response = await fetch(
        `https://api.github.com/users/${encodeURIComponent(cleanUser)}/repos?sort=updated&per_page=12`
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`GitHub user "${cleanUser}" not found.`);
        } else if (response.status === 403) {
          throw new Error('GitHub API rate limit reached. Please try again in a few minutes.');
        } else {
          throw new Error(`GitHub API error (${response.status})`);
        }
      }

      const data: GitHubRepo[] = await response.json();
      if (!Array.isArray(data) || data.length === 0) {
        setError(`No public repositories found for @${cleanUser}.`);
      } else {
        setRepos(data);
        // Pre-select top 2 starred or updated repos
        const initialSelected = new Set(data.slice(0, 2).map((r) => r.id));
        setSelectedRepoIds(initialSelected);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch GitHub repositories.');
    } finally {
      setLoading(false);
    }
  };

  const toggleRepoSelection = (repoId: number) => {
    setSelectedRepoIds((prev) => {
      const next = new Set(prev);
      if (next.has(repoId)) {
        next.delete(repoId);
      } else {
        next.add(repoId);
      }
      return next;
    });
  };

  const handleImportSelected = () => {
    const selectedList = repos.filter((r) => selectedRepoIds.has(r.id));
    if (selectedList.length === 0) return;

    selectedList.forEach((repo) => {
      const techStack: string[] = [];
      if (repo.language) techStack.push(repo.language);
      if (repo.topics && Array.isArray(repo.topics)) {
        techStack.push(...repo.topics.slice(0, 3));
      }

      // Format formatted bullet text
      const starText = repo.stargazers_count > 0 ? ` with ${repo.stargazers_count} GitHub stars` : '';
      const summaryText = repo.description || 'Production open-source application with clean modular architecture.';
      const bulletText = `Engineered and maintained ${repo.name} in ${repo.language || 'modern tech stack'}${starText}; ${summaryText.toLowerCase().replace(/\.$/, '')}.`;

      addProject({
        name: repo.name.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
        role: 'Creator & Maintainer',
        summary: repo.description || undefined,
        technologies: techStack.length > 0 ? techStack : ['Open Source', 'Git'],
        url: repo.homepage || undefined,
        repoUrl: repo.html_url,
        startDate: '2023',
        endDate: 'Present',
        bullets: [
          {
            id: `b-gh-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
            text: bulletText,
          },
        ],
      });
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in no-print">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden animate-scale-up">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-900 via-slate-900 to-gray-900 text-white px-6 py-5 flex items-center justify-between border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white border border-white/20">
              <Github className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold">Import Projects from GitHub</h2>
                <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Zero-Auth Fast Fetch
                </span>
              </div>
              <p className="text-xs text-gray-400">
                Enter your GitHub username to auto-populate projects, tech stack, and accomplishment bullets.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 bg-slate-50 border-b border-gray-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              fetchUserRepos();
            }}
            className="flex items-center gap-2"
          >
            <div className="relative flex-1">
              <Github className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter GitHub username (e.g. torvalds or your-username)"
                className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !username.trim()}
              className="px-4 py-2 bg-gray-900 hover:bg-black disabled:opacity-50 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 shrink-0 shadow-xs"
            >
              {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
              Fetch Repositories
            </button>
          </form>
        </div>

        {/* Repositories List Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700">
              {error}
            </div>
          )}

          {!loading && repos.length === 0 && !error && (
            <div className="text-center py-10 text-gray-400">
              <Code2 className="w-10 h-10 mx-auto mb-2 opacity-50" />
              <p className="text-xs font-medium">
                Type your GitHub username above to instantly fetch public repositories.
              </p>
            </div>
          )}

          {repos.map((repo) => {
            const isSelected = selectedRepoIds.has(repo.id);
            return (
              <div
                key={repo.id}
                onClick={() => toggleRepoSelection(repo.id)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                  isSelected
                    ? 'bg-blue-50/70 border-blue-300 shadow-xs'
                    : 'bg-white border-gray-200 hover:border-gray-300'
                }`}
              >
                {/* Selection Checkbox */}
                <div
                  className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition ${
                    isSelected
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : 'border-gray-300 bg-white'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-xs font-bold text-gray-900 truncate flex items-center gap-1.5">
                      {repo.name}
                    </h4>
                    <div className="flex items-center gap-3 text-[11px] text-gray-500 shrink-0">
                      {repo.stargazers_count > 0 && (
                        <span className="flex items-center gap-1 text-amber-600 font-semibold">
                          <Star className="w-3 h-3 fill-amber-500" />
                          {repo.stargazers_count}
                        </span>
                      )}
                      {repo.language && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] bg-gray-100 text-gray-700 font-medium">
                          {repo.language}
                        </span>
                      )}
                    </div>
                  </div>

                  {repo.description && (
                    <p className="text-[11px] text-gray-600 mt-1 line-clamp-2">
                      {repo.description}
                    </p>
                  )}

                  {/* Topic Tags */}
                  {repo.topics && repo.topics.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {repo.topics.slice(0, 4).map((topic) => (
                        <span
                          key={topic}
                          className="px-1.5 py-0.2 text-[9px] bg-slate-100 text-slate-600 rounded font-medium"
                        >
                          #{topic}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="bg-white border-t border-gray-200 px-6 py-3.5 flex items-center justify-between">
          <span className="text-xs text-gray-500">
            {selectedRepoIds.size} of {repos.length} selected
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleImportSelected}
              disabled={selectedRepoIds.size === 0}
              className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              Import {selectedRepoIds.size} {selectedRepoIds.size === 1 ? 'Project' : 'Projects'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
