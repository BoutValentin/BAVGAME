import { Favorites } from '../../favorites/Favorites';
import { toDisplayDate } from '../../helpers';
import Router from '../../Router';
import { GenreList } from '../genres';
import { Component, P } from '../global';
import { Div } from '../global/Div';

export class GameCard extends Component {
	slugId;
	layoutAsError;
	constructor(
		{ slug, name, background_image, metacritic, genres, released },
		layoutAsError = false
	) {
		super(
			'div',
			[
				{ name: 'id', value: slug },
				{ name: 'class', value: 'gameCard' },
			],
			[
				new Div(
					[{ name: 'class', value: 'CardImageContainer' }],
					[
						new Component(
							'img',
							[
								{
									name: 'src',
									value: background_image || '/images/pulp.gif',
								},
								{ name: 'alt', value: name + ' images' },
								{ name: 'class', value: 'CardImage' },
							],
							null
						),
						layoutAsError
							? null
							: new Div(
									[
										{ name: 'class', value: 'favoritesButton__container' },
										{ name: 'id', value: `favoritesButton__container-${slug}` },
									],
									[
										new Component(
											'img',
											[
												{ name: 'class', value: 'favoritesButton' },
												{ name: 'id', value: `favoritesButton-${slug}` },
											],
											''
										),
									]
							  ),
					]
				),

				layoutAsError
					? null
					: new Div(
							[{ name: 'class', value: 'title-genre__container' }],
							[
								new P(
									[{ name: 'class', value: 'CardImage__p gameCard__title' }],
									name
								),
								layoutAsError ? null : new GenreList(genres),
							]
					  ),
				layoutAsError
					? null
					: new Div(
							[{ name: 'class', value: 'gamecard__separator__container' }],
							new Div([{ name: 'class', value: 'gamecard__separator' }], '')
					  ),
				layoutAsError
					? null
					: new Div(
							[{ name: 'class', value: 'date__container' }],
							[
								new Component('img', [
									{
										name: 'src',
										value: '/images/calendar.svg',
									},
									{
										name: 'alt',
										value: 'calendar img',
									},
									{
										name: 'class',
										value: 'gameCard__date__img',
									},
								]),
								new P(
									[{ name: 'class', value: 'CardImage__p gameCard__date' }],
									toDisplayDate(released)
								),
							]
					  ),

				layoutAsError
					? null
					: new Div(
							[
								{
									name: 'class',
									value: `metacritic__container ${
										metacritic >= 50 && metacritic < 70
											? 'low__metacritic'
											: metacritic >= 70 && metacritic < 90
											? 'medium__metacritic'
											: metacritic >= 90 && metacritic <= 100
											? 'high_metacritic'
											: ''
									}`,
								},
							],
							[
								new P(
									[
										{
											name: 'class',
											value: 'CardImage__p gameCard__metacritic',
										},
									],
									metacritic
								),
							]
					  ),
				layoutAsError
					? null
					: new Component(
							'a',
							[
								{ name: 'class', value: 'arrow__container_a' },
								{ name: 'id', value: `arrow__container_a-${slug}` },
								{ name: 'href', value: `/detail-${slug}` },
							],
							[
								new Component(
									'img',
									[
										{ name: 'class', value: 'more_arrow' },
										{ name: 'src', value: '/images/arrow.svg' },
									],
									''
								),
							]
					  ),
			]
		);
		this.slugId = slug;
		this.layoutAsError = layoutAsError;
	}

	handleEvent() {
		const favButton = document.querySelector(`#favoritesButton-${this.slugId}`);
		favButton?.addEventListener('click', e => {
			e.stopPropagation();
			if (Favorites.isInFavorites(this.slugId)) {
				Favorites.removeToFavorites(this.slugId);
				favButton.setAttribute('src', '/images/heart_unfav.svg');
				return;
			} else {
				Favorites.addToFavorites(this.slugId);
				favButton.setAttribute('src', '/images/heart_fav.svg');
			}
		});
		favButton.setAttribute(
			'src',
			`/images/heart_${Favorites.isInFavorites(this.slugId) ? '' : 'un'}fav.svg`
		);
		if (!this.layoutAsError) {
			const currentButton = document.getElementById(
				`arrow__container_a-${this.slugId}`
			);
			const handleEvent = e => {
				e.preventDefault();
				Router.navigate(`/detail-${this.slugId}`, true);
			};
			currentButton?.addEventListener('click', handleEvent);
		}
	}
}
