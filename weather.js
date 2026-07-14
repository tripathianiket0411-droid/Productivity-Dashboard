let temperature = document.querySelector("#temperature");
let city = document.querySelector("#city");
let weatherCondition = document.querySelector("#weatherCondition");
let district = document.querySelector("#district");
let state = document.querySelector("#state");
let humidity = document.querySelector("#humidity");
let wind = document.querySelector("#wind");



function getLocation() {

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(
            showPosition,
            (err) => {
                console.log(err);
                city.innerText = "Location Permission Denied";
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );

    } else {

        city.innerText = "Location not supported";

    }

}


async function showPosition(position) {

    console.log(position);
    console.log(position.coords.accuracy);


    console.log("Accuracy:", position.coords.accuracy);

    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    console.log("Latitude:", latitude);
    console.log("Longitude:", longitude);

    let response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
    );

    let data = await response.json();

    console.log(data);
    console.log(data.address);

    city.innerText = `📍 ${data.address.city ||
        data.address.town ||
        data.address.village ||
        data.address.hamlet ||
        data.address.suburb ||
        data.address.municipality ||
        data.address.city_district ||
        data.address.neighbourhood ||
        data.address.quarter ||
        data.address.county ||
        "Unknown"
        }`;

    district.innerText = `🏙️ District: ${data.address.state_district || data.address.county || "Not Available"}`;

    state.innerText = `🗺️ State: ${data.address.state || "Not Available"}`;


    let weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m`
    );

    let weatherData = await weatherResponse.json();

    console.log(weatherData);
    console.log(data);

    temperature.innerText = `${Math.round(weatherData.current.temperature_2m)}°C`;
    humidity.innerText = `💧 Humidity: ${weatherData.current.relative_humidity_2m}%`;

    wind.innerText = `🌬 Wind: ${weatherData.current.wind_speed_10m} km/h`;

    const weatherCodes = {
        0: "Clear Sky ☀️",

        1: "Mainly Clear 🌤️",
        2: "Partly Cloudy ⛅",
        3: "Cloudy ☁️",

        45: "Fog 🌫️",
        48: "Depositing Fog 🌫️",

        // Drizzle
        51: "Light Drizzle 🌦️",
        53: "Moderate Drizzle 🌦️",
        55: "Dense Drizzle 🌧️",
        56: "Light Freezing Drizzle 🧊🌦️",
        57: "Dense Freezing Drizzle 🧊🌧️",

        // Rain
        61: "Slight Rain 🌦️",
        63: "Moderate Rain 🌧️",
        65: "Heavy Rain 🌧️",
        66: "Light Freezing Rain 🧊🌧️",
        67: "Heavy Freezing Rain 🧊🌧️",

        // Snow
        71: "Light Snow ❄️",
        73: "Moderate Snow ❄️",
        75: "Heavy Snow ❄️",
        77: "Snow Grains 🌨️",

        // Rain Showers
        80: "Slight Rain Showers 🌦️",
        81: "Moderate Rain Showers 🌧️",
        82: "Violent Rain Showers ⛈️🌧️",

        // Snow Showers
        85: "Slight Snow Showers 🌨️",
        86: "Heavy Snow Showers ❄️",

        // Thunderstorm
        95: "Thunderstorm ⛈️",
        96: "Thunderstorm with Slight Hail ⛈️🧊",
        99: "Thunderstorm with Heavy Hail ⛈️🧊"
    };

    weatherCondition.innerText =
        weatherCodes[weatherData.current.weather_code] || "Unknown Weather";

    console.log("Current Weather:", weatherData.current);
    console.log("Weather Code:", weatherData.current.weather_code);
    console.log("Weather Name:", weatherCodes[weatherData.current.weather_code]);

    changeWeatherBackground(weatherData.current.weather_code);
   





}


getLocation();



function changeWeatherBackground(weatherCode) {

    const currentTime = new Date();
    const hour = currentTime.getHours();


    const weatherBox = document.querySelector(".weather-box");


    if ([51, 53, 55, 61, 63, 65, 80].includes(weatherCode)) {

        weatherBox.style.backgroundImage = "url('./Images/RAINING.webp')";
        return;

    }



    if ([95, 96, 99].includes(weatherCode)) {
        weatherBox.style.backgroundImage = "url('./Images/thunder-cluds.gif')";
        return;
    }



    if ([ 3, 45, 48].includes(weatherCode)) {

        weatherBox.style.backgroundImage = "url('./Images/cloud.jpg')";
        return;

    }



    if (hour >= 5 && hour < 12) {

        weatherBox.style.backgroundImage = "url('./Images/morning.jpg')";

    }

    else if (hour >= 12 && hour < 18) {

        weatherBox.style.backgroundImage = "url('./Images/background.jpg')";

    }


    else if (hour >= 18 || hour < 5) {

        weatherBox.style.backgroundImage = "url('./Images/night.jpg')";

    }

    else {

        weatherBox.style.backgroundImage = "url('./Images/clear.jpg')";

    }

}