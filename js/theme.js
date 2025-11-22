/* ============================================================
   THEME SYSTEM
   ------------------------------------------------------------
   Controls all color themes for both:
     • the controller UI (background, buttons)
     • the Pokéball display in the popup
   ------------------------------------------------------------
   Each theme contains:
     id    → attribute written to <html data-theme="...">
     label → shown in the theme palette
     vars  → CSS custom properties injected into :root
============================================================ */

const THEME_KEY = "pokeballTheme"; // LocalStorage key for theme persistence

/* ============================================================
   Theme Definitions
   ------------------------------------------------------------
   All CSS custom properties inside `vars` override values in
   base.css, controller.css, and pokeball.css.
============================================================ */
export const themes = {
	/* ------------------------------
	   Default Poké Ball Theme
	------------------------------ */
	pokeball: {
		id: "pokeball",
		label: "Poké Ball",
		vars: {
			"--bg-top": "#ff4d4d",
			"--bg-mid": "#c90000",
			"--bg-bottom": "#111111",

			"--accent": "#ff1c1c",
			"--accent-hover": "#ff4b4b",

			"--reset": "#ffcd38",
			"--reset-hover": "#ffd95e",

			"--ball-top": "#e53935",
			"--ball-bottom": "#f5f5f5",
			"--ball-midline": "#111111",
			"--ball-button": "#f5f5f5",
			"--ball-button-inner": "#dcdcdc",
		},
	},

	/* ------------------------------
	   Great Ball Theme
	------------------------------ */
	greatball: {
		id: "greatball",
		label: "Great Ball",
		vars: {
			"--bg-top": "#4da3ff",
			"--bg-mid": "#1f5bbf",
			"--bg-bottom": "#0b1020",

			"--accent": "#2e7dff",
			"--accent-hover": "#5a9bff",

			"--reset": "#ffcd38",
			"--reset-hover": "#ffd95e",

			"--ball-top": "#2060ff",
			"--ball-bottom": "#f5f5f5",
			"--ball-midline": "#111111",
			"--ball-button": "#f5f5f5",
			"--ball-button-inner": "#dcdcdc",
		},
	},

	/* ------------------------------
	   Ultra Ball Theme
	------------------------------ */
	ultraball: {
		id: "ultraball",
		label: "Ultra Ball",
		vars: {
			"--bg-top": "#2c2c2c",
			"--bg-mid": "#0e0e0e",
			"--bg-bottom": "#000000",

			"--accent": "#f9cf2f",
			"--accent-hover": "#ffe272",

			"--reset": "#f9cf2f",
			"--reset-hover": "#ffe272",

			"--ball-top": "#1a1a1a",
			"--ball-bottom": "#f5f5f5",
			"--ball-midline": "#111111",
			"--ball-button": "#f5f5f5",
			"--ball-button-inner": "#dcdcdc",
		},
	},

	/* ------------------------------
	   Dusk Ball Theme
	------------------------------ */
	duskball: {
		id: "duskball",
		label: "Dusk Ball",
		vars: {
			"--bg-top": "#1a1033",
			"--bg-mid": "#0a0618",
			"--bg-bottom": "#000000",

			"--accent": "#2aa84a",
			"--accent-hover": "#46c767",

			"--reset": "#f9cf2f",
			"--reset-hover": "#ffe272",

			"--ball-top": "#1b1b1b",
			"--ball-bottom": "#f5f5f5",
			"--ball-midline": "#111111",
			"--ball-button": "#f5f5f5",
			"--ball-button-inner": "#dcdcdc",
		},
	},

	/* ------------------------------
	   Love Ball Theme
	------------------------------ */
	loveball: {
		id: "loveball",
		label: "Love Ball",
		vars: {
			"--bg-top": "#ffb6d5",
			"--bg-mid": "#ff5fa2",
			"--bg-bottom": "#4a001f",

			"--accent": "#ff3b8a",
			"--accent-hover": "#ff73ad",

			"--reset": "#ffcd38",
			"--reset-hover": "#ffd95e",

			"--ball-top": "#ff6fb2",
			"--ball-bottom": "#f5f5f5",
			"--ball-midline": "#111111",
			"--ball-button": "#f5f5f5",
			"--ball-button-inner": "#dcdcdc",
		},
	},
};

/* ============================================================
   loadThemeId()
   Loads theme name from localStorage.
   Defaults to the Poké Ball theme.
============================================================ */
export function loadThemeId() {
	return localStorage.getItem(THEME_KEY) || "pokeball";
}

/* ============================================================
   saveThemeId(themeId)
   Stores active theme in localStorage.
============================================================ */
export function saveThemeId(themeId) {
	localStorage.setItem(THEME_KEY, themeId);
}

/* ============================================================
   applyTheme(themeId)
   Applies a theme by:
     1. Setting <html data-theme="...">
     2. Injecting CSS custom properties (vars)
     3. Saving theme to localStorage
============================================================ */
export function applyTheme(themeId) {
	const theme = themes[themeId] || themes.pokeball;

	// Assign theme identifier to <html>
	document.documentElement.setAttribute("data-theme", theme.id);

	// Apply all theme-specific CSS variables
	for (const [key, val] of Object.entries(theme.vars)) {
		document.documentElement.style.setProperty(key, val);
	}

	// Persist choice
	saveThemeId(theme.id);
}
