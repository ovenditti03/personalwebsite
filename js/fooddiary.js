const foodEntries = [
    {
        type: "restaurant",
        title: "Monteverde",
        location: "Chicago, IL",
        stars: 5,
        people: ["Emmy", "Kate"],
        cuisine: "Italian",
        mealType: "Dinner",
        drink: "Negroni",
        inspiration: "",
        ingredients: [],
        mainImage: "images/notebookhome.png",
        photos: [
            "images/notecard.png",
            "images/notecard.png",
            "images/notecard.png",
            "images/notecard.png"
        ],
        notes: "Amazing pasta, cozy atmosphere, and one of those meals that feels like a whole event."
    },
    {
        type: "meal",
        title: "Spicy Vodka Rigatoni",
        location: "",
        stars: 4,
        people: ["Emmy"],
        cuisine: "",
        mealType: "Dinner",
        drink: "",
        inspiration: "Carbone copycat recipes and TikTok",
        ingredients: ["rigatoni", "tomato paste", "vodka", "heavy cream", "garlic", "parmesan"],
        mainImage: "images/notebookhome.png",
        photos: [
            "images/notecard.png",
            "images/notecard.png",
            "images/notecard.png"
        ],
        notes: "Super creamy and good. Next time I’d add more chili flakes and a little more salt."
    }
];

function formatStars(stars) {
    const filled = "★".repeat(Math.max(0, Math.min(5, stars)));
    const empty = "☆".repeat(5 - Math.max(0, Math.min(5, stars)));
    return filled + empty;
}

function safeJoin(arr, fallback = "—") {
    return Array.isArray(arr) && arr.length ? arr.join(", ") : fallback;
}

function createCarouselMarkup(entry) {
    const photos = Array.isArray(entry.photos) ? entry.photos.slice(0, 12) : [];

    if (!photos.length) {
        return `<div class="food-carousel-empty">no extra photos</div>`;
    }

    return `
        <div class="food-carousel-strip">
            ${photos.map((photo, index) => `
                <button class="food-thumb-button" type="button" data-photo="${photo}" data-title="${entry.title}">
                    <img src="${photo}" alt="${entry.title} photo ${index + 1}">
                </button>
            `).join("")}
        </div>
    `;
}

function createRestaurantDetails(entry) {
    return `
        <p><span class="food-label">location</span><span class="food-value">${entry.location || "—"}</span></p>
        <p><span class="food-label">cuisine</span><span class="food-value">${entry.cuisine || "—"}</span></p>
        <p><span class="food-label">drink</span><span class="food-value">${entry.drink || "—"}</span></p>
    `;
}

function createMealDetails(entry) {
    return `
        <p><span class="food-label">inspiration</span><span class="food-value">${entry.inspiration || "—"}</span></p>
        <p><span class="food-label">ingredients</span><span class="food-value">${safeJoin(entry.ingredients)}</span></p>
    `;
}

function createFoodCard(entry) {
    const article = document.createElement("article");
    article.className = "food-card";

    article.innerHTML = `
        <div class="food-card-left">
            <img class="food-main-photo" src="${entry.mainImage}" alt="${entry.title}">
            ${createCarouselMarkup(entry)}
        </div>

        <div class="food-card-right">
            <div class="food-card-top">
                <div>
                    <h2>${entry.title}</h2>
                    <p class="food-entry-type">${entry.type === "restaurant" ? "restaurant" : "home meal"}</p>
                </div>
                <div class="food-stars">${formatStars(entry.stars || 0)}</div>
            </div>

            <div class="food-details-grid">
                <p><span class="food-label">with</span><span class="food-value">${safeJoin(entry.people, "solo")}</span></p>
                <p><span class="food-label">meal type</span><span class="food-value">${entry.mealType || "—"}</span></p>
                ${entry.type === "restaurant" ? createRestaurantDetails(entry) : createMealDetails(entry)}
            </div>

            <div class="food-notes-block">
                <h3>notes</h3>
                <p>${entry.notes || "—"}</p>
            </div>
        </div>
    `;

    return article;
}

document.addEventListener("DOMContentLoaded", () => {
    const list = document.getElementById("foodDiaryList");

    foodEntries.forEach(entry => {
        list.appendChild(createFoodCard(entry));
    });

    list.addEventListener("click", (event) => {
        const button = event.target.closest(".food-thumb-button");
        if (!button) return;

        const card = button.closest(".food-card");
        const mainPhoto = card.querySelector(".food-main-photo");
        const newPhoto = button.dataset.photo;
        const title = button.dataset.title;

        mainPhoto.src = newPhoto;
        mainPhoto.alt = title;
    });
});