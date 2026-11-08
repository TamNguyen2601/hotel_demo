import React, { useState } from 'react';
import { MENU_ITEMS, SAUNA_PACKAGES } from '../data/hotelData';

const formatPrice = (price) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

const BookingModal = ({ room, onClose }) => {
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    notes: '',
  });

  const [foodService, setFoodService] = useState(false);
  const [saunaService, setSaunaService] = useState(false);
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [selectedSauna, setSelectedSauna] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const toggleFood = (id) => {
    setSelectedFoods(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const calcNights = () => {
    if (!form.checkIn || !form.checkOut) return 1;
    const d = (new Date(form.checkOut) - new Date(form.checkIn)) / 86400000;
    return d > 0 ? d : 1;
  };

  const calcTotal = () => {
    const nights = calcNights();
    let total = room.price * nights;
    if (foodService) {
      selectedFoods.forEach(id => {
        const item = MENU_ITEMS.find(m => m.id === id);
        if (item) total += item.price;
      });
    }
    if (saunaService && selectedSauna) {
      const pkg = SAUNA_PACKAGES.find(s => s.id === selectedSauna);
      if (pkg) total += pkg.price;
    }
    return total;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal" onClick={e => e.stopPropagation()}>
          <div className="success-box">
            <div className="success-icon">🎉</div>
            <h3>Đặt Phòng Thành Công!</h3>
            <p>
              Cảm ơn <strong>{form.fullName}</strong>! Yêu cầu đặt phòng <strong>{room.number}</strong> của
              bạn đã được ghi nhận.<br />
              Chúng tôi sẽ liên hệ xác nhận trong vòng 2 giờ qua số <strong>{form.phone}</strong>.
            </p>
            <div style={{ background: 'var(--pink-soft)', borderRadius: 'var(--radius-sm)', padding: '16px 24px', marginBottom: 24, textAlign: 'left', display: 'inline-block', minWidth: 280 }}>
              <div className="price-summary-row">
                <span>Phòng {room.number} — {calcNights()} đêm</span>
                <span>{formatPrice(room.price * calcNights())}</span>
              </div>
              {foodService && selectedFoods.length > 0 && (
                <div className="price-summary-row"><span>Dịch vụ ăn uống</span><span>✓</span></div>
              )}
              {saunaService && selectedSauna && (
                <div className="price-summary-row"><span>Xông hơi</span><span>✓</span></div>
              )}
              <div className="price-summary-row total">
                <span>Tổng cộng</span>
                <span style={{ color: 'var(--green-primary)' }}>{formatPrice(calcTotal())}</span>
              </div>
            </div>
            <br />
            <button className="btn btn-primary" onClick={onClose}>Đóng</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div>
            <h2>Đặt Phòng {room.number}</h2>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-light)', marginTop: 4 }}>
              {room.typeName} — {formatPrice(room.price)}/đêm
            </p>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {/* Thông tin cá nhân */}
            <div className="form-section">
              <div className="form-section-title">👤 Thông Tin Khách Hàng</div>
              <div className="form-row">
                <div className="form-group">
                  <label>Họ và Tên *</label>
                  <input
                    type="text"
                    placeholder="Nguyễn Văn A"
                    value={form.fullName}
                    onChange={e => setForm({ ...form, fullName: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Số Điện Thoại *</label>
                  <input
                    type="tel"
                    placeholder="0912 345 678"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="form-row single">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="email@example.com"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Thông tin phòng */}
            <div className="form-section">
              <div className="form-section-title">🛏️ Thông Tin Đặt Phòng</div>
              <div className="form-row">
                <div className="form-group">
                  <label>Ngày Nhận Phòng *</label>
                  <input
                    type="date"
                    value={form.checkIn}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={e => setForm({ ...form, checkIn: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Ngày Trả Phòng *</label>
                  <input
                    type="date"
                    value={form.checkOut}
                    min={form.checkIn || new Date().toISOString().split('T')[0]}
                    onChange={e => setForm({ ...form, checkOut: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Số Khách</label>
                  <select
                    value={form.guests}
                    onChange={e => setForm({ ...form, guests: Number(e.target.value) })}
                  >
                    {Array.from({ length: room.maxGuests }, (_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1} người</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Phòng</label>
                  <input type="text" value={`Phòng ${room.number} — ${room.typeName}`} readOnly
                    style={{ background: 'var(--pink-soft)', cursor: 'not-allowed' }} />
                </div>
              </div>
            </div>

            {/* Dịch vụ đi kèm */}
            <div className="form-section">
              <div className="form-section-title">✨ Dịch Vụ Đi Kèm <span style={{ fontSize: '0.78rem', fontWeight: 400, color: 'var(--text-light)' }}>(tuỳ chọn)</span></div>

              {/* Food service toggle */}
              <div
                className={`service-toggle ${foodService ? 'selected' : ''}`}
                onClick={() => setFoodService(!foodService)}
              >
                <div className="service-toggle-left">
                  <span className="service-toggle-icon">🍽️</span>
                  <div className="service-toggle-info">
                    <strong>Đặt Bữa Trước</strong>
                    <span>Chọn món ăn từ nhà hàng Mộc Chàm ngay khi đặt phòng</span>
                  </div>
                </div>
                <div className={`toggle-switch ${foodService ? 'on' : ''}`} />
              </div>

              {foodService && (
                <div style={{ marginBottom: 16 }}>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', marginBottom: 10 }}>
                    Chọn các món ăn bạn muốn thưởng thức trong kỳ nghỉ:
                  </p>
                  <div className="food-select-grid">
                    {MENU_ITEMS.map(item => (
                      <div
                        key={item.id}
                        className={`food-select-item ${selectedFoods.includes(item.id) ? 'selected' : ''}`}
                        onClick={() => toggleFood(item.id)}
                      >
                        <img src={item.image} alt={item.name} />
                        <div className="food-select-item-info">
                          <strong>{item.name}</strong>
                          <span>{formatPrice(item.price)}</span>
                        </div>
                        <div className="food-select-item-check">
                          {selectedFoods.includes(item.id) ? '✓' : ''}
                        </div>
                      </div>
                    ))}
                  </div>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-light)', marginTop: 8 }}>
                    💡 Hoặc bạn có thể gọi món trực tiếp tại nhà hàng khi đến khách sạn.
                  </p>
                </div>
              )}

              {/* Sauna service toggle */}
              <div
                className={`service-toggle ${saunaService ? 'selected' : ''}`}
                onClick={() => setSaunaService(!saunaService)}
              >
                <div className="service-toggle-left">
                  <span className="service-toggle-icon">🧖</span>
                  <div className="service-toggle-info">
                    <strong>Dịch Vụ Xông Hơi</strong>
                    <span>Thư giãn với liệu pháp thảo dược núi rừng Cao Bằng</span>
                  </div>
                </div>
                <div className={`toggle-switch ${saunaService ? 'on' : ''}`} />
              </div>

              {saunaService && (
                <div style={{ marginBottom: 16 }}>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', marginBottom: 10 }}>
                    Chọn gói xông hơi phù hợp:
                  </p>
                  {SAUNA_PACKAGES.map(pkg => (
                    <label
                      key={pkg.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        padding: '12px 16px',
                        marginBottom: 8,
                        background: selectedSauna === pkg.id ? '#f0fdf4' : 'var(--pink-soft)',
                        border: `2px solid ${selectedSauna === pkg.id ? 'var(--green-primary)' : 'var(--border)'}`,
                        borderRadius: 'var(--radius-sm)',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                    >
                      <input
                        type="radio"
                        name="sauna"
                        value={pkg.id}
                        checked={selectedSauna === pkg.id}
                        onChange={() => setSelectedSauna(pkg.id)}
                        style={{ accentColor: 'var(--green-primary)' }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>
                          {pkg.name}
                          {pkg.recommended && <span className="badge badge-gold" style={{ marginLeft: 8 }}>Khuyến nghị</span>}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>{pkg.duration}</div>
                      </div>
                      <div style={{ fontWeight: 700, color: 'var(--green-primary)' }}>{formatPrice(pkg.price)}</div>
                    </label>
                  ))}
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-light)', marginTop: 8 }}>
                    💡 Bạn cũng có thể đặt tại quầy lễ tân khi nhận phòng.
                  </p>
                </div>
              )}
            </div>

            {/* Ghi chú */}
            <div className="form-section">
              <div className="form-section-title">📝 Ghi Chú</div>
              <div className="form-group">
                <label>Yêu Cầu Đặc Biệt</label>
                <textarea
                  rows={3}
                  placeholder="Ví dụ: phòng tầng cao, không dị ứng thức ăn, đến muộn sau 22h..."
                  value={form.notes}
                  onChange={e => setForm({ ...form, notes: e.target.value })}
                  style={{ resize: 'vertical' }}
                />
              </div>
            </div>

            {/* Price summary */}
            <div className="price-summary">
              <div className="price-summary-row">
                <span>Phòng {room.number} × {calcNights()} đêm</span>
                <span>{formatPrice(room.price * calcNights())}</span>
              </div>
              {foodService && selectedFoods.length > 0 && (
                <div className="price-summary-row">
                  <span>Dịch vụ ăn uống ({selectedFoods.length} món)</span>
                  <span>{formatPrice(selectedFoods.reduce((acc, id) => {
                    const item = MENU_ITEMS.find(m => m.id === id);
                    return acc + (item?.price || 0);
                  }, 0))}</span>
                </div>
              )}
              {saunaService && selectedSauna && (
                <div className="price-summary-row">
                  <span>Xông hơi — {SAUNA_PACKAGES.find(s => s.id === selectedSauna)?.name}</span>
                  <span>{formatPrice(SAUNA_PACKAGES.find(s => s.id === selectedSauna)?.price || 0)}</span>
                </div>
              )}
              <div className="price-summary-row total">
                <span>Tổng Cộng</span>
                <span>{formatPrice(calcTotal())}</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="modal-footer">
            <button type="button" className="btn btn-outline" onClick={onClose}>Huỷ</button>
            <button type="submit" className="btn btn-gold btn-lg">
              🎉 Xác Nhận Đặt Phòng
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;

