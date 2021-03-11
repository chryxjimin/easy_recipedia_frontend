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
                <h1>${recipe.data[0].attributes.title}</h1>
                <h3>${recipe.data[0].attributes.description}</h3>
                <img src=${recipe.data[0].attributes.image_url}></img>
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
}




