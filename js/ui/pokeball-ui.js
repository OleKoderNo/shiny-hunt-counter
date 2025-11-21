export function setupPokeballUI(onIncrement) {
	const pokeNameEl = document.getElementById("pokeName");
	const pokeCountEl = document.getElementById("pokeCount");
	const pokeballEl = document.getElementById("pokeball");
	const pokeballBtnEl = document.getElementById("pokeball-button");

	const exists = !!(pokeNameEl && pokeCountEl && pokeballEl && pokeballBtnEl);
	if (!exists) {
		return {
			exists: false,
			setDisplay() {},
			animate() {},
		};
	}

	const animate = () => {
		pokeballBtnEl.classList.remove("pressed");
		void pokeballBtnEl.offsetWidth;
		pokeballBtnEl.classList.add("pressed");

		pokeballEl.classList.remove("shake");
		void pokeballEl.offsetWidth;
		pokeballEl.classList.add("shake");
	};

	pokeballBtnEl.addEventListener("click", () => {
		onIncrement();
		animate();
	});

	const setDisplay = (hunt) => {
		if (!hunt) {
			pokeNameEl.textContent = "No hunt selected";
			pokeCountEl.textContent = "0";
			return;
		}
		pokeNameEl.textContent = hunt.name;
		pokeCountEl.textContent = hunt.count;
	};

	return { exists: true, setDisplay, animate };
}
