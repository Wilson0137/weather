const forecastApiUrl = "https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=fnd&lang=tc";
const currentWeatherApiUrl = "https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=tc";

async function fetchWeather() {
    const forecastResponse = await fetch(forecastApiUrl);
    const forecastData = await forecastResponse.json();
    displayForecast(forecastData);
}

async function fetchCurrentWeather() {
    const currentWeatherResponse = await fetch(currentWeatherApiUrl);
    const currentWeatherData = await currentWeatherResponse.json();
    displayCurrentWeather(currentWeatherData);
}

function displayForecast(data) {
    const forecastContainer = document.getElementById('forecast');

    // Display first 3 forecasts
    data.weatherForecast.slice(0, 3).forEach(forecast => {
        const forecastDiv = document.createElement('div');
        forecastDiv.classList.add('forecast-item');
        forecastDiv.innerHTML = `
            <strong>${forecast.week}</strong><br>
            最高氣溫: ${forecast.forecastMaxtemp.value}°C<br>
            最低氣溫: ${forecast.forecastMintemp.value}°C<br>
            天氣: ${forecast.forecastWeather}<br>
            風速: ${forecast.forecastWind}
        `;
        forecastContainer.appendChild(forecastDiv);
    });
}

function displayCurrentWeather(data) {
    const currentWeatherContainer = document.getElementById('currentWeather');
    
    // Find 荃灣 information
    const tsuenWanTemperature = data.temperature.data.find(item => item.place === "荃灣可觀");
    const tsuenWanHumidity = data.humidity.data.find(item => item.place === "香港天文台");

    currentWeatherContainer.innerHTML = `
        <h2>Current Weather - 荃灣</h2>
        <p>Temperature: ${tsuenWanTemperature ? tsuenWanTemperature.value : 'N/A'}°C</p>
        <p>Humidity: ${tsuenWanHumidity ? tsuenWanHumidity.value : 'N/A'}%</p>
        <p>Rainfall: ${data.rainfall.data.find(item => item.place === "荃灣")?.max || 0} mm</p>
    `;
}

// Function to update and display current date and time
function updateCurrentDateTime() {
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    const date = now.toLocaleDateString('zh-HK', options);
    const time = now.toLocaleTimeString('zh-HK');

    const currentTimeContainer = document.getElementById('currentTime');
    currentTimeContainer.innerHTML = `Current Date: ${date} <br> Current Time: ${time}`;
}

// Register service worker for PWA
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
        .then(() => console.log('Service Worker Registered'));
}

// Fetch weather data
fetchWeather();
fetchCurrentWeather();

// Function to refresh the page
function refreshPage() {
    location.reload();
}

// Set interval to refresh the page every minute
setInterval(refreshPage, 60000);

// Update current date and time every second
setInterval(updateCurrentDateTime, 1000);