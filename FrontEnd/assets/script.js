/**
 * Récupérer dynamiquement les données des travaux via l’API :
 *  1) Récupérer les travaux de la gallerie en appelant l'API works avec fetch()
 *  2) Variable gallery : construire l'HTML en reprenant ce qui avait dans index.html
 *  3) Injecter l'HTML dans le DOM :
 *      a) pointer sur l'élément .gallery
 *      b) injecter dans le DOM
 * Constante start pour récupérer les travaux lorsque le DOM est chargé
 */

const start = () => {
    fetch("http://localhost:5678/api/works")
        .then((response) => response.json())
        .then((data) => {
            let gallery = ""
            for (let figure of data) {
                gallery += `
                    <figure class="fig-data" data-fig="${figure.category.id}">
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

window.addEventListener("load", start)

/**
 * Ajouter le tri des projets par catégorie dans la galerie :
 *  1) Récupérer les catégories via l'API categories avec fetch()
 *  2) Créer les boutons à injecter dans le DOM :
 *      a) construire le bouton Tous (variable btnTous)
 *      b) créer les autres catéories dynamiquement (btnCategory)
 *      c) pointer sur l'élément .filter
 *      d) injecter dans le DOM
 *  3) Pour filtrer les catégories au click :
 *      a) sur chacun des boutons, ajouter un évènement d'écoute au clic
 *      b) pointer sur les éléments à filtrer
 *      c) ajouter une structure conditionnelle :
 *          i) si la catégorie du bouton = 0 (bouton Tous), alors tous les travaux sont visibles
 *         ii) sinon, si la catégorie du bouton = la catégorie des travaux, les afficher et cacher les autres
 */

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
        let btnFilter = document.querySelector(".filter")
        btnFilter.insertAdjacentHTML("beforeend", btnTous + btnCategory)

        let btn = document.querySelectorAll(".btn")
        btn.forEach((btnClick) => {
            btnClick.addEventListener("click", (event) => {
                let figData = document.querySelectorAll(".fig-data")
                figData.forEach((item) => {
                    if (event.target.dataset.cat == "0") {
                        item.style.display = "grid"
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

