// Récupérer l'adresse IP de l'utilisateur
const ipAddressResponse = await fetch('https://freegeoip.net/json/')
const ipAddressData = await ipAddressResponse.json()
const userIpAddress = ipAddressData.ip

// Utiliser l'adresse IP pour récupérer la ville
const cityResponse = await fetch(`https://ipinfo.io/${userIpAddress}/json?token=9a00aae418f782`)
const cityData = await cityResponse.json()
const city = cityData.city

console.log(city)


// Récupérer la géolocalisation de l'utilisateur
if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // Récupérer la ville à partir de la géolocalisation
        const cityResponse = await fetch(`https://geocode.xyz/${latitude},${longitude}?json=1`);
        const cityData = await cityResponse.json();
        const city = cityData.city;

        console.log(city);
    });
} else {
    console.log("La géolocalisation n'est pas disponible sur ce navigateur.");
}
