const surahListContainer = document.querySelector('.surah-list');

async function fetchSurahs() {
    try {
        const response = await fetch('https://itzfew.github.io/Quranapp/surah.json');
        const surahs = await response.json();
        
        surahListContainer.innerHTML = surahs.map(surah => `
            <div class="surah-item">
                <a href="singleSurah.html?id=${surah.index}">${surah.title} (${surah.index})</a>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error fetching Surahs:', error);
        surahListContainer.innerHTML = '<p class="no-results">Failed to load Surah list</p>';
    }
}

fetchSurahs();
