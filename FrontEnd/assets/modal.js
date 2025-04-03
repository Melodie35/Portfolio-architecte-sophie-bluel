const openModal = (e) =>  {
    e.preventDefault()
    const target = document.querySelector(e.target.getAttribute("href"))
    target.style.display = null
    target.removeAttribute("aria-hidden")
    target.setAttribute("aria-modal", "true")
    modal = target
    modal.addEventListener("click", closeModal)
    modal.querySelector(".js-xmark").addEventListener("click", closeModal)
    modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation)
}

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

const stopPropagation = (e) => {
    e.stopPropagation()
}

document.querySelectorAll(".js-modal").forEach(a =>{
    a.addEventListener("click", openModal)
})

document.querySelector("#add-a-photo").addEventListener("click", (e) => {
    e.preventDefault()    
    document.querySelector("#gallery-photo").style.display = "none"
    document.querySelector("#add-photo").style.display = null
    document.querySelector("#js-arrow-left").style.display = null    
    document.querySelector(".js-xmark").addEventListener("click", (e) => {
        document.querySelector("#gallery-photo").style.display = null
        document.querySelector("#add-photo").style.display = "none"
        document.querySelector("#js-arrow-left").style.display = "none"
    })
    const target = document.querySelector(e.target.getAttribute("href"))
    target.addEventListener("click", (e) => {
        document.querySelector("#gallery-photo").style.display = null
        document.querySelector("#add-photo").style.display = "none"
        document.querySelector("#js-arrow-left").style.display = "none"
    })
   
})


document.querySelector("#js-arrow-left").addEventListener("click", (e) => {
    e.preventDefault()
    console.log("clic sur la flèche")
    document.querySelector("#gallery-photo").style.display = null
    document.querySelector("#add-photo").style.display = "none"
    document.querySelector("#js-arrow-left").style.display = "none"
})