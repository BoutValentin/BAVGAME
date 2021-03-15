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
		this.element.innerHTML = '<h1>Loading...</h1>';
		this.pageTitle = 'Chargement...';

		const path = Router.currentPath;
		const slug = path.replace('/detail-', '');

		this.gameResources.getOne(slug).then(game => {
			if (game.error) {
				Router.navigate('404');
				return;
			} else {
				this.children = new GameDetail({ ...game });
				this.pageTitle = game.name;
				document.querySelector('head title').innerText = this.pageTitle;
			}
			this.element.innerHTML = this.render();
			this.children.initEvent();
		});
	}
}
