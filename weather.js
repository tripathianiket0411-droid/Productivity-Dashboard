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
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
    );

    let data = await response.json();


    let weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m`
    );

    let weatherData = await weatherResponse.json();

    console.log(weatherData);
    console.log(data);

    temperature.innerText = `${Math.round(weatherData.current.temperature_2m)}°C`;
    humidity.innerText = `💧 Humidity: ${weatherData.current.relative_humidity_2m}%`;

    wind.innerText = `🌬 Wind: ${weatherData.current.wind_speed_10m} km/h`;

    city.innerText = `📍 ${data.city || data.locality}`;

    district.innerText = `🏙️ District: ${data.locality || data.city || "Not Available"
        }`;

    state.innerText = `🗺️ State: ${data.principalSubdivision || "Not Available"
        }`;;

    const weatherCodes = {
        0: "Clear Sky ☀️",
        1: "Mainly Clear 🌤️",
        2: "Partly Cloudy ⛅",
        3: "Cloudy ☁️",
        45: "Fog 🌫️",
        48: "Fog 🌫️",
        51: "Light Drizzle 🌦️",
        53: "Drizzle 🌦️",
        55: "Heavy Drizzle 🌧️",
        61: "Light Rain 🌦️",
        63: "Rain 🌧️",
        65: "Heavy Rain 🌧️",
        71: "Snow ❄️",
        80: "Rain Showers 🌦️",
        95: "Thunderstorm ⛈️"
    };

    weatherCondition.innerText =
        weatherCodes[weatherData.current.weather_code] || "Unknown Weather";


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


 
    if (weatherCode === 95) {

        weatherBox.style.backgroundImage = "url('./Images/thunder-cluds.gif')";
        return;

    }


  
    if ([1, 2, 3, 45, 48].includes(weatherCode)) {

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