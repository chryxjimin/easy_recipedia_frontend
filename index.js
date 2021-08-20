const apiUrl = "http://localhost:3000/api/v1/recipes";
const cuisineFilter = document.querySelector("#filter-dropdown")
const cuisineSelect = document.querySelector("#cuisine-dropdown")
const bookmarkContainer = document.querySelector(".bookmark-container")
const recipeContainer = document.querySelector(".recipe-container")
let recipeCollection = []
const cuisineContainer = document.querySelector(".filter-container")
const formError = []
const searchBar = document.querySelector("#search-input")

document.addEventListener('DOMContentLoaded', () => {
    getRecipes();
    const createRecipeForm = document.querySelector("#create-recipe-form")
    createRecipeForm.addEventListener("submit", (e) => createFormHandler(e))
    populateDropdown();
    cuisineSelectDropdown();
    cuisineSelect.addEventListener("change", cuisineSelectDropdown());
    searchBar.addEventListener("search", searchRecipe);
})


function populateDropdown() {
    let cuisineCollection = []
    fetch("http://localhost:3000/api/v1/cuisines")
    .then(res => res.json())
    .then(cuisines => {
        
        cuisines.data.forEach(cuisine => {
            let newCuisine = new Cuisine(cuisine, cuisine.attributes);
            cuisineCollection.push(newCuisine)
            cuisineFilter.innerHTML = ""
            cuisineSelect.innerHTML = ""
            cuisineCollection.forEach(cuisine => {   
                let cuisineInput = 
                `
                    <option value="${cuisine.id}">${cuisine.name}</option>
                `
                cuisineFilter.innerHTML += cuisineInput
                cuisineSelect.innerHTML += cuisineInput
            })
            
        })
    })   
}



// function searchRecipe(e) {
//     let queryInput = e.target.value
//     console.log(queryInput)
//     if (queryInput != "") {
//         recipeCollection.forEach(recipe => {
//             // console.log(recipe.title.includes(queryInput))
//             // console.log(recipe)
//             // console.log(recipe.title)
//             // console.log(recipe.title.toLowerCase())
//             if (recipe.title.toLowerCase().includes(queryInput.toLowerCase())) {
//                 searchedRecipe = []
//                 // console.log(recipe, "RECIPE")
//                 searchedRecipe = recipeCollection.find(recipe => recipe.title)
//                 {console.log(searchedRecipe)}
//                 recipeContainer.innerHTML = ""
//                 recipeContainer.innerHTML += searchedRecipe.renderRecipes()
//             }
//         })
//     }
// }

function searchRecipe(e) {
    // console.log(e)
    let queryInput = e.target.value
    if (queryInput != "") {
        recipeCollection.forEach(recipe => {
                searchedRecipe = []
                searchedRecipe = recipeCollection.find(recipe => recipe.title === queryInput)
                recipeContainer.innerHTML = ""
                recipeContainer.innerHTML += searchedRecipe.renderRecipes()
        })
    }
}





function getRecipes() {
        getFetch()
        .then(recipe => {
            recipe.data.forEach(recipeData => {
                const newRecipe = new Recipe(recipeData, recipeData.attributes)
                recipeCollection.push(newRecipe)
                recipeContainer.innerHTML += newRecipe.renderRecipes();
            
            })
            document.querySelectorAll(".delete-button")
            .forEach((button) => button.addEventListener("click", deleteRecipe));
        })
        .catch(error => {
            alert("Error. Failed to fetch recipes");
        })
        
}

function deleteRecipe(e) {
    const {id} = e.target.dataset
    fetch(`http://localhost:3000/api/v1/recipes/${parseInt(id)}`, {
        method: "DELETE",   
    })
    .then(res => res.json())
    .then( data => {
        e.target.parentElement.remove()
    })
}





function cuisineSelectDropdown() {
    cuisineFilter.addEventListener("change", e => {
        console.log(this)
        getFetch()
        .then(recipe => {

            let filteredArray = []
            const recipeArray = recipe.data
           
            filteredArray = recipeArray.filter(recipe => {
                return recipe.attributes.cuisine_id === +e.target.value
            })
        
            recipeContainer.innerHTML = " "
            filteredArray.forEach(recipeData => {
            const newRecipe = new Recipe(recipeData, recipeData.attributes)
            recipeContainer.innerHTML += newRecipe.renderRecipes();
            }) 
        })
    })
}



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
    e.target.reset();
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
        if (recipe.messages) {
            renderErrors(recipe.messages)
        }
        else {
            const newRecipe = new Recipe(recipe.data, recipe.data.attributes)
            recipeCollection.push(newRecipe)
            recipeContainer.innerHTML += newRecipe.renderRecipes();
            document.querySelectorAll(`[data-id='${newRecipe.id}']`)[1].addEventListener("click", deleteRecipe)
        }
    })
    .catch(error => {
            alert("Error");
    })
   
}

const renderErrors = function(errors) {
    errors.forEach(error => {
        formError.innerHTML += `<li>${error}</li>`
    })
}