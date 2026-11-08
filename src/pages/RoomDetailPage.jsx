import React, { useState } from 'react';
import BookingModal from '../components/BookingModal';

const formatPrice = (price) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

const RoomDetailPage = ({ room, onBack, onNavigateToRooms }) => {
  const [activeImg, setActiveImg] = useState(0);
  const [bookingRoom, setBookingRoom] = useState(null);

  if (!room) return null;

  return (
    <>
      {/* Page Header */}
      <div className="page-header" style={{ padding: '90px 0 40px', textAlign: 'left' }}>
        <div className="container">
          <div
            className="back-btn"
            style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 16 }}
            onClick={onBack}
          >
            ← Quay lại danh sách phòng
          </div>
          <h1 style={{ color: 'white', marginBottom: 8 }}>
            Phòng {room.number} — {room.typeName}
          </h1>
          <p style={{ opacity: 0.85 }}>Tầng {room.floor} · {room.size}m² · Tối đa {room.maxGuests} khách</p>
        </div>
      </div>

      <div className="container">
        <div className="room-detail-layout">
          {/* LEFT: Gallery + Info */}
          <div>
            {/* Gallery */}
            <div className="room-gallery">
              <div className="room-gallery-main">
                <img
                  src={room.images[activeImg]}
                  alt={`Phòng ${room.number} - ảnh ${activeImg + 1}`}
                />
              </div>
              <div className="room-gallery-thumbs">
                {room.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`Góc ${i + 1}`}
                    className={i === activeImg ? 'active' : ''}
                    onClick={() => setActiveImg(i)}
                    loading="lazy"
                  />
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="room-detail-info">
              <div className="room-detail-badges">
                <span className={`badge ${room.type === 'premium' ? 'badge-gold' : 'badge-pink'}`}>
                  {room.type === 'premium' ? '👑 Phòng Cao Cấp' : '🏠 Phòng Tiêu Chuẩn'}
                </span>
                <span className={`badge ${room.available ? 'badge-available' : 'badge-unavailable'}`}>
                  {room.available ? '✓ Còn Phòng' : '✗ Đã Đặt'}
                </span>
                <span className="chip">📐 {room.size}m²</span>
                <span className="chip">🛏️ {room.bedType}</span>
                <span className="chip">👥 {room.maxGuests} khách</span>
                <span className="chip">🏢 Tầng {room.floor}</span>
              </div>

              <p className="room-detail-desc">{room.description}</p>

              {/* Amenities */}
              <div className="room-amenities">
                <h3>Tiện Nghi Phòng</h3>
                <div className="amenities-list">
                  {room.amenities.map((a, i) => (
                    <div key={i} className="amenity-item">{a}</div>
                  ))}
                </div>
              </div>

              {/* Mobile Book Button */}
              <div style={{ marginTop: 32, display: 'flex', gap: 12 }}>
                <button
                  className="btn btn-gold btn-lg w-full"
                  disabled={!room.available}
                  onClick={() => setBookingRoom(room)}
                  style={!room.available ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
                >
                  🎉 {room.available ? 'Đặt Phòng Ngay' : 'Phòng Đã Được Đặt'}
                </button>
                <button className="btn btn-outline" onClick={onBack}>
                  ← Quay Lại
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: Booking Sidebar */}
          <div>
            <div className="booking-sidebar">
              <div className="booking-sidebar-price">
                <div style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginBottom: 4 }}>Giá chỉ từ</div>
                <div className="price-main">{formatPrice(room.price)}</div>
                <div className="price-label">/ đêm (ngày thường)</div>
                <div style={{ marginTop: 8, fontSize: '0.85rem', color: 'var(--text-light)' }}>
                  Cuối tuần: <strong style={{ color: 'var(--green-primary)' }}>{formatPrice(room.priceWeekend)}</strong>
                </div>
              </div>

              <div style={{ marginBottom: 20 }}>
                {[
                  { icon: '📐', label: 'Diện tích', value: `${room.size}m²` },
                  { icon: '🛏️', label: 'Giường', value: room.bedType },
                  { icon: '👥', label: 'Sức chứa', value: `${room.maxGuests} khách` },
                  { icon: '🏢', label: 'Tầng', value: `Tầng ${room.floor}` },
                  { icon: '🕐', label: 'Check-in', value: '14:00' },
                  { icon: '🕛', label: 'Check-out', value: '12:00' },
                ].map(item => (
                  <div
                    key={item.label}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '8px 0',
                      borderBottom: '1px solid var(--border)',
                      fontSize: '0.88rem',
                    }}
                  >
                    <span style={{ color: 'var(--text-light)' }}>{item.icon} {item.label}</span>
                    <strong style={{ color: 'var(--text)' }}>{item.value}</strong>
                  </div>
                ))}
              </div>

              <button
                className="btn btn-gold w-full"
                disabled={!room.available}
                onClick={() => setBookingRoom(room)}
                style={{
                  justifyContent: 'center',
                  fontSize: '1rem',
                  padding: '14px',
                  opacity: !room.available ? 0.5 : 1,
                  cursor: !room.available ? 'not-allowed' : 'pointer',
                  width: '100%',
                }}
              >
                🎉 {room.available ? 'Đặt Phòng Ngay' : 'Phòng Đã Được Đặt'}
              </button>

              {room.available && (
                <p style={{ textAlign: 'center', fontSize: '0.78rem', color: 'var(--text-light)', marginTop: 10 }}>
                  🔒 Thanh toán an toàn tại khách sạn · Miễn phí huỷ trước 24h
                </p>
              )}

              <div style={{ marginTop: 20, padding: 16, background: 'var(--pink-soft)', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--green-dark)', marginBottom: 8 }}>
                  📞 Tư vấn trực tiếp
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-light)' }}>
                  Hotline: <a href="tel:02631234567" style={{ color: 'var(--green-primary)', fontWeight: 600 }}>0263 123 4567</a>
                </div>
              </div>
            </div>

            {/* Other rooms suggestion */}
            <div style={{ marginTop: 24, padding: 20, background: 'var(--white)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border)' }}>
              <h4 style={{ color: 'var(--green-dark)', marginBottom: 12, fontSize: '0.95rem' }}>
                🏨 Phòng Khác
              </h4>
              <button className="btn btn-outline btn-sm w-full" style={{ justifyContent: 'center', marginBottom: 8 }}
                onClick={onNavigateToRooms}>
                Xem tất cả phòng
              </button>
            </div>
          </div>
        </div>
      </div>

      {bookingRoom && (
        <BookingModal room={bookingRoom} onClose={() => setBookingRoom(null)} />
      )}
    </>
  );
};

export default RoomDetailPage;
