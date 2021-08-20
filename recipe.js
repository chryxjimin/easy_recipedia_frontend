class Recipe {
    constructor(recipeData, recipeAttributes) {
        this.id = recipeData.id;
        this.title = recipeAttributes.title;
        this.description = recipeAttributes.description;
        this.image_url = recipeAttributes.image_url;
        this.cuisine = recipeAttributes.cuisine;
    }

    renderRecipes() {
        return `
        <div class="card" style="width: 27rem;" data-id=${this.id}>
            <div class="card-body">
                <h1 class="card-title" id="recipe-title">${this.title}</h1>
                <h3 class="card-text" id="recipe-description">${this.description}</h3><br>
                <img class="card-img-top" id="recipe-image" src=${this.image_url} height="200" width="250"></img><br></br>
                <button data-id=${this.id} type="button" class="delete-button">Delete</button>
            </div>
        </div>   
        `
    }


    renderBookmarkedRecipes() {
        return `
        <a href="http://localhost:3000/api/v1/recipes/${this.id}" id="recipe-link">${this.title}</a></br>
        `
    }
}