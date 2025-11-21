const THEME_KEY = "pokeballTheme";

export const themes = {
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
};

export function loadThemeId() {
	return localStorage.getItem(THEME_KEY) || "pokeball";
}

export function saveThemeId(themeId) {
	localStorage.setItem(THEME_KEY, themeId);
}

export function applyTheme(themeId) {
	const theme = themes[themeId] || themes.pokeball;

	document.documentElement.setAttribute("data-theme", theme.id);

	for (const [key, val] of Object.entries(theme.vars)) {
		document.documentElement.style.setProperty(key, val);
	}

	saveThemeId(theme.id);
}
