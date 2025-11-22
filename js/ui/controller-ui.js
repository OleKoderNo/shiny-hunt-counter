import { $ } from "../utils.js";
import { themes } from "../theme.js";

/* ============================================================
   setupControllerUI()
   Builds the entire controller interface inside #app:
   - Theme buttons
   - Add hunt field
   - Hunt selector
   - Counter display
   - Reset / Increment
   - Popup window button
   Attaches event listeners and returns references to UI elements.
============================================================ */
export function setupControllerUI(rootElement, callbacks) {
	/* Create theme button HTML dynamically from theme list */
	const themeButtons = Object.values(themes)
		.map((t) => `<button class="theme-btn" data-theme="${t.id}" type="button">${t.label}</button>`)
		.join("");

	/* Inject controller UI into the DOM */
	rootElement.innerHTML = `
		<h1>Shiny Hunt Counter</h1>

		<!-- Theme palette -->
		<div id="themePalette">
			${themeButtons}
		</div>

		<!-- Add hunt -->
		<div>
			<input id="newHuntName" type="text" placeholder="New hunt name">
			<button id="addHuntBtn">Add</button>
		</div>

		<!-- Select/Delete hunt -->
		<div>
			<select id="huntSelect"></select>
			<button id="deleteHuntBtn">Delete</button>
		</div>

		<!-- Current hunt title + count -->
		<h2 id="currentHuntTitle">No hunt selected</h2>
		<div id="countDisplay">0</div>

		<!-- Controls -->
		<div>
			<button id="incrementBtn">+1</button>
			<button id="resetBtn">Reset</button>
		</div>

		<!-- Popup window button -->
		<div style="margin-top: 10px; text-align: center;">
			<button id="openPopupBtn">Open Popup Window</button>
		</div>
	`;

	/* Grab elements */
	const newHuntNameInput = $("#newHuntName");
	const addHuntBtn = $("#addHuntBtn");
	const huntSelect = $("#huntSelect");
	const deleteHuntBtn = $("#deleteHuntBtn");
	const currentHuntTitle = $("#currentHuntTitle");
	const countDisplay = $("#countDisplay");
	const incrementBtn = $("#incrementBtn");
	const resetBtn = $("#resetBtn");
	const openPopupBtn = $("#openPopupBtn");
	const paletteEl = $("#themePalette");

	/* ============================================================
	   Make the count editable manually (numbers only)
	============================================================ */
	countDisplay.setAttribute("contenteditable", "true");

	/* Restrict keystrokes to digits + navigation keys */
	countDisplay.addEventListener("keydown", (e) => {
		const allowed = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab", "Enter"];
		if (allowed.includes(e.key)) {
			if (e.key === "Enter") {
				e.preventDefault();
				countDisplay.blur();
			}
			return;
		}
		if (!/^[0-9]$/.test(e.key)) e.preventDefault();
	});

	/* Clean and apply value when user is finished editing */
	countDisplay.addEventListener("blur", () => {
		let value = countDisplay.textContent.trim();
		if (value === "") value = "0";
		value = value.replace(/\D/g, "");
		callbacks.onManualCount(Number(value));
	});

	/* ============================================================
	   Theme palette click handling
	============================================================ */
	paletteEl.addEventListener("click", (e) => {
		const btn = e.target.closest(".theme-btn");
		if (!btn) return;
		callbacks.onThemeChange(btn.dataset.theme);
	});

	/* ============================================================
	   Hunt creation
	============================================================ */
	addHuntBtn.addEventListener("click", () => {
		callbacks.onAddHunt(newHuntNameInput.value);
		newHuntNameInput.value = "";
	});

	/* Add hunt via Enter key */
	newHuntNameInput.addEventListener("keyup", (e) => {
		if (e.key === "Enter") {
			callbacks.onAddHunt(newHuntNameInput.value);
			newHuntNameInput.value = "";
		}
	});

	/* ============================================================
	   Hunt selection & deletion
	============================================================ */
	huntSelect.addEventListener("change", (e) => {
		callbacks.onSelectHunt(e.target.value);
	});

	deleteHuntBtn.addEventListener("click", () => {
		callbacks.onDeleteHunt();
	});

	/* ============================================================
	   Counter actions
	============================================================ */
	incrementBtn.addEventListener("click", () => {
		callbacks.onIncrement();
	});

	resetBtn.addEventListener("click", () => {
		callbacks.onReset();
	});

	/* ============================================================
	   Popup window launcher
	============================================================ */
	openPopupBtn.addEventListener("click", () => {
		callbacks.onOpenPopup();
	});

	/* Return references so app.js can update UI */
	return {
		huntSelect,
		currentHuntTitle,
		countDisplay,
		incrementBtn,
		resetBtn,
		deleteHuntBtn,
		paletteEl,
	};
}

/* ============================================================
   renderHuntSelect()
   Updates the dropdown list of hunts:
   - Shows "No hunts yet" if empty
   - Enables/disables delete button
   - Highlights current hunt
============================================================ */
export function renderHuntSelect(huntSelect, deleteHuntBtn, hunts, currentHuntId) {
	huntSelect.innerHTML = "";

	if (hunts.length === 0) {
		const opt = document.createElement("option");
		opt.value = "";
		opt.textContent = "No hunts yet";
		huntSelect.appendChild(opt);
		huntSelect.disabled = true;
		deleteHuntBtn.disabled = true;
		return;
	}

	huntSelect.disabled = false;
	deleteHuntBtn.disabled = false;

	hunts.forEach((hunt) => {
		const opt = document.createElement("option");
		opt.value = hunt.id;
		opt.textContent = hunt.name;
		huntSelect.appendChild(opt);
	});

	if (currentHuntId) huntSelect.value = currentHuntId;
}

/* ============================================================
   renderCurrentHuntDisplay()
   Updates:
   - current hunt name
   - counter
   - enables/disables buttons depending on hunt availability
============================================================ */
export function renderCurrentHuntDisplay(
	currentHuntTitle,
	countDisplay,
	incrementBtn,
	resetBtn,
	hunt
) {
	if (!hunt) {
		currentHuntTitle.textContent = "No hunt selected";
		countDisplay.textContent = "0";
		incrementBtn.disabled = true;
		resetBtn.disabled = true;
		return;
	}

	currentHuntTitle.textContent = hunt.name;
	countDisplay.textContent = hunt.count;
	incrementBtn.disabled = false;
	resetBtn.disabled = false;
}

/* ============================================================
   highlightThemePalette()
   Visually marks the currently-active theme button.
============================================================ */
export function highlightThemePalette(paletteEl, themeId) {
	Array.from(paletteEl.querySelectorAll(".theme-btn")).forEach((b) => {
		b.classList.toggle("active", b.dataset.theme === themeId);
	});
}
