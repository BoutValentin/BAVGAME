import Router from './Router';

window.onload = () => window.scrollTo(0, 0);

window.addEventListener('scroll', () => {
	if (window.scrollY == 0) {
		document.querySelector('header').classList.remove('scroolHeader');
		return;
	}
	document.querySelector('header').classList.add('scroolHeader');
});

// On initialise le Router en lui passant la ou le contenu des pages doit etre rendu et le menu de notre SPA.
Router.initRouter(
	document.querySelector('.pageContainer'),
	document.querySelector('header')
);

document.getElementById('hamburger-image').addEventListener('click', () => {
	const extendMenu = document.querySelector('.header-container.extends');
	if (!extendMenu) return;
	extendMenu.classList.toggle('hidden');
	extendMenu.classList.toggle('visible');
	const header = document.querySelector('header');
	if (!header.classList.contains('scroolHeader') || window.scrollY == 0)
		header.classList.toggle('scroolHeader');
});
