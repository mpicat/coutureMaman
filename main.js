// PROJETS

// récupération des projets (pour utilisation future)
function getProjectsMainPage() {
  fetch('./database.json')
    .then((res) => res.json())
    .then((json) => console.log(json.project))
    .catch(err => console.log("Erreur dans la requête projets",err));
}

// affiche les projets sur la page d'accueil
function displayProjectsMainPage(projects) {
  projects.forEach(project => {
    // particularité du projet "En cours" sans id qui n'a pas de lien
    if (project.id) {
        document.querySelector("#projects").innerHTML +=
        `<a href="./projet.html?id=${project.id}" class="link-project">
            <div class="cart-project">
                <img src=${project.img} title=${project.date} alt="Image de tricot">
                <p class="cart-project__comment ${project.typeStyle}">${project.type}</p>
                <div class="cart-project__txt">
                    <h2>${project.titleProject}</h2>
                    <p>${project.subTitle}</p>
                </div>
            </div>
        </a>`
      } else {
        document.querySelector("#projects").innerHTML +=
        `<a href="#" class="link-project">
            <div class="cart-project">
                <img src=${project.img} title=${project.date} alt="Image de tricot">
                <p class="cart-project__comment ${project.typeStyle}">${project.type}</p>
                <div class="cart-project__txt">
                    <h2>${project.titleProject}</h2>
                    <p>${project.subTitle}</p>
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