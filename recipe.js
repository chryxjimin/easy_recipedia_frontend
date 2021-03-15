class Recipe {
    constructor(recipeData, recipeAttributes) {
        this.title = recipeAttributes.title;
        this.description = recipeAttributes.description;
        this.image_url = recipeAttributes.image_url;
        this.cuisine = recipeAttributes.cuisine;
    }

    renderRecipes() {
        return `
        <div data-id=${this.id}>
        <h1 id="recipe-title">${this.title}</h1>
        <h3 id="recipe-description">${this.description}</h3>
        <img id="recipe-image" src=${this.image_url} height="200" width="250"></img>
        </div>   
        `
    }
}


