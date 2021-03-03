import { routes } from './constants';

export default class Router {
	static routes = routes;
	static sectionHTMLContent;
	static #menuNavigation;

	static set menuNavigation(element) {
		this.#menuNavigation = element;
		//set listener pour faire la navigation par le router et non par le browser
	}

	static navigate(path, pushState = true) {
		const route = this.routes.find(route => route.pathMatcher.test(path));
		if (route) {
			route.page.mount(this.sectionHTMLContent);
			// Changer le titre sur longlet par celui de la page
			document.querySelector('head title').innerText = route.page.pageTitle;
			// TODO: ajouter les liens active
		}

		if (pushState) {
			window.history.pushState(
				{ pageTitle: route.page.pageTitle, path: path },
				route.page.pageTitle,
				path
			);
		}
	}

	static initRouter(sectionContent, menuNav) {
		this.sectionHTMLContent = sectionContent;
		this.menuNav = menuNav;

		const handleBack = EPopState => {
			Router.navigate(EPopState.state.path);
		};

		window.onpopstate = handleBack;
		//TODO: A verifier si push state doit etre fait
		this.navigate(document.location.pathname);
	}
}
