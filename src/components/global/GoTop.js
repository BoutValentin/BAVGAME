import { Component } from './Component';

export class GoTop extends Component {
	constructor() {
		super(
			'div',
			[
				{
					name: 'id',
					value: 'goTop',
				},
			],
			'^'
		);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
		e.stopPropagation();
		window.scrollTo(0, 0);
	}

	initOrDestroyEvent(key = 'addEventListener') {
		document.querySelector(`#goTop`)[key]('click', this.handleClick);
	}
}
