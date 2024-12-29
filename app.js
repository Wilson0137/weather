const apiUrl = "https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=fnd&lang=tc";

async function fetchWeather() {
    const response = await fetch(apiUrl);
    const data = await response.json();
    displayWeather(data);
}

function displayWeather(data) {
    const forecastContainer = document.getElementById('forecast');
    const currentWeatherContainer = document.getElementById('currentWeather');

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

    // Display current weather
    currentWeatherContainer.innerHTML = `
        <h2>Current Weather</h2>
        <p>Temperature: ${data.seaTemp.value}°C</p>
        <p>Humidity: ${data.seaTemp.value} %</p>
    `;
}

// Register service worker for PWA
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
        .then(() => console.log('Service Worker Registered'));
}

fetchWeather();