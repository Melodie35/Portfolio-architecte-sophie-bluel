/**
 * Récupérer dynamiquement les données des travaux via l’API :
 * 1) Varaible works : Récupérer les articles à rattacher via l'API
 * 2) Variable gallery : Construire l'HTML (cf index.html)
 * 3) Injecter l'HTML dans le DOM :
 *      a) pointer sur l'élément .gallery
 *      b) injecter dans le DOM
 */

let works = fetch("http://localhost:5678/api/works")
    .then(res => res.json())
    .then(data => {
        let gallery = ""
        for (let figure of data){
            gallery += `
                <figure>
                    <img src="${figure.imageUrl}" alt="${figure.title}">
                    <figcaption>${figure.title}</figcaption>
                </figure>
            `
        }
    document.querySelector(".gallery").insertAdjacentHTML('beforeend', gallery)
    })
    .catch(err => {
        console.log(err)
    })


