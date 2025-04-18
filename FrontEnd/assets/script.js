//Récupérer dynamiquement les données des travaux via l’API
const start = () => {
    fetch("http://localhost:5678/api/works")
        .then((response) => response.json())
        .then((data) => {
            let gallery = ""
            for (let figure of data) {
                gallery += `
                    <figure class="fig-data" data-id="${figure.id}" data-fig="${figure.categoryId}">
                        <img src="${figure.imageUrl}" alt="${figure.title}">
                        <figcaption>${figure.title}</figcaption>
                    </figure>
                `
            }
            document.querySelector(".gallery").insertAdjacentHTML("beforeend", gallery)
        })
        .catch((err) => {
            console.log(err)
        })
}

//Récupérer les travaux une fois le DOM chargé
window.addEventListener("load", start)


//Ajouter le tri des projets par catégorie dans la galerie :
const btnFilter = document.querySelector(".filter")

    //Récupérer dynamiquement les catégories via l'API
fetch("http://localhost:5678/api/categories")
    .then((response) => response.json())
    .then((data) => {
        let btnTous = `
            <button id="btn-tous" data-cat="0" class="btn">Tous</button>
        `
        let btnCategory = ""
        for (let button of data) {
            btnCategory += `
                <button class="btn" data-cat="${button.id}">${button.name}</button>
                `
        }
        btnFilter.insertAdjacentHTML("beforeend", btnTous + btnCategory)

        //Filtrer les catégories au clic
        let btn = document.querySelectorAll(".btn")

        btn.forEach((btnClick) => {
            btnClick.addEventListener("click", (event) => {
                let figData = document.querySelectorAll(".fig-data")
                figData.forEach((item) => {
                    // Filtre pour le bouton Tous (afficher tous les travaux)
                    if (event.target.dataset.cat == "0") {
                        item.style.display = "grid"
                    // Filtre pour les autres catégories (cacher les travaux non filtrés)
                    } else {
                        if (item.dataset.fig == event.target.dataset.cat) {
                            item.style.display = "grid"
                        } else {
                            item.style.display = "none"
                        }
                    }
                })
            })
        })
    })

    .catch((err) => {
        console.log(err)
    })


//Page d'accueil après connexion :
    //Récupérer le token
let token = sessionStorage.getItem("token")
    //Page d'accueil en mode Edition si token ok
if (token != null) {
    document.querySelector("#mode-edition").style.display = "flex"
    document.querySelector("#nav-login").textContent = "logout"
    btnFilter.style.display = "none"
    document.querySelector("#modifier").style.display = "inline-flex"
}

//Déconnexion
document.querySelector("#nav-login").addEventListener("click", (e) => {
    if (document.querySelector("#nav-login").textContent === "logout"){
        token = null
        sessionStorage.clear()
        localStorage.clear()
        e.preventDefault()
        document.querySelector("#mode-edition").style.display = "none"
        document.querySelector("#nav-login").textContent = "login"
        btnFilter.style.display = null
        document.querySelector("#modifier").style.display = "none"
    }
})