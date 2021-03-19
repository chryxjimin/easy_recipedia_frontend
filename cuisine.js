class Cuisine {
    constructor(cuisine, cuisineAttributes) {
        // debugger;
        this.id = cuisine.id;
        this.name = cuisineAttributes.name;
    }
}


  renderCuisineDropdown() {
        return `
        <div class="cuisine-container">
            <label for="filter-cuisine">Filter by cuisine</label>
                <select id="filter-dropdown" name="filter-cuisine">
                <option value="44">Italian</option>
                <option value="45">Mexican</option>
                <option value="46">Thai</option>
                </select></br>
        </div>
            `
    }