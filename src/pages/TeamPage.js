import { Page } from './Page';

export class TeamPage extends Page {
	cacheHtml;
	audio;

	constructor() {
		super('TEAM', 'teamPage');
	}

	mount(element) {
		super.mount(element);
		if (!this.cacheHtml) {
			this.element.innerHTML = '<h1>Loading...</h1>';
			fetch('/team.html')
				.then(rep => rep.text())
				.then(html => {
					this.element.innerHTML = html;
					this.cacheHtml = html;
					this.initEvent();
				});
		} else {
			this.element.innerHTML = this.cacheHtml;
			this.initEvent();
		}

		if (!this.audio) this.audio = new Audio('/resources/DA-SONG.mp3');
	}
	unmount() {
		this.audio.pause();
	}

	initEvent() {
		const wannaSeeDaBoyzzz = document.querySelector('#wannaSeeDaBoyzzz');

		wannaSeeDaBoyzzz.addEventListener('click', () => {
			wannaSeeDaBoyzzz.classList.toggle('hidden');
			document.querySelector('.team-container')?.classList.toggle('hidden');
			document.querySelector('.theOnlyTruth')?.classList.toggle('hidden');
		});
		document.querySelectorAll('.lesBossContainer').forEach(element => {
			element.addEventListener(
				'mouseover',
				() => this.audio.paused && this.audio.play()
			);
		});
		document
			.querySelectorAll('.lesBossContainer')
			.forEach(element =>
				element.addEventListener(
					'mouseleave',
					() => !this.audio.paused && this.audio.pause()
				)
			);
	}
}
