// Search bar toggle functionality
document.addEventListener('DOMContentLoaded', function () {
    const searchContainer = document.querySelector('.search-container');
    const searchToggle = document.querySelector('.search-toggle');
    const searchClose = document.querySelector('.search-close');
    const searchInput = document.querySelector('.search-input');

    // Open search
    searchToggle.addEventListener('click', function () {
        searchContainer.classList.add('active');
        setTimeout(() => searchInput.focus(), 300); // Focus after animation
    });

    // Close search with X button
    searchClose.addEventListener('click', function () {
        searchContainer.classList.remove('active');
        searchInput.value = ''; // Optional: clear search
    });

    // Close when clicking outside (optional but nice UX)
    document.addEventListener('click', function (e) {
        if (!searchContainer.contains(e.target)) {
            searchContainer.classList.remove('active');
            searchInput.value = '';
        }
    });

    // Prevent closing when clicking inside the search bar
    searchContainer.addEventListener('click', function (e) {
        e.stopPropagation();
    });
});
