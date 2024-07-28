const main = document.querySelector('main');


export const id = new URLSearchParams(window.location.search).get('id');


export async function fetchSingleSurah(api){
    let res = await fetch(api);
    let {data} = await res.json();
    let {ayahs} = data;
    main.innerHTML = `
    <div class="surahInfo">
    <div class="name">
        <h4>${data.englishName} </h4>
    </div>
    <div class="info">
        <p> <span>Revelation: ${data.revelationType} </span> / <span>NumberOfAyahs: ${data.numberOfAyahs} </span> </p>
    </div>
    </div>
    <hr/>
    <div class="singleSurah">
            <div class="name">
                <h1> ${data.name} </h1>
            </div>
            <ul class="ayat">
                ${
                    ayahs
                    .map((item)=>`
                     <li> <span>(${item.numberInSurah})</span> - ${item.text} </li>
                  `).join(' ')
                }
            </ul>
    </div>
    `;
}