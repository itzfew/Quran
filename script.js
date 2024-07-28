// script.js
document.getElementById('fetch').addEventListener('click', function() {
    const page = document.getElementById('page').value;
    const edition = document.getElementById('edition').value;
    const url = `http://api.alquran.cloud/v1/page/${page}/${edition}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const contentDiv = document.getElementById('quran-content');
            contentDiv.innerHTML = '';
            
            if (data.status === 'OK') {
                const ayahs = data.data.ayahs;
                ayahs.forEach(ayah => {
                    const ayahDiv = document.createElement('div');
                    ayahDiv.classList.add('ayah');
                    ayahDiv.innerHTML = `<strong>${ayah.numberInSurah}:</strong> ${ayah.text}`;
                    contentDiv.appendChild(ayahDiv);
                });
            } else {
                contentDiv.innerHTML = 'Error fetching data.';
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});
