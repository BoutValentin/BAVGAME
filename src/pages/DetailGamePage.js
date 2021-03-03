import { Query } from '../query';
import { GameResources } from '../resources';
import { Page } from './Page';

export class DetailGamePage extends Page {
	static gameResources = new GameResources(new Query());

	constructor() {
		super('', 'detailGamePage');
	}

	mount(element) {
		super.mount(element);
		console.log('hello from detail game');

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
