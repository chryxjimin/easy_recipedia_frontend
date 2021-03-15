const cuisineSelect = document.querySelector("#cuisine-dropdown")
const recipeContainer = document.querySelector("#recipe-container")

document.addEventListener('DOMContentLoaded', () => {
    getRecipes();
    const createRecipeForm = document.querySelector("#create-recipe-form")
    createRecipeForm.addEventListener("submit", (e) => createFormHandler(e))
    // cuisineSelectDropdown();
    // cuisineSelect.addEventListener("change", cuisineSelectDropdown());
})

function getRecipes() {
        getFetch()
        .then(recipe => {
            recipe.data.forEach(recipeData => {
                let recipeHTML = `
                <div data-id=${recipeData.id}>
                <h1 id="recipe-title">${recipeData.attributes.title}</h1>
                <h3 id="recipe-description">${recipeData.attributes.description}</h3>
                <img id="recipe-image" src=${recipeData.attributes.image_url}></img>
                </div>   
                `
                recipeContainer.innerHTML += recipeHTML
            })
        })
        .catch(error => {
            alert("Error. Failed to fetch");
        })
}




// function cuisineSelectDropdown() {
    // cuisineSelect.addEventListener("change", function(e) {
    //     getFetch()
    //     .then(recipe => {
    //         console.log(recipe)
    //         // debugger;
    //         // let cuisineId = recipe.data[0].attributes.cuisine_id
    //         // if (cuisineId === e.target.value) {
    //         //     recipeContainer.innerHTML = " "
    //         //     let filteredArray = [];
    //         //     recipe.data[0].forEach(function(key) {
    //         //         console.log(recipe[key]);
    //         //     })
    //         })
    //         })
    //     }
    // //  }



function getFetch() {
    return fetch("http://localhost:3000/api/v1/recipes")
            .then(resp => resp.json())
}


function createFormHandler(e) {
    e.preventDefault()
    const titleInput = document.querySelector("#recipe-title").value
    const descriptionInput = document.querySelector("#recipe-description").value
    const imageUrlInput = document.querySelector("#recipe-image-url").value
    const cuisineInput = parseInt(document.querySelector("#cuisine-dropdown").value)
    getPostFetch(titleInput, descriptionInput, imageUrlInput, cuisineInput)
}



function getPostFetch(title, description, image_url, cuisine_id) {
    const recipeBody = {title, description, image_url, cuisine_id}
    fetch("http://localhost:3000/api/v1/recipes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json", 
            "Accept": "application/json"
        },
        body: JSON.stringify(recipeBody)
    })
    .then(resp => resp.json())
    .then(recipe => {
        const recipeData = recipe.data
        let recipeHTML = `
                <div data-id=${recipeData.id}>
                <h1 id="recipe-title">${recipeData.attributes.title}</h1>
                <h3 id="recipe-description">${recipeData.attributes.description}</h3>
                <img id="recipe-image" src=${recipeData.attributes.image_url}></img>
                </div>   
                `
                recipeContainer.innerHTML += recipeHTML
    })
    
}
 

// .catch(error => {
//     alert("Error");
// })