# Js Project

### Demarer le server dans un mode development :

1. Version: ecrire des commandes c'est mon dada:
   ```sh
   $- npm install
   $- npm run watch
   # Dans un autre terminal
   $- npx serve -s -l 8000
   ```
2. Version: j'ai pas ton temps depeche toi:
   ```sh
   $- npm run profDev
   ```
### Demarer le server dans un mode production :

1. Version: ecrire des commandes c'est mon dada:
   ```sh
   $- npm install
   $- npm run build
   # Dans un autre terminal
   $- npx serve -s -l 8000
   ```
2. Version: j'ai pas ton temps depeche toi:
   ```sh
   $- npm run prof
   ```

### Verifications des test jest:

1. Une seule commande:
   ```sh
   $- npm run test
   ```

## Todo

Voici une liste des taches a faire afin de les effectuer:

> Note: 
> - Tout les paths des fichiers sont relatifs a la racine du projet
> - Lorsque vous creer un dossier contenant du javascript
>    - Pas d'export default dans les fichiers js juste des export classique dit 'nomme' 
>       > Exemple: export const maVarible
>       > Contre exemple: export default const maVariable
>    - Dans chaque dossier contenant du js creer un fichier ```index.js``` ce fichier permet d'importer en utilisant directement le nom du dossier. Ce fichier doit exporter tout ce qui est contenu dans le dossier. plusieurs exemple sont disponible dans le projet [ici](./src/components/global/index.js) ou encore [ici](./src/pages/index.js)  
> - Certaine tache on des chose en commun: comme la creation d'un composant CardGame commun aux favoris et a la homePage 
- [x] **General**:
   - [x] Dans la class page, ajouter une fonction unmount se desabonnant des event 
   - [x] Ajouter dans le router un attribut currentPage
      - [x] a l'appel de navigate: unMount la precedente page si elle existe
      - [x] apres l'appel du mount: update la currentPage avec celle demander
   - [x] Creation d'un dossier Game dans le dossier : ```./src/components/```
   - [x] Suppresion du dossier gameCard et de son contenu
   - [x] Creation du **header** commun a tout nos pages de nos applications dans le fichier ```./index.html``` et son css associes dans le fichier ```./css/header.css```
   - [x] Creation du **footer** commun a tout nos pages de nos applications dans le fichier ```./index.html``` et son css associes dans le fichier ```./css/footer.css```
   - [x] Mise a jour du ReadMe au fil de la Realisation des Taches
   - [x] CleanUp a la fin des console.log etc...
