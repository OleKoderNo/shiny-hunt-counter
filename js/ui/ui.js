import {
	getHunts,
	getCurrentHunt,
	addHunt,
	deleteCurrentHunt,
	setCurrentHuntId,
	incrementCurrentHunt,
	resetCurrentHunt,
	setCurrentHuntCount,
} from "../state.js";

import { setupControllerUI, renderHuntSelect, renderCurrentHuntDisplay } from "./controller-ui.js";

import { setupPokeballUI } from "./pokeball-ui.js";

export function setupUI(rootElement) {
	let currentHuntId = getCurrentHunt()?.id ?? null;

	const controller = setupControllerUI(rootElement, {
		onAddHunt: (name) => {
			addHunt(name);
			currentHuntId = getCurrentHunt()?.id ?? null;
			renderAll();
		},
		onDeleteHunt: () => {
			deleteCurrentHunt();
			currentHuntId = getCurrentHunt()?.id ?? null;
			renderAll();
		},
		onSelectHunt: (id) => {
			setCurrentHuntId(id);
			currentHuntId = getCurrentHunt()?.id ?? null;
			renderAll();
		},
		onIncrement: () => {
			incrementCurrentHunt();
			renderCurrentOnly(true);
		},
		onReset: () => {
			resetCurrentHunt();
			renderCurrentOnly(false);
		},
		onManualCount: (num) => {
			setCurrentHuntCount(num);
			renderCurrentOnly(false);
		},
		onOpenPopup: () => {
			window.open("./popup.html", "shinyHuntPopup", "width=760,height=620,resizable=yes");
		},
	});

	const pokeball = setupPokeballUI(() => {
		incrementCurrentHunt();
		renderCurrentOnly(true);
	});

	function renderAll() {
		const hunts = getHunts();
		const current = getCurrentHunt();
		currentHuntId = current?.id ?? null;

		renderHuntSelect(controller.huntSelect, controller.deleteHuntBtn, hunts, currentHuntId);
		renderCurrentHuntDisplay(
			controller.currentHuntTitle,
			controller.countDisplay,
			controller.incrementBtn,
			controller.resetBtn,
			current
		);

		pokeball.setDisplay(current);
	}

	function renderCurrentOnly(animate) {
		const current = getCurrentHunt();

		renderCurrentHuntDisplay(
			controller.currentHuntTitle,
			controller.countDisplay,
			controller.incrementBtn,
			controller.resetBtn,
			current
		);

		pokeball.setDisplay(current);
		if (animate) pokeball.animate();
	}

	renderAll();
}
