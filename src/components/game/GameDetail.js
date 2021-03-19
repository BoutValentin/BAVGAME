import { Favorites } from '../../favorites/Favorites';
import { GenreList } from '../genres';
import { Component, P } from '../global';
import { Div } from '../global/Div';
import { GamePlatformList } from './GamePlatformList';
import { GameScreenshot } from './GameScreenshot';
import { GameScreenshotList } from './GameScreenshotList';

export class GameDetail extends Component {
	slugId;
	saveComponents = {};

	constructor({
		slug,
		name,
		background_image,
		metacritic,
		genres,
		description,
		platforms,
		screenshots,
	}) {
		super(
			'div',
			[
				{ name: 'id', value: slug },
				{ name: 'class', value: 'gameDetail' },
			],
			''
		);
		this.children = [
			new Div(
				[{ name: 'class', value: 'partOneDetailContainer' }],
				new Div(
					[{ name: 'id', value: 'scrollingPartOneDetailContainer' }],
					[
						new Div(
							[{ name: 'class', value: 'nameContainer' }],
							new Component('p', [{ name: 'class', value: 'name' }], name)
						),
						new Div(
							[{ name: 'class', value: 'backgroundImageContainer' }],

							[
								new GameScreenshot(
									background_image,
									'background_image',
									'background_image'
								),

								new Div(
									[{ name: 'class', value: 'metacriticContainerPosition' }],
									new Div(
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
									)
								),
							]
						),
						new Div(
							[{ name: 'class', value: 'categoryContainer' }],
							new GenreList(genres)
						),
						new Div(
							[{ name: 'class', value: 'vignettesContainer' }],
							(this.saveComponents[
								'GameScreenshotList'
							] = new GameScreenshotList(screenshots))
						),
					]
				)
			),
			new Div(
				[{ name: 'class', value: 'partTwoDetailContainer' }],

				[
					new Div(
						[{ name: 'class', value: 'mainDescriptionContainer' }],

						[
							new Div(
								[{ name: 'class', value: 'descriptionContainer' }],
								description
							),
						]
					),
					new Div(
						[{ name: 'class', value: 'plateformsAndLikeContainer' }],
						new Div(
							[{ name: 'id', value: 'scrollingPlateformsAndLikeContainer' }],
							[
								new Div(
									[{ name: 'class', value: 'plateformsContainer' }],
									new GamePlatformList(platforms)
								),
								new Div(
									[
										{
											name: 'class',
											value: 'FavoriteButtonContainerDetailPage',
										},
									],
									new Div(
										[
											{ name: 'class', value: 'favoritesButton__container' },
											{
												name: 'id',
												value: `favoritesButton__container-${slug}`,
											},
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
									)
								),
							]
						)
					),
				]
			),
		];
		this.slugId = slug;
	}

	handleScroll() {
		if (
			document.querySelector('.partOneDetailContainer').clientHeight -
				document.querySelector('#scrollingPartOneDetailContainer')
					.scrollHeight >=
			window.scrollY
		) {
			document.getElementById('scrollingPartOneDetailContainer').style.top =
				window.scrollY + 'px';
			document.getElementById('scrollingPlateformsAndLikeContainer').style.top =
				window.scrollY + 'px';
		}
	}

	initEvent(object = this.saveComponents) {
		Object.keys(object).forEach(key => {
			if (Array.isArray(object[key])) {
				this.initEvent(object[key]);
			} else {
				object[key]?.initOrDestroyEvent?.();
			}
		});
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

		window.addEventListener('scroll', this.handleScroll);
	}

	destroyEvent() {
		window.removeEventListener('scroll', this.handleScroll);
	}
}
