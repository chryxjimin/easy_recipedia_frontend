document.addEventListener('DOMContentLoaded', () => {
    getRecipeData()
})

function getRecipeData() {
    // debugger;
    fetch ("http://localhost:3000/api/v1/recipes")
        .then(resp => resp.json())
        .then(data => console.log(data))
        .catch(function(error) {
            alert("Error. Failed to fetch");
            console.log(error.message);
    })
}