import { $ } from "../utils.js";
import { themes } from "../theme.js";

export function setupControllerUI(rootElement, callbacks) {
	const themeButtons = Object.values(themes)
		.map((t) => `<button class="theme-btn" data-theme="${t.id}" type="button">${t.label}</button>`)
		.join("");

	rootElement.innerHTML = `
		<h1>Shiny Hunt Counter</h1>

		<div id="themePalette">
			${themeButtons}
		</div>

		<div>
			<input id="newHuntName" type="text" placeholder="New hunt name">
			<button id="addHuntBtn">Add</button>
		</div>

		<div>
			<select id="huntSelect"></select>
			<button id="deleteHuntBtn">Delete</button>
		</div>

		<h2 id="currentHuntTitle">No hunt selected</h2>
		<div id="countDisplay">0</div>

		<div>
			<button id="incrementBtn">+1</button>
			<button id="resetBtn">Reset</button>
		</div>

		<div style="margin-top: 10px; text-align: center;">
			<button id="openPopupBtn">Open Popup Window</button>
		</div>
	`;

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

	countDisplay.setAttribute("contenteditable", "true");

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

	countDisplay.addEventListener("blur", () => {
		let value = countDisplay.textContent.trim();
		if (value === "") value = "0";
		value = value.replace(/\D/g, "");
		callbacks.onManualCount(Number(value));
	});

	paletteEl.addEventListener("click", (e) => {
		const btn = e.target.closest(".theme-btn");
		if (!btn) return;
		callbacks.onThemeChange(btn.dataset.theme);
	});

	addHuntBtn.addEventListener("click", () => {
		callbacks.onAddHunt(newHuntNameInput.value);
		newHuntNameInput.value = "";
	});

	newHuntNameInput.addEventListener("keyup", (e) => {
		if (e.key === "Enter") {
			callbacks.onAddHunt(newHuntNameInput.value);
			newHuntNameInput.value = "";
		}
	});

	huntSelect.addEventListener("change", (e) => {
		callbacks.onSelectHunt(e.target.value);
	});

	deleteHuntBtn.addEventListener("click", () => {
		callbacks.onDeleteHunt();
	});

	incrementBtn.addEventListener("click", () => {
		callbacks.onIncrement();
	});

	resetBtn.addEventListener("click", () => {
		callbacks.onReset();
	});

	openPopupBtn.addEventListener("click", () => {
		callbacks.onOpenPopup();
	});

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

export function highlightThemePalette(paletteEl, themeId) {
	Array.from(paletteEl.querySelectorAll(".theme-btn")).forEach((b) => {
		b.classList.toggle("active", b.dataset.theme === themeId);
	});
}
