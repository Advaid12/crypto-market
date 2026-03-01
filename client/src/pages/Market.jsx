import WatchlistSection from "../components/WatchlistSection";
import MarketSection from "../components/MarketSection";

function Market({ coins, watchlist, toggleWatchlist, search, setSearch }) {
  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <WatchlistSection
        watchlist={watchlist}
        toggleWatchlist={toggleWatchlist}
      />

      <MarketSection
        coins={filteredCoins}
        toggleWatchlist={toggleWatchlist}
        watchlist={watchlist}
        setSearch={setSearch}
      />
    </>
  );
}

export default Market;