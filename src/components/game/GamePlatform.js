import { Component } from '../global';

export class GamePlatform extends Component {
	slugId;
	constructor({ slug, name }) {
		super(
			'p',
			[
				{ name: 'id', value: slug },
				{ name: 'class', value: 'gamePlatform' },
			],
			name
		);
		this.slugId = slug;
	}
}
