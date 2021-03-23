import { EmptyFavoritesList } from '../components/favorites';
import { ErrorGameCard, GameCard } from '../components/game';
import { Favorites } from '../favorites/Favorites';
import { Query } from '../query';
import { GameResources } from '../resources';
import { Page } from './Page';
import Router from '../Router';
import { Div, P } from '../components/global';

export class FavoritesPage extends Page {
	gameResources;

	constructor() {
		super('FAVORITES', 'favoritesPage');
    	this.gameResources = new GameResources(new Query());
  	}

	mount(element) {
		super.mount(element);
		this.element.innerHTML = '<h1>Loading...</h1>';
		this.handleFavorisListener = this.handleFavorisListener.bind(this);
		window.addEventListener('favoris', this.handleFavorisListener);
		const arrayFavorites = Favorites.favorites;

		if (arrayFavorites.length == 0) {
			this.attribute = { name: 'class', value: 'listEmptyFavorite' };
			this.children = new EmptyFavoritesList();
			this.pageTitle = this.p;
			this.element.innerHTML = this.render();
			this.addListenerReturnHomePage();
			return;
		}

		this.gameResources.getManyById(arrayFavorites).then(games => {
			const gamesCards = games.map(game => {
				if (game.error) return new ErrorGameCard(game.error);
				return new GameCard(game);
			});
			this.attribute = { name: 'class', value: 'favoritePageContainer' };
			this.children = new Div(
				[{ name: 'class', value: 'favoriteContainer' }],
				[
					new P(
						{ name: 'class', value: 'favoriteContainer__title' },
						'Here are all your favorites'
					),
					new Div({ name: 'class', value: 'listFavorite' }, gamesCards),
				]
			);
			this.element.innerHTML = this.render();
			gamesCards.forEach(game => game.handleEvent());
		});
	}

	/**
	 * Enlève les listeners au changement de page
	 */
	unmount() {
		window.removeEventListener('favoris', this.handleFavorisListener);
	}

	/**
	 * Listener qui écoute les clicks sur les boutons "enlever favori"
	 * @param {*} event le click sur le bouton
	 */
	handleFavorisListener(event) {
		if (event.detail.add) return;

		document.getElementById(event.detail.FavId).remove();

		if (document.querySelector('.listFavorite')?.hasChildNodes() === false) {
			this.attribute = { name: 'class', value: 'listEmptyFavorite' };
			this.children = new EmptyFavoritesList();
			this.element.innerHTML = this.render();
			this.addListenerReturnHomePage();
		}
	}

	addListenerReturnHomePage() {
		document
			.getElementById('returnHomePage')
			.addEventListener('click', this.eventHandlerReturnHomepage);
	}

	/**
	 * Permet d'éviter de recharger la page
	 * @param {*} event Le clic sur le lien
	 */
	eventHandlerReturnHomepage(event) {
		event.preventDefault();
		Router.navigate('/');
	}
}
