function Navbar({ search, setSearch }) {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <h2 className="logo">
          Crypto<span>Pulse</span>
        </h2>

        <div className="nav-links">
          <span className="active">Market</span>
          <span>Portfolio</span>
          <span>Exchange</span>
        </div>
      </div>

      <div className="nav-right">
  <input
    type="text"
    placeholder="Search assets..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />

  <div className="bell">
    🔔
    <span className="notification-dot"></span>
  </div>

  <div className="avatar">JD</div>
</div>
    </nav>
  );
}

export default Navbar;