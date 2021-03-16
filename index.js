const apiUrl = "http://localhost:3000/api/v1/recipes";
const cuisineSelect = document.querySelector("#cuisine-dropdown")
const recipeContainer = document.querySelector("#recipe-container")
const bookmarkContainer = document.querySelector("#bookmark-container")
const recipeCollection = []

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
                const newRecipe = new Recipe(recipeData, recipeData.attributes)
                recipeCollection.push(newRecipe)
                recipeContainer.innerHTML += newRecipe.renderRecipes();
            
            })
            document.querySelectorAll(".bookmark-button")
            .forEach((button) => button.addEventListener("click", displayBookmarkedRecipes));

            document.querySelectorAll(".delete-button")
            .forEach((button) => button.addEventListener("click", deleteRecipe));
        })
        .catch(error => {
            alert("Error. Failed to fetch");
        })
        
}

function deleteRecipe(e) {
    const {id} = e.target.dataset;
    fetch(`http://localhost:3000/api/v1/recipes/${id}`, {
        method: "DELETE",   
    })
    .then(res => res.json())
    .then( data => {
        e.target.parentElement.remove()
    })
}


function displayBookmarkedRecipes(e) {
    const {id} = e.target.dataset
    fetch(`http://localhost:3000/api/v1/recipes/${id}`)
    .then(res => res.json())
    .then(recipe => {
        const newRecipe = new Recipe(recipe, recipe.data.attributes)
        bookmarkContainer.innerHTML += newRecipe.renderBookmarkedRecipes();
        // debugger;
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
    return fetch(apiUrl)
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
        recipe.data.forEach(recipeData => {
            const newRecipe = new Recipe(recipeData, recipeData.attributes)
            recipeCollection.push(newRecipe)
            recipeContainer.innerHTML += newRecipe.renderRecipes();
        })
    })
    .catch(error => {
            alert("Error");
    })
}