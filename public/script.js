const escapeHTML = (str) => str.replace(/[&<>"']/g, (match) => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}[match]));

document.getElementById('weather-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const city = document.getElementById('city-input').value.trim();
  const EMPTY_CITY_MESSAGE = `<p>Please enter a city name.</p>`;
  if (!city) {
    document.getElementById('weather-result').innerHTML = EMPTY_CITY_MESSAGE;
    return;
  }

  try {
    const response = await fetch(`/weather?city=${encodeURIComponent(city)}`);
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const data = await response.json();

    if (data.name && data.sys?.country && data.weather?.[0]?.description && data.main?.temp !== undefined) {
      document.getElementById('weather-result').innerHTML = `
        <h2>${escapeHTML(data.name)}, ${escapeHTML(data.sys.country)}</h2>
        <p>${escapeHTML(data.weather[0].description)}</p>
        <p>Temperature: ${escapeHTML(data.main.temp.toString())}°C</p>
        <p>Feels like: ${data.main.feels_like}°C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
        <p>Wind Direction: ${data.wind.deg}°</p>
        <p>Visibility: ${data.visibility / 1000} km</p>
        <p>Cloudiness: ${data.clouds.all}%</p>
        <p>Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</p>
        <p>Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}</p>
        <p>Last Updated: ${new Date(data.dt * 1000).toLocaleTimeString()}</p>
      `;
    } else {
      document.getElementById('weather-result').innerHTML = `<p>Weather data not available for this city.</p>`;
    }
  } catch (err) {
    document.getElementById('weather-result').innerHTML = `
      <h2>Error</h2>
      <p>${escapeHTML(err.message)}</p>
    `;
  }
});
