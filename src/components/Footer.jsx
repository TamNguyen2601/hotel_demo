import React from 'react';
import { HOTEL_INFO } from '../data/hotelData';

const Footer = ({ onNavigate }) => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <img src="/logo.jpg" alt="Mộc Chàm" />
            <div className="footer-brand-name">Mộc Chàm</div>
            <div className="footer-brand-sub">Retreat & Restaurant</div>
            <p style={{ marginTop: 12 }}>
              Điểm đến nghỉ dưỡng độc đáo giữa lòng Cao Bằng — nơi hội tụ văn hóa bản địa,
              ẩm thực đặc sản và dịch vụ chăm sóc sức khỏe cao cấp.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4>Khám Phá</h4>
            <ul>
              <li onClick={() => onNavigate('home')}>Trang Chủ</li>
              <li onClick={() => onNavigate('explore')}>Khám Phá Khách Sạn</li>
              <li onClick={() => onNavigate('rooms', { filter: 'premium' })}>Phòng Cao Cấp</li>
              <li onClick={() => onNavigate('rooms', { filter: 'standard' })}>Phòng Tiêu Chuẩn</li>
              <li onClick={() => onNavigate('food')}>Nhà Hàng</li>
              <li onClick={() => onNavigate('spa')}>Chăm Sóc Sức Khỏe</li>
            </ul>
          </div>

          {/* Cao Bang */}
          <div className="footer-col">
            <h4>Cao Bằng</h4>
            <ul>
              <li>Thác Bản Giốc</li>
              <li>Hồ Thang Hen</li>
              <li>Núi Mắt Thần</li>
              <li>Động Ngườm Ngao</li>
              <li>Khu Di Tích Pác Bó</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4>Liên Hệ</h4>
            <div className="footer-contact-item">
              <span>📍</span>
              <span>{HOTEL_INFO.address}</span>
            </div>
            <div className="footer-contact-item">
              <span>📞</span>
              <span>{HOTEL_INFO.phone}</span>
            </div>
            <div className="footer-contact-item">
              <span>✉️</span>
              <span>{HOTEL_INFO.email}</span>
            </div>
            <div className="footer-contact-item">
              <span>🕐</span>
              <span>Check-in: 14:00 — Check-out: 12:00</span>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', width: '100%', flexWrap: 'wrap', gap: 8 }}>
          <span>© 2024 Mộc Chàm Retreat &amp; Restaurant. Bảo lưu mọi quyền.</span>
          <span style={{ color: 'var(--gold-light)' }}>Thiết kế với ♥ tại Cao Bằng</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

