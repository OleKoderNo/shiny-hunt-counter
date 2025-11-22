import { initState } from "./state.js";
import { setupUI } from "./ui/ui.js";

/* ============================================================
   Application Entry Point
   - Loads saved hunts/theme from localStorage
   - Builds the UI (controller, popup, or both)
   - Ensures everything initializes only after DOM is ready
============================================================ */
document.addEventListener("DOMContentLoaded", () => {
	/* Load saved hunt data + current hunt from storage */
	initState();

	/* Root container where controller UI is rendered */
	const root = document.getElementById("app");

	/* Build full UI and bind event handlers */
	setupUI(root);
});
