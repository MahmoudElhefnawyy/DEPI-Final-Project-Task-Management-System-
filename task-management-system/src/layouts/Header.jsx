import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import SEO from '../components/SEO';
import logo from '../assets/images/logo.png';
import TaskLeed from '../assets/images/TaskLeed.png';
import '../styles/Header.css';
import '../styles/global.css';

const Header = () => {
  const location = useLocation();

  return (
    <>
      <SEO path={location.pathname} />
      <header className="shadow-sm" style={{backgroundColor:'whitesmoke',position:'fixed',width:'100%',zIndex:'100'}}>
        <div className="mx-5">
          <nav className="navbar navbar-expand-lg">
            <div className="container-fluid p-0">
              <div className="d-flex align-items-center" >
                <img src={logo} alt="logo" className="img-fluid" style={{ width: '60px', padding: '7px' }} />
                <img src={TaskLeed} alt="TaskLeed" className="img-fluid" style={{ width: '120px', cursor:'pointer'}} />
              </div>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto mb-1 mb-lg-0 headline-4" style={{ gap: '4rem', marginRight:'50px' }}>
                  <li className="nav-item">
                    <NavLink
                      to='/'
                      className={({ isActive }) =>
                        `nav-link fs-4 ${isActive ? 'active-link' : ''}`
                      }
                    >
                      Home
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to='/Services'
                      className={({ isActive }) =>
                        `nav-link fs-4 ${isActive ? 'active-link' : ''}`
                      }
                    >
                      Services
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to='/Features'
                      className={({ isActive }) =>
                        `nav-link fs-4 ${isActive ? 'active-link' : ''}`
                      }
                    >
                      Features
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to='/About'
                      className={({ isActive }) =>
                        `nav-link fs-4 ${isActive ? 'active-link' : ''}`
                      }
                    >
                      About
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to='/Contact'
                      className={({ isActive }) =>
                        `nav-link fs-4 ${isActive ? 'active-link' : ''}`
                      }
                    >
                      Contact
                    </NavLink>
                  </li>
                </ul>
                <Link to='/signup'>
                  <button className="btn px-4 fs-5 py-0 " style={{backgroundColor:'green',color:'white',fontWeight:'400'}}>
                    Start Now
                  </button>
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;