console.log("in recipe.js")

class Recipe {
    constructor(title, description, image_url, category) {
        this.title = title;
        this.description = description;
        this.image_url = image_url;
        this.cuisine = category
    }
}