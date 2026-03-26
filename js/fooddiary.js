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
        mainImage: "../../images/notebookhome.png",
        photos: [
            "../../images/notecard.png",
            "../../images/notecard.png",
            "../../images/notecard.png",
            "../../images/notecard.png"
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
        mainImage: "../../images/notebookhome.png",
        photos: [
            "../../images/notecard.png",
            "../../images/notecard.png",
            "../../images/notecard.png"
        ],
        notes: "Super creamy and good. Next time I’d add more chili flakes and a little more salt."
    }
];

function formatStars(stars) {
    const safeStars = Math.max(0, Math.min(5, Math.round(stars || 0)));
    return "★".repeat(safeStars) + "☆".repeat(5 - safeStars);
}

function joinArray(arr, fallback = "—") {
    return Array.isArray(arr) && arr.length ? arr.join(", ") : fallback;
}

function buildPhotoThumbs(entry) {
    const photos = Array.isArray(entry.photos) ? entry.photos.slice(0, 12) : [];

    if (!photos.length) {
        return `<div class="food-post-empty">no extra photos</div>`;
    }

    return `
        <div class="food-post-thumbs">
            ${photos.map((photo, index) => `
                <button class="food-post-thumb" type="button" data-photo="${photo}" data-title="${entry.title}">
                    <img src="${photo}" alt="${entry.title} photo ${index + 1}">
                </button>
            `).join("")}
        </div>
    `;
}

function buildDetails(entry) {
    const sharedRows = `
        <div class="food-post-row">
            <span class="food-post-label">with</span>
            <span class="food-post-value">${joinArray(entry.people, "solo")}</span>
        </div>
        <div class="food-post-row">
            <span class="food-post-label">meal type</span>
            <span class="food-post-value">${entry.mealType || "—"}</span>
        </div>
    `;

    if (entry.type === "restaurant") {
        return `
            ${sharedRows}
            <div class="food-post-row">
                <span class="food-post-label">location</span>
                <span class="food-post-value">${entry.location || "—"}</span>
            </div>
            <div class="food-post-row">
                <span class="food-post-label">cuisine</span>
                <span class="food-post-value">${entry.cuisine || "—"}</span>
            </div>
            <div class="food-post-row">
                <span class="food-post-label">drink</span>
                <span class="food-post-value">${entry.drink || "—"}</span>
            </div>
        `;
    }

    return `
        ${sharedRows}
        <div class="food-post-row">
            <span class="food-post-label">inspiration</span>
            <span class="food-post-value">${entry.inspiration || "—"}</span>
        </div>
        <div class="food-post-row">
            <span class="food-post-label">ingredients</span>
            <span class="food-post-value">${joinArray(entry.ingredients)}</span>
        </div>
    `;
}

function createFoodPost(entry) {
    const article = document.createElement("article");
    article.className = "food-post";

    article.innerHTML = `
        <div class="food-post-left">
            <img class="food-post-main-image" src="${entry.mainImage}" alt="${entry.title}">
            ${buildPhotoThumbs(entry)}
        </div>

        <div class="food-post-right">
            <div class="food-post-meta-top">
                <div class="food-post-title-wrap">
                    <h2>${entry.title}</h2>
                    <p class="food-post-type">${entry.type === "restaurant" ? "restaurant entry" : "home meal entry"}</p>
                </div>
                <div class="food-post-stars">${formatStars(entry.stars)}</div>
            </div>

            <div class="food-post-details">
                ${buildDetails(entry)}
            </div>

            <div class="food-post-notes">
                <h3>notes</h3>
                <p>${entry.notes || "—"}</p>
            </div>
        </div>
    `;

    return article;
}

document.addEventListener("DOMContentLoaded", () => {
    const list = document.getElementById("foodDiaryList");
    if (!list) return;

    foodEntries.forEach(entry => {
        list.appendChild(createFoodPost(entry));
    });

    list.addEventListener("click", (event) => {
        const button = event.target.closest(".food-post-thumb");
        if (!button) return;

        const post = button.closest(".food-post");
        const mainImage = post.querySelector(".food-post-main-image");

        mainImage.src = button.dataset.photo;
        mainImage.alt = button.dataset.title;
    });
});