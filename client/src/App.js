import { useEffect, useState } from "react";
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

  // ================= FETCH COINS =================

  const fetchCoins = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/coins");
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
  };

  useEffect(() => {
    fetchCoins();
    const interval = setInterval(fetchCoins, 30000);
    return () => clearInterval(interval);
  }, []);

  // ================= SAVE WATCHLIST IDS =================

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlistIds));
  }, [watchlistIds]);

  // ================= DERIVED WATCHLIST =================
  // Always built from fresh coins data

  const watchlist = coins.filter((coin) =>
    watchlistIds.includes(coin.id)
  );

  // ================= TOGGLE WATCHLIST =================

  const toggleWatchlist = (coin) => {
  setWatchlistIds((prev) => {
    const updated = prev.includes(coin.id)
      ? prev.filter((id) => id !== coin.id)
      : [...prev, coin.id];

    console.log("Updated watchlistIds:", updated); // DEBUG

    return updated;
  });
};

  // ================= AUTO HIDE ERROR =================

  useEffect(() => {
  console.log("Saving to localStorage:", watchlistIds);
  localStorage.setItem("watchlist", JSON.stringify(watchlistIds));
}, [watchlistIds]);

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