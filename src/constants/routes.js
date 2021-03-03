import {
	DetailGamePage,
	FavoritesPage,
	HomePage,
	TeamPage,
	NotFoundPage,
} from '../pages';

export const routes = [
	{
		page: new HomePage(),
		pathMatcher: new RegExp(/^\/$/, 'g'),
	},
	{
		page: new DetailGamePage(),
		pathMatcher: new RegExp(/^\/detail-([A-z0-9-])+$/, 'g'),
	},
	{
		page: new FavoritesPage(),
		pathMatcher: new RegExp(/^\/mes-favoris$/, 'g'),
	},
	{
		page: new TeamPage(),
		pathMatcher: new RegExp(/^\/lequipe.fr$/, 'g'),
	},
	{
		page: new NotFoundPage(),
		pathMatcher: new RegExp(/.*/),
	},
];
