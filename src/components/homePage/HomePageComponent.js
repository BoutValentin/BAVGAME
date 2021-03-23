import { GenreResource } from '../../resources/GenreResources';
import { OptionFilter, Search } from '../filter';
import { Component, P } from '../global';
import { Div } from '../global/Div';
import { sortResults } from '../../constants';
import { GoTop } from '../global/GoTop';
import { Genre } from '../genres';
import { Sort } from '../sorting';

export class HomePageComponent extends Component {
	saveComponents = {};
	constructor(queryAttach) {
		super('div', [{ name: 'class', value: 'HomePageContainer' }], '');
		this.saveComponents['goTop'] = new GoTop();
		this.saveComponents['search-query-input'] = new Search(
			queryAttach,
			'search-query-input',
			[{ name: 'placeholder', value: 'Enter your search' }]
		);

		this.saveComponents['select-genres'] = new Div(
			[{ name: 'id', value: 'select-genres' }],
			[
				new P(
					[{ name: 'class', value: 'select-genres__title' }],
					'Filter by genre'
				),
				new Div([{ name: 'id', value: 'select-genres-container' }], ''),
			]
		);

		this.saveComponents['ordering-bis'] = sortResults.map(sortResult => {
			const sort = new Sort(
				`/images/sort-${sortResult.type}.svg`,
				sortResult.text,
				`${sortResult.text.toLocaleLowerCase()}-${sortResult.type}`,
				`${sortResult.text.toLocaleLowerCase()}-${sortResult.type}`,
				[]
			);
			return new OptionFilter(
				queryAttach,
				'ordering',
				sortResult.value,
				sort.id,
				'ordering',
				sort,
				[],
				() => {
					if (
						queryAttach.isContainingParameter('ordering', sortResult.value) ||
						(sortResult.value === 'none' &&
							!queryAttach.isContainingParameter('ordering'))
					) {
						document.getElementById(sort.id).classList.add('active');
					}
				}
			);
		});

		GenreResource.getAllGenre().then(rep => {
			[{ id: 'noneFilterGenres', name: 'No Filter', slug: 'none' }]
				.concat(rep)
				.map(aRep => {
					aRep.id += '-filtering';
					const genre = new Genre(aRep);
					const optionFilter = new OptionFilter(
						queryAttach,
						'genres',
						aRep.slug,
						genre.id,
						'genres',
						genre,
						[],
						() => {
							if (
								queryAttach.isContainingParameter('genres', aRep.slug) ||
								(aRep.slug === 'none' &&
									!queryAttach.isContainingParameter('genres'))
							) {
								document
									.getElementById(optionFilter.id)
									.classList.add('active');
							}
						}
					);
					document
						.getElementById('select-genres-container')
						.insertAdjacentHTML('beforeend', optionFilter.render());
					optionFilter.initOrDestroyEvent();
				});
		});
		const searchComponents = new Div(
			[{ name: 'class', value: 'search-container' }],
			[
				new Component(
					'p',
					[{ name: 'class', value: 'search-p' }],
					'Search among our thousand available games!'
				),
				new Div(
					[{ name: 'class', value: 'search-input-container' }],
					[
						this.saveComponents['search-query-input'],
						,
						new Div(
							[
								{ name: 'class', value: 'search-input__img-container' },
								{
									name: 'id',
									value: 'search-query-input-img-container',
								},
							],
							new Component(
								'img',
								[
									{
										name: 'src',
										value: '/images/search.svg',
									},
									{
										name: 'class',
										value: 'search-input__img',
									},
								],
								null
							)
						),
					]
				),
				this.saveComponents['select-genres'],
			]
		);
		this.children = [
			this.saveComponents['goTop'],
			searchComponents,
			new Div(
				[{ name: 'class', value: 'ordering-container' }],
				[
					new Div(
						[{ name: 'class', value: 'ordering-container-filter' }],
						this.saveComponents['ordering-bis']
					),
				]
			),
			new Div([{ name: 'class', value: 'game-container' }], ''),
		];
	}

	initEvent(object = this.saveComponents) {
		Object.keys(object).forEach(key => {
			if (Array.isArray(object[key])) {
				this.initEvent(object[key]);
			} else {
				object[key]?.initOrDestroyEvent?.();
			}
		});
	}

	destroyEvent(object = this.saveComponents) {
		Object.keys(object).forEach(key => {
			if (Array.isArray(object[key])) {
				this.initEvent(object[key]);
			} else {
				object[key]?.initOrDestroyEvent?.('removeEventListener');
			}
		});
	}
}
