'use client';

import React, { useState } from 'react';
import { Layers, Plus, Copy, Trash2, Edit2, Check, Linkedin } from 'lucide-react';
import { useResumeStore } from '../../src/store/useResumeStore';

interface ResumeSlotManagerProps {
  onOpenLinkedInImport?: () => void;
}

export function ResumeSlotManager({ onOpenLinkedInImport }: ResumeSlotManagerProps) {
  const slots = useResumeStore((s) => s.slots);
  const activeSlotId = useResumeStore((s) => s.activeSlotId);
  const switchSlot = useResumeStore((s) => s.switchSlot);
  const createSlot = useResumeStore((s) => s.createSlot);
  const cloneCurrentSlot = useResumeStore((s) => s.cloneCurrentSlot);
  const deleteSlot = useResumeStore((s) => s.deleteSlot);
  const renameSlot = useResumeStore((s) => s.renameSlot);

  const [isOpen, setIsOpen] = useState(false);
  const [isEditingId, setIsEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  const activeSlot = slots.find((s) => s.id === activeSlotId) || slots[0];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="px-2.5 py-1.5 text-xs font-medium bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 text-zinc-700 dark:text-zinc-300 rounded-lg shadow-xs flex items-center gap-1.5 transition-colors duration-150"
      >
        <Layers className="w-3.5 h-3.5 text-zinc-500" />
        <span className="max-w-[130px] truncate">{activeSlot?.name || 'Resume Profile'}</span>
        <span className="text-[10px] text-zinc-400 font-mono">({slots.length})</span>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-zinc-900 rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-800 z-50 p-2 space-y-2">
            <div className="flex items-center justify-between px-2 py-1 border-b border-zinc-100 dark:border-zinc-800">
              <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">Targeted Resumes</span>
              <button
                type="button"
                onClick={() => {
                  createSlot(`Resume ${slots.length + 1}`);
                }}
                className="text-[11px] font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white flex items-center gap-1"
              >
                <Plus className="w-3 h-3" /> New
              </button>
            </div>

            <div className="max-h-56 overflow-y-auto space-y-1">
              {slots.map((slot) => {
                const isActive = slot.id === activeSlotId;
                const isEditing = isEditingId === slot.id;

                return (
                  <div
                    key={slot.id}
                    className={`flex items-center justify-between p-2 rounded-lg text-xs transition-colors duration-150 ${
                      isActive ? 'bg-zinc-100 dark:bg-zinc-800 font-semibold text-zinc-900 dark:text-zinc-100' : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300'
                    }`}
                  >
                    {isEditing ? (
                      <div className="flex items-center gap-1 flex-1">
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && editName.trim()) {
                              renameSlot(slot.id, editName.trim());
                              setIsEditingId(null);
                            }
                          }}
                          className="w-full text-xs px-1.5 py-0.5 border border-blue-500 rounded bg-white"
                          autoFocus
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (editName.trim()) {
                              renameSlot(slot.id, editName.trim());
                              setIsEditingId(null);
                            }
                          }}
                          className="p-1 text-emerald-600 hover:text-emerald-800"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div
                        onClick={() => {
                          switchSlot(slot.id);
                          setIsOpen(false);
                        }}
                        className="flex-1 cursor-pointer truncate"
                      >
                        <p className="truncate">{slot.name}</p>
                      </div>
                    )}

                    <div className="flex items-center gap-1 ml-2">
                      <button
                        type="button"
                        onClick={() => {
                          setIsEditingId(slot.id);
                          setEditName(slot.name);
                        }}
                        className="p-1 text-gray-400 hover:text-gray-700"
                        title="Rename"
                      >
                        <Edit2 className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => cloneCurrentSlot(`${slot.name} (Copy)`)}
                        className="p-1 text-gray-400 hover:text-gray-700"
                        title="Duplicate"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                      {slots.length > 1 && (
                        <button
                          type="button"
                          onClick={() => deleteSlot(slot.id)}
                          className="p-1 text-gray-400 hover:text-rose-600"
                          title="Delete"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {onOpenLinkedInImport && (
              <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    onOpenLinkedInImport();
                  }}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-[#0077b5] hover:bg-[#0077b5]/10 rounded-lg transition font-medium"
                >
                  <Linkedin className="w-3.5 h-3.5 shrink-0 text-[#0077b5]" />
                  <span>Import from LinkedIn</span>
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
