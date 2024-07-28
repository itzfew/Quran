import { displaySurahs, fetchSurahList } from './surahList.js';
import { darkMode } from './darkMode.js';
import { scrollBar, scrollTop } from './scrollEfect.js';

const log = document.querySelector('.log');

log.addEventListener('click', () => {
    window.history.back();
});

async function initialize() {
    try {
        await fetchSurahList();
    } catch (error) {
        console.log('Failed to fetch surah list, loading from cache.');
        // Load cached data or show a friendly offline message
        surahList.innerHTML = '<p>Unable to load surah list. Please check your internet connection.</p>';
    }
}

initialize();

// Initialize dark mode functionality
darkMode();

// Initialize scroll effects
scrollBar();
scrollTop();
