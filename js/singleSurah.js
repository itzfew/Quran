const main = document.querySelector('main');

// Extract the 'id' parameter from the URL
const id = new URLSearchParams(window.location.search).get('id');

// Function to fetch and display a single Surah
async function fetchSingleSurah(api) {
    try {
        // Fetch data from the API
        const res = await fetch(api);
        if (!res.ok) throw new Error('Network response was not ok');
        const surahData = await res.json();

        // Generate HTML content for the Surah
        main.innerHTML = `
            <div class="surahInfo">
                <div class="name">
                    <h4>${surahData.name}</h4>
                </div>
                <div class="info">
                    <p>
                        <span>Number of Ayahs: ${surahData.ayahs.length}</span>
                    </p>
                </div>
            </div>
            <hr/>
            <div class="singleSurah">
                <div class="name">
                    <h1>${surahData.name}</h1>
                </div>
                <ul class="ayat">
                    ${
                        surahData.ayahs
                        .map(ayah => `
                            <li>
                                <span>(${ayah.number})</span> - ${ayah.text}
                            </li>
                        `)
                        .join('')
                    }
                </ul>
            </div>
        `;
    } catch (err) {
        console.error("Error fetching Surah data: " + err);
        main.innerHTML = `<h2 class="no-results">Failed to load Surah</h2>`;
    }
}

// Construct the API URL using the Surah id
const api = `https://itzfew.github.io/Quranapp/data/surah/surah_${id}.json`;

// Fetch and display the Surah
fetchSingleSurah(api);
