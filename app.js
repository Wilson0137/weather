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

// Function to display current weather for 荃灣
function displayCurrentWeather(data) {
    const currentWeatherContainer = document.getElementById('currentWeather');
    
    // Find Tsuen Wan temperature
    const tsuenWanTemperature = data.temperature.data.find(item => item.place === '荃灣可觀') || {};
    const temperature = tsuenWanTemperature.value || "N/A";
    
    // General weather condition
    const weatherDescription = data.warningMessage.join(', ') || "No weather warnings.";
    const humidity = data.humidity.data[0].value || "N/A"; // Assuming there's at least one entry
    const windSpeed = data.rainfall.data.find(item => item.place === '荃灣')?.max || 0; // Placeholder for wind speed

    currentWeatherContainer.innerHTML = `
        <div class="weather-icon">🌤️</div> <!-- Placeholder for weather icon -->
        <div class="weather-info">
            <h2>${temperature}°C</h2>
            <p>${weatherDescription}</p>
            <p>Humidity: ${humidity}%</p>
            <p>Wind Speed (max rainfall): ${windSpeed} mm</p>
        </div>
    `;
}

// Function to display weather forecast
function displayWeatherForecast(data) {
    const forecastContainer = document.getElementById('forecast');
    forecastContainer.innerHTML = ''; // Clear previous forecast data
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