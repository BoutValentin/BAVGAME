import { Component } from '../global';
import { Genre } from './Genre';

export class GenreList extends Component {
	constructor(genres) {
		super(
			'div',
			[{ name: 'class', value: 'genres_list' }],
			genres.map(genre => new Genre(genre))
		);
	}
}
