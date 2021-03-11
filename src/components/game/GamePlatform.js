import { Component } from '../global';
import { GameScreenshot } from './GameScreenshot';

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
