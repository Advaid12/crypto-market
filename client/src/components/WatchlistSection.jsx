import { useState } from "react";
import CryptoCard from "./CryptoCard";
import AddAssetCard from "./AddAssetCard";

function WatchlistSection({ watchlist, toggleWatchlist }) {
  const [editMode, setEditMode] = useState(false);

  return (
    <section className="section">
      <div className="section-header">
        <div>
          <h2>My Watchlist</h2>
          <p className="subtitle">
            Your personalized collection of assets
          </p>
        </div>

        <span
          className="edit-link"
          onClick={() => setEditMode(!editMode)}
        >
          {editMode ? "Done" : "Edit List"}
        </span>
      </div>

      <div className="grid">
        {watchlist.map((coin) => (
          <CryptoCard
            key={coin.id}
            coin={coin}
            toggleWatchlist={toggleWatchlist}
            watchlist={watchlist}
            editMode={editMode}
          />
        ))}
        <AddAssetCard />
      </div>
    </section>
  );
}

export default WatchlistSection;