// Function to fetch current weather data
async function fetchCurrentWeather() {
    const response = await fetch('https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=tc');
    const data = await response.json();
    return data;
}

// Function to fetch weather forecast data
async function fetchWeatherForecast() {
    const response = await fetch('https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=fnd&lang=tc');
    const data = await response.json();
    return data;
}

// Function to display current weather
function displayCurrentWeather(data) {
    const currentWeatherContainer = document.getElementById('currentWeather');
    const temperature = data.humidity; // Example: current temperature
    const weatherDescription = data.generalSituation; // Example description
    const windSpeed = data.windSpeed; // Example wind speed
    const seaTemp = data.seaTemp.value; // Example sea temperature

    currentWeatherContainer.innerHTML = `
        <div class="weather-icon">🌤️</div> <!-- Placeholder for weather icon -->
        <div class="weather-info">
            <h2>${temperature}°C</h2>
            <p>${weatherDescription}</p>
            <p>Wind: ${windSpeed} km/h</p>
            <p>Sea Temperature: ${seaTemp}°C</p>
        </div>
    `;
}

// Function to display weather forecast
function displayWeatherForecast(data) {
    const forecastContainer = document.getElementById('forecast');
    data.weatherForecast.forEach(item => {
        const forecastItem = document.createElement('div');
        forecastItem.classList.add('forecast-item');
        forecastItem.innerHTML = `
            <h4>${item.week}</h4>
            <p>${item.forecastWeather}</p>
            <p>High: ${item.forecastMaxtemp.value}°C</p>
            <p>Low: ${item.forecastMintemp.value}°C</p>
        `;
        forecastContainer.appendChild(forecastItem);
    });
}

// Function to update the current date and time
function updateDateTime() {
    const now = new Date();
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    };
    const formattedDate = now.toLocaleString('zh-HK', options);
    document.getElementById('currentTime').textContent = formattedDate;
}

// Main function to fetch and display data
async function initWeatherApp() {
    try {
        const currentWeatherData = await fetchCurrentWeather();
        displayCurrentWeather(currentWeatherData);

        const weatherForecastData = await fetchWeatherForecast();
        displayWeatherForecast(weatherForecastData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

// Initialize the weather app and start updating time
initWeatherApp();
setInterval(updateDateTime, 1000); // Update date and time every second