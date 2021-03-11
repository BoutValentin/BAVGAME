import { routes } from './constants';

export default class Router {
	static routes = routes;
	static sectionHTMLContent;
	static #menuNavigation;
	static currentPage;

	static set menuNavigation(element) {
		this.#menuNavigation = element;
		//set listener pour faire la navigation par le router et non par le browser
	}
	/**
	 * Realise la navigation au sein de notre application en montant les pages dans le contenant Router.sectionHTMLContent
	 * Realise aussi le changement du nom de l'onglet et effectue l'ajout d'une entre dans l'historique de navigation.
	 * @param {string} path
	 * @param {boolean} pushState
	 */
	static navigate(path, pushState = true) {
		const route = this.routes.find(route => route.pathMatcher.test(path));

		if (route) {
			if (this.currentPage) {
				this.currentPage.unmount();
			}
			route.page.mount(this.sectionHTMLContent);
			this.currentPage = route.page;
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

	/**
	 * Initiliase le router en mettant en place le contenant des pages ainsi que le menu de notre SPA.
	 * Initialise aussi les evenement de deepLinking pour l'application
	 * @param {HTMLElement} sectionContent
	 * @param {HTMLElement} menuNav
	 */
	static initRouter(sectionContent, menuNav) {
		this.sectionHTMLContent = sectionContent;
		this.menuNav = menuNav;
		document.querySelectorAll('a').forEach(node =>
			node.addEventListener('click', e => {
				e.preventDefault();
				this.navigate(e.target.getAttribute('href'));
			})
		);
		const handleBack = EPopState => {
			Router.navigate(EPopState.state.path);
		};

		window.onpopstate = handleBack;
		//TODO: A verifier si push state doit etre fait
		this.navigate(document.location.pathname);
	}
}
