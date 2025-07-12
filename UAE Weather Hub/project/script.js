// Weather API Configuration
const API_KEY = 'demo_key'; // In production, use environment variable
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';

// UAE Cities with coordinates for more accurate weather data
const cities = {
    dubai: {
        name: "Dubai",
        lat: 25.2048,
        lon: 55.2708,
        description: "Dubai is experiencing a beautiful day with clear skies and gentle breezes. The temperature is perfect for outdoor activities, and the iconic Burj Khalifa stands tall against the azure sky. The city buzzes with energy as residents and tourists enjoy the pleasant weather conditions."
    },
    abudhabi: {
        name: "Abu Dhabi",
        lat: 24.4539,
        lon: 54.3773,
        description: "Abu Dhabi, the capital of the UAE, is blessed with comfortable temperatures today. The Sheikh Zayed Grand Mosque gleams under the soft sunlight, while the Corniche offers a perfect setting for evening walks."
    },
    sharjah: {
        name: "Sharjah",
        lat: 25.3373,
        lon: 55.4120,
        description: "Sharjah, the cultural capital of the UAE, enjoys warm and pleasant weather today. The historic Al Qasba area is perfect for family outings, while the traditional architecture looks stunning under the clear skies."
    },
    ajman: {
        name: "Ajman",
        lat: 25.4052,
        lon: 55.5136,
        description: "Ajman welcomes visitors with comfortable temperatures and gentle coastal breezes. The pristine beaches stretch along the Arabian Gulf, offering perfect conditions for water sports and relaxation."
    },
    fujairah: {
        name: "Fujairah",
        lat: 25.1288,
        lon: 56.3264,
        description: "Fujairah, nestled between the Hajar Mountains and the Arabian Sea, enjoys cooler temperatures and refreshing mountain air. The dramatic landscape creates a unique atmosphere perfect for outdoor activities."
    },
    rasalkhaimah: {
        name: "Ras Al Khaimah",
        lat: 25.7894,
        lon: 55.9770,
        description: "Ras Al Khaimah experiences delightful weather with cooler temperatures thanks to its mountainous terrain. The weather is ideal for exploring Jebel Jais, the UAE's highest peak."
    },
    ummalquwain: {
        name: "Umm Al Quwain",
        lat: 25.5644,
        lon: 55.6555,
        description: "Umm Al Quwain, the peaceful emirate, enjoys calm and pleasant weather today. Known for its tranquil atmosphere and beautiful lagoons, it offers a serene escape from bustling city life."
    }
};

let currentCity = '';
let weatherData = {};

// Mock API function for demo purposes (replace with real API call)
async function fetchWeatherData(city) {
    try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock weather data - in production, use real API
        const mockData = {
            temperature: Math.floor(Math.random() * 15) + 20, // 20-35°C
            condition: ['Sunny', 'Partly Cloudy', 'Cloudy', 'Clear'][Math.floor(Math.random() * 4)],
            humidity: Math.floor(Math.random() * 30) + 40, // 40-70%
            windSpeed: Math.floor(Math.random() * 20) + 5, // 5-25 km/h
            pressure: Math.floor(Math.random() * 50) + 1000, // 1000-1050 hPa
            visibility: Math.floor(Math.random() * 5) + 5, // 5-10 km
            uvIndex: Math.floor(Math.random() * 8) + 1, // 1-8
            feelsLike: Math.floor(Math.random() * 15) + 22 // 22-37°C
        };
        
        return mockData;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
}

async function fetchForecastData() {
    try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const days = ['Today', 'Tomorrow', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        const conditions = ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain', 'Clear'];
        const emojis = ['☀️', '⛅', '☁️', '🌦️', '🌤️'];
        
        return days.map((day, index) => ({
            day,
            temperature: Math.floor(Math.random() * 15) + 20,
            condition: conditions[Math.floor(Math.random() * conditions.length)],
            emoji: emojis[Math.floor(Math.random() * emojis.length)],
            high: Math.floor(Math.random() * 10) + 30,
            low: Math.floor(Math.random() * 10) + 18
        }));
    } catch (error) {
        console.error('Error fetching forecast data:', error);
        throw error;
    }
}

