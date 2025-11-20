import { initState } from "./state.js";
import { setupUI } from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
	initState();

	const root = document.getElementById("app");
	setupUI(root);
});
