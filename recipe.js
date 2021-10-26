class Recipe {
    constructor(recipeData, recipeAttributes) {
        this.id = recipeData.id;
        this.title = recipeAttributes.title;
        this.description = recipeAttributes.description;
        console.log(this.description, "this.description")
        this.image_url = recipeAttributes.image_url;
        this.cuisine = recipeAttributes.cuisine;
    }

    renderRecipes() {
        return `
       
        
            
                <div class="card" style="width: 27rem; text-align:center; display:inline-block;" data-id=${this.id}>
                    <div class="card-block">
                    <div class="card-body">
                        <img class="card-img-top" id="recipe-image" src=${this.image_url} height="200" width="250"></img><br></br>
                        <h1 class="card-title" id="recipe-title"><p class="fs-3 fw-bold">${this.title}</p></h1>
                        <h3 class="card-text" id="recipe-description"><p class="fs-4 fw-light">${this.description}</p></h3><br>
                        <button data-id=${this.id} class="delete-button btn btn-outline-secondary btn-lrg">Delete</button>
                    </div>
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


