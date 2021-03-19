const apiUrl = "http://localhost:3000/api/v1/recipes";
const cuisineSelect = document.querySelector("#filter-dropdown")
const recipeContainer = document.querySelector(".recipe-container")
const bookmarkContainer = document.querySelector(".bookmark-container")
const recipeCollection = []
const recipeLink = document.getElementsByTagName("A")

document.addEventListener('DOMContentLoaded', () => {
    getRecipes();
    const createRecipeForm = document.querySelector("#create-recipe-form")
    createRecipeForm.addEventListener("submit", (e) => createFormHandler(e))
    populateDropdown();
    cuisineSelectDropdown();
    cuisineSelect.addEventListener("change", cuisineSelectDropdown());
    // displayBookmarkedRecipes();
    // getRecipeBookmarkDetails();
    // recipeLink.addEventListener("click", getRecipeBookmark());
})

function populateDropdown() {
    fetch("http://localhost:3000/api/v1/cuisines")
    .then(res => res.json())
    .then(cuisines => {
        //renderCuisineDropdown() to the file and call that class method inside cuisines.data.forEach
        //create a div class for the select form
        //create an array for cuisine constructor
        
        cuisines.data.forEach(cuisine => {
            console.log(cuisine.attributes)
            debugger;
            const newCuisine = new Cuisine(cuisine, cuisine.attributes)
        })
    })
}

function getRecipes() {
        getFetch()
        .then(recipe => {
            recipe.data.forEach(recipeData => {
                const newRecipe = new Recipe(recipeData, recipeData.attributes)
                recipeCollection.push(newRecipe)
                recipeContainer.innerHTML += newRecipe.renderRecipes();
            
            })
            // document.querySelectorAll(".bookmark-button")
            // .forEach((button) => button.addEventListener("click", displayBookmarkedRecipes));

            document.querySelectorAll(".delete-button")
            .forEach((button) => button.addEventListener("click", deleteRecipe));
        })
        .catch(error => {
            alert("Error. Failed to fetch recipes");
        })
        
}

function deleteRecipe(e) {
    // console.log(+e.target.dataset)
    const {id} = e.target.dataset
    fetch(`http://localhost:3000/api/v1/recipes/${parseInt(id)}`, {
        method: "DELETE",   
    })
    .then(res => res.json())
    .then( data => {
        e.target.parentElement.remove()
    })
}


// function displayBookmarkedRecipes(e) {
    
//     const {id} = e.target.dataset
//     console.log(e.target.dataset)
//     // debugger;
//     fetch(`http://localhost:3000/api/v1/recipes/${parseInt(id)}`)
//     .then(res => res.json())
//     .then(recipe => {
//         const newRecipe = new Recipe(recipe, recipe.data.attributes)
//         bookmarkContainer.innerHTML += newRecipe.renderBookmarkedRecipes();
        
//         })
// }


// function getRecipeBookmarkDetails() {
//     recipeLink.addEventListener("click", function(e) {
//         console.log(e)
//     })
// }


function cuisineSelectDropdown() {
    cuisineSelect.addEventListener("change", function(e) {
        getFetch()
        .then(recipe => {

            let filteredArray = []
            let recipeArray = recipe.data
            // let cuisineId = recipe.data[0].attributes.cuisine_id
           
            filteredArray = recipeArray.filter(recipe => {
                console.log(recipe)
                console.log(e.target.value)
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
            const newRecipe = new Recipe(recipe.data, recipe.data.attributes)
            recipeCollection.push(newRecipe)
            recipeContainer.innerHTML += newRecipe.renderRecipes();
        })
    .catch(error => {
            alert("Error");
    })
   
}