function getWeatherEmoji(condition) {
    const emojiMap = {
        'Sunny': '☀️',
        'Clear': '🌤️',
        'Partly Cloudy': '⛅',
        'Cloudy': '☁️',
        'Light Rain': '🌦️',
        'Rain': '🌧️',
        'Thunderstorm': '⛈️',
        'Snow': '❄️',
        'Mist': '🌫️'
    };
    return emojiMap[condition] || '🌤️';
}

async function showCityWeather() {
    const citySelect = document.getElementById('citySelect');
    const cityWeatherInfo = document.getElementById('cityWeatherInfo');
    const cityName = document.getElementById('cityName');
    const cityTemp = document.getElementById('cityTemp');
    const cityDescription = document.getElementById('cityDescription');
    const weatherDetails = document.getElementById('weatherDetails');
    const lastUpdated = document.getElementById('lastUpdated');
    
    const selectedCity = citySelect.value;
    currentCity = selectedCity;
    
    if (selectedCity && cities[selectedCity]) {
        cityWeatherInfo.style.display = 'block';
        const city = cities[selectedCity];
        
        // Show loading state
        cityName.innerHTML = `<h3>📍 ${city.name}</h3>`;
        cityTemp.innerHTML = '<div class="loading"></div>';
        cityDescription.innerHTML = '<p>Loading weather data...</p>';
        weatherDetails.innerHTML = '';
        
        try {
            // Fetch real-time weather data
            const weather = await fetchWeatherData(selectedCity);
            weatherData[selectedCity] = weather;
            
            // Update UI with real data
            cityTemp.textContent = `${weather.temperature}°C`;
            cityDescription.innerHTML = `
                <p>${city.description}</p>
                <div style="margin-top: 15px;">
                    <span class="emoji">${getWeatherEmoji(weather.condition)}</span>
                    <strong>${weather.condition}</strong> - Feels like ${weather.feelsLike}°C
                </div>
            `;
            
            // Show detailed weather information
            weatherDetails.innerHTML = `
                <div class="weather-detail">
                    <strong>💧 Humidity</strong><br>
                    ${weather.humidity}%
                </div>
                <div class="weather-detail">
                    <strong>💨 Wind Speed</strong><br>
                    ${weather.windSpeed} km/h
                </div>
                <div class="weather-detail">
                    <strong>📊 Pressure</strong><br>
                    ${weather.pressure} hPa
                </div>
                <div class="weather-detail">
                    <strong>👁️ Visibility</strong><br>
                    ${weather.visibility} km
                </div>
                <div class="weather-detail">
                    <strong>☀️ UV Index</strong><br>
                    ${weather.uvIndex}
                </div>
            `;
            
            lastUpdated.textContent = `Last updated: ${new Date().toLocaleTimeString()}`;
            
        } catch (error) {
            cityTemp.textContent = 'Error';
            cityDescription.innerHTML = '<div class="error-message">Failed to load weather data. Please try again.</div>';
            weatherDetails.innerHTML = '';
        }
    } else {
        cityWeatherInfo.style.display = 'none';
    }
}

async function refreshWeatherData() {
    if (currentCity) {
        await showCityWeather();
    }
}

