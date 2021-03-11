import { Component } from '../components/global';

export class Page extends Component {
	element;
	#pageTitle;
	constructor(pageTitle, className, children) {
		super('section', { name: 'class', value: className }, children);
		this.#pageTitle = pageTitle;
	}

	set pageTitle(pageT) {
		this.#pageTitle = pageT;
	}

	get pageTitle() {
		return this.#pageTitle + ' | BAVGAME';
	}

	mount(element) {
		this.element = element;
	}

	unmount() {
		return;
	}
}
