import { Query } from '../query';
import { Resources } from './Resources';

/**
 * Class GenreResource definisant une ressources pour l'entrypoint '/genres'
 */
export class GenreResource extends Resources {
	query;
	/**
	 *  Construit une ressources GenreResource en lui attachant une query pour ses requetes.
	 *  Extends la class Resources en lui passant /genres en entrypoint
	 * @param {Query} query un objet query attacher a cette ressources.
	 */
	constructor(query) {
		super('/genres');
		this.query = query;
	}

	/**
	 *  Methode asyncrone retournant le detail sous forme d'objet de l'id demande
	 *  En cas d'erreur dans la reponse ou une exception: renvoie un objet contanant une proprietes error
	 * @param {string |number} id un string ou nombre attacher a la ressource '/genres/{id}' demande
	 * @return {Promise<Object>}
	 */
	async getOne(id) {
		return await super.getOne(id, this.query.getStringQuery());
	}

	/**
	 * Methode recuperant une partie des ressources en fonction de l'entrypoint demander (ici '/genres') et de la query
	 * @return {Promise<Object>} Un objet contenant notament une proprietes results en cas de reussite ou un objet contenant une propriete error en cas d'echec
	 */
	async getAll() {
		return await super.getAll(this.query.getStringQuery());
	}

	/**
	 *  Methode retournant un Array de resultat de la taille de ids.
	 *  Les resultats peuvent etre un objet avec de multiple proprietes decrivant la ressources '/genres/{id}' en cas de resultats
	 *  ou un objet contenant une propriete error en cas d'erreur
	 * @param {Array<string|number>} ids un tableau contenant les ids des ressources a trouver
	 * @return {Promise<Object>}
	 */
	async getManyById(ids) {
		return await super.getManyById(ids, this.query.getStringQuery());
	}

	static async getAllGenre(resultsArray = [], query = new Query(), page = 1) {
		const results = await new GenreResource(query).getAll();
		resultsArray = [...resultsArray, ...results.results];
		if (results.next) {
			query.addOneParameter('page', ++page, true);
			return await this.getAllGenre(resultsArray, query, page);
		}
		return resultsArray;
	}
}
