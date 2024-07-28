import { id, fetchSingleSurah } from './singleSurah.js';
import { darkMode } from './darkMode.js';
import { scrollBar, scrollTop } from './scrollEfect.js';

const log = document.querySelector('.log');

log.addEventListener('click', () => {
    window.history.back();
});

// Fetch and display surah details
async function initialize() {
    try {
        await fetchSingleSurah(`https://api.alquran.cloud/v1/surah/${id}`);
    } catch (error) {
        console.log('Failed to fetch surah details, loading from cache.');
        // Load cached data or show a friendly offline message
        main.innerHTML = '<p>Unable to load surah details. Please check your internet connection.</p>';
    }
}

initialize();

// Initialize dark mode functionality
darkMode();

// Initialize scroll effects
scrollBar();
scrollTop();
