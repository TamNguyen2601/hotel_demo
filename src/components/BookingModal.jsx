import React, { useState } from 'react';
import { MENU_SETS, MENU_ITEMS, SPA_PACKAGES } from '../data/hotelData';

const ALL_FOODS = [...MENU_SETS, ...MENU_ITEMS];

const formatPrice = (price) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

const BookingModal = ({ room, onClose, onBookingConfirmed, onNavigate }) => {
  const [form, setForm] = useState({
    fullName: '', phone: '', email: '',
    checkIn: '', checkOut: '', guests: 1, notes: '',
  });
  const [foodService, setFoodService] = useState(false);
  const [spaService, setSpaService] = useState(false);
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [selectedSpa, setSelectedSpa] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const toggleFood = (id) =>
    setSelectedFoods(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const handleViewFoodDetail = () => {
    onClose();
    if (onNavigate) {
      onNavigate('food');
      setTimeout(() => {
        const el = document.getElementById('set-dac-biet');
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 130;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }, 120);
    }
  };

  const calcNights = () => {
    if (!form.checkIn || !form.checkOut) return 1;
    const d = (new Date(form.checkOut) - new Date(form.checkIn)) / 86400000;
    return d > 0 ? d : 1;
  };

  const calcRoomTotal = () => {
    if (form.checkIn && form.checkOut) {
      const start = new Date(form.checkIn);
      const end = new Date(form.checkOut);
      if (end > start) {
        let total = 0;
        for (let d = new Date(start); d < end; d.setDate(d.getDate() + 1)) {
          const dow = d.getDay(); // 0=CN, 6=T7
          const isWeekend = dow === 0 || dow === 6;
          total += isWeekend ? (room.priceWeekend || room.price) : room.price;
        }
        return total;
      }
    }
    return room.price; // mặc định 1 đêm
  };

  const calcTotal = () => {
    let total = calcRoomTotal();
    if (foodService)
      selectedFoods.forEach(id => { const item = ALL_FOODS.find(m => m.id === id); if (item) total += item.price; });
    if (spaService && selectedSpa) {
      const pkg = SPA_PACKAGES.find(s => s.id === selectedSpa);
      if (pkg) total += pkg.price;
    }
    return total;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Mark room as booked in global state
    if (onBookingConfirmed) onBookingConfirmed(room.id);
  };

  if (submitted) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal" onClick={e => e.stopPropagation()}>
          <div className="success-box">
            <div className="success-icon">🎉</div>
            <h3>Đặt Phòng Thành Công!</h3>
            <p>
              Cảm ơn <strong>{form.fullName}</strong>! Yêu cầu đặt phòng{' '}
              <strong>{room.number}</strong> đã được ghi nhận.<br />
              Chúng tôi sẽ liên hệ xác nhận trong vòng 2 giờ qua số <strong>{form.phone}</strong>.
            </p>
            <div style={{ background: 'var(--pink-soft)', borderRadius: 'var(--radius-sm)', padding: '16px 24px', marginBottom: 24, textAlign: 'left', display: 'inline-block', minWidth: 280 }}>
              <div className="price-summary-row">
                <span>Phòng {room.number} — {calcNights()} đêm</span>
                <span>{formatPrice(calcRoomTotal())}</span>
              </div>
              {foodService && selectedFoods.length > 0 && (
                <div className="price-summary-row">
                  <span>Dịch vụ ăn uống ({selectedFoods.length} món/suất)</span>
                  <span>{formatPrice(selectedFoods.reduce((acc, id) => acc + (ALL_FOODS.find(m => m.id === id)?.price || 0), 0))}</span>
                </div>
              )}
              {spaService && selectedSpa && (
                <div className="price-summary-row">
                  <span>Spa — {SPA_PACKAGES.find(s => s.id === selectedSpa)?.name}</span>
                  <span>{formatPrice(SPA_PACKAGES.find(s => s.id === selectedSpa)?.price || 0)}</span>
                </div>
              )}
              <div className="price-summary-row total">
                <span>Tổng Cộng</span>
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
        <div className="modal-header">
          <div>
            <h2>Đặt Phòng {room.number}</h2>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-light)', marginTop: 4 }}>
              {room.typeName} — {formatPrice(room.price)}/đêm · {room.size}m²
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
                  <input type="text" placeholder="Nguyễn Văn A" value={form.fullName}
                    onChange={e => setForm({ ...form, fullName: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label>Số Điện Thoại *</label>
                  <input type="tel" placeholder="0912 345 678" value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })} required />
                </div>
              </div>
              <div className="form-row single">
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" placeholder="email@example.com" value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })} />
                </div>
              </div>
            </div>

            {/* Thông tin đặt phòng */}
            <div className="form-section">
              <div className="form-section-title">🛏️ Thông Tin Đặt Phòng</div>
              <div className="form-row">
                <div className="form-group">
                  <label>Ngày Nhận Phòng *</label>
                  <input type="date" value={form.checkIn}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={e => setForm({ ...form, checkIn: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label>Ngày Trả Phòng *</label>
                  <input type="date" value={form.checkOut}
                    min={form.checkIn || new Date().toISOString().split('T')[0]}
                    onChange={e => setForm({ ...form, checkOut: e.target.value })} required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Số Khách</label>
                  <select value={form.guests} onChange={e => setForm({ ...form, guests: Number(e.target.value) })}>
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
              <div className="form-section-title">
                ✨ Dịch Vụ Đi Kèm
                <span style={{ fontSize: '0.78rem', fontWeight: 400, color: 'var(--text-light)', marginLeft: 8 }}>(tuỳ chọn)</span>
              </div>

              {/* Food toggle */}
              <div className={`service-toggle ${foodService ? 'selected' : ''}`} onClick={() => setFoodService(!foodService)}>
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
                  {/* Highlight Set Đặc Biệt - 2 suất trên 1 dòng */}
                  <div style={{ marginBottom: 14 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.85rem', fontWeight: 700, color: 'var(--green-dark)', marginBottom: 8 }}>
                      <span>👑</span>
                      <span>Set Đặc Biệt (Tiết kiệm hơn):</span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                      {MENU_SETS.map(set => {
                        const isSelected = selectedFoods.includes(set.id);
                        return (
                          <div
                            key={set.id}
                            onClick={() => toggleFood(set.id)}
                            style={{
                              border: isSelected ? '2px solid var(--green-primary)' : '2px solid var(--gold)',
                              background: isSelected ? '#f0fdf4' : 'linear-gradient(135deg, #fffdf8, #fff8ee)',
                              borderRadius: 'var(--radius-sm)',
                              padding: '10px 12px',
                              cursor: 'pointer',
                              position: 'relative',
                              boxShadow: isSelected ? 'var(--shadow-sm)' : '0 2px 8px rgba(201,168,76,0.15)',
                              transition: 'all 0.2s',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'space-between',
                            }}
                          >
                            <div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 6 }}>
                                <div>
                                  <span style={{
                                    display: 'inline-block',
                                    fontSize: '0.68rem',
                                    fontWeight: 700,
                                    color: '#8a6508',
                                    background: 'rgba(201,168,76,0.2)',
                                    padding: '2px 6px',
                                    borderRadius: 4,
                                    marginBottom: 4,
                                  }}>
                                    {set.subtitle}
                                  </span>
                                  <div style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--green-dark)', lineHeight: 1.3 }}>
                                    {set.name}
                                  </div>
                                </div>
                                <div className="food-select-item-check" style={{
                                  background: isSelected ? 'var(--green-primary)' : 'var(--border)',
                                  color: 'white',
                                  width: 20,
                                  height: 20,
                                  borderRadius: '50%',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: '0.72rem',
                                  flexShrink: 0,
                                }}>
                                  {isSelected ? '✓' : ''}
                                </div>
                              </div>
                            </div>

                            <div style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              marginTop: 8,
                              paddingTop: 8,
                              borderTop: '1px dashed rgba(201,168,76,0.35)',
                            }}>
                              <div>
                                <span style={{ textDecoration: 'line-through', fontSize: '0.75rem', color: 'var(--text-light)', marginRight: 6 }}>
                                  {formatPrice(set.originalPrice)}
                                </span>
                                <strong style={{ color: 'var(--green-primary)', fontSize: '0.92rem' }}>
                                  {formatPrice(set.price)}
                                </strong>
                              </div>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleViewFoodDetail();
                                }}
                                style={{
                                  background: 'transparent',
                                  border: '1px solid var(--green-primary)',
                                  color: 'var(--green-primary)',
                                  padding: '3px 8px',
                                  borderRadius: 4,
                                  fontSize: '0.72rem',
                                  fontWeight: 600,
                                  cursor: 'pointer',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: 2,
                                }}
                              >
                                Chi tiết →
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Danh sách món lẻ */}
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', marginBottom: 8, marginTop: 12 }}>
                    Hoặc chọn các món lẻ bạn muốn thưởng thức:
                  </p>
                  <div className="food-select-grid">
                    {MENU_ITEMS.map(item => (
                      <div key={item.id}
                        className={`food-select-item ${selectedFoods.includes(item.id) ? 'selected' : ''}`}
                        onClick={() => toggleFood(item.id)}>
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
                    💡 Hoặc gọi món trực tiếp tại nhà hàng khi đến khách sạn.
                  </p>
                </div>
              )}

              {/* Spa toggle */}
              <div className={`service-toggle ${spaService ? 'selected' : ''}`} onClick={() => setSpaService(!spaService)}>
                <div className="service-toggle-left">
                  <span className="service-toggle-icon">🌿</span>
                  <div className="service-toggle-info">
                    <strong>Chăm Sóc Sức Khỏe / Spa</strong>
                    <span>Ngâm lá thuốc & xông hơi thảo dược người Dao/Tày — Tầng 5</span>
                  </div>
                </div>
                <div className={`toggle-switch ${spaService ? 'on' : ''}`} />
              </div>

              {spaService && (
                <div style={{ marginBottom: 16 }}>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', marginBottom: 10 }}>
                    Chọn gói spa phù hợp:
                  </p>
                  {SPA_PACKAGES.map(pkg => (
                    <label key={pkg.id} style={{
                      display: 'flex', alignItems: 'center', gap: 12,
                      padding: '12px 16px', marginBottom: 8, cursor: 'pointer',
                      background: selectedSpa === pkg.id ? '#f0fdf4' : 'var(--pink-soft)',
                      border: `2px solid ${selectedSpa === pkg.id ? 'var(--green-primary)' : 'var(--border)'}`,
                      borderRadius: 'var(--radius-sm)', transition: 'all 0.2s',
                    }}>
                      <input type="radio" name="spa" value={pkg.id}
                        checked={selectedSpa === pkg.id}
                        onChange={() => setSelectedSpa(pkg.id)}
                        style={{ accentColor: 'var(--green-primary)' }} />
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
                <textarea rows={3} placeholder="Ví dụ: phòng tầng cao, dị ứng thức ăn, đến muộn sau 22h..."
                  value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })}
                  style={{ resize: 'vertical' }} />
              </div>
            </div>

            {/* Tổng tiền */}
            <div className="price-summary">
              <div className="price-summary-row">
                <span>Phòng {room.number} × {calcNights()} đêm</span>
                <span>{formatPrice(calcRoomTotal())}</span>
              </div>
              {foodService && selectedFoods.length > 0 && (
                <div className="price-summary-row">
                  <span>Dịch vụ ăn uống ({selectedFoods.length} món/suất)</span>
                  <span>{formatPrice(selectedFoods.reduce((acc, id) => acc + (ALL_FOODS.find(m => m.id === id)?.price || 0), 0))}</span>
                </div>
              )}
              {spaService && selectedSpa && (
                <div className="price-summary-row">
                  <span>Spa — {SPA_PACKAGES.find(s => s.id === selectedSpa)?.name}</span>
                  <span>{formatPrice(SPA_PACKAGES.find(s => s.id === selectedSpa)?.price || 0)}</span>
                </div>
              )}
              <div className="price-summary-row total">
                <span>Tổng Cộng</span>
                <span>{formatPrice(calcTotal())}</span>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-outline" onClick={onClose}>Huỷ</button>
            <button type="submit" className="btn btn-gold btn-lg">🎉 Xác Nhận Đặt Phòng</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
