const weatherIcons = {
    "Rain": "wi wi-day-rain",
    "Clouds": "wi wi-day-cloudy",
    "Clear": "wi wi-day-sunny",
    "Snow": "wi wi-day-snow",
    "Mist": "wi wi-day-fog",
    "Drizzle": "wi wi-day-sleet",
}

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function displayWeatherInfos(data) {
    const name = data.name;
    const temperature = data.main.temp;
    const conditions = data.weather[0].main;
    const description = data.weather[0].description;

    document.querySelector('#ville').textContent = name;

    document.querySelector('#conditions').textContent = capitalizeFirstLetter(description);

    document.querySelector('#temperature').textContent = Math.round(temperature);

    document.querySelector('i.wi').className = weatherIcons[conditions];

    document.body.className = conditions.toLowerCase();

}

async function main(withIP = true) {
    let ville;
    let ip;
    if (withIP) {
        // 1) recuperer l'adresse IP du terminal qui accède à la page avec l'API:
        // https://api.ipify.org?format=json
        ip = await fetch('https://api.ipify.org?format=json')
            .then(result => result.json())
            .then(json => json.ip)
        console.log(ip)

        // 2) recuperer la ville de l'utilisateur à partir avec l'API:
        // https://freegeoip.net/json+ip
        ville = await fetch(`http://ip-api.com/json/${ip}`)
            .then(result => result.json())
            .then(json => json.city)
        console.log(ville)
    }
    else {
        ville = document.querySelector('#ville').textContent;
    }

    // 3) Récupération de la météo à partir fde l'API 
    // http://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=8e602b9ea28ed4f9f8fc97a5f6d1105c&lang=fr&units=metric
    const meteo = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=8e602b9ea28ed4f9f8fc97a5f6d1105c&lang=fr&units=metric`).then(result => result.json()).then(json => json)
    //console.log(meteo);

    //4) Aficher les information sur la page
    displayWeatherInfos(meteo);
}



const ville = document.querySelector('#ville');

ville.addEventListener('click', () => {
    ville.contentEditable = true;
});
ville.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        e.preventDefault();
        ville.contentEditable = false;
        main(false);
    }
});

main()