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

import {
	setupControllerUI,
	renderHuntSelect,
	renderCurrentHuntDisplay,
	highlightThemePalette,
} from "./controller-ui.js";

import { setupPokeballUI } from "./pokeball-ui.js";
import { applyTheme, loadThemeId } from "../theme.js";

/* ============================================================
   setupUI()
   Main UI orchestrator for both:
   - controller view (index.html)
   - popup view (popup.html)

   Responsibilities:
   - Apply saved theme on startup
   - Build controller UI and wire callbacks to state changes
   - Build Pokéball UI if present (popup)
   - Render all UI from state
   - Keep controller + Pokéball display in sync
============================================================ */
export function setupUI(rootElement) {
	/* Track current hunt + theme locally for rendering */
	let currentHuntId = getCurrentHunt()?.id ?? null;
	let themeId = loadThemeId();

	/* Apply persisted theme immediately */
	applyTheme(themeId);

	/* ============================================================
	   CONTROLLER UI SETUP
	   Controller UI emits callbacks for user actions.
	   Each callback updates state, then triggers re-render.
	============================================================ */
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

		/* Opens streamer-friendly popup view */
		onOpenPopup: () => {
			window.open("./popup.html", "shinyHuntPopup", "width=760,height=620,resizable=yes");
		},

		/* Theme switching updates CSS variables + palette highlight */
		onThemeChange: (id) => {
			themeId = id;
			applyTheme(themeId);
			highlightThemePalette(controller.paletteEl, themeId);
		},
	});

	/* ============================================================
	   POKEBALL UI SETUP (POPUP ONLY)
	   If Pokéball elements exist, setupPokeballUI returns a live API.
	   If not, it returns safe no-op methods.
	============================================================ */
	const pokeball = setupPokeballUI(() => {
		incrementCurrentHunt();
		renderCurrentOnly(true);
	});

	/* ============================================================
	   renderAll()
	   Full re-render:
	   - dropdown list
	   - controller title + count
	   - Pokéball display
	   - active theme highlight
	============================================================ */
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
		highlightThemePalette(controller.paletteEl, themeId);
	}

	/* ============================================================
	   renderCurrentOnly(animate)
	   Partial re-render for counter updates:
	   - updates only current hunt display and Pokéball
	   - optionally triggers Pokéball animation
	============================================================ */
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

	/* Initial render */
	renderAll();
}
