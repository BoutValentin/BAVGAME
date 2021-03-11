import { Component } from '../global';

export class AbstractFilter extends Component {
	queryAttach;
	constructor(queryAttach, tagName, attribute, children) {
		super(tagName, attribute, children);
		this.queryAttach = queryAttach;
	}

	addParameterOnQueryPage(key, parameter, replace = false) {
		if (!this.queryAttach) return;
		this.queryAttach.addOneParameter(key, parameter, replace);
		window.dispatchEvent(new Event('queryChange'));
	}

	removeParameterOnQueryPage(key, parameter = null) {
		if (!this.queryAttach) return;
		this.queryAttach.removeOneParameter(key, parameter);
		window.dispatchEvent(new Event('queryChange'));
	}
}
