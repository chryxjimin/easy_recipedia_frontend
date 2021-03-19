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
        <div class="flex-container" data-id=${this.id}>
            <h1 id="recipe-title">${this.title}</h1>
            <h3 id="recipe-description">${this.description}</h3>
            <img id="recipe-image" src=${this.image_url} height="200" width="250"></img></br>
            <button data-id=${this.id} type="button" class="bookmark-button">Bookmark</button>
            <button data-id=${this.id} type="button" class="delete-button">Delete</button>
        </div>   
        `
    }

    renderCuisineDropdown() {
        return `
        <label for="filter-cuisine">Filter by cuisine</label>
            <select id="filter-dropdown" name="filter-cuisine">
            <option value="44">Italian</option>
            <option value="45">Mexican</option>
            <option value="46">Thai</option>
            </select></br>
            `
    }

    renderBookmarkedRecipes() {
        return `
        <a href="http://localhost:3000/api/v1/recipes/${this.id}" id="recipe-link">${this.title}</a></br>
        `
    }
}