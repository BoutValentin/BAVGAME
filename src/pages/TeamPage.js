import { Page } from './Page';

export class TeamPage extends Page {
	constructor() {
		super('TEAM', 'teamPage');
	}

	mount(element) {
		super.mount(element);
		console.log('hello from teamPage');

		//fetch le ./team
		//then => .text()
		//.then this.children =rep; this.element.innerHtml = render;
	}
}
