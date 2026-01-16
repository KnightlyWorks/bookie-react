// app/utils/cn.js
/**
 * Merge classNames for Tailwind with conditional support
 *
 * Supports:
 * - Strings: cn('text-red-500', 'font-bold')
 * - Arrays: cn(['text-red-500', 'font-bold'])
 * - Objects: cn({ 'text-red-500': true, 'hidden': false })
 * - Conditional: cn('base-class', isActive && 'active-class')
 * - Mixed: cn('base', { 'active': isActive }, ['extra', 'classes'])
 *
 * Uses clsx for flexible input + twMerge to resolve Tailwind conflicts
 */

import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
