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
