import { Favorites } from '../../favorites/Favorites';
import { toDisplayDate } from '../../helpers';
import Router from '../../Router';
import { Component } from '../global';
import { Div } from '../global/Div';

export class GameCard extends Component {
	slugId;
	constructor({ slug, name, background_image, metacritic, released }) {
		super(
			'div',
			[
				{ name: 'id', value: slug },
				{ name: 'class', value: 'gameCard' },
			],
			[
				new Div(
					[{ name: 'class', value: 'CardImageContainer' }],
					new Component(
						'img',
						[
							{
								name: 'src',
								value: background_image || './images/pulp.gif',
							},
							{ name: 'alt', value: name + ' images' },
							{ name: 'class', value: 'CardImage' },
						],
						null
					)
				),

				new Component('p', [{ name: 'class', value: 'CardImage__p' }], name),
				new Component(
					'p',
					[{ name: 'class', value: 'CardImage__p' }],
					`Metacritic: ${metacritic || 0}`
				),
				new Component(
					'p',
					[{ name: 'class', value: 'CardImage__p' }],
					`Date: ${toDisplayDate(released)}`
				),
				new Component(
					'p',
					[
						{ name: 'class', value: 'favoritesButton' },
						{ name: 'id', value: `favoritesButton-${slug}` },
					],
					``
				),
			]
		);
		this.slugId = slug;
	}

	handleEvent() {
		const favButton = document.querySelector(`#favoritesButton-${this.slugId}`);
		favButton.addEventListener('click', e => {
			e.stopPropagation();
			if (Favorites.isInFavorites(this.slugId)) {
				Favorites.removeToFavorites(this.slugId);
				favButton.innerText = 'Add Favorites';
				return;
			} else {
				Favorites.addToFavorites(this.slugId);
				favButton.innerText = 'Remove Favorites';
			}
		});
		if (Favorites.isInFavorites(this.slugId)) {
			favButton.innerText = 'Remove Favorites';
		} else favButton.innerText = 'Add Favorites';
		const currentCard = document.querySelector(`#${this.slugId}`);
		currentCard.addEventListener('click', () => {
			Router.navigate(`/detail-${this.slugId}`, true);
		});
	}
}
