require("dotenv").config();
const express = require("express");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 5050;

// Middleware
app.use(cors());
app.use(express.static(path.join(__dirname, "..", "public")));

// Debug: Check if API key loads
console.log("Loaded API Key:", process.env.WEATHER_API_KEY ? "Yes" : "No");

app.get("/weather", async (req, res) => {
  const city = req.query.city;
  const apiKey = process.env.WEATHER_API_KEY;

  console.log("City:", city);
  console.log("API Key Present:", apiKey ? "Yes" : "No");

  if (!city || !apiKey) {
    return res.status(400).json({ error: "City and API key are required" });
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    if (!response.ok)
      throw new Error("Fetch failed with status " + response.status);
    const data = await response.json();
    console.log("Weather Data:", data);
    res.json(data);
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
