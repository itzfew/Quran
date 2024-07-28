// singleSurah.js

const main = document.querySelector('main');

// Extract the 'id' parameter from the URL
const id = new URLSearchParams(window.location.search).get('id');

// Function to fetch and display a single Surah
export async function fetchSingleSurah(api) {
    try {
        // Fetch data from the API
        const res = await fetch(api);
        const { data } = await res.json();
        const { ayahs } = data;

        // Generate HTML content for the Surah
        main.innerHTML = `
            <div class="surahInfo">
                <div class="name">
                    <h4>${data.englishName}</h4>
                </div>
                <div class="info">
                    <p>
                        <span>Revelation: ${data.revelationType}</span> /
                        <span>Number of Ayahs: ${data.numberOfAyahs}</span>
                    </p>
                </div>
            </div>
            <hr/>
            <div class="singleSurah">
                <div class="name">
                    <h1>${data.name}</h1>
                </div>
                <ul class="ayat">
                    ${
                        ayahs
                        .map(item => `
                            <li>
                                <span>(${item.numberInSurah})</span> - ${item.text}
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
const api = `https://api.alquran.cloud/v1/surah/${id}`;

// Fetch and display the Surah
fetchSingleSurah(api);
