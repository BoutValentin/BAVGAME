export const API_KEY = 'ae1f2f3bbd7a4dd29f7e4a2aed685059';
export const METACRITIC = '50,100';
export const PAGE_SIZE = 20;
export const DATE_RELEASE = '2020-01-01,';
export const PAGE = 1;

export class Query {
	parameters;
	/**
	 * Creer un objet Query en definissant des options par default ici:
	 * - key: la clef d'autorisation d'utilisation de l'api
	 * - metacritic: note miminal de metacritic
	 * - page_size: nombre d'element retourner par appel a l'api
	 * - dates: une echelle de date, separer par ',' indiquant un intervalle de sortie
	 */
	constructor() {
		const date = new Date();
		this.parameters = {
			key: API_KEY,
			metacritic: METACRITIC,
			page_size: PAGE_SIZE,
			pages: PAGE,
			dates:
				DATE_RELEASE +
				`${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${(
					'0' + date.getDate()
				).slice(-2)}`,
		};
	}

	/**
	 * Cette methode permet d'ajouter un parametre a la query.
	 * Son fonctionnement par defautl et d'ajouter le parameter dans un array si un parametre existe deja avec la meme key.
	 * le boolean replace permet de remplacer la valeur de la clef par celle passer en parametre
	 * @param {string} key
	 * @param {string|number} parameter
	 * @param {boolean} replace default = false
	 */
	addOneParameter(key, parameter, replace = false) {
		if (!this.parameters[key]) {
			this.parameters[key] = parameter;
			return;
		}
		if (Array.isArray(this.parameters[key])) {
			if (!this.parameters[key].includes(parameter)) {
				this.parameters[key] = [...this.parameters[key], parameter];
			}
			return;
		}
		if (this.parameters[key] !== parameter && replace) {
			this.parameters[key] = parameter;
			return;
		}
		if (this.parameters[key] !== parameter) {
			this.parameters[key] = [...this.parameters[key], parameter];
		}
	}
	/**
	 *	Retire un parametre de l'obet query
	 * Son comportement par default, si aucun parametre 'parameter' n'est passer , est de supprimer complement la clef de la query
	 * Si le parametre 'parameter' est donne et que la clef donner correspond a un Array, alors seul ce parametre sera retirer
	 * @param {string} key
	 * @param {string|number} parameter default null
	 */
	removeOneParameter(key, parameter = null) {
		if (!this.parameters[key]) return;
		if (
			!parameter ||
			(!Array.isArray(this.parameters[key]) &&
				this.parameters[key] === parameter)
		) {
			delete this.parameters[key];
			return;
		}
		if (Array.isArray(this.parameters[key])) {
			const pos = this.parameters[key].indexOf(parameter);
			if (pos >= 0) {
				this.parameters[key].splice(pos, 1);
			}
			return;
		}
	}
	/**
	 * Test si un parametre est present dans l'obet query
	 * Son comportement par default, si aucun parametre 'parameter' n'est passer , est de retourner complement la clef de la query
	 * Si le parametre 'parameter' est donne et que la clef donner correspond a un Array, alors seul ce parametre sera retourner
	 * @param {string} key
	 * @param {string|number} parameter default null
	 */
	isContainingParameter(key, parameter = null) {
		if (!this.parameters[key]) return null;
		if (
			!parameter ||
			(!Array.isArray(this.parameters[key]) &&
				this.parameters[key] === parameter)
		) {
			return this.parameters[key];
		}
		if (Array.isArray(this.parameters[key])) {
			const pos = this.parameters[key].indexOf(parameter);
			if (pos >= 0) {
				return this.parameters[key];
			}
		}
		return null;
	}
	/**
	 * Retourne tout les clef de la query sous forme d'une string
	 */
	getStringQuery() {
		let string = '';
		for (const key in this.parameters) {
			const value = this.parameters[key];
			string += `${string ? '&' : ''}${key}=${
				value instanceof Array ? value.join() : value
			}`;
		}
		return string;
	}

	resetQuery() {
		const date = new Date();
		this.parameters = {
			...this.parameters,
			key: API_KEY,
			metacritic: METACRITIC,
			page_size: PAGE_SIZE,
			pages: PAGE,
			dates:
				DATE_RELEASE +
				`${date.getFullYear()}-${('0' + date.getMonth()).slice(-2)}-${(
					'0' + date.getDate()
				).slice(-2)}`,
		};
	}
}
