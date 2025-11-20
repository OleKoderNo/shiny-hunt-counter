const STORAGE_KEY = "shinyHunts";
const CURRENT_KEY = "currentHuntId";

export function loadHuntsFromStorage() {
	const saved = localStorage.getItem(STORAGE_KEY);
	const hunts = saved ? JSON.parse(saved) : [];

	let currentHuntId = localStorage.getItem(CURRENT_KEY);
	if (!currentHuntId && hunts.length > 0) {
		currentHuntId = hunts[0].id;
	}

	return { hunts, currentHuntId };
}

export function saveHuntsToStorage(hunts, currentHuntId) {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(hunts));

	if (currentHuntId) {
		localStorage.setItem(CURRENT_KEY, currentHuntId);
	} else {
		localStorage.removeItem(CURRENT_KEY);
	}
}
