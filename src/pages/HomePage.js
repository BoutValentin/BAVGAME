import { Query } from '../query';
import { Page } from './Page';
import { GameResources } from '../resources';
import { HomePageComponent } from '../components/homePage';
import { Chargement } from '../components/global';
import { GameCard } from '../components/game';

export class HomePage extends Page {
	gameResources;
	currentRessources;
	lastPageFetch;
	asNextPage;
	eventIsHandle;
	requestWasSend;

	constructor() {
		super('HOME', 'homePage');
		this.handleQueryChange = this.handleQueryChange.bind(this);
		this.handleScrollEvent = this.handleScrollEvent.bind(this);
	  	this.gameResources = new GameResources(new Query());
	  	this.currentRessources = [[]];
	  	this.lastPageFetch = 0;
	  	this.asNextPage = false;
	  	this.eventIsHandle = false;
  		this.requestWasSend = false;
  	}

	mount(element) {
		if (!this.eventIsHandle) {
			this.initOrDestroyEvent();
			this.eventIsHandle = true;
		}
		super.mount(element);
		this.element.innerHTML = '<h1>Loading...</h1>';
		this.requestWasSend = true;
		this.addResources().then(rep => {
			this.requestWasSend = false;
			this.children = new HomePageComponent(this.gameResources.query);
			this.element.innerHTML = this.render();
			this.addRessourceToContainer('game-container');
			this.children.initEvent();
		});
	}

	async addResources() {
		if (this.asNextPage) return 'NoMoreRessources';
		this.gameResources.query.addOneParameter(
			'page',
			this.lastPageFetch + 1,
			true
		);
		const reponse = await this.gameResources.getAll();
		if (reponse.error) return reponse;
		if (reponse.results.length == 0) return 'NoRessourcesFind';
		this.asNextPage = reponse.next == null;
		this.currentRessources[this.lastPageFetch++] = [...reponse.results];
	}

	initOrDestroyEvent(key = 'addEventListener') {
		window[key]('queryChange', this.handleQueryChange);
		window[key]('scroll', this.handleScrollEvent);
	}

	resetRessources() {
		this.currentRessources = [[]];
		this.lastPageFetch = 0;
		this.asNextPage = false;
		this.eventIsHandle = false;
	}

	handleQueryChange() {
		if (!this.element) return;
		this.resetRessources();
		document.querySelector('.game-container').innerHTML = 'Loading...';
		this.requestWasSend = true;
		this.addResources().then(rep => {
			this.requestWasSend = false;
			if (rep === 'NoMoreRessources') {
				this.noMoreRessourceAdder();
				document.querySelector('#chargement-more-ressources').remove();
				return;
			}
			if (rep === 'NoRessourcesFind') {
				document.querySelector('.game-container').innerHTML = '';
				this.noMoreRessourceAdder();
				return;
			}
			document.querySelector('.NoMoreRessources')?.remove();
			this.addRessourceToContainer('game-container', true);
		});
	}

	handleScrollEvent() {
		if (this.requestWasSend) return;
		const element = document.documentElement;
		if (element.scrollHeight - element.scrollTop >= element.clientHeight + 444)
			return;
		const elementToInsert = document.querySelector('header').parentNode;
		const template = document.createElement('template');
		template.innerHTML = new Chargement().render();
		elementToInsert.insertBefore(
			template.content.firstChild,
			document.querySelector('header')
		);
		this.requestWasSend = true;
		this.addResources().then(rep => {
			this.requestWasSend = false;
			if (rep === 'NoMoreRessources') {
				this.noMoreRessourceAdder();
				document.querySelector('#chargement-more-ressources').remove();
				return;
			}
			if (rep === 'NoRessourcesFind') {
				document.querySelector('.game-container').innerHTML = '';
				this.noMoreRessourceAdder();
				return;
			}
			document.querySelector('.NoMoreRessources')?.remove();
			this.addRessourceToContainer('game-container');
			document.querySelector('#chargement-more-ressources').remove();
		});
	}

	addRessourceToContainer(classe, reset = false) {
		const element = document.querySelector(`.${classe}`);
		if (reset && element) element.innerHTML = '';
		let gameCardsCreate = [];
		if (!this.currentRessources[this.lastPageFetch - 1]) return;
		element?.insertAdjacentHTML(
			'beforeend',
			this.currentRessources?.[this.lastPageFetch - 1].reduce(
				(prev, current, index) =>
					prev +
					(gameCardsCreate = [...gameCardsCreate, new GameCard(current)])[
						index
					].render(),
				''
			)
		);
		gameCardsCreate.forEach(gameCard => gameCard.handleEvent());
	}

	noMoreRessourceAdder() {
		if (document.querySelector('.NoMoreRessources')) return;
		const refNode = document.querySelector('.game-container');
		const template = document.createElement('template');
		template.innerHTML = `<p class="NoMoreRessources">We have no or more games to show you :(</p>`;
		refNode.parentNode.insertBefore(
			template.content.firstChild,
			refNode.nextSibling
		);
	}

	unmount() {
		this.initOrDestroyEvent('removeEventListener');
		this.eventIsHandle = false;
		this.resetRessources();
		this.children.destroyEvent();
	}
}
