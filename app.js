const RecipeApp = (() => {
    const recipes = [
        {
            id: 1,
            title: "Classic Spaghetti Carbonara",
            time: 25,
            difficulty: "easy",
            description: "A creamy Italian pasta dish made with eggs, cheese, pancetta, and black pepper.",
            category: "pasta",
            ingredients: [
                "200g spaghetti",
                "2 large eggs",
                "75g pancetta",
                "50g grated parmesan",
                "Salt and black pepper"
            ],
            steps: [
                "Boil a large pot of salted water.",
                {
                    text: "Cook the spaghetti",
                    substeps: [
                        "Add spaghetti to boiling water.",
                        "Cook until al dente according to package instructions."
                    ]
                },
                {
                    text: "Prepare the sauce",
                    substeps: [
                        "Whisk eggs and parmesan in a bowl.",
                        "Cook pancetta until crisp in a pan."
                    ]
                },
                "Combine pasta with pancetta and egg mixture off the heat.",
                "Season with black pepper and serve immediately."
            ]
        },
        {
            id: 2,
            title: "Chicken Tikka Masala",
            time: 45,
            difficulty: "medium",
            description: "Tender chicken pieces in a creamy, spiced tomato sauce.",
            category: "curry",
            ingredients: [
                "500g chicken breast",
                "1 cup yogurt",
                "2 tbsp tikka masala paste",
                "1 onion, chopped",
                "1 cup tomato puree",
                "1/2 cup cream"
            ],
            steps: [
                {
                    text: "Marinate the chicken",
                    substeps: [
                        "Mix yogurt and tikka masala paste.",
                        "Coat chicken pieces and rest for at least 30 minutes."
                    ]
                },
                "Grill or pan-fry the chicken until cooked through.",
                {
                    text: "Prepare the sauce",
                    substeps: [
                        "Sauté onions until soft.",
                        "Add tomato puree and simmer.",
                        {
                            text: "Finish the sauce",
                            substeps: [
                                "Stir in cream.",
                                "Add cooked chicken pieces and simmer briefly."
                            ]
                        }
                    ]
                },
                "Serve hot with rice or naan."
            ]
        },
        {
            id: 3,
            title: "Homemade Croissants",
            time: 180,
            difficulty: "hard",
            description: "Buttery, flaky French pastries that require patience but deliver amazing results.",
            category: "baking",
            ingredients: [
                "Strong white flour",
                "Butter",
                "Milk",
                "Yeast",
                "Sugar",
                "Salt"
            ],
            steps: [
                "Make the dough and let it rise.",
                "Roll out the dough and add butter layers.",
                "Fold and chill the dough several times.",
                "Shape into croissants and proof.",
                "Bake until golden and flaky."
            ]
        },
        {
            id: 4,
            title: "Greek Salad",
            time: 15,
            difficulty: "easy",
            description: "Fresh vegetables, feta cheese, and olives tossed in olive oil and herbs.",
            category: "salad",
            ingredients: [
                "Tomatoes",
                "Cucumber",
                "Red onion",
                "Feta cheese",
                "Olives",
                "Olive oil",
                "Oregano"
            ],
            steps: [
                "Chop vegetables into bite-sized pieces.",
                "Combine vegetables, olives, and feta in a bowl.",
                "Drizzle with olive oil and sprinkle with oregano.",
                "Toss gently and serve."
            ]
        },
        {
            id: 5,
            title: "Fish Curry",
            time: 120,
            difficulty: "hard",
            description: "Tender fish pieces in a creamy, spiced tomato sauce.",
            category: "curry",
            ingredients: [
                "Firm white fish",
                "Onions",
                "Tomatoes",
                "Coconut milk",
                "Curry spices"
            ],
            steps: [
                "Marinate the fish with salt and spices.",
                "Fry onions until golden.",
                "Add tomatoes and cook until soft.",
                "Pour in coconut milk and simmer.",
                "Add fish pieces and cook gently until done."
            ]
        },
        {
            id: 6,
            title: "Vegetable Stir Fry",
            time: 20,
            difficulty: "easy",
            description: "Colorful mixed vegetables cooked quickly in a savory sauce.",
            category: "vegetarian",
            ingredients: [
                "Mixed vegetables",
                "Soy sauce",
                "Garlic",
                "Ginger",
                "Oil"
            ],
            steps: [
                "Heat oil in a wok or large pan.",
                "Add garlic and ginger and cook briefly.",
                "Add vegetables and stir-fry on high heat.",
                "Season with soy sauce and serve immediately."
            ]
        },
        {
            id: 7,
            title: "Pad Thai",
            time: 30,
            difficulty: "medium",
            description: "Thai stir-fried rice noodles with shrimp, peanuts, and tangy tamarind sauce.",
            category: "noodles",
            ingredients: [
                "Rice noodles",
                "Shrimp or tofu",
                "Eggs",
                "Bean sprouts",
                "Peanuts",
                "Tamarind sauce"
            ],
            steps: [
                "Soak rice noodles until pliable.",
                "Stir-fry protein with aromatics.",
                "Add noodles and tamarind sauce.",
                "Push noodles aside and scramble eggs.",
                "Add bean sprouts, toss, and top with peanuts."
            ]
        },
        {
            id: 8,
            title: "Margherita Pizza",
            time: 60,
            difficulty: "medium",
            description: "Classic Italian pizza with fresh mozzarella, tomatoes, and basil.",
            category: "pizza",
            ingredients: [
                "Pizza dough",
                "Tomato sauce",
                "Fresh mozzarella",
                "Fresh basil",
                "Olive oil"
            ],
            steps: [
                "Preheat oven and prepare pizza stone or tray.",
                "Stretch dough into a round.",
                "Spread tomato sauce evenly.",
                "Top with mozzarella and bake until crust is golden.",
                "Finish with fresh basil and a drizzle of olive oil."
            ]
        }
    ];

    const recipeContainer = document.querySelector("#recipe-container");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const sortButtons = document.querySelectorAll(".sort-btn");
    const searchInput = document.querySelector("#search-input");
    const showingCount = document.querySelector("#showing-count");

    let currentFilter = "all";
    let currentSort = "name";
    let searchTerm = "";
    let favorites = [];

    // LocalStorage Helper
    const loadFavorites = () => {
        const stored = localStorage.getItem("recipeJS_favorites");
        if (stored) {
            try {
                favorites = JSON.parse(stored);
            } catch (e) {
                console.error("Failed to parse favorites", e);
                favorites = [];
            }
        }
    };

    const saveFavorites = () => {
        localStorage.setItem("recipeJS_favorites", JSON.stringify(favorites));
    };

    const isFavorite = (id) => favorites.includes(id);

    const toggleFavorite = (id) => {
        if (isFavorite(id)) {
            favorites = favorites.filter((favId) => favId !== id);
        } else {
            favorites.push(id);
        }
        saveFavorites();
        updateDisplay();
    };

    const renderStepsRecursive = (steps) => {
        if (!steps || !steps.length) {
            return "";
        }

        const renderItems = (items) => {
            return items
                .map((step) => {
                    if (typeof step === "string") {
                        return `<li>${step}</li>`;
                    }

                    const inner = step.substeps && step.substeps.length ? renderItems(step.substeps) : "";
                    const nestedList = inner ? `<ol>${inner}</ol>` : "";
                    return `<li>${step.text}${nestedList}</li>`;
                })
                .join("");
        };

        const content = renderItems(steps);
        return `<ol>${content}</ol>`;
    };

    const renderIngredientsList = (ingredients) => {
        if (!ingredients || !ingredients.length) {
            return "";
        }
        const items = ingredients.map((item) => `<li>${item}</li>`).join("");
        return `<ul>${items}</ul>`;
    };

    const createRecipeCard = (recipe) => {
        const stepsHtml = renderStepsRecursive(recipe.steps);
        const ingredientsHtml = renderIngredientsList(recipe.ingredients);
        const favoriteClass = isFavorite(recipe.id) ? "active" : "";
        const favoriteIcon = isFavorite(recipe.id) ? "❤️" : "🤍";

        return `
        <div class="recipe-card" data-id="${recipe.id}">
            <div class="recipe-header">
                <h3>${recipe.title}</h3>
                <button class="btn-favorite ${favoriteClass}" title="Toggle Favorite">${favoriteIcon}</button>
            </div>
            <div class="recipe-meta">
                <span>⏱️ ${recipe.time} min</span>
                <span class="difficulty ${recipe.difficulty}">${recipe.difficulty}</span>
            </div>
            <p>${recipe.description}</p>
            <div class="recipe-actions">
                <button class="btn-steps">Show Steps</button>
                <button class="btn-ingredients">Show Ingredients</button>
            </div>
            <div class="recipe-details">
                <div class="recipe-section recipe-steps hidden">
                    <h4>Steps</h4>
                    ${stepsHtml}
                </div>
                <div class="recipe-section recipe-ingredients hidden">
                    <h4>Ingredients</h4>
                    ${ingredientsHtml}
                </div>
            </div>
        </div>
        `;
    };

    const renderRecipes = (recipesToRender) => {
        const recipeCardsHTML = recipesToRender.map(createRecipeCard).join("");
        recipeContainer.innerHTML = recipeCardsHTML;
        if (showingCount) {
            showingCount.textContent = recipesToRender.length;
        }
    };

    // Debounce Utility
    const debounce = (func, wait) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    };

    const searchRecipes = (recipesToSearch, term) => {
        if (!term) return recipesToSearch;
        const lowerTerm = term.toLowerCase();
        return recipesToSearch.filter((recipe) => {
            const inTitle = recipe.title.toLowerCase().includes(lowerTerm);
            const inIngredients = recipe.ingredients.some((ing) => ing.toLowerCase().includes(lowerTerm));
            return inTitle || inIngredients;
        });
    };

    const filterRecipes = (recipesToFilter, criteria) => {
        if (criteria === "all") {
            return recipesToFilter;
        }
        if (criteria === "favorites") {
            return recipesToFilter.filter((recipe) => isFavorite(recipe.id));
        }
        if (criteria === "quick") {
            return recipesToFilter.filter((recipe) => recipe.time < 30);
        }
        return recipesToFilter.filter((recipe) => recipe.difficulty === criteria);
    };

    const sortRecipes = (recipesToSort, criteria) => {
        const sorted = [...recipesToSort];

        if (criteria === "name") {
            return sorted.sort((a, b) => a.title.localeCompare(b.title));
        }
        if (criteria === "time") {
            return sorted.sort((a, b) => a.time - b.time);
        }

        return sorted;
    };

    const updateButtonsState = () => {
        filterButtons.forEach((btn) => {
            if (btn.dataset.filter === currentFilter) {
                btn.classList.add("active");
            } else {
                btn.classList.remove("active");
            }
        });

        sortButtons.forEach((btn) => {
            if (btn.dataset.sort === currentSort) {
                btn.classList.add("active");
            } else {
                btn.classList.remove("active");
            }
        });
    };

    const updateDisplay = () => {
        let result = filterRecipes(recipes, currentFilter);
        result = searchRecipes(result, searchTerm);
        result = sortRecipes(result, currentSort);
        renderRecipes(result);
        updateButtonsState();
    };

    const handleSearchInput = (event) => {
        searchTerm = event.target.value.trim();
        updateDisplay();
    };

    const handleFilterClick = (event) => {
        const target = event.target;
        const value = target.dataset.filter;
        if (!value) {
            return;
        }
        currentFilter = value;
        updateDisplay();
    };

    const handleSortClick = (event) => {
        const target = event.target;
        const value = target.dataset.sort;
        if (!value) {
            return;
        }
        currentSort = value;
        updateDisplay();
    };

    const handleRecipeContainerClick = (event) => {
        const target = event.target;
        const card = target.closest(".recipe-card");
        if (!card) {
            return;
        }

        // Handle Favorite Toggle
        const favBtn = target.closest(".btn-favorite");
        if (favBtn) {
            const id = parseInt(card.dataset.id);
            toggleFavorite(id);
            return;
        }

        if (target.classList.contains("btn-steps")) {
            const stepsSection = card.querySelector(".recipe-steps");
            stepsSection.classList.toggle("hidden");
            target.textContent = stepsSection.classList.contains("hidden") ? "Show Steps" : "Hide Steps";
        }

        if (target.classList.contains("btn-ingredients")) {
            const ingredientsSection = card.querySelector(".recipe-ingredients");
            ingredientsSection.classList.toggle("hidden");
            target.textContent = ingredientsSection.classList.contains("hidden") ? "Show Ingredients" : "Hide Ingredients";
        }
    };

    const bindEvents = () => {
        filterButtons.forEach((btn) => {
            btn.addEventListener("click", handleFilterClick);
        });

        sortButtons.forEach((btn) => {
            btn.addEventListener("click", handleSortClick);
        });

        recipeContainer.addEventListener("click", handleRecipeContainerClick);

        if (searchInput) {
            searchInput.addEventListener("input", debounce(handleSearchInput, 300));
        }
    };

    const init = () => {
        loadFavorites();
        bindEvents();
        updateDisplay();
    };

    return {
        init
    };
})();

RecipeApp.init();