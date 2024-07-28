const surahList = document.querySelector('.surahList');
const searchBox = document.querySelector('.searchBox');
const sortable = document.querySelector('.sortable');

let surahs = [];

// Fetch data from the Al-Quran API
export async function fetchSurahList() {
    try {
        const res = await fetch('https://api.alquran.cloud/v1/surah');
        const data = await res.json();
        surahs = data.data;
        displaySurahs();
    } catch (err) {
        console.error("Error fetching data: " + err);
    }
}

// Update the surah list based on the selected order and search input
export function displaySurahs() {
    let html = '';
    if (surahs.length === 0) {
        surahList.innerHTML = '<h2 class="loading">Loading...</h2>';
    } else {
        const filteredSurahs = surahs
            .filter(item => item.englishName.toLowerCase().includes(searchBox.value.toLowerCase()))
            .sort((a, b) => sortable.value === 'asc' ? a.number - b.number : b.number - a.number);

        filteredSurahs.forEach(item => {
            html += `
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
            `;
        });

        surahList.innerHTML = html || '<h2 class="no-results">No Results Found</h2>';
    }
}

// Event listeners
searchBox.addEventListener('input', displaySurahs);
sortable.addEventListener('change', displaySurahs);

// Initial fetch
fetchSurahList();
