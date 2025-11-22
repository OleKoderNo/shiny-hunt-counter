import { loadHuntsFromStorage, saveHuntsToStorage } from "./storage.js";

/* ============================================================
   STATE MODULE
   Holds all hunt data in memory and syncs with localStorage.
   This module is the single source of truth for:
   - list of hunts
   - current hunt
   - counters
============================================================ */

let hunts = []; // Array of all hunts
let currentHuntId = null; // ID of currently-selected hunt

/* ============================================================
   initState()
   Loads hunts + current hunt ID from localStorage.
   Called once at app startup.
============================================================ */
export function initState() {
	const data = loadHuntsFromStorage();
	hunts = data.hunts;
	currentHuntId = data.currentHuntId;
}

/* ============================================================
   ACCESSORS
============================================================ */
export function getHunts() {
	return hunts;
}

export function getCurrentHunt() {
	return hunts.find((h) => h.id === currentHuntId) || null;
}

/* ============================================================
   addHunt(name)
   Creates a new hunt, selects it, and saves to storage.
============================================================ */
export function addHunt(name) {
	const trimmed = name.trim();
	if (!trimmed) return;

	const newHunt = {
		id: Date.now().toString(), // Unique ID
		name: trimmed,
		count: 0,
	};

	hunts.push(newHunt);
	currentHuntId = newHunt.id;

	saveHuntsToStorage(hunts, currentHuntId);
}

/* ============================================================
   deleteCurrentHunt()
   Removes the currently selected hunt.
   After deletion, selects the next hunt if available.
============================================================ */
export function deleteCurrentHunt() {
	if (!currentHuntId) return;

	hunts = hunts.filter((h) => h.id !== currentHuntId);
	currentHuntId = hunts[0]?.id ?? null;

	saveHuntsToStorage(hunts, currentHuntId);
}

/* ============================================================
   setCurrentHuntId(id)
   Switches which hunt is selected.
   If the ID is invalid, fall back to first hunt.
============================================================ */
export function setCurrentHuntId(id) {
	currentHuntId = id || null;

	/* If ID doesn't exist anymore, fallback to first hunt */
	if (currentHuntId && !hunts.find((h) => h.id === currentHuntId)) {
		currentHuntId = hunts[0]?.id ?? null;
	}

	saveHuntsToStorage(hunts, currentHuntId);
}

/* ============================================================
   incrementCurrentHunt()
   Adds +1 to the active hunt counter.
============================================================ */
export function incrementCurrentHunt() {
	const hunt = hunts.find((h) => h.id === currentHuntId);
	if (!hunt) return;

	hunt.count += 1;
	saveHuntsToStorage(hunts, currentHuntId);
}

/* ============================================================
   resetCurrentHunt()
   Sets the active hunt's counter back to 0.
============================================================ */
export function resetCurrentHunt() {
	const hunt = hunts.find((h) => h.id === currentHuntId);
	if (!hunt) return;

	hunt.count = 0;
	saveHuntsToStorage(hunts, currentHuntId);
}

/* ============================================================
   setCurrentHuntCount(count)
   Allows the user to manually change the counter.
   - Rejects invalid numbers
   - Rejects negatives
   - Always stores integer values
============================================================ */
export function setCurrentHuntCount(count) {
	const hunt = hunts.find((h) => h.id === currentHuntId);
	if (!hunt) return;

	const n = Number(count);

	/* Validate input */
	if (!Number.isFinite(n) || n < 0) return;

	hunt.count = Math.floor(n);
	saveHuntsToStorage(hunts, currentHuntId);
}
