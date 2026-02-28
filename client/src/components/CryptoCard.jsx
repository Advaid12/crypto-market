function CryptoCard({ coin, toggleWatchlist, watchlist, editMode }) {
  const change = coin.price_change_percentage_24h || 0;
  const isPositive = change >= 0;

  const isInWatchlist = watchlist.some(
    (item) => item.id === coin.id
  );

  return (
    <div className="crypto-card">
      <div className="card-top">
        <div className="coin-info">
          <img
            src={coin.image}
            alt={coin.name}
            className="coin-icon"
          />
          <div>
            <h4>{coin.name}</h4>
            <span className="symbol">
              {coin.symbol.toUpperCase()}
            </span>
          </div>
        </div>

        {/* If edit mode → show remove button */}
        {editMode ? (
          <button
            className="remove-btn"
            onClick={() => toggleWatchlist(coin)}
          >
            ✕
          </button>
        ) : (
          <button
            className={isInWatchlist ? "star active" : "star"}
            onClick={() => toggleWatchlist(coin)}
          >
            ★
          </button>
        )}
      </div>

      <div className="price">
        ${coin.current_price.toLocaleString()}
      </div>

      <div className={isPositive ? "positive" : "negative"}>
        {isPositive ? "▲" : "▼"} {change.toFixed(2)}%
      </div>
    </div>
  );
}

export default CryptoCard;