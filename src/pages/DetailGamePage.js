import { Query } from '../query';
import { GameResources } from '../resources';
import { Page } from './Page';
import { GameDetail } from '../components/game';
import Router from '../Router';

export class DetailGamePage extends Page {
	gameResources;

	constructor() {
		super('', 'detailGamePage');
	  	this.gameResources = new GameResources(new Query());
  	}

	mount(element) {
		super.mount(element);
		this.element.innerHTML = '<h1>Loading...</h1>';
		this.pageTitle = 'Loading...';

		const path = window.location.pathname;
		const slug = path.replace('/detail-', '');

		this.gameResources.getOne(slug).then(game => {
      		if (game.error) {
        		Router.navigate('/404');
				return;
			}
			this.children = new GameDetail(game);
			this.pageTitle = game.name;
			document.querySelector('head title').innerText = this.pageTitle;
			this.element.innerHTML = this.render();
			this.children.initEvent();
		});
	}

	unmount() {
		this.children?.destroyEvent?.();
	}
}
