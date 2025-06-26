const escapeHTML = (str) =>
  str.replace(
    /[&<>"']/g,
    (match) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      }[match])
  );

const getWeatherIcon = (description) => {
  const desc = description.toLowerCase();
  if (desc.includes("clear"))
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
  if (desc.includes("clouds"))
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>`;
  if (desc.includes("rain") || desc.includes("drizzle"))
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="16" y1="13" x2="16" y2="21"></line><line x1="8" y1="13" x2="8" y2="21"></line><line x1="12" y1="15" x2="12" y2="23"></line><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"></path></svg>`;
  if (desc.includes("thunderstorm"))
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16.82A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"></path><polyline points="13 11 9 17 15 17 11 23"></polyline></svg>`;
  if (desc.includes("snow"))
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"></path><line x1="8" y1="16" x2="8" y2="16"></line><line x1="8" y1="20" x2="8" y2="20"></line><line x1="12" y1="18" x2="12" y2="18"></line><line x1="12" y1="22" x2="12" y2="22"></line><line x1="16" y1="16" x2="16" y2="16"></line><line x1="16" y1="20" x2="16" y2="20"></line></svg>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 10.5a8 8 0 1 1 16 0"></path><path d="M2.5 10.5H1"></path><path d="M20.5 10.5H22"></path><path d="M12 2.5V1"></path><path d="M12 21.5V20"></path><path d="m5 5.5 1-1"></path><path d="m18 18.5 1-1"></path><path d="m5 15.5 1 1"></path><path d="m18 5.5-1 1"></path></svg>`;
};

const celsiusToFahrenheit = (celsius) => {
  return Math.round((celsius * 9) / 5 + 32);
};

const updateBackground = (weather) => {
  const backgroundEl = document.getElementById("weather-background");
  backgroundEl.innerHTML = "";

  const id = weather.id;
  const main = weather.main.toLowerCase();

  let bodyClass = "weather-default";
  if (id === 800) bodyClass = "weather-clear";
  else if (id > 800 && id < 805) bodyClass = "weather-clouds";
  else if (main === "rain" || main === "drizzle") bodyClass = "weather-rain";
  else if (main === "thunderstorm") bodyClass = "weather-thunderstorm";
  else if (main === "snow") bodyClass = "weather-snow";

  document.body.className = bodyClass;

  if (id > 800 && id < 805) {
    let cloudCount = 5;
    if (id === 802) cloudCount = 10;
    if (id === 803) cloudCount = 15;
    if (id === 804) cloudCount = 20;

    for (let i = 0; i < cloudCount; i++) {
      const cloud = document.createElement("div");
      cloud.className = "cloud";
      const scale = 0.5 + Math.random();
      cloud.style.transform = `scale(${scale})`;
      cloud.style.top = `${Math.random() * 40}%`;
      cloud.style.animationDuration = `${20 + Math.random() * 30}s`;
      cloud.style.animationDelay = `-${Math.random() * 50}s`;
      backgroundEl.appendChild(cloud);
    }
  } else if (main === "rain" || main === "drizzle") {
    let amount = main === "rain" ? 100 : 50;
    for (let i = 0; i < amount; i++) {
      const drop = document.createElement("div");
      drop.className = "raindrop";
      drop.style.left = `${Math.random() * 100}vw`;
      drop.style.animationDuration = `${0.5 + Math.random() * 0.5}s`;
      drop.style.animationDelay = `${Math.random() * 2}s`;
      backgroundEl.appendChild(drop);
    }
  } else if (main === "thunderstorm") {
    for (let i = 0; i < 150; i++) {
      const drop = document.createElement("div");
      drop.className = "raindrop";
      drop.style.left = `${Math.random() * 100}vw`;
      drop.style.animationDuration = `${0.4 + Math.random() * 0.4}s`;
      drop.style.animationDelay = `${Math.random() * 2}s`;
      backgroundEl.appendChild(drop);
    }
    const lightning = document.createElement("div");
    lightning.className = "lightning";
    backgroundEl.appendChild(lightning);
  }
};

document
  .getElementById("weather-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const city = document.getElementById("city-input").value.trim();
    const weatherResultEl = document.getElementById("weather-result");
    const EMPTY_CITY_MESSAGE = `<p>Please enter a city name.</p>`;

    if (!city) {
      weatherResultEl.innerHTML = EMPTY_CITY_MESSAGE;
      weatherResultEl.style.display = "block";
      return;
    }

    try {
      const response = await fetch(`/weather?city=${encodeURIComponent(city)}`);
      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ message: "Failed to fetch weather data" }));
        throw new Error(errorData.message || "Failed to fetch weather data");
      }

      const data = await response.json();

      if (
        data.name &&
        data.sys?.country &&
        data.weather?.[0]?.description &&
        data.main?.temp !== undefined
      ) {
        updateBackground(data.weather[0]);

        document.getElementById("city-name").textContent = escapeHTML(
          `${data.name}, ${data.sys.country}`
        );
        document.getElementById(
          "temperature"
        ).textContent = `${celsiusToFahrenheit(data.main.temp)}°F`;
        document.getElementById("description").textContent = escapeHTML(
          data.weather[0].description
        );
        document.getElementById("humidity").textContent = `${escapeHTML(
          data.main.humidity.toString()
        )}%`;
        const windMph = Math.round(data.wind.speed * 2.237);
        document.getElementById("wind-speed").textContent = `${escapeHTML(
          windMph.toString()
        )} mph`;

        const weatherIconContainer = document.getElementById("weather-icon");
        weatherIconContainer.innerHTML = getWeatherIcon(
          data.weather[0].description
        );

        weatherResultEl.style.display = "block";
      } else {
        weatherResultEl.innerHTML = `<p>Weather data not available for this city.</p>`;
        weatherResultEl.style.display = "block";
        updateBackground({ id: 0, main: "default" });
      }
    } catch (err) {
      weatherResultEl.innerHTML = `<p style="color: #ffcccc;">Error: ${escapeHTML(
        err.message
      )}</p>`;
      weatherResultEl.style.display = "block";
      updateBackground({ id: 0, main: "default" });
    }
  });

window.onload = () => {
  updateBackground({ id: 0, main: "default" });
};
