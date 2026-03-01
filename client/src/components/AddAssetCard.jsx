function AddAssetCard() {
  const scrollToMarket = () => {
    const section = document.getElementById("market-section");
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="add-card" onClick={scrollToMarket}>
      <div className="plus">+</div>
      <p>Add asset to watchlist</p>
    </div>
  );
}

export default AddAssetCard;