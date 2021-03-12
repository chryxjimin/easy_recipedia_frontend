const cuisineSelect = document.querySelector("#cuisine-dropdown")
const recipeContainer = document.querySelector("#recipe-container")

document.addEventListener('DOMContentLoaded', () => {
    getRecipes();
    // cuisineSelect.addEventListener("click", function(e) {
    //     createFormHandler(e); 
    // })
    cuisineSelectDropdown();
    cuisineSelect.addEventListener("change", cuisineSelectDropdown());
})

function getRecipes() {
        getFetch()
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




function cuisineSelectDropdown() {
    cuisineSelect.addEventListener("change", function(e) {
        // createFormHandler(e); 
        console.log(e)
    })
}

function getFetch() {
    return fetch("http://localhost:3000/api/v1/recipes")
            .then(resp => resp.json())
}

// function createFormHandler(e) {
//     e.preventDefault()
//     console.log(e)
//     // const cuisineInput = parseInt(document.querySelector("#cuisine-dropdown").value)
//     // getPostFetch(cuisineInput)
// }



// function getPostFetch(cuisine_id) {
    
//     fetch("http://localhost:3000/api/v1/recipes", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json", 
//             "Accept": "application/json"
//         },
//         body: JSON.stringify({
//            cuisine_id: cuisine_id
//         })
//     })
//     .then(resp => resp.json())
//     .then(recipe => {
//         console.log(recipe)
//     })
// }





