import { Query } from '../../query';
import { GenreResource } from '../../resources/GenreResources';
import { Search, Select } from '../filter';
import { Component } from '../global';
import { Div } from '../global/Div';
import { sortResults } from '../../constants';
import { GoTop } from '../global/GoTop';

export class HomePageComponent extends Component {
	saveComponents;
	constructor(queryAttach) {
		super('div', [{ name: 'class', value: 'HomePageContainer' }], '');
		this.saveComponents = {};
		this.saveComponents['goTop'] = new GoTop();
		this.saveComponents['search-query-input'] = new Search(
			queryAttach,
			'search-query-input',
			[{ name: 'placeholder', value: 'Entrez votre recherche et taper Enter' }]
		);
		this.saveComponents['select-ordering'] = new Select(
			queryAttach,
			sortResults,
			'select-ordering',
			'ordering',
			[]
		);
		this.saveComponents['select-genres'] = new Select(
			queryAttach,
			[{ attribute: '', text: 'chargement' }],
			'select-genres',
			'genres',
			[]
		);
		this.getAllGenre().then(rep => {
			this.saveComponents['select-genres'].updateValues(
				document.querySelector('#select-genres'),
				rep
			);
		});
		const searchComponents = new Div(
			[{ name: 'class', value: 'search-container' }],
			[
				this.saveComponents['search-query-input'],
				this.saveComponents['select-ordering'],
				this.saveComponents['select-genres'],
			]
		);
		this.children = [
			this.saveComponents['goTop'],
			searchComponents,
			new Div([{ name: 'class', value: 'game-container' }], ''),
		];
	}

	initEvent() {
		Object.keys(this.saveComponents).forEach(key =>
			this.saveComponents[key]?.initOrDestroyEvent()
		);
	}

	destroyEvent() {
		Object.keys(this.saveComponents).forEach(key =>
			this.saveComponents[key]?.initOrDestroyEvent('removeEventListener')
		);
	}

	async getAllGenre(resultsArray = [], query = new Query(), page = 1) {
		const results = await new GenreResource(query).getAll();
		resultsArray = [...resultsArray, ...results.results];
		if (results.next) {
			query.addOneParameter('page', ++page, true);
			return await this.getAllGenre(resultsArray, query, page);
		}
		return resultsArray;
	}
}
