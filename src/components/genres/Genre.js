import { Component, Div, P } from '../global';

export class Genre extends Component {
	slug;
	id;
	constructor({ name, slug, id }) {
		super(
			'div',
			[
				{
					name: 'id',
					value: `genres-${slug}-${id}`,
				},
				{
					name: 'class',
					value: `genres-${slug}`,
				},
			],
			[
				new Div([{ name: 'class', value: 'genres__rounded' }], ''),
				new P([{ name: 'class', value: 'genres__name' }], name),
			]
		);
		this.slug = slug;
		this.id = `genres-${slug}-${id}`;
	}
}
