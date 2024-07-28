// Import necessary functions from other modules
import { id, fetchSingleSurah } from './singleSurah.js';
import { darkMode } from './darkMode.js';
import { scrollBar, scrollTop } from './scrollEfect.js';

// Event listener for the back button in the header
const log = document.querySelector('.log');
log.addEventListener('click', () => {
    window.history.back();
});

// Fetch and display details of the surah
fetchSingleSurah(`https://api.alquran.cloud/v1/surah/${id}`);

// Initialize dark mode functionality
darkMode();

// Initialize scroll bar indicator and scroll top functionality
scrollBar();
scrollTop();
