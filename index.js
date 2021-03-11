const recipeContainer = document.querySelector("#recipe-container")

document.addEventListener('DOMContentLoaded', () => {
    getRecipe()
    recipeContainer.addEventListener("click", function(e) {
        createFormHandler(e); 
    })
})

function getRecipe() {
    fetch ("http://localhost:3000/api/v1/recipes")
        .then(resp => resp.json())
        .then(recipe => {
            recipe.data.forEach(recipeData => {
                let recipeHTML = `
                <div data-id=${recipe.data[0].id}>
                <h1 id="recipe-title">${recipe.data[0].attributes.title}</h1>
                <h3 id="recipe-description">${recipe.data[0].attributes.description}</h3>
                <img id="recipe-image" src=${recipe.data[0].attributes.image_url}></img>
                </div>   
                `
                recipeContainer.innerHTML += recipeHTML
            })
        })
        .catch(error => {
            alert("Error. Failed to fetch");
        })
}

function createFormHandler(e) {
    e.preventDefault()
    const cuisineInput = parseInt(document.querySelector("#cuisines").value)
    getPostFetch(cuisineInput)
}

function getPostFetch(cuisine_id) {

    fetch("http://localhost:3000/api/v1/recipes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json", 
            "Accept": "application/json"
        },
        body: JSON.stringify({
            cuisine_id: cuisine_id
        })
    })
    .then(resp => resp.json())
    .then(recipe => {
        console.log(recipe)
    })
}





