import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import WatchlistSection from "./components/WatchlistSection";
import MarketSection from "./components/MarketSection";
import "./styles.css";

function App() {
  const [coins, setCoins] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchCoins = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/coins");
      if (!res.ok) throw new Error("API Error");

      const data = await res.json();
      setCoins(data);
      setError("");
    } catch {
      setError("API Connection Warning");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoins();
    const interval = setInterval(fetchCoins, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("watchlist");
    if (saved) setWatchlist(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  const toggleWatchlist = (coin) => {
    setWatchlist((prev) => {
      const exists = prev.find((item) => item.id === coin.id);
      return exists
        ? prev.filter((item) => item.id !== coin.id)
        : [...prev, coin];
    });
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar search={search} setSearch={setSearch} />

      <div className="container">
        {loading && <div className="loading">Loading market data...</div>}

        <WatchlistSection
          watchlist={watchlist}
          toggleWatchlist={toggleWatchlist}
        />

        <MarketSection
          coins={filteredCoins}
          toggleWatchlist={toggleWatchlist}
          watchlist={watchlist}
        />

        {error && <div className="toast">{error}</div>}
      </div>
    </>
  );
}

export default App;