import { Query } from '../query';
import { Resources } from './Resources';

/**
 * Class GameResources definisant une ressources pour l'entrypoint '/games'
 */
export class GameResources extends Resources {
	query;
	/**
	 *  Construit une ressources GameResources en lui attachant une query pour ses requetes.
	 *  Extends la class Resources en lui passant /games en entrypoint
	 * @param {Query} query un objet query attacher a cette ressources.
	 */
	constructor(query) {
		super('/games');
		this.query = query;
	}

	/**
	 *  Methode asyncrone retournant le detail sous forme d'objet de l'id demande
	 *  En cas d'erreur dans la reponse ou une exception: renvoie un objet contanant une proprietes error
	 * @param {string |number} id un string ou nombre attacher a la ressource '/games/{id}' demande
	 * @return {Promise<Object>}
	 */
	async getOne(id) {
		const game = await super.getOne(id, this.query.getStringQuery());
    	if (game.error) return game;
		const query = new Query();
		query.addOneParameter('page_size', game.screenshots_count, true);
		query.removeOneParameter('metacritic');
		query.removeOneParameter('dates');
		query.removeOneParameter('pages');

		const screenshots = await new Resources(
			`${this.entrypoint}/${id}/screenshots`
		).getAll(query.getStringQuery());

		return { ...game, screenshots: screenshots?.results || [] };
	}

	/**
	 * Methode recuperant une partie des ressources en fonction de l'entrypoint demander (ici '/games') et de la query
	 * @return {Promise<Object>} Un objet contenant notament une proprietes results en cas de reussite ou un objet contenant une propriete error en cas d'echec
	 */
	async getAll() {
		return await super.getAll(this.query.getStringQuery());
	}

	/**
	 *  Methode retournant un Array de resultat de la taille de ids.
	 *  Les resultats peuvent etre un objet avec de multiple proprietes decrivant la ressources '/games/{id}' en cas de resultats
	 *  ou un objet contenant une propriete error en cas d'erreur
	 * @param {Array<string|number>} ids un tableau contenant les ids des ressources a trouver
	 * @return {Promise<Object>}
	 */
	async getManyById(ids) {
		return await super.getManyById(ids, this.query.getStringQuery());
	}
}
