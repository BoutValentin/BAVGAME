import { AbstractFilter } from './AbstractFilter';

export class OptionFilter extends AbstractFilter {
	filterParameter;
	values;
	commonClass;
	id;
	callBack;
	constructor(
		queryAttach,
		filterParameter,
		values,
		id,
		commonClass = '',
		children = [],
		attribute = [],
		callBack = null
	) {
		super(
			queryAttach,
			'div',
			[
				{
					name: 'id',
					value: `${id}-contenaire-Child`,
				},
				...attribute,
				{
					name: 'class',
					value: `${attribute?.class || ''} optionFilter-${commonClass}`,
				},
			],
			children
		);
		this.filterParameter = filterParameter;
		this.values = values;
		this.id = id;
		this.commonClass = commonClass;
		this.callBack = callBack;
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(event) {
		event.preventDefault();
		if (this.values == 'none') {
			this.removeParameterOnQueryPage(this.filterParameter);
			document
				.querySelector(`.optionFilter-${this.commonClass} > .active`)
				?.classList.remove('active');
			document.querySelector(`#${this.id}`).classList.add('active');
			return;
		}
		this.addParameterOnQueryPage(this.filterParameter, this.values, true);
		this.queryAttach.resetQuery();
		document
			.querySelector(`.optionFilter-${this.commonClass} > .active`)
			?.classList.remove('active');
		document.querySelector(`#${this.id}`).classList.add('active');
	}

	initOrDestroyEvent(key = 'addEventListener') {
		document.querySelector(`#${this.id}`)[key]('click', this.handleClick);
		if (key === 'addEventListener' && this.callBack instanceof Function)
			this.callBack();
	}
}
