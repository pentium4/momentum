const API_KEY = "4a1db5262afd441bb019a6bb175bbab3";

function onGeoOk(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    fetch(url).then(response => response.json()).then(data => {
        const weather = document.querySelector("#weather div:first-child");
        const city = document.querySelector("#weather div:last-child");
        weather.innerHTML = `${data.weather[0].main} / ${Math.floor(data.main.temp)}°`;
        city.innerText = data.name;
    });
}

function onGeoError() {
    alert("Can't find you. No weather for you.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);