export class Favorites {
	static #favorites;

	/**
	 * Accesseur de la proprietes #favorites static prive de la class.
	 * Permet de definir la proprietes #favorites en la recuperant du localStorage si #favorites n'est pas initialiser
	 */
	static get favorites() {
		if (!this.#favorites) {
			const fromLC = JSON.parse(window.localStorage.getItem('favorites'));
			this.#favorites = fromLC ? fromLC : [];
		}
		return this.#favorites;
	}

	/**
	 * Mutateur de l'attribut #favorites static prive de la class.
	 * Dans le cas ou l'array passer en parametres est null, alors #favorites n'est pas changer.
	 * Dans les autres cas, #favorites est mis a jour et enregister en localStorage.
	 */
	static set favorites(favoris) {
		if (!Array.isArray(favoris)) return;
		this.#favorites = favoris;
		window.localStorage.setItem('favorites', JSON.stringify(this.#favorites));
	}

	/**
	 * Permet d'ajouter au favoris de notre application un jeu portant cet id et declenche la sauvergarde dans le localStorage
	 * @param {string|number} id
	 */
	static addToFavorites(id) {
		if (!this.favorites.includes(id)) {
			this.favorites = [...this.#favorites, id];
			window.dispatchEvent(
				new CustomEvent('favoris', {
					detail: {
						add: true,
						FavId: id,
					},
				})
			);
		}
	}

	/**
	 * Retire des favoris si il existe l'element id et declenche la sauvergarde dans le localStorage
	 * @param {string|number} id
	 */
	static removeToFavorites(id) {
		const pos = this.favorites.indexOf(id);
		if (pos >= 0) {
			const favC = [...this.favorites];
			favC.splice(pos, 1);
			this.favorites = [...favC];
			window.dispatchEvent(
				new CustomEvent('favoris', {
					detail: {
						add: false,
						FavId: id,
					},
				})
			);
		}
	}

	static isInFavorites(id) {
		if (!this.favorites) return false;
		const pos = this.#favorites.indexOf(id);
		return pos >= 0;
	}
}
