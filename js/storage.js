/* ============================================================
   STORAGE MODULE
   Handles persistence of hunts and current selection.

   Two keys are used:
   - shinyHunts       → array of hunt objects
   - currentHuntId    → the ID of the selected hunt

   All state is serialized into localStorage as JSON.
============================================================ */

const STORAGE_KEY = "shinyHunts"; // Where the hunts array is stored
const CURRENT_KEY = "currentHuntId"; // Where the selected hunt ID is stored

/* ============================================================
   loadHuntsFromStorage()
   Loads:
     - the hunts array (or an empty array if none saved)
     - the current hunt ID (or defaults to first hunt)

   Returns:
     { hunts, currentHuntId }
============================================================ */
export function loadHuntsFromStorage() {
	const saved = localStorage.getItem(STORAGE_KEY);
	const hunts = saved ? JSON.parse(saved) : [];

	let currentHuntId = localStorage.getItem(CURRENT_KEY);

	// If we have hunts but no saved ID, default to the first hunt
	if (!currentHuntId && hunts.length > 0) {
		currentHuntId = hunts[0].id;
	}

	return { hunts, currentHuntId };
}

/* ============================================================
   saveHuntsToStorage(hunts, currentHuntId)
   Saves:
     - the hunts array
     - the ID of the active hunt

   If currentHuntId is null, the stored value is removed.
============================================================ */
export function saveHuntsToStorage(hunts, currentHuntId) {
	// Save hunts list
	localStorage.setItem(STORAGE_KEY, JSON.stringify(hunts));

	// Save active hunt
	if (currentHuntId) {
		localStorage.setItem(CURRENT_KEY, currentHuntId);
	} else {
		localStorage.removeItem(CURRENT_KEY);
	}
}
