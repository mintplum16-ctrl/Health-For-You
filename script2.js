// Author: NaDari Cole
// Date: 12/31/2025
// Filename: script2.js

document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.querySelector('.search-input');
    const searchClear = document.querySelector('.search-clear');

    function toggleClearButton() {
        if (searchInput.value.length > 0 || searchInput === document.activeElement) {
            searchClear.style.opacity = '1';
            searchClear.style.pointerEvents = 'all';
        } else {
            searchClear.style.opacity = '0';
            searchClear.style.pointerEvents = 'none';
        }
    }

    if (searchInput) {
        searchInput.addEventListener('input', toggleClearButton);
        searchInput.addEventListener('focus', toggleClearButton);
        searchInput.addEventListener('blur', toggleClearButton);
        searchInput.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                searchInput.value = '';
                searchInput.blur();
                toggleClearButton();
            }
        });
    }

    if (searchClear) {
        searchClear.addEventListener('click', function () {
            searchInput.value = '';
            searchInput.focus();
            toggleClearButton();
        });
    }

    toggleClearButton();
});

// Page article search
const articleSearchInput = document.getElementById('article-search-input');
if (articleSearchInput) {
    const articleCards = document.querySelectorAll('.article-card');
    articleSearchInput.addEventListener('input', function () {
        const term = this.value.toLowerCase();
        articleCards.forEach(card => {
            const title = card.querySelector('.article-title').textContent.toLowerCase();
            const excerpt = card.querySelector('.article-excerpt').textContent.toLowerCase();
            if (title.includes(term) || excerpt.includes(term)) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    });
}

// Modal + sounds
const modal = document.getElementById('article-modal');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');
const closeBtn = document.querySelector('.modal-close');
const openSound = new Audio('sounds/open.mp3');
const closeSound = new Audio('sounds/close.mp3');

document.querySelectorAll('.article-card').forEach(card => {
    card.addEventListener('click', function () {
        modalTitle.textContent = this.dataset.title;
        modalBody.innerHTML = this.dataset.content || '<p>Full article content coming soon...</p>';
        modal.style.display = 'flex';
        openSound.currentTime = 0;
        openSound.play().catch(e => console.log('Open sound prevented:', e));
    });
});

if (closeBtn) {
    closeBtn.addEventListener('click', function () {
        modal.style.display = 'none';
        closeSound.currentTime = 0;
        closeSound.play().catch(e => console.log('Close sound prevented:', e));
    });
}

window.addEventListener('click', function (e) {
    if (e.target === modal) {
        modal.style.display = 'none';
        closeSound.currentTime = 0;
        closeSound.play().catch(e => console.log('Close sound prevented:', e));
    }
});

// Back to top
const backToTopButton = document.getElementById('back-to-top');
window.addEventListener('scroll', function () {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
