import { GameCard } from './GameCard';

export class ErrorGameCard extends GameCard {
	constructor({ slug }) {
		super({
			slug,
			name: "Ce jeu n'existe pas",
			background_image: '/images/pulp.gif',
		});
	}
}
