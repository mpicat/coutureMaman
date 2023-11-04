// LIENS NAVBAR

// affiche les liens dans la barre de navigation
function displayLinksMainPage(links) {
  links.forEach(link => {
      document.querySelector("#links").innerHTML +=
      `<div class=${link.class}>
        <a href=${link.link} target="_blank">
          <img src=${link.img} alt=${link.alt}>
        </a>
      </div>`
    });
}

// récupération + affichage des liens
function getAndDisplayLinksMainPage() {
  fetch('./database.json')
    .then((res) => res.json())
    .then((json) => displayLinksMainPage(json.links))
    .catch(err => console.log("Erreur dans la requête ou l'affichage des liens",err));
}

getAndDisplayLinksMainPage();


// PROJET
// récupération de l'Id du projet via l'url
const queryString = window.location.href;
const url = new URL(queryString);
const id = url.searchParams.get("id");


// récupération du projet en comparant son ID obtenu dans l'URL avec la database
function getProject() {
  fetch('./database.json')
  .then(res => res.json())
  .then(async function (resultAPI) {
      database = await resultAPI;
      if (database){
        database.projects.forEach(project => {
          if(project.id == id) {
            getPost(project);
          }
        })
      }
  })
  .catch(err => console.log("Erreur requête API", err));
}


// implantation des éléments récupérés via l'API dans la page projet
function getPost(project){

  // images alimentant le carroussel
  project.pictures.forEach(picture => {
    document.querySelector("#allSlides").innerHTML +=
    `<div class="slide">
      <img src=${picture.img} title=${picture.date} alt="Image de tricot">
    </div>`;
  });

  document.querySelector("#allSlides").innerHTML += 
  `<a class="prev" onclick="plusSlides(-1)">❮</a>
  <a class="next" onclick="plusSlides(1)">❯</a>`;

  // visualisation du carroussel
  showSlides(slideIndex);

  // liste des images miniatures
  let slideNumber = 1;
  project.pictures.forEach(picture => {
    document.querySelector("#miniPictures").innerHTML +=
    `<img class="demo cursor" src=${picture.img} onclick="currentSlide(${slideNumber})" alt="Image de tricot">`;
    slideNumber += 1;
  });

  // projet
  document.querySelector("#project").innerHTML +=
  `<div class="project-description__txt-title">
      <h1>${project.shortTitle}</h1>
      <p class="commentaire">${project.subTitle}</p>
    </div>

    <div class="project-description__txt-description">
      <p class="carac" >${project.caracteristic} <i class="fa-solid fa-calendar-days"></i> ${project.duration}</p>
      <div class="laine">
        <h2>Marque(s) de laine :</h2>
        <div id="wool"></div>
      </div>
      <div class="couleur">
          <h2>Couleur(s) :</h2>
          <div id="colors"></div>
      </div>
      <div class="prod">
          <h2>Document(s) de production :</h2>
          <div id="productionDocuments"></div>
      </div>
    </div>`;

    // marques de laine utilisées
    project.wools.forEach(wool => {
      document.querySelector("#wool").innerHTML += 
      `<p>${wool.brand} (<a href=${wool.link} target="_blank">Achat</a>)</p>`
    });

    // Couleurs
    project.colors.forEach(color => {
      document.querySelector("#colors").innerHTML += 
      `<p>${color}</p>`
    });

    // Documents de productions
    project.productionDocuments.forEach(prodDoc => {
      if (prodDoc.documentLink) {
        document.querySelector("#productionDocuments").innerHTML += 
        `<p><a href=${prodDoc.documentLink} target="_blank">${prodDoc.documentName}</a></p>`
      } else {
        document.querySelector("#productionDocuments").innerHTML += 
        `<p>${prodDoc.documentName}</p>`
      }
      
    });
}

getProject();


// CARROUSSEL
let slideIndex = 1;

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let slides = document.getElementsByClassName("slide");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  slides[slideIndex-1].style.display = "block";
}


