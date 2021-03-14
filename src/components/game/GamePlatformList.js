import { Component } from '../global';
import { GamePlatform } from './GamePlatform';

export class GamePlatformList extends Component {
	constructor(platforms) {
		super(
			'div',
			[{ name: 'class', value: 'gamePlatformList' }],
			platforms.map(({ platform }) => new GamePlatform(platform))
		);
	}
}
