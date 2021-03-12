import { Component } from './Component';

export class Chargement extends Component {
	constructor() {
		super(
			'div',
			[{ name: 'id', value: 'chargement-more-ressources' }],
			new Component('p', [], 'Loading...')
		);
	}
}
