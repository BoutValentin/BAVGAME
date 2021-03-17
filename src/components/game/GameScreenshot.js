import { Component } from '../global';

export class GameScreenshot extends Component {
	constructor(image, id, classe = '') {
		super(
			'a',
			[
				{ name: 'class', value: `vignette ${classe}` },
				{ name: 'target', value: '_blank' },
				{ name: 'href', value: image },
				{ name: 'id', value: `${id}-a` },
			],
			[
				new Component(
					'img',
					[
						{ name: 'class', value: 'vignetteImage' },
						{ name: 'src', value: image },
						{ name: 'id', value: `${id}-img` },
					],
					''
				),
			]
		);
	}
}
