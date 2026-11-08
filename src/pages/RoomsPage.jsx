import React, { useState, useEffect } from 'react';
import { ALL_ROOMS, PREMIUM_ROOMS, DOUBLE_ROOMS, SINGLE_ROOMS } from '../data/hotelData';
import BookingModal from '../components/BookingModal';

const formatPrice = (price) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

const ROOMS_PER_PAGE = 9;

const FILTERS = [
  { key: 'all',      label: '🏨 Tất Cả Phòng',         count: 30 },
  { key: 'premium',  label: '👑 Phòng Cao Cấp',         count: 8  },
  { key: 'standard', label: '🏠 Phòng Tiêu Chuẩn',     count: 22 },
  { key: 'double',   label: '🛏️ Phòng Đôi',            count: 11 },
  { key: 'single',   label: '🛏 Phòng Đơn',             count: 11 },
];

const getFilteredRooms = (filter) => {
  if (filter === 'all')      return ALL_ROOMS;
  if (filter === 'premium')  return PREMIUM_ROOMS;
  if (filter === 'standard') return [...DOUBLE_ROOMS, ...SINGLE_ROOMS];
  if (filter === 'double')   return DOUBLE_ROOMS;
  if (filter === 'single')   return SINGLE_ROOMS;
  return ALL_ROOMS;
};

const RoomCard = ({ room, isBooked, onViewDetail, onBook }) => (
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
        <span className={`badge ${!isBooked ? 'badge-available' : 'badge-unavailable'}`}>
          {!isBooked ? '✓ Còn trống' : '✗ Đã đặt'}
        </span>
      </div>
    </div>

    <div className="room-card-body">
      <div className="room-card-number">Phòng {room.number}</div>
      <h3 className="room-card-name">{room.typeName}</h3>
      <div className="room-card-features">
        {room.shortDesc.split('\n').map((line, idx) => (
          <div key={idx} className="room-card-feature-item">
            <span className="feature-bullet">•</span>
            <span>{line.trim()}</span>
          </div>
        ))}
      </div>
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
          <button className="btn btn-outline btn-sm" onClick={() => onViewDetail(room)}>
            Chi tiết
          </button>
          <button
            className="btn btn-primary btn-sm"
            disabled={isBooked}
            onClick={() => !isBooked && onBook(room)}
            style={isBooked ? { opacity: 0.45, cursor: 'not-allowed' } : {}}
          >
            {isBooked ? 'Đã Đặt' : 'Đặt Phòng'}
          </button>
        </div>
      </div>
    </div>
  </div>
);

const RoomsPage = ({ initialFilter = 'all', onViewDetail, bookedRoomIds = new Set(), onBookingConfirmed, onNavigate }) => {
  const [activeFilter, setActiveFilter] = useState(initialFilter);
  const [currentPage, setCurrentPage] = useState(1);
  const [bookingRoom, setBookingRoom] = useState(null);

  useEffect(() => {
    setActiveFilter(initialFilter);
    setCurrentPage(1);
  }, [initialFilter]);

  const handleFilterChange = (filterKey) => {
    setActiveFilter(filterKey);
    setCurrentPage(1);
  };

  const rooms = getFilteredRooms(activeFilter);
  const totalPages = Math.ceil(rooms.length / ROOMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ROOMS_PER_PAGE;
  const paginatedRooms = rooms.slice(startIndex, startIndex + ROOMS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Page Header */}
      <div
        className="page-header"
        style={{
          background: `linear-gradient(rgba(13,61,36,0.65), rgba(13,61,36,0.88)), url('https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1600&q=80') center/cover`,
        }}
      >
        <h1>Danh Sách Phòng</h1>
        <p style={{ maxWidth: '850px', whiteSpace: 'nowrap' }}>
          Chọn phòng nghỉ phù hợp với nhu cầu của bạn tại Mộc Chàm Retreat &amp; Restaurant
        </p>
      </div>

      {/* Filters */}
      <div className="rooms-filter">
        {FILTERS.map(f => (
          <button
            key={f.key}
            className={`filter-btn ${activeFilter === f.key ? 'active' : ''}`}
            onClick={() => handleFilterChange(f.key)}
          >
            {f.label}
            <span style={{
              marginLeft: 6, fontSize: '0.72rem', padding: '2px 6px', borderRadius: 10,
              background: activeFilter === f.key ? 'rgba(255,255,255,0.2)' : 'var(--pink-mid)',
              color: activeFilter === f.key ? 'white' : 'var(--text-light)',
            }}>
              {f.count}
            </span>
          </button>
        ))}
      </div>

      {/* Rooms Grid */}
      <div className="container">
        <div style={{
          padding: '12px 16px',
          background: '#fffbeb',
          border: '1px solid var(--gold)',
          borderRadius: 'var(--radius-sm)',
          margin: '12px 0',
          fontSize: '0.88rem',
          color: 'var(--text)',
          lineHeight: 1.6,
        }}>
          ⚠️ <strong>Lưu ý:</strong> Giá phòng vào các ngày cuối tuần (T7, CN) là <strong>1.329.000đ</strong> đối với phòng cao cấp và <strong>923.000đ</strong> đối với phòng tiêu chuẩn.
        </div>

        {rooms.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🔍</div>
            <h3>Không tìm thấy phòng</h3>
            <p>Thử thay đổi bộ lọc để xem thêm phòng</p>
          </div>
        ) : (
          <>
            <div className="rooms-grid">
              {paginatedRooms.map(room => (
                <RoomCard
                  key={room.id}
                  room={room}
                  isBooked={bookedRoomIds.has(room.id)}
                  onViewDetail={onViewDetail}
                  onBook={setBookingRoom}
                />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="pagination">
                <button
                  className="pagination-btn"
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  aria-label="Trang trước"
                >
                  ← Trước
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                ))}

                <button
                  className="pagination-btn"
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                  aria-label="Trang sau"
                >
                  Sau →
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Booking Modal */}
      {bookingRoom && (
        <BookingModal
          room={bookingRoom}
          onClose={() => setBookingRoom(null)}
          onBookingConfirmed={(id) => {
            if (onBookingConfirmed) onBookingConfirmed(id);
            // Không đóng modal ở đây - để modal tự hiện màn hình thành công
            // Modal sẽ đóng khi user bấm nút "Đóng" trong success screen
          }}
          onNavigate={onNavigate}
        />
      )}
    </>
  );
};

export default RoomsPage;
