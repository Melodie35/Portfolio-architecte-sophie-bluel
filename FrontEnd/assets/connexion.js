// soumettre le formulaire et éviter le rechargement de la page par défaut
document.querySelector("#connexion").addEventListener("submit", (event) => {
    event.preventDefault()
    //Récupérer les valeurs du formulaire et les convertir en chaîne de caractères
    const login = {
        email: event.target.querySelector("#email").value,
        password: event.target.querySelector("#password").value
    }
    const credentials = JSON.stringify(login)

    // Appeler l'API de connexion avec les informations nécessaires
    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: credentials
    })
        // Récupérer la réponse de l'API en format JSON
        .then((response) => {
            response.json()
            //Récupérer les données de l'API
            .then ((data) => {
                // si la réponse est OK (identifiants corrects)
                if (response.ok) {
                    // stocker le token
                    sessionStorage.setItem("token", data.token)
                    // revenir à la page d'accueil
                    location = "index.html"                    
                // sinon, afficher le message d'erreur
                } else {
                    document.querySelector("#error-message").style.display = "block"                    
                }
            })
        })
    
        .catch((err) => {
            console.log(err)
        })

})

        

        
        

        
 