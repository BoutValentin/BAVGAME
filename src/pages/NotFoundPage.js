import { Page } from './Page';

export class NotFoundPage extends Page {
	constructor() {
		super('NOT FOUND', 'notFoundPage');
	}

	mount(element) {
		super.mount(element);
		console.log('hello from notfoundpage');

		// on creer un composant simple voir du html dans une string
		// on l'affecte  a this.element.innerHTML
		this.element.innerHTML = '404';
	}
}
