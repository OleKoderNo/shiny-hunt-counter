/* ============================================================
   setupPokeballUI()
   Wires up the Pokéball display + click button in popup.html.

   Responsibilities:
   - Detect if Pokéball elements exist on the current page
   - Provide safe no-op methods if they don’t (controller-only view)
   - Animate Pokéball + button on increment
   - Update displayed hunt name + count
============================================================ */
export function setupPokeballUI(onIncrement) {
	/* Grab Pokéball DOM elements (only exist in popup layout) */
	const pokeNameEl = document.getElementById("pokeName");
	const pokeCountEl = document.getElementById("pokeCount");
	const pokeballEl = document.getElementById("pokeball");
	const pokeballBtnEl = document.getElementById("pokeball-button");

	/* If any element is missing, return safe fallback API */
	const exists = !!(pokeNameEl && pokeCountEl && pokeballEl && pokeballBtnEl);
	if (!exists) {
		return {
			exists: false,
			setDisplay() {},
			animate() {},
		};
	}

	/* ============================================================
	   animate()
	   Triggers CSS animations by removing/re-adding classes.
	   The offsetWidth reads ensure the animation restarts each click.
	============================================================ */
	const animate = () => {
		pokeballBtnEl.classList.remove("pressed");
		void pokeballBtnEl.offsetWidth;
		pokeballBtnEl.classList.add("pressed");

		pokeballEl.classList.remove("shake");
		void pokeballEl.offsetWidth;
		pokeballEl.classList.add("shake");
	};

	/* Clicking the Pokéball button increments and animates */
	pokeballBtnEl.addEventListener("click", () => {
		onIncrement();
		animate();
	});

	/* ============================================================
	   setDisplay(hunt)
	   Updates Pokéball text display based on the active hunt.
	   - If no hunt is selected, show defaults
	   - Otherwise show hunt name and count
	============================================================ */
	const setDisplay = (hunt) => {
		if (!hunt) {
			pokeNameEl.textContent = "No hunt selected";
			pokeCountEl.textContent = "0";
			return;
		}
		pokeNameEl.textContent = hunt.name;
		pokeCountEl.textContent = hunt.count;
	};

	/* Public API for app.js to control Pokéball UI */
	return { exists: true, setDisplay, animate };
}
