"use client";

import React from 'react';

interface SaveButtonProps {
  /** Label shown on the button */
  label?: string;
  /** Optional extra className — falls back to the default indigo style */
  className?: string;
}

/**
 * SaveButton
 *
 * A pure presentational submit button.
 * Place it inside a <form> whose onSubmit is wired to the useSave hook.
 *
 * @example
 *   <form onSubmit={handleSave}>
 *     ...
 *     <SaveButton label={editingProduct ? 'Save Changes' : 'Create Product'} />
 *   </form>
 */
export function SaveButton({ label = 'Save', className }: SaveButtonProps) {
  return (
    <button
      type="submit"
      className={
        className ??
        'w-full px-6 py-4 text-xs font-black uppercase tracking-[0.2em] text-brand-carbon bg-transparent border-2 border-brand-lime hover:border-transparent hover:bg-[#bef264] rounded-xl transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]'
      }
    >
      {label}
    </button>
  );
}