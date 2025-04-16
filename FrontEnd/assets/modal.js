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
                <figure class="fig-data" data-id="${figure.id}" data-fig="${figure.categoryId}">
                    <i class="fa-solid fa-trash-can js-trash-can" data-id="${figure.id}"></i>
                    <img src="${figure.imageUrl}" alt="${figure.title}">                        
                </figure>
            `
        }
        document.querySelector("#gallery-modal").insertAdjacentHTML("beforeend", gallery)
       
        //Supprimer l'image après le clic sur la poubelle
        let trashBtns = document.querySelectorAll(".js-trash-can")
        trashBtns.forEach((trashBtn) => {
            trashBtn.addEventListener("click", (e) => {
                fetch(`http://localhost:5678/api/works/${e.target.dataset.id}`, {
                    method: "DELETE",
                    headers: {                        
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                })
                .then(response => {
                    if(response.ok){
                        let figModals=document.querySelectorAll(".fig-data")
                        figModals.forEach((item) => {
                            if (item.dataset.id === e.target.dataset.id) {
                                item.remove()
                            }
                        })                                                       
                    }                    
                })

                .catch((error) => {
                    console.log(error)
                })
            })
        })
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
            <option value="${option.id}">${option.name}</option>
        `
    }
    document.querySelector("#category").insertAdjacentHTML("beforeend", blankOption+optionCategory)
})

//Voir le preview d'une photo chargée dans la 2e modale
const input = document.querySelector("#plus-add-photo")
const preview = document.querySelector("#preview")
const btnAddPhoto = document.querySelector("#btn-add-photo")

    //Cacher l'input
input.style.opacity = 0
input.style.position = "relative"

input.addEventListener("change", (event) => {      
    btnAddPhoto.style.display = "none"
    
    const file = event.target.files[0]
    const reader = new FileReader()

    reader.onload = function(e) {
      const img = document.createElement("img")
      img.id = "img-preview"
      img.src = e.target.result
      img.alt = "Aperçu de l’image"
      img.style.position = "absolute"
      img.style.maxWidth = "50%"
      img.style.maxHeight = "100%"
      preview.insertAdjacentElement("beforeend", img)
    }

    reader.readAsDataURL(file)
})


// soumettre le formulaire de la 2nde modale une fois rempli
const formPhoto = document.querySelector("#form-add-photo")
const imageForm = document.querySelector("#plus-add-photo")
const titleForm = document.querySelector("#title")
const categoryForm = document.querySelector("#category")
const btnValider = document.querySelector("#btn-valider")

const fieldsCheck = () => {
    const fieldsOK = imageForm.files.length > 0 && titleForm.value.trim() !== "" && categoryForm.value !== "blank"
    btnValider.style.background = fieldsOK ? "#1D6154" : "#A7A7A7"
}

formPhoto.addEventListener("input", fieldsCheck)

formPhoto.addEventListener("submit", (event) => {
    event.preventDefault()

    const image = event.target.querySelector("#plus-add-photo").files[0]
    const title = event.target.querySelector("#title").value
    const category = event.target.querySelector("#category").value

    const imgPreview = preview.querySelector("img")
    const errorMessage = document.querySelector("#error-message")
    errorMessage.style.display = "none"
    
    if (!image || !title || category === "blank") {
        errorMessage.style.display = "block"
    } 
    
    else {
        errorMessage.style.display = "none"
        btnValider.style.background = "#1D6154"
        const formData = new FormData()
        formData.append("image", image)
        formData.append("title", title)
        formData.append("category", category)        
    
        fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
             },
            body: formData
        })
            .then((response) => {
                response.json()
                .then ((data) => {
                    if(response.ok) {
                        let galleryModal = `
                            <figure class="fig-data" data-id="${data.id}" data-fig="${data.categoryId}">
                                <i class="fa-solid fa-trash-can js-trash-can" data-id="${data.id}"></i>
                                <img src="${data.imageUrl}" alt="${data.title}">                        
                            </figure>
                        `
                        let gallery = `
                            <figure class="fig-data" data-id="${data.id}" data-fig="${data.categoryId}">
                                <img src="${data.imageUrl}" alt="${data.title}">                        
                            </figure>
                        `
                    
                        document.querySelector("#gallery-modal").insertAdjacentHTML("beforeend", galleryModal)
                        document.querySelector(".gallery").insertAdjacentHTML("beforeend", gallery)

                        formPhoto.reset()
                        imgPreview.src = ""
                        imgPreview.style.display = "none"
                        btnAddPhoto.style.display = null
                        btnValider.style.background = "#A7A7A7"                        
                    }
                })
            })
    }
})