async function updateWeatherAlerts() {
    const alertContent = document.getElementById('weatherAlertContent');
    
    try {
        // Simulate fetching alert data
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const random = Math.random();
        
        if (random < 0.3) {
            // 30% chance of showing an alert
            const alerts = [
                {
                    type: 'Dust Storm',
                    emoji: '🌪️',
                    message: 'Moderate dust storm expected in desert areas. Visibility may be reduced on highways leading to Al Ain and Liwa Oasis.',
                    precautions: ['🚗 Drive with caution and use headlights', '😷 Use masks if you have respiratory conditions', '🏠 Stay indoors if possible']
                },
                {
                    type: 'High Temperature',
                    emoji: '🌡️',
                    message: 'Extreme heat warning issued for inland areas. Temperatures may exceed 45°C during midday hours.',
                    precautions: ['💧 Stay hydrated', '🏠 Avoid outdoor activities during peak hours', '👕 Wear light-colored, loose clothing']
                },
                {
                    type: 'Strong Winds',
                    emoji: '💨',
                    message: 'Strong winds expected along coastal areas. Wind speeds may reach 40-50 km/h.',
                    precautions: ['🏖️ Avoid beach activities', '🚗 Drive carefully on bridges and open roads', '🏠 Secure outdoor furniture']
                }
            ];
            
            const alert = alerts[Math.floor(Math.random() * alerts.length)];
            
            alertContent.innerHTML = `
                <div class="alert-message">
                    <span class="emoji">${alert.emoji}</span>
                    ${alert.type} Advisory
                </div>
                <p>${alert.message}</p>
                <div style="margin-top: 20px;">
                    <strong>Precautions:</strong><br>
                    ${alert.precautions.map(p => `${p}<br>`).join('')}
                </div>
                <div class="last-updated">Updated: ${new Date().toLocaleTimeString()}</div>
            `;
        } else {
            // 70% chance of showing safe message
            alertContent.innerHTML = `
                <div class="safe-message">
                    <span class="emoji">✅</span>
                    You are safe today!
                </div>
                <p>Current weather conditions in the UAE are stable. No severe weather alerts or adverse conditions are expected in the next 24 hours.</p>
                <div style="margin-top: 20px;">
                    <strong>General UAE Weather Status:</strong><br>
                    <span class="emoji">☀️</span> Clear skies with moderate temperatures<br>
                    <span class="emoji">🌊</span> Calm sea conditions<br>
                    <span class="emoji">💨</span> Light to moderate winds<br>
                    <span class="emoji">🌡️</span> Temperature range: 25-35°C
                </div>
                <div class="last-updated">Updated: ${new Date().toLocaleTimeString()}</div>
            `;
        }
    } catch (error) {
        alertContent.innerHTML = '<div class="error-message">Failed to load weather alerts. Please try again later.</div>';
    }
}

async function loadForecastData() {
    const forecastContainer = document.getElementById('forecastContainer');
    
    try {
        const forecastData = await fetchForecastData();
        
        forecastContainer.innerHTML = forecastData.map(day => `
            <div class="forecast-day">
                <div class="day-name">${day.day}</div>
                <div class="emoji">${day.emoji}</div>
                <div class="day-temp">${day.temperature}°C</div>
                <div class="day-condition">${day.condition}</div>
                <div>High: ${day.high}°C | Low: ${day.low}°C</div>
            </div>
        `).join('');
        
    } catch (error) {
        forecastContainer.innerHTML = '<div class="error-message">Failed to load forecast data. Please try again later.</div>';
    }
}

function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show selected page
    document.getElementById(pageId).classList.add('active');
    
    // Load data for specific pages
    if (pageId === 'weather') {
        updateWeatherAlerts();
        document.body.className = 'weather-page';
    } else if (pageId === 'forecast') {
        loadForecastData();
        // Dynamic theming based on weather
        const forecastClass = Math.random() > 0.5 ? 'forecast-page-sunny' : 'forecast-page-cloudy';
        document.body.className = forecastClass;
    } else {
        document.body.className = '';
    }
}

// Auto-refresh weather data every 10 minutes
setInterval(() => {
    if (currentCity) {
        refreshWeatherData();
    }
}, 600000); // 10 minutes

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    console.log('UAE Weather Hub initialized with real-time updates');
});