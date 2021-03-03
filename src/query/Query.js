export const API_KEY = 'NOKEYFORNOW';
export const METACRITIC = 50;
export const PAGE_SIZE = 20;
export class Query {
	parameters;
	constructor() {
		this.parameters = {
			key: API_KEY,
			metacritic: METACRITIC,
			page_size: PAGE_SIZE,
		};
	}

	addOneParameter(key, string, replace = false) {
		if (!this.parameters[key]) {
			this.parameters[key] = string;
			return;
		}
		if (Array.isArray(this.parameters[key])) {
			if (!this.parameters[key].includes(string)) {
				this.parameters[key] = [...this.parameters[key], string];
			}
			return;
		}
		if (this.parameters[key] !== string && replace) {
			this.parameters[key] = string;
			return;
		}
		if (this.parameters[key] !== string) {
			this.parameters[key] = [...this.parameters[key], string];
		}
	}

	removeOneParameter(key, string = null) {
		if (!this.parameters[key]) return;
		if (
			!string ||
			(!Array.isArray(this.parameters[key]) && this.parameters[key] === string)
		) {
			delete this.parameters[key];
			return;
		}
		if (Array.isArray(this.parameters[key])) {
			const pos = this.parameters[key].indexOf(string);
			if (pos >= 0) {
				this.parameters[key].splice(pos, 1);
			}
			return;
		}
	}

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
}
