## Todo

Voici une liste des tâches à faire:

> Notes: 
> - Tout les paths des fichiers sont relatifs à la racine du projet
> - Lorsque vous créez un dossier contenant du javascript
>    - Pas d'export default dans les fichiers js juste des export classique dit 'nommé' 
>       > Exemple: export const maVariable
>       > Contre exemple: export default const maVariable
>    - Dans chaque dossier contenant du js créer un fichier ```index.js``` ce fichier permet d'importer en utilisant directement le nom du dossier. Ce fichier doit exporter tout ce qui est contenu dans le dossier. Plusieurs exemple sont disponibles dans le projet [ici](./src/components/global/index.js) ou encore [ici](./src/pages/index.js)  
> - Certaines tâches on des choses en commun: comme la création d'un composant CardGame commun aux favoris et à la homePage 
- [x] **General**:
   - [x] Dans la class page, ajouter une fonction unmount se désabonnant des events 
   - [x] Ajouter dans le router un attribut currentPage
      - [x] à l'appel de navigate: unMount la précèdente page si elle existe
      - [x] après l'appel du mount: update la currentPage avec celle demandée
   - [x] Création d'un dossier Game dans le dossier : ```./src/components/```
   - [x] Suppression du dossier gameCard et de son contenu
   - [x] Creation du **header** commun à toutes nos pages de nos applications dans le fichier ```./index.html``` et son css associé dans le fichier ```./css/header.css```
   - [x] Creation du **footer** commun à toutes nos pages de nos applications dans le fichier ```./index.html``` et son css associé dans le fichier ```./css/footer.css```
   - [x] Mise a jour du ReadMe au fil de la réalisation des tâches
   - [x] CleanUp a la fin des console.log etc...
- [x] **La page d'acceuil**:
   - [x] Commencons par créer un composant GameCard
      - [x] Création d'un dossier Game dans le dossier : ```./src/components/```
      - [x] Création du fichier ```GameCard.js``` dans le dossier : ```./src/components/```
      - [x] Dans ce fichier, création d'une class GameCard heritant de ```./src/global/Component.js```. Cette classe aura un constructor et des attributs definissant tout ce qu'il faut pour l'appel à super mais surtout demande tout les données nécessaire [voir](https://gitlab.univ-lille.fr/js/projet-2021#c1-page-daccueil-liste-des-jeux)
      - [x] Ne pas hésiter à faire des sous-composants en array dans l'attribut children
      - [x] Définir le css dans le fichier ```./css/main.css```
   - [x] Récuperer les 20 premieres ressources
   ```js

   ```
   - [x] Ajouter le système de query
   - [x] Handle l'ajout des ressources
   - [x] Styling de la HomePage
