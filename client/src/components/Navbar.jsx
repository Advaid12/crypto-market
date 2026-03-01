import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

function Navbar({ search, setSearch, apiStatus }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isMarketPage = location.pathname === "/";

  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <div className="nav-left">
        <h2 className="logo" onClick={() => navigate("/")}>
          Crypto<span>Pulse</span>
        </h2>

        <div className="nav-links">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "active-link" : ""
            }
          >
            Market
          </NavLink>

          <NavLink
            to="/portfolio"
            className={({ isActive }) =>
              isActive ? "active-link" : ""
            }
          >
            Portfolio
          </NavLink>

          <NavLink
            to="/exchange"
            className={({ isActive }) =>
              isActive ? "active-link" : ""
            }
          >
            Exchange
          </NavLink>
        </div>
      </div>

      <div className="nav-right">
        {/* API Status */}
        <div className={`status-indicator ${apiStatus}`}>
          ● {apiStatus === "live" ? "Live" : "Offline"}
        </div>

        {/* Search only on Market */}
        {isMarketPage && (
          <input
            type="text"
            placeholder="Search assets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        )}

        {/* Bell Notification */}
        <div
          className="bell"
          onClick={() =>
            setShowNotifications(!showNotifications)
          }
          ref={dropdownRef}
        >
          🔔
          <span className="notification-dot"></span>

          {showNotifications && (
            <div className="notification-dropdown">
              <p>No new notifications</p>
            </div>
          )}
        </div>

        {/* Avatar */}
        <div className="avatar">JD</div>
      </div>
    </nav>
  );
}

export default Navbar;