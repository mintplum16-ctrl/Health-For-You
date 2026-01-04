// This file handles all interactive functionality for conditions.html
// Author: NaDari Cole
// Date: 12/31/2025
// Code Type: JavaScript
// Filename: script2.js

document.addEventListener('DOMContentLoaded', function () {
    
    // ============================================
    // NAVIGATION SEARCH BAR FUNCTIONALITY
    // ============================================
    
    // Get navigation search elements
    const searchInput = document.querySelector('.search-input');
    const searchClear = document.querySelector('.search-clear');
    
    // Clear button functionality for navigation search
    if (searchClear && searchInput) {
        searchClear.addEventListener('click', function () {
            searchInput.value = '';
            searchInput.focus();
            searchInput.dispatchEvent(new Event('input'));
        });
        
        // Clear on Escape key
        searchInput.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                searchInput.value = '';
                searchInput.blur();
            }
        });
    }
    
    // ============================================
    // ARTICLE SEARCH BAR FUNCTIONALITY
    // ============================================
    
    // Get article search elements
    const articleSearchInput = document.querySelector('.article-search-input');
    const articleSearchClear = document.querySelector('.article-search-clear');
    const articleCards = document.querySelectorAll('.article-card');
    
    // Clear button for article search
    if (articleSearchClear && articleSearchInput) {
        articleSearchClear.addEventListener('click', function () {
            articleSearchInput.value = '';
            articleSearchInput.focus();
            articleSearchInput.dispatchEvent(new Event('input'));
            filterArticles(); // Re-filter to show all articles
        });
        
        // Clear on Escape key
        articleSearchInput.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                articleSearchInput.value = '';
                articleSearchInput.blur();
                filterArticles();
            }
        });
    }
    
    // Real-time search filtering as user types
    if (articleSearchInput) {
        articleSearchInput.addEventListener('input', filterArticles);
    }
    
    // ============================================
    // FILTER MENU FUNCTIONALITY
    // ============================================
    
    // Get filter elements
    const filterButton = document.querySelector('.filter-button');
    const filterMenu = document.querySelector('.filter-menu');
    const filterCheckboxes = document.querySelectorAll('.filter-checkbox');
    
    // Toggle filter menu open/closed when button is clicked
    if (filterButton && filterMenu) {
        filterButton.addEventListener('click', function () {
            filterMenu.classList.toggle('active');
        });
    }
    
    // Apply filters when any checkbox changes
    if (filterCheckboxes) {
        filterCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', filterArticles);
        });
    }
    
    // ============================================
    // ARTICLE FILTERING FUNCTION
    // Filters articles based on search text and selected categories
    // ============================================
    
    function filterArticles() {
        // Get current search text (lowercase for case-insensitive matching)
        const searchText = articleSearchInput ? articleSearchInput.value.toLowerCase() : '';
        
        // Get all checked filter categories
        const checkedCategories = Array.from(filterCheckboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value);
        
        // Loop through each article card
        articleCards.forEach(card => {
            const title = card.dataset.title.toLowerCase();
            const description = card.querySelector('.article-description').textContent.toLowerCase();
            const category = card.dataset.category;
            
            // Check if article matches search text (in title or description)
            const matchesSearch = searchText === '' || 
                                  title.includes(searchText) || 
                                  description.includes(searchText);
            
            // Check if article matches selected categories (or no filters selected)
            const matchesFilter = checkedCategories.length === 0 || 
                                  checkedCategories.includes(category);
            
            // Show article only if it matches both search and filter
            if (matchesSearch && matchesFilter) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    }
    
    // ============================================
    // ARTICLE POPUP FUNCTIONALITY
    // ============================================
    
    // Get popup elements
    const popup = document.getElementById('articlePopup');
    const popupContent = document.getElementById('popupContent');
    const popupTitle = document.getElementById('popupTitle');
    const popupBody = document.getElementById('popupBody');
    const popupClose = document.getElementById('popupClose');
    
    // ============================================
    // FRUTIGER AERO SOUND EFFECT
    // Creating a synthesized chime sound using Web Audio API
    // This creates a quick, pleasant notification sound
    // ============================================
    
    function playFrutigerChime() {
        // Create audio context (the audio engine)
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Create oscillator (sound wave generator)
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        // Connect oscillator to volume control to speakers
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // Set sound frequency (pitch) - bright, airy tone
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime); // Start at 800Hz
        oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.1); // Rise to 1200Hz
        
        // Set volume envelope (fade in and out quickly)
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.05); // Fade in
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3); // Fade out
        
        // Use sine wave for smooth, pleasant tone
        oscillator.type = 'sine';
        
        // Play the sound
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3); // Stop after 0.3 seconds
    }
    
    // ============================================
    // OPEN POPUP WHEN ARTICLE CARD IS CLICKED
    // ============================================
    
    articleCards.forEach(card => {
        card.addEventListener('click', function () {
            // Get article data from the clicked card
            const title = this.dataset.title;
            const content = this.dataset.content;
            
            // Set popup content
            popupTitle.textContent = title;
            popupBody.textContent = content;
            
            // Show popup with animation
            popup.classList.add('active');
            
            // Play Frutiger Aero-style chime sound
            playFrutigerChime();
            
            // Prevent body from scrolling when popup is open
            document.body.style.overflow = 'hidden';
        });
    });
    
    // ============================================
    // CLOSE POPUP FUNCTIONALITY
    // ============================================
    
    // Close popup when X button is clicked
    if (popupClose) {
        popupClose.addEventListener('click', closePopup);
    }
    
    // Close popup when clicking outside the popup content
    if (popup) {
        popup.addEventListener('click', function (e) {
            if (e.target === popup) {
                closePopup();
            }
        });
    }
    
    // Close popup when Escape key is pressed
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && popup.classList.contains('active')) {
            closePopup();
        }
    });
    
    // Function to close the popup
    function closePopup() {
        popup.classList.remove('active');
        document.body.style.overflow = ''; // Restore body scrolling
    }
    
    // ============================================
    // POPUP RESIZE FUNCTIONALITY
    // Makes the popup resizable like a desktop window
    // ============================================
    
    // Get all resize handles
    const resizeHandles = document.querySelectorAll('.resize-handle');
    
    // Variables to track resizing state
    let isResizing = false;
    let currentHandle = null;
    let startX, startY, startWidth, startHeight, startLeft, startTop;
    
    // Add mousedown event to each resize handle
    resizeHandles.forEach(handle => {
        handle.addEventListener('mousedown', function (e) {
            // Start resizing
            isResizing = true;
            currentHandle = this;
            
            // Record starting mouse position
            startX = e.clientX;
            startY = e.clientY;
            
            // Record starting popup dimensions and position
            const rect = popupContent.getBoundingClientRect();
            startWidth = rect.width;
            startHeight = rect.height;
            startLeft = rect.left;
            startTop = rect.top;
            
            // Prevent text selection while resizing
            e.preventDefault();
        });
    });
    
    // Handle mouse movement during resize
    document.addEventListener('mousemove', function (e) {
        if (!isResizing) return;
        
        // Calculate how much mouse has moved
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        
        // Get current dimensions
        let newWidth = startWidth;
        let newHeight = startHeight;
        
        // Adjust dimensions based on which handle is being dragged
        if (currentHandle.classList.contains('resize-right') || 
            currentHandle.classList.contains('resize-top-right') || 
            currentHandle.classList.contains('resize-bottom-right')) {
            newWidth = startWidth + deltaX;
        }
        
        if (currentHandle.classList.contains('resize-left') || 
            currentHandle.classList.contains('resize-top-left') || 
            currentHandle.classList.contains('resize-bottom-left')) {
            newWidth = startWidth - deltaX;
        }
        
        if (currentHandle.classList.contains('resize-bottom') || 
            currentHandle.classList.contains('resize-bottom-left') || 
            currentHandle.classList.contains('resize-bottom-right')) {
            newHeight = startHeight + deltaY;
        }
        
        if (currentHandle.classList.contains('resize-top') || 
            currentHandle.classList.contains('resize-top-left') || 
            currentHandle.classList.contains('resize-top-right')) {
            newHeight = startHeight - deltaY;
        }
        
        // Get min and max constraints from CSS
        const minWidth = 400;
        const minHeight = 300;
        const maxWidth = window.innerWidth * 0.95;
        const maxHeight = window.innerHeight * 0.95;
        
        // Apply constraints (don't let it get too small or too large)
        newWidth = Math.max(minWidth, Math.min(newWidth, maxWidth));
        newHeight = Math.max(minHeight, Math.min(newHeight, maxHeight));
        
        // Apply new dimensions to popup
        popupContent.style.width = newWidth + 'px';
        popupContent.style.height = newHeight + 'px';
    });
    
    // Stop resizing when mouse button is released
    document.addEventListener('mouseup', function () {
        if (isResizing) {
            isResizing = false;
            currentHandle = null;
        }
    });
    
    // ============================================
    // BACK TO TOP BUTTON FUNCTIONALITY
    // ============================================
    
    const backToTopButton = document.getElementById('back-to-top');
    
    // Show button when user scrolls down 300px
    window.addEventListener('scroll', function () {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });
    
    // Smooth scroll to top when button is clicked
    if (backToTopButton) {
        backToTopButton.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
});
