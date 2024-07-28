const main = document.querySelector('main');

// Extract the Surah ID from the URL query parameters
export const id = new URLSearchParams(window.location.search).get('id');

// Fetch and display details for a single Surah
export async function fetchSingleSurah(api) {
    try {
        // Fetch the data from the API
        const res = await fetch(api);
        
        // Check if the response is okay
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        
        const { data } = await res.json();
        const { ayahs, englishName, revelationType, numberOfAyahs, name } = data;
        
        // Generate HTML content for the Surah details
        main.innerHTML = `
            <div class="surahInfo">
                <div class="name">
                    <h4>${englishName}</h4>
                </div>
                <div class="info">
                    <p><span>Revelation: ${revelationType}</span> / <span>Number of Ayahs: ${numberOfAyahs}</span></p>
                </div>
            </div>
            <hr/>
            <div class="singleSurah">
                <div class="name">
                    <h1>${name}</h1>
                </div>
                <ul class="ayat">
                    ${ayahs.map(item => `
                        <li><span>(${item.numberInSurah})</span> - ${item.text}</li>
                    `).join('')}
                </ul>
            </div>
        `;
    } catch (error) {
        console.error('Error fetching Surah details:', error);
        main.innerHTML = `<h2 class="error">Error loading Surah details. Please try again later.</h2>`;
    }
}

// Call the function with the appropriate API endpoint
fetchSingleSurah(`https://api.alquran.cloud/v1/surah/${id}`);
