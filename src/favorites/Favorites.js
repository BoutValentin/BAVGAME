export class Favorites {
	static #favorites;

	static get favorites() {
		if (!this.#favorites) {
			const fromLC = JSON.parse(window.localStorage.getItem('favorites'));
			this.#favorites = fromLC ? fromLC : [];
		}
		return this.#favorites;
	}

	static set favorites(favoris) {
		if (!Array.isArray(favoris)) return;
		this.#favorites = favoris;
		window.localStorage.setItem('favorites', JSON.stringify(this.#favorites));
	}

	static addToFavorites(id) {
		if (!this.#favorites.includes(id)) {
			this.favorites = [...this.#favorites, id];
			new CustomEvent('favoris', {
				detail: {
					type: 'add',
					FavId: id,
				},
			});
		}
	}

	static removeToFavorites(id) {
		const pos = this.#favorites.indexOf(id);
		if (pos >= 0) {
			const favC = [...this.favorites];
			favC.splice(pos, 1);
			this.favorites = [...favC];
			new CustomEvent('favoris', {
				detail: {
					type: 'remove',
					FavId: id,
				},
			});
		}
	}
}
