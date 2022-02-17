
/*function readfromdata(){
    
    let formdata = {};
    formdata["N"]  = document.getElementById("N").value;
    formdata["Titre"] = document.getElementById("Titre").value;
    formdata["Auteur"]= document.getElementById("Auteur").value;
    formdata["Nombre-page"] = document.getElementById("Nombre-page").value;
    return formdata;
}

//const form = document.querySelector(".form");




//form.addEventListener('submit', onFormAjout());

function onFormAjout(){
    
    let formdata = readfromdata();
    inserNouveauLivre(formdata);
}

// insertion de données

function inserNouveauLivre(data){
    
    let table = document.getElementById("storeList").getElementsByTagName('tbody')[0];
    let NouveauLigne = table.insertRow(table.length);
    let cell1 = NouveauLigne.insertCell(0);
    cell1.innerHTML =data.N;
    let cell2 = NouveauLigne.insertCell(1);
    cell2.innerHTML = data.Titre;
    let cell3 = NouveauLigne.insertCell(2);
    cell3.innerHTML = data.Auteur;
    let cell4 = NouveauLigne.insertCell(3);
    cell4.innerHTML = data.Nombre-page;

}*/

const form = document.querySelector('.form ');
const Num = document.querySelector('.num input');
const Titre = document.querySelector('.tit input');
const Auteur = document.querySelector('.aut input');
const nbPage = document.querySelector('.page input');
const listItems = document.querySelector('.list-items');

form.addEventListener('submit', createItem)


let booklist = {}

function createItem (e) {
   
    e.preventDefault();
    const timestamp = Date.now();
    booklist[timestamp] ={
        N : Num.value,
        titre : Titre.value,
        auteur: Auteur.value,
        nombrePage : nbPage.value,
        checked : false
    }
    createHTML(booklist[timestamp], timestamp);
    saveObj();
    this.reset();
    
}
function createHTML(livre, key){
    if(!livre.N && !livre.titre && !livre.auteur && !livre.nbPage)   return;

    const html =` <span class="N">${livre.N}</span><span class="titre">${livre.titre}</span><span class="auteur">${livre.auteur}</span><span class="pages">${livre.nombrePage}</span>
    <button name="trash" class="trash">🗑️</button>
    <button name="update" class="update"> 🔄 </button>`
    
    const li = document.createElement('li');
    li.classList.add('item');
    li.setAttribute('data-key', key);
    li.innerHTML=html;
    listItems.insertBefore(li, listItems.firstChild);

    li.children.trash.onclick = toBin;
    li.children.update.onclick = update;
    
}
// ce que je voulais faire ici c'est d'afficher le contenu dans les inputs pour pouvoir les modifer dans les inputs et faire ajouter ensuite (j'ai pas réussi)

function update(e) {
    e.preventDefault();
    //this.parentNode.classList=Num;
    const key = this.parentNode.parentNode.getAttribute('data-key',key);
    this.innerHTML = this.innerHTML === '🔄 ' ? "✔️" : '✔️' 
    Num = booklist[key].N.value;
    Titre = booklist[key].titre.value;
    Auteur = booklist[key].auteur.value;
    nbPage = booklist[key].nombrePage.value;

    saveObj();
    

}


function loadHTML(){
    if(!window.localStorage.getItem('data')) return
    const data = JSON.parse(window.localStorage.getItem('data'));
    booklist = data;
    Object.keys(booklist).map(key => createHTML(booklist[key]));
}
window.addEventListener('load',loadHTML);

function toBin(){
    this.parentNode.remove();
    const key = this.parentNode.getAttribute('data-key');
    delete booklist[key];
    saveObj();
}


function saveObj(){
    window.localStorage.setItem('data',JSON.stringify(booklist))
}