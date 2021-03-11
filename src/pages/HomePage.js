import { Query } from '../query';
import { Page } from './Page';
import { GameResources } from '../resources';
import { HomePageComponent } from '../components/homePage';
import { Chargement, Component } from '../components/global';
import { GameCard } from '../components/game';

export class HomePage extends Page {
	gameResources = new GameResources(new Query());
	currentRessources = [[]];
	lastPageFetch = 0;
	asNextPage = false;
	fetchError = false;
	eventIsHandle = false;
	constructor() {
		super('HOME', 'favoritesPage');
		this.handleQueryChange = this.handleQueryChange.bind(this);
		this.handleScrollEvent = this.handleScrollEvent.bind(this);
		//add event listener on custom event (queryChange) to retrigger mount on change and clear currentRessources;
		// on oublie pas de reset currentResource et lastPageFetch
		//add event listener on custom event to have more ressources and lancant la fonction addResources puis un mount dans un .then
	}

	mount(element) {
		if (!this.eventIsHandle) {
			this.initOrDestroyEvent();
			this.eventIsHandle = true;
		}
		super.mount(element);
		// Recuperer tout les 20 premieres ressources de /games
		this.element.innerHTML = 'chargement';
		// ajout handle du cache
		this.addResources().then(rep => {
			this.children = new HomePageComponent(this.gameResources.query);
			this.element.innerHTML = this.render();
			this.addRessourceToContainer('game-container');
			this.children.initEvent();
		});
		//HomePage.gameResources.getAll().then(rep => console.log(rep));

		// Recuperer tout la ressources de /games/cyberpunk-2077
		//HomePage.gameResources.getOne('cyberpunk-2077').then(rep => console.log(rep));

		// Recuperer un tableau de ressources correspondant au id passer en parametres
		//HomePage.gameResources.getManyById(['cyberpunk-2077', 'fall-guys']).then(rep => console.log(rep));
		// recupere les ressources avec addRessources
		// .then(
		// pour chaque ressource dans currentResources correspondant a lastPageFetch -1
		// this.element.innerHTML += new GameCard(res);
	}

	async addResources() {
		if (this.asNextPage) {
			return 'NoMoreRessources';
		}
		this.gameResources.query.addOneParameter(
			'page',
			this.lastPageFetch + 1,
			true
		);
		const reponse = await this.gameResources.getAll();
		this.fetchError = reponse.error == null;
		if (reponse.error) {
			this.fetchError = true;
			return reponse;
		}
		this.asNextPage = reponse.next == null;
		this.currentRessources[this.lastPageFetch++] = [...reponse.results];
	}
	//async function addRessources
	//utilise game resource pour obtenir plus de ressources
	//update la query en changeant page par lastPageFetch ++
	// lance la rechercher avec le game resource
	// await une rep
	// si objet erreur : <voir quoi faire>
	// sinon ajoute au tableau currentRessource[lastPageFetch];

	initOrDestroyEvent(key = 'addEventListener') {
		window[key]('queryChange', this.handleQueryChange);
		window[key]('scroll', this.handleScrollEvent);
	}

	resetRessources() {
		this.currentRessources = [[]];
		this.lastPageFetch = 0;
		this.asNextPage = false;
		this.fetchError = false;
		this.eventIsHandle = false;
	}

	handleQueryChange() {
		if (!this.element) return;
		this.resetRessources();
		// REMPLACER PAR UN CHAGNEMENT SEULEMENT DES CARDS
		this.addResources().then(rep =>
			this.addRessourceToContainer('game-container', true)
		);
	}

	handleScrollEvent() {
		var element = document.documentElement;
		if (element.scrollHeight - element.scrollTop === element.clientHeight) {
			// Ajout d'un p chargement

			//.then appelle gamePageComponents.addGameCard
			// ou ajouter dans apres le selector de GameCardContainer un for each creeant une carte et la render direct
			// Si error on ajouter le composant fetch error a la place
			const element = document.querySelector('header').parentNode;
			var template = document.createElement('template');
			template.innerHTML = new Chargement().render();
			element.insertBefore(
				template.content.firstChild,
				document.querySelector('header')
			);
			this.addResources().then(rep => {
				this.addRessourceToContainer('game-container');
				document.querySelector('#chargement-more-ressources').remove();
			});

			// retrait de ce p
		}
	}
	addRessourceToContainer(classe, reset = false) {
		const element = document.querySelector(`.${classe}`);
		if (reset) element.innerHTML = '';
		let gcs = [];
		element.insertAdjacentHTML(
			'beforeend',
			this.currentRessources[this.lastPageFetch - 1].reduce(
				(prev, current, index) =>
					prev + (gcs = [...gcs, new GameCard(current)])[index].render(),
				''
			)
		);
		gcs.forEach(gc => gc.handleEvent());
	}
	unmount() {
		this.initOrDestroyEvent('removeEventListener');
		this.eventIsHandle = false;
		//this.resetRessources();
		this.children.destroyEvent();
	}
}
