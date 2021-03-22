import { AbstractFilter } from './AbstractFilter';

export class Search extends AbstractFilter {
	id;
	timeout;
	constructor(queryAttach, id, attribute = {}, children = null) {
		super(
			queryAttach,
			'input',
			[
				{ name: 'type', value: 'search' },
				{ name: 'id', value: id },
				...attribute,
			],
			children
		);
		this.id = id;
		this.timeout = null;
		this.handleKeyDownEvent = this.handleKeyDownEvent.bind(this);
		this.handleChangeValue = this.handleChangeValue.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	handleKeyDownEvent(event) {
		if (event.key !== 'Enter') return;
		this.handleSearchValue();
	}

	handleClick() {
		this.handleSearchValue();
	}

	handleSearchValue() {
		this.addParameterOnQueryPage(
			'search',
			document.querySelector(`#${this.id}`).value,
			true
		);
		this.queryAttach.resetQuery();
	}

	handleChangeValue(e) {
		if (!e.target.value) {
			this.handleSearchValue();
			return;
		}
		if (this.timeout) window.clearTimeout(this.timeout);
		this.timeout = window.setTimeout(this.handleSearchValue.bind(this), 500);
	}
	initOrDestroyEvent(key = 'addEventListener') {
		document
			.querySelector(`#${this.id}`)
			[key]('keypress', this.handleKeyDownEvent);
		document.querySelector(`#${this.id}`)[key]('input', this.handleChangeValue);
		document
			.querySelector(`#${this.id}-img-container`)
			[key]('click', this.handleClick);
	}
}
