// PROJETS

// récupération des projets (pour utilisation future)
function getProjectsMainPage() {
  fetch('./database.json')
    .then((res) => res.json())
    .then((json) => console.log(json.project))
    .catch(err => console.log("Erreur dans la requête projets",err));
}

// Récupère la date de la photo dans son nom
function getDatePic(picName) {
  if (picName != null) {
    let picNameWithoutSlash = picName.split('/');
    let datePartofPicName = picNameWithoutSlash.length > 1?picNameWithoutSlash[2]:picName;

    if (datePartofPicName) {
      let year = datePartofPicName.substring(0,4);
      let month = datePartofPicName.substring(4,6);
      let day = datePartofPicName.substring(6,8);
      let date = day + "-" + month + "-" + year;
      return date;
    } else {
      return "";
    }
  } else {
    return "";
  }
}

// affiche les projets sur la page d'accueil
function displayProjectsMainPage(projects) {
  projects.forEach(project => {

    // cas du projet En cours qui n'a pas d'Id
    if (project.id) {
      document.querySelector("#projects").innerHTML +=
      `<a href="./projet.html?id=${project.id}" class="link-project">
          <div class="cart-project">
              <img src=${project.mainPic} title=${getDatePic(project.mainPic)} alt="Image de tricot">
              <p class="cart-project__comment ${project.type}">${project.type}</p>
              <div class="cart-project__txt">
                  <h2>Projet n°${project.id} : ${project.title}</h2>
                  <p>${project.comment}</p>
              </div>
          </div>
      </a>`
    } else {
      document.querySelector("#projects").innerHTML +=
      `<a href="#" class="link-project">
          <div class="cart-project">
              <img src=${project.mainPic} title=${getDatePic(project.mainPic)} alt="Image de tricot">
              <p class="cart-project__comment ${project.typeStyle}">${project.type}</p>
              <div class="cart-project__txt">
                  <h2>Projet n°# : ${project.title}</h2>
                  <p>${project.comment}</p>
              </div>
          </div>
      </a>`
    }
    
    });
}

// récupération + affichage des projets
function getAndDisplayProjectsMainPage() {
  fetch('./database.json')
    .then((res) => res.json())
    .then((json) => displayProjectsMainPage(json.projects))
    .catch(err => console.log("Erreur dans la requête ou l'affichage projets",err));
}


// LIENS PAGE D'ACCUEIL

// affiche les liens sur la page d'accueil
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
    .then((response) => response.json())
    .then((json) => displayLinksMainPage(json.links))
    .catch(err => console.log("Erreur dans la requête ou l'affichae des liens",err));
}


getAndDisplayProjectsMainPage();
getAndDisplayLinksMainPage();