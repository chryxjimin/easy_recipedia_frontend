const newArray = []

class Recipe {
    constructor(recipeData, recipeAttributes) {
        this.title = recipeAttributes.title;
        this.description = recipeAttributes.description;
        this.image_url = recipeAttributes.image_url;
        this.cuisine = recipeAttributes.cuisine;
    }
}