- [x] **La page d'acceuil**:
   - [x] Commencons par creer un composant GameCard
      - [x] Creation d'un dossier Game dans le dossier : ```./src/components/```
      - [x] Creation du fichier ```GameCard.js``` dans le dossier : ```./src/components/```
      - [x] dans ce fichier, creation d'une class GameCard heritant de ```./src/global/Component.js```. Cette class aura un constructor et des attributs definissant tout ce qui faut pour l'appel a super mais surtout demande tout les donness necessaire [voir](https://gitlab.univ-lille.fr/js/projet-2021#c1-page-daccueil-liste-des-jeux)
      - [x] Ne pas hesitez a faire des sous composants en array dans l'attribut children
      - [x] definir le css dans le fichier ```./css/main.css```
   - [x] Recuperer les 20 premieres resources
   ```js

   ```
   - [x] Ajouter le systeme de query
   - [x] handle l'ajout des ressources
   - [x] styling the HomePage
- [x] **La page Detailler d'un jeu**:
   - [x] Cette page fait reference au fichier [DetailGamePage.js](./src/pages/DetailGamePage.js)
   - [x] Pour tester cette page, rendez vous a l'adresse [http://localhost:8000/detail-cyberpunk-2077](http://localhost:8000/detail-cyberpunk-2077)
   - [x] Dans cette page detailler, dans la function ```mount``` commencer par recuperer le pathname en utilisatn par exemple 
   ```js
   const path = document.location.pathname
   ```
   - [x] A partir de ce path, retirer l'element ```/detail-``` pour ne recuperer que le nom de path, en utilisant replace par exemple
   ```js
   // On remplace /detail- par rien -\(* - *)/-
   const slug = path.replace('/detail-', '');
   ```
   - [x] On effectue une requete a l'aide de l'attribut static de class ```GameResources``` en demandant les informations pour un seul jeux en utilisant le slug;
   ```js
   DetailGamePage.gameResources.getOne(slug)
			.then(game => console.log(game));
   ```
   - [x] Dans ce ```.then```  on ajoute a l'attribut children de la page un composant que vous aurez creer par exemple:
   ```js
   .then(game => this.children = new GameDetail({...game}).render())
   ```
   - [x] Modifions cette fonction pour handle les erreurs: 
   ```js
   .then(game => {
      if (game.error) {
         Router.navigate('404');
      } else {
         this.children = new GameDetail({...game}).render()}
         this.element.innerHTML = this.render();
      }
   ```
- [x] **La page des Favoris**:
   - [x] Cette page fait reference au fichier [FavoritesPage.js](./src/pages/FavoritesPage.js)
   - [x] Pour tester cette page, rendez vous a l'adresse [http://localhost:8000/mes-favoris](http://localhost:8000/mes-favoris)
   - [x] la class ```Favorites``` est une class a utilisation static comprenant un tableau d'id de jeux. Cette class permet d'ajouter et d'enlever des jeux de nos favoris et de les stocker en localstorage.
   - [x] definisser une function ```handleFavorisListener``` en methode de la page
   ```js 
   handleFavorisListener(event) {
      if (!event.detail.add){
         // retirer l'element de la page, donc la carte du jeu du dom et donc de la page
            document.getElementById(e.detail.FavId).remove();
         }
   }
   ```
   - [x] Dans la methode ```mount``` de la page, ajouter un evenement listener sur l'evenement custom ```favoris``` qui retire du dom la carte de jeu ayant l'ide retirer
   ```js
   mount(element) {
      .
      .
      .
      windows.addEventListener('favoris', handleFavorisListener)
   ```
   - [x] Creer une fonction unMount qui se desabonne du listener
   ```js
   unMount(){
      windows.removeEventListener('favoris', handleFavorisListener)
   }
   ```
   - [x] Commencons par recupere la list des jeux en favoris dans la fonction ```mount```
   ```js
   mount(element) {
      .
      .
      .
      const favorites = Favorites.favorites;
   }
   ```
   - [x] Recuperons tout les details du jeu en effectuans une requetes avec l'attribut ```GameRessources``` de la page
   ```js
   FavoritesPage..gameResources
			.getManyById(favorites).then(allGames=>console.log(allGames))
   ``` 
   - [x] Dans le .then, parcouris chaque element 
   ```js
   .then(allGames=>{
      this.children = allGames.map((game, index)=>{
      if (game.error) return new ErroGameCard(game.error)
      return new GameCard(game);
      })
      this.element.innerHTML = this.render();
   })
   ```
   - [x] Ne pas oublier de definir le composant ErrorGameCard, affichant un message d'erreur en cas de problème
- [x] **Page l'equipe**:
   - [x] Cette page fait reference au fichier [TeamPage.js](./src/pages/TeamPage.js)
   - [x] Pour tester cette page, rendez vous a l'adresse [http://localhost:8000/lequipe.fr](http://localhost:8000/lequipe.fr)
   - [x] Dans cette page qui doit etre static nous allons nous faciliter la vie: Ecrire notre html dans un fichier, puis le fetch dans le mount.
   - [x] Commencons par recuperer le fichier ```./team.html```
      - [x] Dans la fonction mount du fichier:
         - [x] Creation d'une requete ```fetch```
         ```js
         mount(element){
            fetch('./team.html').then(rep => rep.text())
         }
         ```
         - [x] Apres le deuxieme ```then```, recuperer la reponse et la mettre dans l'attribut element de la page (qui existent dans la class ```Page``` extends par notre ```TeamPage.js```)
         ```js
         mount(element){
            fetch('./team.html').then(rep => rep.text()).then(html => this.element.innerHTML = html)
         }
         ```
         - [x] Si tout fonctionne comme (j'ai) prevu vous devrier voir sur votre page html 
         ```Celui qui fait cette tache est le plus moche d'entre nous```
   - [x] Customizer le fichier ```./team.html```
      - [x] Dans ce fichier creer tout l'arborescence HTML necessaire (avec les class, id, etc... que vous jugez necessaire).
      - [x] Creation d'un fichier CSS ```Team.css``` dans le dossier ```./css/```
      - [x] Dans le fichier ```./index.html``` importer ce fichier css
      - [x] Dans le fichier ```./css/Team.css``` definir le style de cette page
      - [x] S'applaudir pour avoir reussi cette page Team! Bravo!
- [x] **Page 404**:
   - [x] Cette page fait reference au fichier [NotFoundPage.js](./src/pages/NotFoundPage.js)
   - [x] Pour tester cette page, rendez vous a une adresse n'existant pas : [par exemple ici](http://localhost:8000/baptiste-est-pas-beau)
   - [x] Dans la function mount de ce fichier:
      - [x] Creation d'une variable contenant du HTML: 
         ```js
         mount(element) {
		      super.mount(element);
            const html = 
            `
            <!--Un exemple a modifier-->
            <div class="NotFoundContainer">
               <p>Not Found Page</p>
            </div>
            `;
         }   
         ```
      - [x] Ajout de cette variable a l'attribut ```element``` en innerHtml de la page:
         ```js
         .
         .
         .
         const html = `....`;
         this.element.innerHTML = html;
         ```
   - [x] Creation d'un fichier CSS ```NotFound.css``` dans le dossier ```./css/```
   - [x] Dans le fichier ```./index.html``` importer ce fichier css
   - [x] Dans le fichier ```./css/NotFound.css``` definir le style de cette page
   - [x] S'applaudir pour avoir reussi cette page 404! Bravo!
## Bonus: des meme de l'equipe

<img src="./images/Readme/meme2.png" alt="meme1"/>
<img src="./images/Readme/meme1.png" alt="meme1"/>
<img src="./images/Readme/meme3.png" alt="meme1"/>