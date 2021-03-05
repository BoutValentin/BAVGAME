import Router from './Router';

// On initialise le Router en lui passant la ou le contenu des pages doit etre rendu et le menu de notre SPA.
Router.initRouter(
	document.querySelector('.pageContainer'),
	document.querySelector('.mainMenu')
);
