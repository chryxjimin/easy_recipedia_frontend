const recipeContainer = document.querySelector("#recipe-container")

document.addEventListener('DOMContentLoaded', () => {
    getRecipe()
  
})

function getRecipe() {
    // debugger;
    fetch ("http://localhost:3000/api/v1/recipes")
        .then(resp => resp.json())
        .then(recipe => {
            // debugger;
            recipe.data.forEach(recipeData => {
                let recipeHTML = `
                <div data-id=${recipe.data[0].id}>
                <h1>${recipe.data[0].attributes.title}</h1>
                <h3>${recipe.data[0].attributes.description}</h3>
                <img src=${recipe.data[0].attributes.image_url}></img>
                </div>   
                `
                recipeContainer.innerHTML = recipeHTML
            })
        .catch(function(error) {
            alert("Error. Failed to fetch");
            console.log(error.message);
        })
    })
}





