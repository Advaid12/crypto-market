function Portfolio({ watchlist }) {
  const totalValue = watchlist.reduce(
    (acc, coin) => acc + coin.current_price,
    0
  );

  return (
    <div className="container">
      <h2>Portfolio</h2>

      {watchlist.length === 0 ? (
        <p className="empty">No assets in your portfolio.</p>
      ) : (
        <>
          <div className="portfolio-summary">
            <h3>Total Value</h3>
            <h1>${totalValue.toLocaleString()}</h1>
          </div>

          <div className="grid">
            {watchlist.map((coin) => (
              <div key={coin.id} className="crypto-card">
                <h4>{coin.name}</h4>
                <div className="price">
                  ${coin.current_price.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Portfolio;