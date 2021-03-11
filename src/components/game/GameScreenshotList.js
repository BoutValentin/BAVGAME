import { Component, Div } from '../global';
import { GameScreenshot } from './GameScreenshot';

export class GameScreenshotList extends Component {
	screenshots;
	firstScreenshot;

	constructor(screenshots) {
		super(
			'div',
			[{ name: 'class', value: 'gameScreenshotList' }],
			[
				screenshots.length >= 3
					? new Div(
							[
								{ name: 'id', value: 'previousScreenshotImage' },
								{ name: 'class', value: 'screenshotButton' },
							],
							'<'
					  )
					: null,
				new Div(
					[{ name: 'class', value: 'imageContainer' }],
					screenshots
						.slice(0, 3)
						.map(
							(screenshot, index) =>
								new GameScreenshot(screenshot.image, `game-screenshot-${index}`)
						)
				),
				screenshots.length >= 3
					? new Div(
							[
								{ name: 'id', value: 'nextScreenshotImage' },
								{ name: 'class', value: 'screenshotButton' },
							],
							'>'
					  )
					: null,
			]
		);

		screenshots.forEach(screenshot => (new Image().src = screenshot.image));
		this.screenshots = screenshots;
		this.firstScreenshot = 0;
		this.handleNextClick = this.handleNextClick.bind(this);
		this.handlePreviousClick = this.handlePreviousClick.bind(this);
	}

	handlePreviousClick(e) {
		e.stopPropagation();
		if (document.querySelector(`#previousScreenshotImage`)) {
			const selectedScreenshots = [0, 1, 2].map(number => ({
				a: document.querySelector(`#game-screenshot-${number}-a`),
				img: document.querySelector(`#game-screenshot-${number}-img`),
			}));
			selectedScreenshots.forEach((screenshotElement, index) => {
				screenshotElement.a.setAttribute(
					'href',
					this.screenshots[
						(((this.firstScreenshot + index - 1) % this.screenshots.length) +
							this.screenshots.length) %
							this.screenshots.length
					].image
				);
				screenshotElement.img.setAttribute(
					'src',
					this.screenshots[
						(((this.firstScreenshot + index - 1) % this.screenshots.length) +
							this.screenshots.length) %
							this.screenshots.length
					].image
				);
			});
			this.firstScreenshot =
				(((this.firstScreenshot - 1) % this.screenshots.length) +
					this.screenshots.length) %
				this.screenshots.length;
		}
	}

	handleNextClick(e) {
		e.stopPropagation();
		if (document.querySelector(`#nextScreenshotImage`)) {
			const selectedScreenshots = [0, 1, 2].map(number => ({
				a: document.querySelector(`#game-screenshot-${number}-a`),
				img: document.querySelector(`#game-screenshot-${number}-img`),
			}));
			selectedScreenshots.forEach((screenshotElement, index) => {
				screenshotElement.a.setAttribute(
					'href',
					this.screenshots[
						(((this.firstScreenshot + index + 1) % this.screenshots.length) +
							this.screenshots.length) %
							this.screenshots.length
					].image
				);
				screenshotElement.img.setAttribute(
					'src',
					this.screenshots[
						(((this.firstScreenshot + index + 1) % this.screenshots.length) +
							this.screenshots.length) %
							this.screenshots.length
					].image
				);
			});
			this.firstScreenshot =
				(((this.firstScreenshot + 1) % this.screenshots.length) +
					this.screenshots.length) %
				this.screenshots.length;
		}
	}

	initOrDestroyEvent(key = 'addEventListener') {
		document
			.querySelector(`#previousScreenshotImage`)
			?.[key]('click', this.handlePreviousClick);

		document
			.querySelector(`#nextScreenshotImage`)
			?.[key]('click', this.handleNextClick);
	}
}
