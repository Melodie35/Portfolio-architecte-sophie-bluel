//Fonction pour ouvrir la 1ère modale
document.querySelector("#modifier").addEventListener("click", (e) => {
    e.preventDefault()
    const target = document.querySelector(e.target.getAttribute("href"))
    target.style.display = null
    target.removeAttribute("aria-hidden")
    target.setAttribute("aria-modal", "true")
    //Gérer les options de fermeture de la modale
    modal = target
    modal.addEventListener("click", closeModal)
    modal.querySelector(".js-xmark").addEventListener("click", closeModal)
    modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation)
})
    

//Fonction pour fermer la modale
const closeModal = (e) => {
    if (modal === null) return
    e.preventDefault()
    modal.style.display = "none"
    modal.setAttribute("aria-hidden", "true")
    modal.removeAttribute("aria-modal")
    modal.removeEventListener("click", closeModal)
    modal.querySelector(".js-xmark").removeEventListener("click", closeModal)
    modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation)
    modal = null
}

//Fonction pour éviter de fermer la modale lorsqu'on clique dedans
const stopPropagation = (e) => {
    e.stopPropagation()
}

 //Charger la gallerie dans 1ère modale
 fetch("http://localhost:5678/api/works")
 .then((response) => response.json())
 .then((data) => {
     let gallery = ""
     for (let figure of data) {
         gallery += `
             <figure class="fig-modal" data-fig="${figure.category.id}">
                 <i class="fa-solid fa-trash-can"></i>
                 <img src="${figure.imageUrl}" alt="${figure.title}">                        
             </figure>
         `
     }
     document.querySelector("#gallery-modal").insertAdjacentHTML("beforeend", gallery)
 })
 .catch((err) => {
     console.log(err)
 })

//Passer à la 2nde modale après avoir cliqué sur Ajouter une photo
document.querySelector("#add-a-photo").addEventListener("click", (e) => {
    e.preventDefault()    
    document.querySelector("#gallery-photo").style.display = "none"
    document.querySelector("#add-photo").style.display = null
    document.querySelector("#js-arrow-left").style.color = "black"
    //Gérer la fermeture de la 2nde modale
    document.querySelector("#modal-gallery").addEventListener("click", (e) => {
        document.querySelector("#gallery-photo").style.display = null
        document.querySelector("#add-photo").style.display = "none"
        document.querySelector("#js-arrow-left").style.color = "white"
    })
    document.querySelector(".js-xmark").addEventListener("click", (e) => {
        document.querySelector("#gallery-photo").style.display = null
        document.querySelector("#add-photo").style.display = "none"
        document.querySelector("#js-arrow-left").style.color = "white"
    })    
})

//Passer à la 1ère modale lorsqu'on clique sur la flèche gauche
document.querySelector("#js-arrow-left").addEventListener("click", (e) => {
    e.preventDefault()
    document.querySelector("#gallery-photo").style.display = null
    document.querySelector("#add-photo").style.display = "none"
    document.querySelector("#js-arrow-left").style.color = "white"
})


//Charger les catégories dans la 2nde modale
fetch("http://localhost:5678/api/categories")
.then((response) => response.json())
.then((data) => {
    const blankOption = `
        <option value="blank"></option>
    `
    let optionCategory = ""
    for (let option of data) {
        optionCategory += `
            <option value="${option.name}">${option.name}</option>
        `
    }
    document.querySelector("#category").insertAdjacentHTML("beforeend", blankOption+optionCategory)
})