- [x] **La page détaillée d'un jeu**:
   - [x] Cette page fait référence au fichier [DetailGamePage.js](./src/pages/DetailGamePage.js)
   - [x] Pour tester cette page, rendez vous à l'adresse [http://localhost:8000/detail-cyberpunk-2077](http://localhost:8000/detail-cyberpunk-2077)
   - [x] Dans cette page detailler, dans la function ```mount``` commencez par recuperer le pathname en utilisant par exemple 
   ```js
   const path = document.location.pathname
   ```
   - [x] A partir de ce path, retirer l'element ```/detail-``` pour ne recuperer que le nom de path, en utilisant replace par exemple
   ```js
   // On remplace /detail- par rien -\(* - *)/-
   const slug = path.replace('/detail-', '');
   ```
   - [x] On effectue une requete à l'aide de l'attribut static de class ```GameResources``` en demandant les informations pour un seul jeu en utilisant le slug;
   ```js
   DetailGamePage.gameResources.getOne(slug)
			.then(game => console.log(game));
   ```
   - [x] Dans ce ```.then```  on ajoute à l'attribut children de la page un composant que vous aurez creer par exemple:
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
   - [x] Cette page fait référence au fichier [FavoritesPage.js](./src/pages/FavoritesPage.js)
   - [x] Pour tester cette page, rendez vous à l'adresse [http://localhost:8000/mes-favoris](http://localhost:8000/mes-favoris)
   - [x] La class ```Favorites``` est une classe à utilisation static comprenant un tableau d'id de jeux. Cette class permet d'ajouter et d'enlever des jeux de nos favoris et de les stocker en localstorage.
   - [x] Définir une function ```handleFavorisListener``` en methode de la page
   ```js 
   handleFavorisListener(event) {
      if (!event.detail.add){
         // retirer l'element de la page, donc la carte du jeu du dom et donc de la page
            document.getElementById(e.detail.FavId).remove();
         }
   }
   ```
   - [x] Dans la methode ```mount``` de la page, ajoutez un evenement listener sur l'événement custom ```favoris``` qui retire du dom la carte de jeu ayant l'ID retirer
   ```js
   mount(element) {
      .
      .
      .
      windows.addEventListener('favoris', handleFavorisListener)
   ```
   - [x] Créez une fonction unMount qui se désabonne du listener
   ```js
   unMount(){
      windows.removeEventListener('favoris', handleFavorisListener)
   }
   ```
   - [x] Commencons par recuperer la liste des jeux en favoris dans la fonction ```mount```
   ```js
   mount(element) {
      .
      .
      .
      const favorites = Favorites.favorites;
   }
   ```
   - [x] Récuperons tout les details du jeu en effectuant une requete avec l'attribut ```GameRessources``` de la page
   ```js
   FavoritesPage..gameResources
			.getManyById(favorites).then(allGames=>console.log(allGames))
   ``` 
   - [x] Dans le .then, parcourir chaque element 
   ```js
   .then(allGames=>{
      this.children = allGames.map((game, index)=>{
      if (game.error) return new ErroGameCard(game.error)
      return new GameCard(game);
      })
      this.element.innerHTML = this.render();
   })
   ```
   - [x] Ne pas oublier de définir le composant ErrorGameCard, affichant un message d'erreur en cas de problème
- [x] **Page l'équipe**:
   - [x] Cette page fait référence au fichier [TeamPage.js](./src/pages/TeamPage.js)
   - [x] Pour tester cette page, rendez vous a l'adresse [http://localhost:8000/lequipe.fr](http://localhost:8000/lequipe.fr)
   - [x] Dans cette page qui doit être static nous allons nous faciliter la vie: Ecrire notre html dans un fichier, puis le fetch dans le mount.
   - [x] Commencons par récuperer le fichier ```./team.html```
      - [x] Dans la fonction mount du fichier:
         - [x] Création d'une requete ```fetch```
         ```js
         mount(element){
            fetch('./team.html').then(rep => rep.text())
         }
         ```
         - [x] Après le deuxieme ```then```, récuperer la reponse et la mettre dans l'attribut element de la page (qui existe dans la class ```Page``` extends par notre ```TeamPage.js```)
         ```js
         mount(element){
            fetch('./team.html').then(rep => rep.text()).then(html => this.element.innerHTML = html)
         }
         ```
         - [x] Si tout fonctionne comme (j'ai) prevu vous devriez voir sur votre page html 
         ```Celui qui fait cette tache est le plus moche d'entre nous```
   - [x] Customizer le fichier ```./team.html```
      - [x] Dans ce fichier créez toute l'arborescence HTML nécessaire (avec les class, id, etc... que vous jugez necessaire).
      - [x] Creation d'un fichier CSS ```Team.css``` dans le dossier ```./css/```
      - [x] Dans le fichier ```./index.html``` importer ce fichier css
      - [x] Dans le fichier ```./css/Team.css``` définir le style de cette page
      - [x] S'applaudir pour avoir reussi cette page Team! Bravo!
- [x] **Page 404**:
   - [x] Cette page fait réfèrence au fichier [NotFoundPage.js](./src/pages/NotFoundPage.js)
   - [x] Pour tester cette page, rendez vous à une adresse n'existant pas : [par exemple ici](http://localhost:8000/baptiste-est-pas-beau)
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
      - [x] Ajout de cette variable à l'attribut ```element``` en innerHtml de la page:
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