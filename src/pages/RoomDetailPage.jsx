import React, { useState } from 'react';
import BookingModal from '../components/BookingModal';

const formatPrice = (price) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

const RoomDetailPage = ({ room, isBooked, onBack, onNavigateToRooms, onBookingConfirmed, onNavigate }) => {
  const [activeImg, setActiveImg] = useState(0);
  const [bookingRoom, setBookingRoom] = useState(null);

  if (!room) return null;

  // isBooked: passed from App.jsx (global state)
  const roomIsBooked = isBooked || false;

  return (
    <>
      {/* Page Header */}
      <div style={{
        background: 'var(--white)',
        padding: '95px 0 20px',
        textAlign: 'left',
        borderBottom: '2px solid var(--green-primary)',
      }}>
        <div className="container">
          <div
            className="back-btn"
            style={{ color: 'var(--green-primary)', marginBottom: 8, fontSize: '0.85rem' }}
            onClick={onBack}
          >
            ← Quay lại danh sách phòng
          </div>
          <h1 style={{ color: 'var(--green-dark)', fontSize: 'clamp(1.3rem, 2.8vw, 1.8rem)', marginBottom: 6 }}>
            Phòng {room.number} — {room.typeName}
          </h1>
          <p style={{ color: 'var(--text-light)', fontSize: '0.88rem' }}>
            Tầng {room.floor} · {room.size}m² · Tối đa {room.maxGuests} khách
          </p>
        </div>
      </div>

      <div className="container">
        <div className="room-detail-layout">
          {/* LEFT: Gallery + Info */}
          <div>
            {/* Gallery */}
            <div className="room-gallery">
              <div className="room-gallery-main">
                <img src={room.images[activeImg] || room.thumbnail} alt={`Phòng ${room.number}`} />
              </div>
              {room.images && room.images.length > 1 && (
                <div className="room-gallery-thumbs">
                  {room.images.map((img, i) => (
                    <img key={i} src={img} alt={`Góc ${i + 1}`}
                      className={i === activeImg ? 'active' : ''}
                      onClick={() => setActiveImg(i)} loading="lazy" />
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="room-detail-info">
              <div className="room-detail-badges">
                <span className={`badge ${room.type === 'premium' ? 'badge-gold' : 'badge-pink'}`}>
                  {room.type === 'premium' ? '👑 Phòng Cận Cao Cấp' : '🏠 Phòng Tiêu Chuẩn'}
                </span>
                <span className={`badge ${!roomIsBooked ? 'badge-available' : 'badge-unavailable'}`}>
                  {!roomIsBooked ? '✓ Còn Phòng' : '✗ Đã Đặt'}
                </span>
                <span className="chip">📐 {room.size}m²</span>
                <span className="chip">🛏️ {room.bedType}</span>
                <span className="chip">👥 {room.maxGuests} khách</span>
                <span className="chip">🏢 Tầng {room.floor}</span>
              </div>

              <p className="room-detail-desc">{room.description}</p>

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
                  disabled={roomIsBooked}
                  onClick={() => !roomIsBooked && setBookingRoom(room)}
                  style={{
                    justifyContent: 'center',
                    ...(roomIsBooked ? { opacity: 0.45, cursor: 'not-allowed' } : {}),
                  }}
                >
                  🎉 {!roomIsBooked ? 'Đặt Phòng Ngay' : 'Phòng Đã Được Đặt'}
                </button>
                <button className="btn btn-outline" onClick={onBack}>← Quay Lại</button>
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
                  Ngày lễ &amp; Cuối tuần: <strong style={{ color: 'var(--green-primary)' }}>{formatPrice(room.priceWeekend)}</strong>
                </div>
              </div>

              <div style={{ marginBottom: 20 }}>
                {[
                  { icon: '📐', label: 'Diện tích', value: `${room.size}m²` },
                  { icon: '🛏️', label: 'Giường',    value: room.bedType },
                  { icon: '👥', label: 'Sức chứa',   value: `${room.maxGuests} khách` },
                  { icon: '🏢', label: 'Tầng',        value: `Tầng ${room.floor}` },
                  { icon: '🕐', label: 'Check-in',   value: '14:00' },
                  { icon: '🕛', label: 'Check-out',  value: '12:00' },
                ].map(item => (
                  <div key={item.label} style={{
                    display: 'flex', justifyContent: 'space-between',
                    padding: '8px 0', borderBottom: '1px solid var(--border)', fontSize: '0.88rem',
                  }}>
                    <span style={{ color: 'var(--text-light)' }}>{item.icon} {item.label}</span>
                    <strong style={{ color: 'var(--text)' }}>{item.value}</strong>
                  </div>
                ))}
              </div>

              <button
                disabled={roomIsBooked}
                onClick={() => !roomIsBooked && setBookingRoom(room)}
                style={{
                  width: '100%', display: 'flex', justifyContent: 'center',
                  alignItems: 'center', fontSize: '1rem', padding: '14px',
                  borderRadius: 'var(--radius-sm)', border: 'none', cursor: roomIsBooked ? 'not-allowed' : 'pointer',
                  background: roomIsBooked
                    ? 'var(--border)'
                    : 'linear-gradient(135deg, var(--gold), var(--gold-light))',
                  color: roomIsBooked ? 'var(--text-light)' : 'var(--dark)',
                  fontWeight: 700, fontFamily: 'inherit', transition: 'all 0.3s',
                  opacity: roomIsBooked ? 0.6 : 1,
                }}
              >
                🎉 {!roomIsBooked ? 'Đặt Phòng Ngay' : 'Phòng Đã Được Đặt'}
              </button>

              {!roomIsBooked && (
                <p style={{ textAlign: 'center', fontSize: '0.78rem', color: 'var(--text-light)', marginTop: 10 }}>
                  🔒 Thanh toán an toàn tại khách sạn · Miễn phí huỷ trước 24h
                </p>
              )}

              {roomIsBooked && (
                <div style={{ marginTop: 12, padding: '12px 16px', background: '#fef2f2', borderRadius: 'var(--radius-sm)', border: '1px solid #fecaca', fontSize: '0.82rem', color: '#991b1b', textAlign: 'center' }}>
                  Phòng này đã được đặt trong phiên hiện tại
                </div>
              )}

              <div style={{ marginTop: 16, padding: 16, background: 'var(--pink-soft)', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--green-dark)', marginBottom: 6 }}>
                  📞 Tư vấn trực tiếp
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-light)' }}>
                  Hotline: <a href="tel:0868111126" style={{ color: 'var(--green-primary)', fontWeight: 600 }}>0868 111 126</a>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 20, padding: 20, background: 'var(--white)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border)' }}>
              <h4 style={{ color: 'var(--green-dark)', marginBottom: 12, fontSize: '0.9rem' }}>🏨 Xem Phòng Khác</h4>
              <button className="btn btn-outline btn-sm w-full" style={{ justifyContent: 'center' }}
                onClick={onNavigateToRooms}>
                Tất cả phòng →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {bookingRoom && (
        <BookingModal
          room={bookingRoom}
          onClose={() => setBookingRoom(null)}
          onBookingConfirmed={(id) => {
            if (onBookingConfirmed) onBookingConfirmed(id);
            // Không đóng modal ở đây - để modal tự hiện màn hình thành công
          }}
          onNavigate={onNavigate}
        />
      )}
    </>
  );
};

export default RoomDetailPage;
