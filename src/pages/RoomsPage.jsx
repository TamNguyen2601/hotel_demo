import React, { useState } from 'react';
import { ALL_ROOMS, PREMIUM_ROOMS, DOUBLE_ROOMS, SINGLE_ROOMS } from '../data/hotelData';
import BookingModal from '../components/BookingModal';

const formatPrice = (price) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

const FILTERS = [
  { key: 'all', label: '🏨 Tất Cả Phòng', count: 30 },
  { key: 'premium', label: '👑 Phòng Cao Cấp', count: 8 },
  { key: 'standard', label: '🏠 Phòng Tiêu Chuẩn', count: 22 },
  { key: 'double', label: '🛏️ Phòng Đôi', count: 11 },
  { key: 'single', label: '🛏 Phòng Đơn', count: 11 },
];

const getFilteredRooms = (filter) => {
  if (filter === 'all') return ALL_ROOMS;
  if (filter === 'premium') return PREMIUM_ROOMS;
  if (filter === 'standard') return [...DOUBLE_ROOMS, ...SINGLE_ROOMS];
  if (filter === 'double') return DOUBLE_ROOMS;
  if (filter === 'single') return SINGLE_ROOMS;
  return ALL_ROOMS;
};

const RoomCard = ({ room, onViewDetail, onBook }) => (
  <div className="room-card" onClick={() => onViewDetail(room)}>
    <div className="room-card-img-wrap">
      <img src={room.thumbnail} alt={`Phòng ${room.number}`} loading="lazy" />
      <div className="room-card-badges">
        <span className={`badge ${room.type === 'premium' ? 'badge-gold' : 'badge-pink'}`}>
          {room.type === 'premium' ? '👑 Cao Cấp' : room.type === 'double' ? '🛏️ Đôi' : '🛏 Đơn'}
        </span>
        <span className="chip">Tầng {room.floor}</span>
      </div>
      <div className="room-card-status">
        <span className={`badge ${room.available ? 'badge-available' : 'badge-unavailable'}`}>
          {room.available ? '✓ Còn trống' : '✗ Đã đặt'}
        </span>
      </div>
    </div>
    <div className="room-card-body">
      <div className="room-card-number">Phòng {room.number}</div>
      <h3 className="room-card-name">{room.typeName}</h3>
      <p className="room-card-desc">{room.shortDesc}</p>
      <div className="room-card-meta">
        <span>📐 {room.size}m²</span>
        <span>👥 {room.maxGuests} khách</span>
        <span>🛏️ {room.bedType}</span>
      </div>
      <div className="room-card-footer">
        <div className="room-price">
          <span className="room-price-amount">{formatPrice(room.price)}</span>
          <span className="room-price-label">/ đêm</span>
        </div>
        <div className="room-card-actions" onClick={e => e.stopPropagation()}>
          <button
            className="btn btn-outline btn-sm"
            onClick={() => onViewDetail(room)}
          >
            Chi tiết
          </button>
          <button
            className="btn btn-primary btn-sm"
            disabled={!room.available}
            onClick={() => onBook(room)}
            style={!room.available ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
          >
            Đặt Phòng
          </button>
        </div>
      </div>
    </div>
  </div>
);

const RoomsPage = ({ initialFilter = 'all', onViewDetail }) => {
  const [activeFilter, setActiveFilter] = useState(initialFilter);
  const [bookingRoom, setBookingRoom] = useState(null);

  const rooms = getFilteredRooms(activeFilter);

  const floorInfo = {
    1: { label: 'Tầng 1', desc: 'Nhà hàng & Lễ tân', icon: '🍴' },
    2: { label: 'Tầng 2', desc: '8 Phòng Cao Cấp (201–208)', icon: '👑' },
    3: { label: 'Tầng 3', desc: '11 Phòng Đôi Tiêu Chuẩn (301–311)', icon: '🛏️' },
    4: { label: 'Tầng 4', desc: '11 Phòng Đơn Tiêu Chuẩn (401–411)', icon: '🛏' },
    5: { label: 'Tầng 5', desc: '6 Phòng Xông Hơi (601–606)', icon: '🧖' },
  };

  return (
    <>
      {/* Page Header */}
      <div className="page-header">
        <h1>Danh Sách Phòng</h1>
        <p>Chọn phòng nghỉ phù hợp với nhu cầu của bạn tại Mộc Chàm Retreat &amp; Restaurant</p>
      </div>

      {/* Floor Map */}
      <div style={{ background: 'var(--pink-soft)', borderBottom: '1px solid var(--border)', padding: '20px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 4 }}>
            {Object.values(floorInfo).map(f => (
              <div
                key={f.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '8px 16px',
                  background: 'var(--white)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.82rem',
                  whiteSpace: 'nowrap',
                  boxShadow: 'var(--shadow-sm)',
                  flexShrink: 0,
                }}
              >
                <span>{f.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--green-dark)' }}>{f.label}</div>
                  <div style={{ color: 'var(--text-light)' }}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="rooms-filter">
        {FILTERS.map(f => (
          <button
            key={f.key}
            className={`filter-btn ${activeFilter === f.key ? 'active' : ''}`}
            onClick={() => setActiveFilter(f.key)}
          >
            {f.label}
            <span
              style={{
                marginLeft: 6,
                fontSize: '0.75rem',
                background: activeFilter === f.key ? 'rgba(255,255,255,0.2)' : 'var(--pink-mid)',
                padding: '2px 6px',
                borderRadius: 10,
                color: activeFilter === f.key ? 'white' : 'var(--text-light)',
              }}
            >
              {f.count}
            </span>
          </button>
        ))}
      </div>

      {/* Rooms Grid */}
      <div className="container">
        {rooms.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🔍</div>
            <h3>Không tìm thấy phòng</h3>
            <p>Thử thay đổi bộ lọc để xem thêm phòng</p>
          </div>
        ) : (
          <>
            <div style={{ padding: '20px 0 8px', color: 'var(--text-light)', fontSize: '0.9rem' }}>
              Hiển thị <strong style={{ color: 'var(--green-dark)' }}>{rooms.length}</strong> phòng
              {activeFilter !== 'all' && ` — ${FILTERS.find(f => f.key === activeFilter)?.label}`}
            </div>
            <div className="rooms-grid">
              {rooms.map(room => (
                <RoomCard
                  key={room.id}
                  room={room}
                  onViewDetail={onViewDetail}
                  onBook={setBookingRoom}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Booking Modal */}
      {bookingRoom && (
        <BookingModal room={bookingRoom} onClose={() => setBookingRoom(null)} />
      )}
    </>
  );
};

export default RoomsPage;

