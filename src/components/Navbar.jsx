import React, { useState, useEffect } from 'react';

const Navbar = ({ currentPage, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = currentPage === 'home';

  return (
    <nav className={`navbar ${scrolled || !isHome ? 'scrolled' : 'transparent'}`}>
      <div className="navbar-inner">
        {/* Logo */}
        <div
          className="navbar-logo"
          onClick={() => onNavigate('home')}
          style={{ cursor: 'pointer' }}
        >
          <img src="/logo.jpg" alt="Mộc Chàm Logo" />
          <div className="navbar-logo-text">
            <span className="navbar-logo-name">Mộc Chàm</span>
            <span className="navbar-logo-sub">Retreat &amp; Restaurant</span>
          </div>
        </div>

        {/* Nav Items */}
        <ul className="navbar-nav">
          <li className="nav-item">
            <span
              className={`nav-link ${['rooms', 'room-detail'].includes(currentPage) ? 'active' : ''}`}
              onClick={() => onNavigate('rooms', { filter: 'all' })}
            >
              🛏️ Đặt Phòng
            </span>
          </li>

          <li className="nav-item">
            <span
              className={`nav-link ${currentPage === 'food' ? 'active' : ''}`}
              onClick={() => onNavigate('food')}
            >
              🍜 Đồ Ăn
            </span>
          </li>

          <li className="nav-item">
            <span
              className={`nav-link ${currentPage === 'spa' ? 'active' : ''}`}
              onClick={() => onNavigate('spa')}
            >
              🧖 Chăm Sóc Sức Khỏe
            </span>
          </li>

          <li className="nav-item">
            <span
              className={`nav-link ${currentPage === 'explore' ? 'active' : ''}`}
              onClick={() => onNavigate('explore')}
            >
              🏨 Khám Phá
            </span>
          </li>

          <li className="nav-item">
            <span
              className="nav-link nav-cta"
              onClick={() => onNavigate('rooms', { filter: 'all' })}
            >
              ✨ Đặt Ngay
            </span>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button className="mobile-toggle" aria-label="Menu">
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
