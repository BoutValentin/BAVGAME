import { Query } from '../query';
import { Page } from './Page';
import { GameResources } from '../resources';

export class HomePage extends Page {
	static gameResources = new GameResources(new Query());
	currentRessources = [[]];
	lastPageFetch = 1;
	constructor() {
		super('HOME', 'favoritesPage');
		//add event listener on custom event (queryChange) to retrigger mount on change and clear currentRessources;
		//add event listener on custom event to have more ressources and lancant la fonction addResources puis un mount dans un .then
	}

	mount(element) {
		super.mount(element);
		console.log('hello from homePage');
		// recupere les ressources avec addRessources
		// .then(
		// pour chaque ressource dans currentResources correspondant a lastPageFetch -1
		// this.element.innerHTML += new GameCard(res);
	}

	//async function addRessources
	//utilise game resource pour obtenir plus de ressources
	//update la query en changeant page par lastPageFetch ++
	// lance la rechercher avec le game resource
	// await une rep
	// si objet erreur : <voir quoi faire>
	// sinon ajoute au tableau currentRessource[lastPageFetch];
}
