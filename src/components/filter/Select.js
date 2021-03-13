import { AbstractFilter } from './AbstractFilter';
import { Option } from './Option';
export class Select extends AbstractFilter {
	id;
	filterParameter;
	arrayOfValues;
	constructor(queryAttach, arrayOfValues, id, filterParameter, attribute = []) {
		super(
			queryAttach,
			'select',
			[{ name: 'id', value: id }, ...attribute],
			arrayOfValues.map(
				value =>
					new Option(
						value.attribute || { name: 'value', value: value.slug || '' },
						value.text || value.name
					)
			)
		);
		this.id = id;
		this.arrayOfValues = arrayOfValues;
		this.filterParameter = filterParameter;
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		event.preventDefault();
		if (event.target.value == 'none') {
			this.removeParameterOnQueryPage(this.filterParameter);
			return;
		}
		this.addParameterOnQueryPage(
			this.filterParameter,
			event.target.value,
			true
		);
		//reset query pour eviter un throw
		this.queryAttach.resetQuery();
	}

	initOrDestroyEvent(key = 'addEventListener') {
		document.querySelector(`#${this.id}`)[key]('change', this.handleChange);
	}

	updateValues(element, arrayOfValues) {
		if (!Array.isArray(arrayOfValues)) return;
		this.arrayOfValues = arrayOfValues;
		this.children = [
			new Option({ name: 'value', value: 'none' }, 'Aucun'),
		].concat(
			this.arrayOfValues.map(
				value =>
					new Option(
						value.attribute || { name: 'value', value: value.slug || '' },
						value.text || value.name
					)
			)
		);
		element.innerHTML = this.render();
	}
}
