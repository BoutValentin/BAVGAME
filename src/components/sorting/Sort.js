import { Component, Div, P } from '../global';

export class Sort extends Component {
	id;
	constructor(imgUrl, displayName, id, classe = '', attribute = []) {
		super(
			'div',
			[
				...attribute,
				{ name: 'id', value: id },
				{ name: 'class', value: `sort-container ${classe}` },
			],
			[
				new Component(
					'img',
					[
						{ name: 'src', value: imgUrl },
						{ name: 'id', value: `${id}-sort-image` },
						{ name: 'class', value: 'sort__image' },
					],
					''
				),
				new P(
					[
						{ name: 'class', value: 'sort__title' },
						{ name: 'id', class: `${id}-sort-title` },
					],
					displayName
				),
			]
		);
		this.id = id;
	}
}
