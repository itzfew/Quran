const surahList = document.querySelector('.surahList');
const searchBox = document.querySelector('.searchBox');
const sortable = document.querySelector('.sortable');

let surahs = [];

// Fetch data from the Al-Quran API
export async function fetchSurahList() {
    try {
        const res = await fetch('https://api.alquran.cloud/v1/surah');
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await res.json();
        surahs = data.data;
        displaySurahs();
    } catch (err) {
        console.error("Error fetching data: ", err);
        surahList.innerHTML = '<h2 class="loading">Error fetching surahs. Please try again later.</h2>';
    }
}

// Update the surah list based on the selected order and search input
export function displaySurahs() {
    if (!surahs.length) {
        surahList.innerHTML = '<h2 class="loading">Loading...</h2>';
        return;
    }

    const searchTerm = searchBox.value.toLowerCase();
    const sortOrder = sortable.value;

    const filteredSurahs = surahs
        .filter(item => item.englishName.toLowerCase().includes(searchTerm))
        .sort((a, b) => sortOrder === 'asc' ? a.number - b.number : b.number - a.number);

    const html = filteredSurahs.length > 0
        ? filteredSurahs.map(item => `
            <a href="singleSurah.html?id=${item.number}" class="surahCard">
                <div class="leftInfo">
                    <div class="num">
                        <span>${item.number}</span>
                    </div>
                    <div class="name">
                        <h3>${item.englishName}</h3>
                        <p>${item.englishNameTranslation}</p>
                    </div>
                </div>
                <div class="rightInfo">
                    <span>${item.name}</span>
                    <p>${item.numberOfAyahs} Verses</p>
                </div>
            </a>
        `).join('')
        : '<h2 class="no-results">No Results Found</h2>';

    surahList.innerHTML = html;
}

// Debounce function for search input
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// Event listeners
searchBox.addEventListener('input', debounce(displaySurahs, 300));
sortable.addEventListener('change', displaySurahs);

// Initial fetch
fetchSurahList();
