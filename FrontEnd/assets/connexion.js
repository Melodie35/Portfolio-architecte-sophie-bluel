


document.querySelector("#connexion").addEventListener("submit", (event) => {
    event.preventDefault()
    const login = {
        email: event.target.querySelector("#email").value,
        password: event.target.querySelector("#password").value
    }
    const chargeUtile = JSON.stringify(login)

    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: chargeUtile
    })
        .then((response) => {
            response.json()
            if (response.ok) {
                location = "index.html"
                //stocker token
            } else {
                console.log("erreur de connexion")
                //message d'erreur, <p id> à mettre en HTML
            }
            
        })
        

        .catch((err) => {
            console.log("dans le catch")
            console.log(err)
        })
        

        
    console.log(chargeUtile)
    console.log("formulaire soumis")


})