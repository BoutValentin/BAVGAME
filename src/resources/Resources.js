const API_URL = 'https://api.rawg.io/api';

export class Resources {
	entrypoint;

	/**
	 * Créer un objet Resources avec une entrypoint specifie en parametres.
	 * Exemple d'entrypoint (selon la documentation: https://api.rawg.io/docs/) :
	 *      - /games
	 *      - /creators
	 *      - /developers
	 *      - ....
	 * @param {string} entrypoint
	 */
	constructor(entrypoint) {
		this.entrypoint = entrypoint;
	}

	/**
	 *  Methode asyncrone retournant le detail sous forme d'objet de l'id demande
	 *  En cas d'erreur dans la reponse ou une exception: renvoie un objet contanant une proprietes error
	 * @param {string |number} id un string ou nombre attacher a la ressource demande
	 * @param {string} query des options de requets optionnel contenant a minima par defautl la clef d'api
	 * @return {Promise<Object>}
	 */
	async getOne(id, query) {
		try {
			const response = await fetch(
				`${API_URL}${this.entrypoint}/${id}?${query}`
			);
			const oneResources = await response.json();
			return response.status >= 400
				? {
						error: {
							slug: id,
							statusCode: response.status,
							detail: oneResources?.detail,
						},
				  }
				: oneResources;
		} catch (error) {
			return { error: { ...error } };
		}
	}

	/**
	 * Methode recuperant une partie des ressources en fonction de l'entrypoint demander et de la query
	 * @param {string} query des options de requets optionnel contenant a minima par defautl la clef d'api
	 * @return {Promise<Object>} Un objet contenant notament une proprietes results en cas de reussite ou un objet contenant une propriete error en cas d'echec
	 */
	async getAll(query) {
		try {
			const response = await fetch(`${API_URL}${this.entrypoint}?${query}`);
			const allResources = await response.json();
			return response.status >= 400
				? {
						error: {
							statusCode: response.status,
							detail: allResources?.detail,
						},
				  }
				: allResources;
		} catch (error) {
			return { error: { ...error } };
		}
	}

	/**
	 *  Methode retournant un Array de resultat de la taille de ids.
	 *  Les resultats peuvent etre un objet avec de multiple proprietes decrivant la ressources en cas de resultats
	 *  ou un objet contenant une propriete error en cas d'erreur
	 * @param {Array<string|number>} ids un tableau contenant les ids des ressources a trouver
	 * @param {string} query des options de requets optionnel contenant a minima par defautl la clef d'api
	 * @return {Promise<Object>}
	 */
	async getManyById(ids, query) {
		if (ids == null) {
			return { error: 'Id cannot be null' };
		}
		try {
			const responses = await Promise.all(
				ids.map(id => fetch(`${API_URL}${this.entrypoint}/${id}?${query}`))
			);
			const allResources = await Promise.all(
				responses.map(async (response, index) =>
					response.status >= 400
						? {
								error: {
									slug: ids[index],
									statusCode: response.status,
									detail: (await response.json())?.detail,
								},
						  }
						: response.json()
				)
			);
			return allResources;
		} catch (error) {
			return { error: { ...error } };
		}
	}
}
