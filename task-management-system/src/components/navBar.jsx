import {
  FaBell,
  FaUserCircle,
  FaSearch,
  FaMoon,
  FaSignOutAlt,
  FaCog,
} from "react-icons/fa";
import logo from "../assets/images/logo.png";
import TaskLeed from "../assets/images/TaskLeed.png";
import { useState, useRef, useEffect } from "react";
import { FaSun } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../context/notificationContext";
import { useDropdown } from "../context/dropdownContext";
import { useDarkMode } from "../context/DarkModeContext";
import { useProfile } from "../context/profileContext";
import Swal from "sweetalert2";

const NavBar = ({ searchQuery, onSearchChange }) => {
  const Navigate = useNavigate();
  const { profile } = useProfile();
  const {
    notificationCount,
    notifications,
    markAsRead,
    clearAllNotifications,
  } = useNotification();

  const { activeDropdown, toggleDropdown, closeAll } = useDropdown();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { darkMode, toggleDarkMode } = useDarkMode();
  const navRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        closeAll();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeAll]);

  const handleNotificationClick = (id) => {
    markAsRead(id);
    const notification = notifications.find((n) => n.id === id);
    Swal.fire({
      title: "Task Completed",
      text: notification?.message,
      icon: "success",
      confirmButtonText: "OK",
      confirmButtonColor: "#4caf50",
    });
    closeAll();
  };

  return (
    <nav
      className="navbar navbar-expand-lg shadow-sm"
      ref={navRef}
      style={{
        backgroundColor: darkMode ? "#121212" : "var(--white)",
        borderBottom: darkMode ? "1px solid #333" : "1px solid var(--silver)"
      }}
    >
      <div className="container-fluid px-4">
        <div className="d-flex align-items-center">
          <img
            src={logo}
            alt="logo"
            className="img-fluid"
            style={{ width: "60px", padding: "7px", filter: darkMode ? "brightness(0.8)" : "none" }}
          />
          <img
            src={TaskLeed}
            alt="TaskLeed"
            className="img-fluid"
            style={{ 
              width: "120px", 
              cursor: "pointer",
              filter: darkMode ? "brightness(0.8)" : "none"
            }}
          />
        </div>
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          aria-label="Toggle navigation"
          style={{ color: darkMode ? "#fff" : "inherit" }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="position-relative mx-auto d-none d-lg-block"
          style={{ maxWidth: "800px", width: "100%" }}
        >
          <FaSearch className="position-absolute top-50 start-0 translate-middle-y ms-3" 
            style={{ color: darkMode ? "#aaa" : "var(--grey)" }} />
          <input
            type="text"
            className="form-control ps-5 border-0 rounded-pill"
            placeholder="Search tasks..."
            style={{
              height: "40px",
              backgroundColor: darkMode ? "#333" : "var(--silver)",
              color: darkMode ? "#fff" : "var(--d-grey)"
            }}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <div
          className={`d-flex align-items-center gap-3 ${
            showMobileMenu ? "show" : "d-none d-lg-flex"
          }`}
        >
          <button
            className="btn p-0 rounded-circle d-flex align-items-center justify-content-center"
            style={{
              width: "36px",
              height: "36px",
              backgroundColor: darkMode ? "#333" : "var(--silver)"
            }}
            onClick={toggleDarkMode}
          >
            {darkMode ? (
              <FaSun size={18} style={{ color: "#FFD700" }} />
            ) : (
              <FaMoon size={18} style={{ color: "var(--primary)" }} />
            )}
          </button>
          <div className="position-relative">
            <button
              className={`btn p-0 rounded-circle d-flex align-items-center justify-content-center position-relative ${
                activeDropdown === "notifications" ? "active" : ""
              }`}
              style={{
                width: "36px",
                height: "36px",
                backgroundColor:
                  activeDropdown === "notifications" ? "#e8f5e9" : "whitesmoke",
                transition: "all 0.3s ease",
              }}
              onClick={() => toggleDropdown("notifications")}
              aria-expanded={activeDropdown === "notifications"}
            >
              <FaBell size={18} className="text-success" />
              {notificationCount > 0 && (
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success"
                  style={{
                    fontSize: "0.6rem",
                    animation:
                      notificationCount > 0 ? "pulse 1.5s infinite" : "none",
                  }}
                >
                  {notificationCount}
                </span>
              )}
            </button>

            {activeDropdown === "notifications" && (
              <div
                className="position-absolute end-0 mt-2 p-0 bg-white rounded shadow-lg"
                style={{
                  zIndex: 1000,
                  width: "350px",
                  maxHeight: "400px",
                  overflowY: "auto",
                  border: "1px solid rgba(0,0,0,0.1)",
                  display: "block",
                }}
              >
                <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
                  <h6 className="mb-0 fw-bold text-success">Notifications</h6>
                  <button
                    style={{
                      width: "36px",
                      height: "36px",
                      backgroundColor:
                        activeDropdown === "notifications"
                          ? darkMode
                            ? "var(--grey-blue)"
                            : "var(--tint-4)"
                          : darkMode
                          ? "var(--grey-blue)"
                          : "var(--silver)",
                      color: darkMode ? "var(--tint-5)" : "var(--shade-5)",
                    }}
                    className="btn btn-sm btn-success rounded-none d-flex align-items-center justify-content-center py-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      clearAllNotifications();
                    }}
                    disabled={notifications.length === 0}
                  >
                    Clear
                  </button>
                </div>

                {notifications.length === 0 ? (
                  <div className="text-center py-4 text-muted">
                    <FaBell size={24} className="mb-2" />
                    <p className="mb-0">No new notifications</p>
                  </div>
                ) : (
                  <div className="list-group list-group-flush">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`list-group-item list-group-item-action p-3 ${
                          !notification.read ? "bg-light" : ""
                        }`}
                        style={{
                          cursor: "pointer",
                          borderLeft: !notification.read
                            ? "3px solid #4caf50"
                            : "3px solid transparent",
                          transition: "all 0.2s ease",
                        }}
                        onClick={() => handleNotificationClick(notification.id)}
                      >
                        <div className="d-flex align-items-center">
                          <div className="me-3">
                            <div className="bg-success bg-opacity-10 rounded-circle p-2">
                              <FaBell size={16} className="text-success" />
                            </div>
                          </div>
                          <div className="flex-grow-1">
                            <p className="mb-1">{notification.message}</p>
                            <small className="text-muted">
                              {new Date(
                                notification.timestamp
                              ).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </small>
                          </div>
                          {!notification.read && (
                            <span className="badge bg-success rounded-pill ms-2">
                              New
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="position-relative">
            <button
              className={`btn p-0 rounded-circle d-flex align-items-center justify-content-center ${
                activeDropdown === "profile" ? "active" : ""
              }`}
              style={{
                width: "36px",
                height: "36px",
                backgroundColor:
                  activeDropdown === "profile"
                    ? darkMode
                      ? "var(--grey-blue)"
                      : "var(--tint-4)"
                    : darkMode
                    ? "var(--grey-blue)"
                    : "var(--silver)",
                color: darkMode ? "var(--tint-5)" : "var(--shade-5)",
              }}
              onClick={() => toggleDropdown("profile")}
              aria-expanded={activeDropdown === "profile"}
            >
              {profile.image ? (
                <img 
                  src={profile.image} 
                  alt="Profile" 
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    objectFit: "cover"
                  }}
                />
              ) : (
                <FaUserCircle size={18} className="text-success" />
              )}
            </button>
            {activeDropdown === "profile" && (
              <ul
                className="dropdown-menu shadow-lg border-0 p-2 show"
                style={{
                  position: "absolute",
                  right: 0,
                  left: "auto",
                  margin: "0px",
                  transform: "translate(0px, 8px)",
                  zIndex: 1000,
                  width: "280px",
                  maxHeight: "70vh",
                  overflowY: "auto",
                  overflowX: "hidden",
                  backgroundColor: "#fff",
                  border: "1px solid #e0f7e0",
                  borderRadius: "12px",
                }}
              >
                <li className="p-2 mb-1" style={{ width: "100%" }}>
                  <div
                    className="d-flex align-items-center"
                    style={{ width: "100%" }}
                  >
                    <div className="me-3 flex-shrink-0">
                      <div
                        className="rounded-circle p-2 d-flex align-items-center justify-content-center"
                        style={{
                          backgroundColor: "#e8f5e9",
                          width: "40px",
                          height: "40px",
                        }}
                      >
                        {profile.image ? (
                          <img 
                            src={profile.image} 
                            alt="Profile" 
                            style={{
                              width: "100%",
                              height: "100%",
                              borderRadius: "50%",
                              objectFit: "cover"
                            }}
                          />
                        ) : (
                          <FaUserCircle size={20} className="text-success" />
                        )}
                      </div>
                    </div>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <p className="mb-0 fw-semibold text-truncate">
                        {profile.name}
                      </p>
                      <small className="text-muted text-truncate d-block">
                        {profile.email}
                      </small>
                    </div>
                  </div>
                </li>

                <li>
                  <hr
                    className="dropdown-divider my-1"
                    style={{ borderColor: "#e0f7e0" }}
                  />
                </li>
                <li>
                  <button
                    className="dropdown-item d-flex align-items-center py-2 px-3 rounded w-100 text-start"
                    style={{
                      color: "#2e7d32",
                      transition: "all 0.2s",
                      backgroundColor: "transparent",
                      border: "none",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#e8f5e9")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "transparent")
                    }
                    onClick={() => {
                      Navigate("/workSpace/settings");
                      closeAll();
                    }}
                  >
                    <FaUserCircle className="me-2" /> Profile
                  </button>
                </li>

                <li>
                  <button
                    className="dropdown-item d-flex align-items-center py-2 px-3 rounded w-100 text-start"
                    style={{
                      color: "#2e7d32",
                      transition: "all 0.2s",
                      backgroundColor: "transparent",
                      border: "none",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#e8f5e9")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "transparent")
                    }
                    onClick={() => {
                      Navigate("/workSpace/settings");
                      closeAll();
                    }}
                  >
                    <FaBell className="me-2" /> Notifications
                    {notificationCount > 0 && (
                      <span
                        className="ms-auto badge rounded-pill"
                        style={{
                          backgroundColor: "#4caf50",
                          fontSize: "0.65rem",
                          padding: "4px 6px",
                        }}
                      >
                        {notificationCount}
                      </span>
                    )}
                  </button>
                </li>

                <li>
                  <button
                    className="dropdown-item d-flex align-items-center py-2 px-3 rounded w-100 text-start"
                    style={{
                      color: "#2e7d32",
                      transition: "all 0.2s",
                      backgroundColor: "transparent",
                      border: "none",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#e8f5e9")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "transparent")
                    }
                    onClick={() => {
                      Navigate("/workSpace/settings");
                      closeAll();
                    }}
                  >
                    <FaCog className="me-2" /> Settings
                  </button>
                </li>

                <li>
                  <hr
                    className="dropdown-divider my-1"
                    style={{ borderColor: "#e0f7e0" }}
                  />
                </li>

                <li>
                  <button
                    className="dropdown-item d-flex align-items-center py-2 px-3 rounded w-100 text-start"
                    style={{
                      color: "#d32f2f",
                      transition: "all 0.2s",
                      backgroundColor: "transparent",
                      border: "none",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#ffebee")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "transparent")
                    }
                    onClick={() => {
                      Swal.fire({
                        title: "Logout?",
                        text: "Are you sure you want to logout?",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#4caf50",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, logout!",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          Navigate("/");
                          closeAll();
                        }
                      });
                    }}
                  >
                    <FaSignOutAlt className="me-2" /> Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        .dropdown-item:hover {
          background-color: ${darkMode ? "#333" : "var(--tint-4)"} !important;
        }
        .list-group-item:hover {
          background-color: ${darkMode ? "#333" : "var(--tint-4)"} !important;
        }
      `}</style>
    </nav>
  );
};
export default NavBar;