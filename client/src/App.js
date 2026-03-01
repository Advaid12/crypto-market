import { useEffect, useState, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Market from "./pages/Market";
import Portfolio from "./pages/Portfolio";
import Exchange from "./pages/Exchange";

import "./styles.css";

function App() {
  const [coins, setCoins] = useState([]);
  const [watchlistIds, setWatchlistIds] = useState(() => {
    return JSON.parse(localStorage.getItem("watchlist")) || [];
  });
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState("live");

  // ================= API URL =================
  const API_URL =
    process.env.NODE_ENV === "development"
      ? ""
      : "https://crypto-market-production.up.railway.app";

  // ================= FETCH COINS =================
  const fetchCoins = useCallback(async () => {
    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/api/coins`);
      if (!res.ok) throw new Error("API Error");

      const data = await res.json();
      setCoins(data);
      setApiStatus("live");
      setError("");
    } catch (err) {
      setApiStatus("offline");
      setError("⚠ API Connection Warning");
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  // ================= INITIAL FETCH + POLLING =================
  useEffect(() => {
    fetchCoins();
    const interval = setInterval(fetchCoins, 60000); // 60 seconds
    return () => clearInterval(interval);
  }, [fetchCoins]);

  // ================= SAVE WATCHLIST =================
  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlistIds));
  }, [watchlistIds]);

  // ================= DERIVED WATCHLIST =================
  const watchlist = coins.filter((coin) =>
    watchlistIds.includes(coin.id)
  );

  // ================= TOGGLE WATCHLIST =================
  const toggleWatchlist = (coin) => {
    setWatchlistIds((prev) =>
      prev.includes(coin.id)
        ? prev.filter((id) => id !== coin.id)
        : [...prev, coin.id]
    );
  };

  return (
    <Router>
      <Navbar
        search={search}
        setSearch={setSearch}
        apiStatus={apiStatus}
      />

      <div className="container">
        {loading && (
          <div className="loading">Loading market data...</div>
        )}

        <Routes>
          <Route
            path="/"
            element={
              <Market
                coins={coins}
                watchlist={watchlist}
                toggleWatchlist={toggleWatchlist}
                search={search}
                setSearch={setSearch}
              />
            }
          />

          <Route
            path="/portfolio"
            element={<Portfolio watchlist={watchlist} />}
          />

          <Route
            path="/exchange"
            element={<Exchange coins={coins} />}
          />
        </Routes>

        {error && <div className="popup-alert">{error}</div>}
      </div>
    </Router>
  );
}

export default App;