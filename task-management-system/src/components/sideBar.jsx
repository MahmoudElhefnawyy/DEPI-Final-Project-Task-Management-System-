import { Link } from 'react-router-dom';
import { FaHome, FaTasks, FaCalendarAlt, FaChartBar, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { useDarkMode } from '../context/DarkModeContext';

const SideBar = () => {
  const { darkMode } = useDarkMode();

  // Base styles
  const baseStyles = {
    width: '250px',
    height: '100vh',
    backgroundColor: darkMode ? '#121212' : '#fff',
    color: darkMode ? '#fff' : '#333',
    borderRight: darkMode ? '1px solid #333' : '1px solid #e0e0e0'
  };

  const iconContainerStyle = {
    width: '36px',
    height: '36px',
    backgroundColor: darkMode ? '#333' : 'whitesmoke',
    border: 'none',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    transition: 'all 0.3s ease'
  };

  const iconStyle = {
    color: darkMode ? '#4CAF50' : '#28a745',
    fontSize: '16px',
    transition: 'all 0.3s ease'
  };

  const menuItemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px 15px',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
    color: darkMode ? '#fff' : '#333',
    marginBottom: '5px',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: darkMode ? '#333' : 'rgba(40, 167, 69, 0.1)'
    },
    ':hover div': {  
      backgroundColor: darkMode ? '#444' : '#e8f5e9'  
    },
    ':hover svg': {  
      color: darkMode ? '#66BB6A' : '#1e7e34'  
    }
  };

  const activeMenuItemStyle = {
    ...menuItemStyle,
    backgroundColor: darkMode ? '#333' : 'rgba(40, 167, 69, 0.1)',
    fontWeight: '500',
    'div': {  
      backgroundColor: darkMode ? '#444' : '#e8f5e9'
    },
    'svg': { 
      color: darkMode ? '#66BB6A' : '#1e7e34'
    }
  };

  const createStyles = (styles) => {
    return Object.entries(styles).reduce((acc, [key, value]) => {
      if (typeof value === 'object') {
        return `${acc}${key}{${createStyles(value)}}`;
      }
      return `${acc}${key.replace(/[A-Z]/g, m => '-' + m.toLowerCase())}:${value};`;
    }, '');
  };

  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 shadow-sm" style={baseStyles}>
      <style>{`
        .sidebar-menu-item {
          ${createStyles(menuItemStyle)}
        }
        .sidebar-menu-item:hover {
          ${createStyles(menuItemStyle[':hover'])}
        }
        .sidebar-menu-item.active {
          ${createStyles(activeMenuItemStyle)}
        }
      `}</style>

      <ul className="nav nav-pills flex-column mb-auto mt-3 gap-4">
        <li className="nav-item">
          <Link to="/workSpace" className="sidebar-menu-item active">
            <div style={iconContainerStyle}>
              <FaHome style={iconStyle} />
            </div>
            <span>Dashboard</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/workSpace/tasks" className="sidebar-menu-item">
            <div style={iconContainerStyle}>
              <FaTasks style={iconStyle} />
            </div>
            <span>My Tasks</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/workSpace/calender" className="sidebar-menu-item">
            <div style={iconContainerStyle}>
              <FaCalendarAlt style={iconStyle} />
            </div>
            <span>Calendar</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/workSpace/analytics" className="sidebar-menu-item">
            <div style={iconContainerStyle}>
              <FaChartBar style={iconStyle} />
            </div>
            <span>Analytics</span>
          </Link>
        </li>
      </ul>
      
      <div className="border-top pt-3" style={{ borderColor: darkMode ? '#333' : '#e0e0e0' }}>
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link to="/workSpace/settings" className="sidebar-menu-item">
              <div style={iconContainerStyle}>
                <FaCog style={iconStyle} />
              </div>
              <span>Settings</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="sidebar-menu-item">
              <div style={iconContainerStyle}>
                <FaSignOutAlt style={iconStyle} />
              </div>
              <span>Sign Out</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;