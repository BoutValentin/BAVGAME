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
		this.handleScroll = this.handleScroll.bind(this);
	}

	handleClick(e) {
		e.stopPropagation();
		if (document.querySelector(`#goTop`)?.classList.contains('show'))
			window.scrollTo(0, 0);
	}

	handleScroll() {
		if (window.scrollY === 0) {
			document.querySelector(`#goTop`)?.classList.remove('show');
			return;
		}
		document.querySelector(`#goTop`)?.classList.add('show');
	}

	initOrDestroyEvent(key = 'addEventListener') {
		document.querySelector(`#goTop`)[key]('click', this.handleClick);
		window[key]('scroll', this.handleScroll);
	}
}
