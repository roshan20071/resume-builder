'use client';

import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  X,
  Check,
  ChevronDown,
  Layers,
} from 'lucide-react';
import { useResumeStore } from '../../src/store/useResumeStore';
import {
  SKILL_BUNDLE_PACKS,
  SkillBundlePack,
  POPULAR_SKILLS_LIST,
} from '../../src/utils/autocompleteData';

export function SkillsEditor() {
  const skills = useResumeStore((s) => s.skills);
  const addSkillCategory = useResumeStore((s) => s.addSkillCategory);
  const updateSkillCategoryName = useResumeStore((s) => s.updateSkillCategoryName);
  const removeSkillCategory = useResumeStore((s) => s.removeSkillCategory);
  const addSkillToCategory = useResumeStore((s) => s.addSkillToCategory);
  const removeSkillFromCategory = useResumeStore((s) => s.removeSkillFromCategory);

  const [newSkillInputs, setNewSkillInputs] = useState<Record<string, string>>({});
  const [activeFocusedCatId, setActiveFocusedCatId] = useState<string | null>(null);
  const [isPacksOpen, setIsPacksOpen] = useState(false);
  const [appliedPackId, setAppliedPackId] = useState<string | null>(null);

  const handleAddSkill = (catId: string, customVal?: string) => {
    const raw = (customVal !== undefined ? customVal : (newSkillInputs[catId] || '')).trim();
    if (!raw) return;

    // Support comma-separated / newline-separated entry
    const items = raw
      .split(/[,;\n]+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const targetCat = skills.find((c) => c.id === catId);
    if (targetCat) {
      items.forEach((item) => {
        if (!targetCat.skills.some((s) => s.toLowerCase() === item.toLowerCase())) {
          addSkillToCategory(catId, item);
        }
      });
    }

    setNewSkillInputs((prev) => ({ ...prev, [catId]: '' }));
  };

  const handleApplySkillPack = (pack: SkillBundlePack) => {
    const existingCat = skills.find(
      (c) => c.categoryName.toLowerCase() === pack.categoryName.toLowerCase()
    );

    if (existingCat) {
      pack.skills.forEach((sk) => {
        if (!existingCat.skills.some((s) => s.toLowerCase() === sk.toLowerCase())) {
          addSkillToCategory(existingCat.id, sk);
        }
      });
    } else {
      addSkillCategory(pack.categoryName, pack.skills);
    }

    setAppliedPackId(pack.id);
    setTimeout(() => setAppliedPackId(null), 1500);
    setIsPacksOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-xs text-zinc-500">
            Group skills into categories for clean indexing (e.g. Languages, Frameworks, Cloud).
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Skill Packs Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsPacksOpen(!isPacksOpen)}
              className="px-2.5 py-1.5 text-xs font-medium bg-zinc-100 hover:bg-zinc-200/80 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg flex items-center gap-1.5 transition-colors duration-150"
            >
              <Layers className="w-3.5 h-3.5 text-zinc-500" />
              Skill Packs
              <ChevronDown className="w-3 h-3 text-zinc-400" />
            </button>

            {isPacksOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsPacksOpen(false)} />
                <div className="absolute right-0 top-full mt-1.5 w-72 bg-white dark:bg-zinc-900 rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-800 p-2 z-50 max-h-80 overflow-y-auto animate-scale-up">
                  <div className="text-[10px] font-semibold uppercase text-zinc-400 dark:text-zinc-500 px-2 py-1 tracking-wider">
                    Curated Skill Bundles
                  </div>
                  <div className="space-y-1">
                    {SKILL_BUNDLE_PACKS.map((pack) => (
                      <button
                        key={pack.id}
                        type="button"
                        onClick={() => handleApplySkillPack(pack)}
                        className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition flex flex-col group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                            {pack.label}
                          </span>
                          {appliedPackId === pack.id && (
                            <span className="text-[10px] text-emerald-600 font-medium flex items-center gap-0.5">
                              <Check className="w-3 h-3" /> Added
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
                          {pack.skills.slice(0, 5).join(', ')}...
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={() => addSkillCategory()}
            className="px-3 py-1.5 text-xs font-medium bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:opacity-90 rounded-lg flex items-center gap-1.5 transition-opacity duration-150 shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" /> Add Category
          </button>
        </div>
      </div>

      {skills.map((cat) => {
        const catInputVal = newSkillInputs[cat.id] || '';
        const catSuggestions =
          catInputVal.trim().length > 0
            ? POPULAR_SKILLS_LIST.filter(
                (item) =>
                  item.name.toLowerCase().includes(catInputVal.trim().toLowerCase()) &&
                  !cat.skills.some((s) => s.toLowerCase() === item.name.toLowerCase())
              ).slice(0, 6)
            : [];

        return (
          <div
            key={cat.id}
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3.5 space-y-2.5 shadow-xs"
          >
            <div className="flex items-center justify-between gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-2">
              <input
                type="text"
                value={cat.categoryName}
                onChange={(e) => updateSkillCategoryName(cat.id, e.target.value)}
                placeholder="e.g. Languages & Runtimes"
                className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 bg-zinc-50 dark:bg-zinc-800 px-2.5 py-1.5 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:border-zinc-400 dark:focus:border-zinc-500 outline-none w-2/3"
              />
              <button
                type="button"
                onClick={() => removeSkillCategory(cat.id)}
                className="p-1.5 text-zinc-400 hover:text-rose-600 transition rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800"
                title="Delete Category"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Compact neutral chips */}
            <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
              {cat.skills.map((skill, sIdx) => (
                <span
                  key={sIdx}
                  className="inline-flex items-center gap-1 bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 text-xs px-2.5 py-1 rounded-md border border-zinc-200 dark:border-zinc-700 font-medium"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkillFromCategory(cat.id, sIdx)}
                    className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 ml-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}

              {/* Quick Add Input with Combobox */}
              <div className="relative inline-flex items-center">
                <input
                  type="text"
                  value={catInputVal}
                  onChange={(e) =>
                    setNewSkillInputs((prev) => ({ ...prev, [cat.id]: e.target.value }))
                  }
                  onFocus={() => setActiveFocusedCatId(cat.id)}
                  onBlur={() => setTimeout(() => setActiveFocusedCatId(null), 200)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddSkill(cat.id);
                    }
                  }}
                  placeholder="+ Add skill or paste comma list..."
                  className="text-xs px-2.5 py-1 bg-zinc-50 dark:bg-zinc-800 border border-dashed border-zinc-300 dark:border-zinc-700 rounded-md focus:border-zinc-500 outline-none w-56 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400"
                />

                {/* Combobox suggestions */}
                {activeFocusedCatId === cat.id && catSuggestions.length > 0 && (
                  <div className="absolute left-0 top-full mt-1 w-56 bg-white dark:bg-zinc-900 rounded-lg shadow-lg border border-zinc-200 dark:border-zinc-800 py-1 z-30 max-h-40 overflow-y-auto">
                    {catSuggestions.map((item, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          handleAddSkill(cat.id, item.name);
                        }}
                        className="w-full text-left px-2.5 py-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs flex items-center justify-between text-zinc-800 dark:text-zinc-200 transition"
                      >
                        <span className="font-medium text-zinc-900 dark:text-zinc-100">{item.name}</span>
                        <span className="text-[9px] text-zinc-400">{item.category}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
