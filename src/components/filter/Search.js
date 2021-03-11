import { AbstractFilter } from './AbstractFilter';
import { Option } from './Option';
export class Search extends AbstractFilter {
	id;
	constructor(queryAttach, id, attribute = {}) {
		super(
			queryAttach,
			'input',
			[
				{ name: 'type', value: 'search' },
				{ name: 'id', value: id },
				...attribute,
			],
			null
		);
		this.id = id;
		this.handleKeyDownEvent = this.handleKeyDownEvent.bind(this);
	}

	handleKeyDownEvent(event) {
		if (event.key !== 'Enter') return;
		this.addParameterOnQueryPage(
			'search',
			document.querySelector(`#${this.id}`).value,
			true
		);
		this.addParameterOnQueryPage('page', 1, true);
	}

	initOrDestroyEvent(key = 'addEventListener') {
		document
			.querySelector(`#${this.id}`)
			[key]('keypress', this.handleKeyDownEvent);
	}
}
