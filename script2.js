// This file is for the index.html files search bar

// For conditions.html
//Author: NaDari Cole
//Date: 12/31/2025
//Code Type: js
//Filename: scripts.js

document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.querySelector('.search-input');
    const searchClear = document.querySelector('.search-clear');

    searchClear.addEventListener('click', function () {
        searchInput.value = '';
        searchInput.focus();
        // Trigger placeholder-shown update
        searchInput.dispatchEvent(new Event('input'));
    });

    // clear on Escape key
    searchInput.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            searchInput.value = '';
            searchInput.blur();
        }
    });
});


// Back to Top Button Functionality
document.addEventListener('DOMContentLoaded', function () {
    const backToTopButton = document.getElementById('back-to-top');

    // Show button when scrolled down 300px
    window.addEventListener('scroll', function () {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    // Smooth scroll to top when clicked
    backToTopButton.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
