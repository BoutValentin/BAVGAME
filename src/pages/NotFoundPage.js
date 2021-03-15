import Router from '../Router';
import { Page } from './Page';

export class NotFoundPage extends Page {
	constructor() {
		super('NOT FOUND', 'notFoundPage');
	}

	mount(element) {
		super.mount(element);
		this.element.innerHTML = `<h1>Page not found</h1><div class="NotFoundContainer">
		<img class="returnToHomePage" src="/images/OhNoPart1.png" alt="Oh no">
		<p>Oups, you lost your way ! Click on any of the image to go back to the homepage</p>
		<img class="returnToHomePage" src="/images/OhNoPart2.png" alt="Anyway">
		</div>`;
		document
			.querySelectorAll('.returnToHomePage')
			.forEach(img => img.addEventListener('click', this.handleClickImage));
	}

	handleClickImage(event) {
		event.preventDefault();
		Router.navigate('/');
	}
}
