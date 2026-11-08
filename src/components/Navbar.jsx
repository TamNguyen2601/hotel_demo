import React, { useState, useEffect } from 'react';

const Navbar = ({ currentPage, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [roomDropdownOpen, setRoomDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = currentPage === 'home';

  const handleRoomClick = (filter) => {
    setRoomDropdownOpen(false);
    onNavigate('rooms', { filter });
  };

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
          {/* Đặt Phòng với Dropdown */}
          <li
            className="nav-item"
            onMouseEnter={() => setRoomDropdownOpen(true)}
            onMouseLeave={() => setRoomDropdownOpen(false)}
          >
            <span
              className={`nav-link ${['rooms', 'room-detail'].includes(currentPage) ? 'active' : ''}`}
              onClick={() => handleRoomClick('all')}
            >
              🛏️ Đặt Phòng
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </span>
            <div className={`dropdown ${roomDropdownOpen ? 'open' : ''}`}>
              <div className="dropdown-item" onClick={() => handleRoomClick('premium')}>
                <span className="dropdown-item-icon">👑</span>
                <div className="dropdown-item-info">
                  <strong>Phòng Cao Cấp</strong>
                  <span>8 phòng • Tầng 2 • 28–30m²</span>
                </div>
              </div>
              <div className="dropdown-item" onClick={() => handleRoomClick('double')}>
                <span className="dropdown-item-icon">🛏️</span>
                <div className="dropdown-item-info">
                  <strong>Phòng Đôi Tiêu Chuẩn</strong>
                  <span>11 phòng • Tầng 3 • 23–24m²</span>
                </div>
              </div>
              <div className="dropdown-item" onClick={() => handleRoomClick('single')}>
                <span className="dropdown-item-icon">🛏</span>
                <div className="dropdown-item-info">
                  <strong>Phòng Đơn Tiêu Chuẩn</strong>
                  <span>11 phòng • Tầng 4 • 22–24m²</span>
                </div>
              </div>
              <div className="dropdown-item" onClick={() => handleRoomClick('all')}>
                <span className="dropdown-item-icon">🏨</span>
                <div className="dropdown-item-info">
                  <strong>Tất Cả Phòng</strong>
                  <span>30 phòng các loại</span>
                </div>
              </div>
            </div>
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
              onClick={() => handleRoomClick('all')}
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
