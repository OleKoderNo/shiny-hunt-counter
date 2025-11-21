import { loadHuntsFromStorage, saveHuntsToStorage } from "./storage.js";

let hunts = [];
let currentHuntId = null;

export function initState() {
	const data = loadHuntsFromStorage();
	hunts = data.hunts;
	currentHuntId = data.currentHuntId;
}

export function getHunts() {
	return hunts;
}

export function getCurrentHunt() {
	return hunts.find((h) => h.id === currentHuntId) || null;
}

export function addHunt(name) {
	const trimmed = name.trim();
	if (!trimmed) return;

	const newHunt = {
		id: Date.now().toString(),
		name: trimmed,
		count: 0,
	};

	hunts.push(newHunt);
	currentHuntId = newHunt.id;

	saveHuntsToStorage(hunts, currentHuntId);
}

export function deleteCurrentHunt() {
	if (!currentHuntId) return;

	hunts = hunts.filter((h) => h.id !== currentHuntId);
	currentHuntId = hunts[0]?.id ?? null;

	saveHuntsToStorage(hunts, currentHuntId);
}

export function setCurrentHuntId(id) {
	currentHuntId = id || null;

	if (currentHuntId && !hunts.find((h) => h.id === currentHuntId)) {
		currentHuntId = hunts[0]?.id ?? null;
	}

	saveHuntsToStorage(hunts, currentHuntId);
}

export function incrementCurrentHunt() {
	const hunt = hunts.find((h) => h.id === currentHuntId);
	if (!hunt) return;

	hunt.count += 1;
	saveHuntsToStorage(hunts, currentHuntId);
}

export function resetCurrentHunt() {
	const hunt = hunts.find((h) => h.id === currentHuntId);
	if (!hunt) return;

	hunt.count = 0;
	saveHuntsToStorage(hunts, currentHuntId);
}

export function setCurrentHuntCount(count) {
	const hunt = hunts.find((h) => h.id === currentHuntId);
	if (!hunt) return;

	const n = Number(count);

	if (!Number.isFinite(n) || n < 0) return;

	hunt.count = Math.floor(n);
	saveHuntsToStorage(hunts, currentHuntId);
}
