// Headers Navigation -->
let header = document.querySelector(".header");
let humberger = document.querySelector(".humberger");

humberger.addEventListener("click", () => {
    header.classList.toggle("active");
})

window.addEventListener("scroll", () => {
    header.classList.remove("active");
})

// Counter Section -->
const counts = document.querySelectorAll(".count");
const speed = 95;

counts.forEach((counter) => {
    function upData() {
        const target = Number(counter.getAttribute('data-target'));
        const count = Number(counter.innerText.replace('+', ''));
        const inc = (target - count) / speed; // 3.1 

        if (count !== target) {
            counter.innerText = `${Math.ceil(count + inc)}+`;
            setTimeout(upData, 8);
        } else {
            counter.innerText = `${target}+`;
        }
    }
    upData();
});

// circle script -->
let txtCircle = document.querySelector(".whyTxtC p");
txtCircle.innerHTML = txtCircle.innerText.split('').map(
    (char, i) => 
        `<span style="transform: rotate(${i * 7.6}deg)">${char}</span>`
).join('')

// catagorery script -->
let currentItemIndex = 0;
const itemsPerPage = 8;
let visibleItems = [];
let allItems = [];

// Main function to filter and display items
function filterItems(category, clickedButton) {
    allItems = Array.from(document.querySelectorAll('.item'));
    currentItemIndex = 0;

    // Hide all items initially
    allItems.forEach(item => {
        item.style.display = 'none';
        item.classList.remove('show');
    });

    // Filter items based on category
    visibleItems = allItems.filter(item => {
        const itemCategory = item.getAttribute('data-category');
        return category === "" || itemCategory === category;
    });

    // Load the filtered items
    loadMore();
    updateLoadMoreButton();

    // Update button colors (active class)
    const filterButtons = document.querySelectorAll('.tab-button');

    if (clickedButton) {
        filterButtons.forEach(button => button.classList.remove('active'));
        clickedButton.classList.add('active'); 
    }
}

// Function to load more items
function loadMore() {
    const end = Math.min(currentItemIndex + itemsPerPage, visibleItems.length);

    for (let i = currentItemIndex; i < end; i++) {
        visibleItems[i].style.display = 'block';
        setTimeout(() => visibleItems[i].classList.add('show'), 50); // Adds 'show' class for animation
    }

    currentItemIndex = end;
    updateLoadMoreButton();
}

// Function to update the Load More button visibility
function updateLoadMoreButton() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    loadMoreBtn.style.display = currentItemIndex >= visibleItems.length ? 'none' : 'block';
}

// Initialize filter on page load (show all items initially)
window.onload = function() {
    filterItems(''); // Initially show all categories or none
};

// Add event listener for Load More button
document.getElementById('loadMoreBtn').addEventListener('click', loadMore);

