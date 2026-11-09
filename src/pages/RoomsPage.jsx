import React, { useState, useEffect } from 'react';
import { ALL_ROOMS, PREMIUM_ROOMS, DOUBLE_ROOMS, SINGLE_ROOMS } from '../data/hotelData';
import BookingModal from '../components/BookingModal';

const formatPrice = (price) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

const ROOMS_PER_PAGE = 9;

const FILTERS = [
  { key: 'all',      label: '🏨 Tất Cả Phòng',         count: 30 },
  { key: 'premium',  label: '👑 Phòng Cận Cao Cấp',     count: 8  },
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
          {room.type === 'premium' ? '👑 Cận Cao Cấp' : room.type === 'double' ? '🛏️ Đôi' : '🛏 Đơn'}
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
  const [showHolidaysModal, setShowHolidaysModal] = useState(false);

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
          background: `linear-gradient(rgba(13,61,36,0.65), rgba(13,61,36,0.88)), url('/rooms/phong-can-cao-cap.jpg') center/cover`,
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
          padding: '10px 16px',
          background: '#fffbeb',
          border: '1px solid var(--gold)',
          borderRadius: 'var(--radius-sm)',
          margin: '12px 0',
          fontSize: '0.85rem',
          color: 'var(--text)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          overflowX: 'auto',
        }}>
          <div style={{ whiteSpace: 'nowrap' }}>
            ⚠️ <strong>Lưu ý:</strong> Giá phòng vào các ngày lễ và cuối tuần (T7, CN) là <strong>1.329.000đ</strong> đối với phòng cận cao cấp và <strong>923.000đ</strong> đối với phòng tiêu chuẩn.
          </div>
          <button
            type="button"
            onClick={() => setShowHolidaysModal(true)}
            style={{
              background: '#dc2626',
              color: '#ffffff',
              border: 'none',
              borderRadius: 6,
              padding: '6px 14px',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              boxShadow: '0 2px 6px rgba(220, 38, 38, 0.3)',
              transition: 'background 0.2s, transform 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#b91c1c'}
            onMouseLeave={e => e.currentTarget.style.background = '#dc2626'}
          >
            Danh sách các ngày lễ
          </button>
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

      {/* Pop-up Danh Sách Các Ngày Lễ */}
      {showHolidaysModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowHolidaysModal(false)}
          style={{
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 16,
          }}
        >
          <div
            className="modal"
            onClick={e => e.stopPropagation()}
            style={{
              maxWidth: 580,
              width: '100%',
              borderRadius: 16,
              overflow: 'hidden',
              position: 'relative',
              boxShadow: '0 20px 40px rgba(0,0,0,0.45)',
              border: '2px solid rgba(255,255,255,0.25)',
              padding: 0,
            }}
          >
            {/* Background cờ Việt Nam với lớp phủ gradient đỏ nhẹ */}
            <div
              style={{
                position: 'relative',
                background: `linear-gradient(rgba(185, 28, 28, 0.88), rgba(153, 27, 27, 0.94)), url('/vietnam-flag.svg') center/cover no-repeat`,
                color: '#ffffff',
                padding: '28px 24px 24px',
              }}
            >
              {/* Nút đóng */}
              <button
                type="button"
                onClick={() => setShowHolidaysModal(false)}
                style={{
                  position: 'absolute',
                  top: 14,
                  right: 14,
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.2)',
                  color: '#ffffff',
                  border: 'none',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.35)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                aria-label="Đóng"
              >
                ✕
              </button>

              {/* Tiêu đề */}
              <div style={{ textAlign: 'center', marginBottom: 20 }}>
                <img
                  src="/vietnam-flag.svg"
                  alt="Quốc kỳ Việt Nam"
                  style={{
                    width: 52,
                    height: 35,
                    borderRadius: 4,
                    display: 'inline-block',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                    marginBottom: 10,
                    border: '1px solid rgba(255,255,255,0.3)',
                  }}
                />
                <h3 style={{
                  color: '#fef08a',
                  fontSize: '1.35rem',
                  fontWeight: 700,
                  margin: 0,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                  textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                }}>
                  Danh Sách Các Ngày Lễ Việt Nam
                </h3>
                <p style={{
                  color: 'rgba(255,255,255,0.85)',
                  fontSize: '0.84rem',
                  marginTop: 6,
                  marginBottom: 0,
                }}>
                  Áp dụng giá phòng theo chính sách ngày lễ &amp; cuối tuần tại Việt Nam
                </p>
              </div>

              {/* Danh sách các ngày lễ */}
              <div style={{
                background: 'rgba(0, 0, 0, 0.28)',
                backdropFilter: 'blur(4px)',
                borderRadius: 12,
                padding: '16px 18px',
                border: '1px solid rgba(254, 240, 138, 0.35)',
                display: 'flex',
                flexDirection: 'column',
                gap: 11,
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, lineHeight: 1.5, fontSize: '0.88rem' }}>
                  <span style={{ color: '#fef08a', fontSize: '1rem', marginTop: -1 }}>•</span>
                  <div>
                    <strong style={{ color: '#fef08a' }}>Tết Dương lịch:</strong> 1/1 hàng năm
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, lineHeight: 1.5, fontSize: '0.88rem' }}>
                  <span style={{ color: '#fef08a', fontSize: '1rem', marginTop: -1 }}>•</span>
                  <div>
                    <strong style={{ color: '#fef08a' }}>Tết Nguyên đán (Tết Âm lịch):</strong> Kéo dài từ cuối tháng Chạp đến mùng 4 hoặc mùng 5 tháng Giêng âm lịch (thường nghỉ 5–7 ngày).
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, lineHeight: 1.5, fontSize: '0.88rem' }}>
                  <span style={{ color: '#fef08a', fontSize: '1rem', marginTop: -1 }}>•</span>
                  <div>
                    <strong style={{ color: '#fef08a' }}>Giỗ Tổ Hùng Vương:</strong> Mùng 10 tháng 3 âm lịch (nghỉ 1 ngày).
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, lineHeight: 1.5, fontSize: '0.88rem' }}>
                  <span style={{ color: '#fef08a', fontSize: '1rem', marginTop: -1 }}>•</span>
                  <div>
                    <strong style={{ color: '#fef08a' }}>Ngày Giải phóng miền Nam, thống nhất đất nước:</strong> Ngày 30 tháng 4 dương lịch
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, lineHeight: 1.5, fontSize: '0.88rem' }}>
                  <span style={{ color: '#fef08a', fontSize: '1rem', marginTop: -1 }}>•</span>
                  <div>
                    <strong style={{ color: '#fef08a' }}>Ngày Quốc tế Lao động:</strong> Ngày 1 tháng 5 dương lịch.
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, lineHeight: 1.5, fontSize: '0.88rem' }}>
                  <span style={{ color: '#fef08a', fontSize: '1rem', marginTop: -1 }}>•</span>
                  <div>
                    <strong style={{ color: '#fef08a' }}>Ngày Quốc khánh Việt Nam:</strong> Ngày 2 tháng 9 dương lịch và 1 ngày liền kề trước hoặc sau (nghỉ 2 ngày).
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, lineHeight: 1.5, fontSize: '0.88rem' }}>
                  <span style={{ color: '#fef08a', fontSize: '1rem', marginTop: -1 }}>•</span>
                  <div>
                    <strong style={{ color: '#fef08a' }}>Ngày Văn hóa Việt Nam:</strong> Ngày 24 tháng 11 dương lịch
                  </div>
                </div>
              </div>

              {/* Nút đóng phía dưới */}
              <div style={{ marginTop: 20, textAlign: 'center' }}>
                <button
                  type="button"
                  onClick={() => setShowHolidaysModal(false)}
                  style={{
                    background: '#fef08a',
                    color: '#991b1b',
                    border: 'none',
                    borderRadius: 8,
                    padding: '8px 30px',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
                    transition: 'transform 0.15s, background 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'none'}
                >
                  Đã Hiểu
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RoomsPage;
