const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());

let cachedData = null;
let lastFetchTime = 0;

app.get("/api/coins", async (req, res) => {
  try {
    const now = Date.now();

    // If last fetch was within 60 seconds, return cached data
    if (cachedData && now - lastFetchTime < 60000) {
      console.log("Serving from cache");
      return res.json(cachedData);
    }

    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets",
      {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 12,
          page: 1,
        },
      }
    );

    cachedData = response.data;
    lastFetchTime = now;

    res.json(response.data);
  } catch (error) {
    console.error("CoinGecko Error:", error.message);
    res.status(500).json({ error: "API failed" });
  }
});

app.listen(5000, () =>
  console.log("Server running on port 5000")
);