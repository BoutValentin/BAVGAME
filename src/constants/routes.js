import {
	DetailGamePage,
	FavoritesPage,
	HomePage,
	TeamPage,
	NotFoundPage,
} from '../pages';

/**
 * Tableau regroupant tout nos routes auquel peut repondre notre application.
 */
export const routes = [
	{
		page: new HomePage(),
		pathMatcher: new RegExp(/^\/$/, ''),
	},
	{
		page: new DetailGamePage(),
		pathMatcher: new RegExp(/^\/detail-([A-z0-9-])+$/, ''),
	},
	{
		page: new FavoritesPage(),
		pathMatcher: new RegExp(/^\/mes-favoris$/, ''),
	},
	{
		page: new TeamPage(),
		pathMatcher: new RegExp(/^\/lequipe.fr$/, ''),
	},
	{
		page: new NotFoundPage(),
		pathMatcher: new RegExp(/.*/),
	},
];
