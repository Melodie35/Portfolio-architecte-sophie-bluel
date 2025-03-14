/**
 * Récupérer dynamiquement les données des travaux via l’API :
 * 1) Variable works : Récupérer les articles à rattacher via l'API
 * 2) Variable gallery : Construire l'HTML (cf index.html)
 * 3) Injecter l'HTML dans le DOM :
 *      a) pointer sur l'élément .gallery
 *      b) injecter dans le DOM
 * constante start pour récupérer les travaux lorsque le DOM est chargé
 */

// const start = () => {
    // let works = fetch("http://localhost:5678/api/works")
    // .then(response => response.json())
    // .then(data => {
    //     // console.log("dans start data :")
    //     // console.log(data)
    //     let gallery = ""
    //     for (let figure of data){
    //         gallery += `
    //             <figure>
    //                 <img src="${figure.imageUrl}" alt="${figure.title}">
    //                 <figcaption>${figure.title}</figcaption>
    //             </figure>
    //         `
    //     }
    // document.querySelector(".gallery").insertAdjacentHTML('beforeend', gallery)
    // })
    // .catch(err => {
    //     console.log(err)
    // })
// }

// window.addEventListener("load",start)


/**
 * Ajouter le tri des projets par catégorie dans la galerie :
 * 1) Variable category : Récupérer les catégories via l'API 
 * 2) Variable btnFilter : 
 *      a) Construire les boutons à injecter dans l'HTML
 *      b) créer la catégorie tous
 * 3) Injecter les boutons dans le DOM :
 *      a) pointer sur l'élément .filter
 *      b) injecter dans le DOM
 * 4) Fonction filter pour filtrer les catégories :
 *      a) au clic, sur l'un des boutons
 *      b) créer une variable avec un tableau
 *      c) filtrer sur la catégorie voulue
 *      d) mettre les données filtrées dans le tableau
 *      e) retourner le tableau
 *      f) injecter le tableau dans le DOM
 */

fetch("http://localhost:5678/api/categories")
    .then(response => response.json())
    .then(data => {
        let btnCategory = ""
        for (let button of data){
            btnCategory += `
            <button class="btn" data-cat="${button.id}">${button.name}</button>
            `
        }
        console.log("dans btnCategroy :")
        console.log(btnCategory)
        let btnFilter = document.querySelector(".filter")
        btnFilter.insertAdjacentHTML('beforeend', btnCategory)

        let btn = document.querySelectorAll(".btn")
        console.log(btn)
        btn.forEach(btnClick => {
            btnClick.addEventListener("click", (event) => {
                console.log("clic sur le bouton")
                console.log(event.target.dataset.cat)
                
            })
        
        })
 
    })
    .catch(err => {
        console.log("dans le catch")
        console.log(err)
    })   



fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(data => {
        let dataWorks = data
        console.log("dans dataWorks :")
        console.log(dataWorks)
        let gallery = ""
        for (let figure of data){
            gallery += `
                <figure class="${figure.category.id}">
                    <img src="${figure.imageUrl}" alt="${figure.title}">
                    <figcaption>${figure.title}</figcaption>
                </figure>
            `
        }
        console.log("dans gallery :")
        console.log(gallery)
        document.querySelector(".gallery").insertAdjacentHTML('beforeend', gallery)

        
    })
    .catch(err => {
        console.log("dans le catch")
        console.log(err)
    })   
       
            // btnFilter.addEventListener("click", () => {
            //     console.log("clic sur le bouton")
            // })
        
    // const filter = document.querySelector(".filter")
    // let category = fetch("http://localhost:5678/api/categories")
    //     .then(res => res.json())
    //     .then(data => {
    //         console.log(data)
    //         let btnCategory = ""
    //             for (let button of data){
    //             btnCategory += `
    //                  <button id="${button.id}">${button.name}</button>
    //             `
    //         }
    //         document.querySelector(".filter").insertAdjacentHTML('beforeend', btnCategory)
    //         document.querySelector(".filter").addEventListener("click", () => {
    //                 console.log("clic sur le bouton")
    //                 console.log(fetch("http://localhost:5678/api/works")
    //                     .then(res => res.json())
    //                     .then(data => {
    //                         console.log(data)
    //                     })
    //                 )                
    //         })
    //     })
    //     .catch(err => {
    //         console.log("dans le catch")
    //         console.log(err)
    //     })   
