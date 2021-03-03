import { Favorites } from '../favorites/Favorites';
import { Query } from '../query';
import { GameResources } from '../resources';
import { Page } from './Page';

export class FavoritesPage extends Page {
	static gameResources = new GameResources(new Query());
	constructor() {
		super('FAVORITES', 'favoritesPage');
	}

	mount(element) {
		super.mount(element);
		console.log('hello from favoritesPage');

		// recupere la liste des favoris avec Favorites.favorites
		// creation de l'array a composant
		// si on a une liste vide de favoris this.children = new EmptyFavoritesListe()
		// creer une gameResources.getManyById(Favorites.favorites)
		//.then(reps
		// pour chaque elemetn de l'arrau de reponse
		// si reps est un objet error on ajouter CardErrorGame()
		// sinon on ajute CardCame(rep);
		// this.children = array composant;
	}
}
