import CryptoCard from "./CryptoCard";

function MarketSection({ coins, toggleWatchlist, watchlist, setSearch }) {
  return (
    <section className="section" id="market-section">
      
      <div className="section-header">
        <div>
          <h2>Market Overview</h2>
          <p className="subtitle">
            Real-time data for top performing assets
          </p>
        </div>

        <button
          className="all-assets-btn"
          onClick={() => {
            setSearch("");
            const section = document.getElementById("market-section");
            section?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          All Assets
        </button>
      </div>

      {coins.length === 0 ? (
        <p className="empty">No cryptocurrencies found.</p>
      ) : (
        <div className="grid">
          {coins.map((coin) => (
            <CryptoCard
              key={coin.id}
              coin={coin}
              toggleWatchlist={toggleWatchlist}
              watchlist={watchlist}
            />
          ))}
        </div>
      )}

      <div className="view-all-container">
        <button
          className="view-all-btn"
          onClick={() =>
            window.open("https://www.coingecko.com/", "_blank")
          }
        >
          View All Cryptocurrencies
        </button>
      </div>
    </section>
  );
}

export default MarketSection;