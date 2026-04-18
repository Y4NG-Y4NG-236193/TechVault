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
        'px-5 py-2.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-md shadow-indigo-200'
      }
    >
      {label}
    </button>
  );
}