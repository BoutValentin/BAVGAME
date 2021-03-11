import { Query } from '../query';
import { GameResources } from '../resources';
import { Page } from './Page';
import { GameDetail } from '../components/game';
import Router from '../Router';
import { Chargement } from '../components/global';

export class DetailGamePage extends Page {
	gameResources = new GameResources(new Query());

	constructor() {
		super('', 'detailGamePage');
	}

	mount(element) {
		super.mount(element);
		console.log('hello from detail game');
		this.element.innerHTML = '<h1>Loading...</h1>';
		this.pageTitle = 'Chargement...';

		const path = Router.currentPath;
		const slug = path.replace('/detail-', '');
		console.log(slug);

		this.gameResources.getOne(slug).then(game => {
			console.log(game);
			if (game.error) {
				Router.navigate('404');
			} else {
				this.children = new GameDetail({ ...game });
				this.pageTitle = game.name;
				document.querySelector('head title').innerText = this.pageTitle;
			}
			this.element.innerHTML = this.render();
			this.children.initEvent();
		});

		// recupere le document.location.pathName
		// substract /detail- a la string dans une var slug
		// this.pageTitke = `GAME: ${slug.replace(/-/g, ' ')}`
		// obkect gameResources static
		// getOne(slug).then( rep
		// si une erreur this.chikdren = new DetailErrorComponents()
		// sinon this.children = new DetailGameComponents(rep);
		// this.element = this.render();
	}
}
