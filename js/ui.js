import { $ } from "./utils.js";
import {
	getHunts,
	getCurrentHunt,
	addHunt,
	deleteCurrentHunt,
	setCurrentHuntId,
	incrementCurrentHunt,
	resetCurrentHunt,
	setCurrentHuntCount,
} from "./state.js";

export function setupUI(rootElement) {
	rootElement.innerHTML = `
    <h1>Shiny Hunt Counter</h1>

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

	const pokeNameEl = document.getElementById("pokeName");
	const pokeCountEl = document.getElementById("pokeCount");
	const pokeballEl = document.getElementById("pokeball");
	const pokeballBtnEl = document.getElementById("pokeball-button");

	const animatePokeball = () => {
		if (pokeballBtnEl) {
			pokeballBtnEl.classList.remove("pressed");
			void pokeballBtnEl.offsetWidth;
			pokeballBtnEl.classList.add("pressed");
		}
		if (pokeballEl) {
			pokeballEl.classList.remove("shake");
			void pokeballEl.offsetWidth;
			pokeballEl.classList.add("shake");
		}
	};

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
		const num = Number(value);
		setCurrentHuntCount(num);
		renderCurrentHunt();
	});

	function renderHuntSelect() {
		const hunts = getHunts();
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

		const current = getCurrentHunt();
		if (current) huntSelect.value = current.id;
	}

	function renderCurrentHunt() {
		const hunt = getCurrentHunt();

		if (!hunt) {
			currentHuntTitle.textContent = "No hunt selected";
			countDisplay.textContent = "0";
			if (pokeNameEl) pokeNameEl.textContent = "No hunt selected";
			if (pokeCountEl) pokeCountEl.textContent = "0";
			incrementBtn.disabled = true;
			resetBtn.disabled = true;
			return;
		}

		currentHuntTitle.textContent = hunt.name;
		countDisplay.textContent = hunt.count;
		if (pokeNameEl) pokeNameEl.textContent = hunt.name;
		if (pokeCountEl) pokeCountEl.textContent = hunt.count;
		incrementBtn.disabled = false;
		resetBtn.disabled = false;
	}

	function renderAll() {
		renderHuntSelect();
		renderCurrentHunt();
	}

	addHuntBtn.addEventListener("click", () => {
		addHunt(newHuntNameInput.value);
		newHuntNameInput.value = "";
		renderAll();
	});

	newHuntNameInput.addEventListener("keyup", (e) => {
		if (e.key === "Enter") {
			addHunt(newHuntNameInput.value);
			newHuntNameInput.value = "";
			renderAll();
		}
	});

	huntSelect.addEventListener("change", (e) => {
		setCurrentHuntId(e.target.value);
		renderAll();
	});

	deleteHuntBtn.addEventListener("click", () => {
		deleteCurrentHunt();
		renderAll();
	});

	incrementBtn.addEventListener("click", () => {
		incrementCurrentHunt();
		renderCurrentHunt();
		animatePokeball();
	});

	if (pokeballBtnEl) {
		pokeballBtnEl.addEventListener("click", () => {
			incrementCurrentHunt();
			renderCurrentHunt();
			animatePokeball();
		});
	}

	resetBtn.addEventListener("click", () => {
		resetCurrentHunt();
		renderCurrentHunt();
	});

	openPopupBtn.addEventListener("click", () => {
		window.open("./popup.html", "shinyHuntPopup", "width=760,height=620,resizable=yes");
	});

	renderAll();
}
