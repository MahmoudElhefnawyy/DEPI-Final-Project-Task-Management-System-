import { useRef } from 'react';
import { FaUserCircle, FaBell, FaGear, FaSignOutAlt } from 'react-icons/fa';
import { useNotification } from '../context/notificationContext';
import { useDropdown } from '../context/dropdownContext';

const ProfileDropdown = ({ user }) => {
  const { notificationCount } = useNotification();
  const { activeDropdown, toggleDropdown, closeAll } = useDropdown();
  const dropdownRef = useRef(null);
  const isOpen = activeDropdown === 'profile';

  const handleItemClick = (action) => {
    console.log(`${action} clicked`);
    closeAll();
  };

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button 
        className="btn p-0 rounded-circle d-flex align-items-center justify-content-center"
        style={{ 
          width: '36px', 
          height: '36px', 
          backgroundColor: isOpen ? '#e8f5e9' : 'whitesmoke',
          transition: 'all 0.3s ease'
        }}
        onClick={() => toggleDropdown('profile')}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <FaUserCircle size={18} className="text-success" />
      </button>
      
      {isOpen && (
        <ul 
          className="dropdown-menu dropdown-menu-end shadow-lg border-0 p-2 show"
          style={{
            minWidth: '220px',
            backgroundColor: '#f8fff8',
            border: '1px solid #e0f7e0',
            borderRadius: '12px',
            display: 'block',
            position: 'absolute',
            inset: '0px auto auto 0px',
            margin: '0px',
            transform: 'translate(0px, 40px)'
          }}
        >
          <li className="p-2 mb-1">
            <div className="d-flex align-items-center">
              <div className="me-3">
                <div className="rounded-circle p-2 d-flex align-items-center justify-content-center"
                     style={{
                       backgroundColor: '#e8f5e9',
                       width: '40px',
                       height: '40px'
                     }}>
                  <FaUserCircle size={20} className="text-success" />
                </div>
              </div>
              <div>
                <p className="mb-0 fw-semibold">{user.name}</p>
                <small className="text-muted">{user.role}</small>
              </div>
            </div>
          </li>
          
          <li><hr className="dropdown-divider my-1" style={{ borderColor: '#e0f7e0' }} /></li>
          
          <DropdownItem 
            icon={<FaUserCircle />} 
            label="Profile" 
            onClick={() => handleItemClick('Profile')} 
          />
          <DropdownItem 
            icon={<FaBell />} 
            label="Notifications"
            badge={notificationCount > 0 ? notificationCount : null}
            onClick={() => handleItemClick('Notifications')}
          />
          <DropdownItem 
            icon={<FaGear />} 
            label="Settings" 
            onClick={() => handleItemClick('Settings')}
          />
          
          <li><hr className="dropdown-divider my-1" style={{ borderColor: '#e0f7e0' }} /></li>
          
          <DropdownItem 
            icon={<FaSignOutAlt />} 
            label="Logout" 
            isDestructive
            onClick={() => handleItemClick('Logout')}
          />
        </ul>
      )}
    </div>
  );
};

const DropdownItem = ({ icon, label, badge = null, isDestructive = false, onClick }) => {
  const textColor = isDestructive ? '#d32f2f' : '#2e7d32';
  const hoverBg = isDestructive ? '#ffebee' : '#e8f5e9';
  
  return (
    <li>
      <button 
        className="dropdown-item d-flex align-items-center py-2 px-3 rounded w-100 text-start"
        style={{
          color: textColor,
          transition: 'all 0.2s',
          backgroundColor: 'transparent',
          border: 'none'
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = hoverBg}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        onClick={onClick}
      >
        <span className="me-2" style={{ width: '20px' }}>{icon}</span>
        {label}
        {badge && (
          <span className="ms-auto badge rounded-pill" 
                style={{ 
                  backgroundColor: '#4caf50',
                  fontSize: '0.65rem',
                  padding: '4px 6px'
                }}>
            {badge}
          </span>
        )}
      </button>
    </li>
  );
};

export default ProfileDropdown;