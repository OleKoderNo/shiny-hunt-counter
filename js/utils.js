/* ============================================================
   DOM UTILITIES
   ------------------------------------------------------------
   $(selector)
   A lightweight helper for document.querySelector().
   Returns the first matching element or null.
============================================================ */

export function $(selector) {
	return document.querySelector(selector);
}
