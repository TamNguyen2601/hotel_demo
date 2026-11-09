import React, { useState, useEffect, useRef } from 'react';
import { MENU_SETS, MENU_ITEMS, SPA_PACKAGES, isHolidayOrWeekend } from '../data/hotelData';

const ALL_FOODS = [...MENU_SETS, ...MENU_ITEMS];

const formatPrice = (price) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

// VietQR API công khai — không cần backend, chạy được trên Netlify
const getVietQRUrl = (amount, name, roomNumber) => {
  const bank = 'MB';
  const account = '1234567890';
  const accountName = 'MOC%20CHAM%20RETREAT';
  const info = encodeURIComponent(`DAT PHONG ${roomNumber} ${(name || '').split(' ').pop()?.toUpperCase() || ''}`);
  return `https://img.vietqr.io/image/${bank}-${account}-compact2.jpg?amount=${amount}&addInfo=${info}&accountName=${accountName}`;
};

const COUNTDOWN_SEC = 10 * 60; // 10 phút giữ phòng

const BookingModal = ({ room, onClose, onBookingConfirmed, onNavigate }) => {
  // Luồng: 'form' → 'payment' → 'processing' → 'success'
  const [step, setStep] = useState('form');
  const [payMethod, setPayMethod] = useState('qr');
  const [form, setForm] = useState({
    fullName: '', phone: '', email: '',
    checkIn: '', checkOut: '', guests: 1, notes: '',
  });
  const [foodService, setFoodService] = useState(false);
  const [spaService, setSpaService] = useState(false);
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [selectedSpa, setSelectedSpa] = useState('');
  const [cardForm, setCardForm] = useState({ number: '', name: '', expiry: '', cvv: '' });
  const [countdown, setCountdown] = useState(COUNTDOWN_SEC);
  const timerRef = useRef(null);

  // Đồng hồ đếm ngược khi vào màn thanh toán
  useEffect(() => {
    if (step === 'payment') {
      setCountdown(COUNTDOWN_SEC);
      timerRef.current = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) { clearInterval(timerRef.current); return 0; }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [step]);

  const toggleFood = (id) =>
    setSelectedFoods(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const handleViewFoodDetail = () => {
    onClose();
    if (onNavigate) {
      onNavigate('food');
      setTimeout(() => {
        const el = document.getElementById('set-dac-biet');
        if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 130, behavior: 'smooth' });
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
          total += isHolidayOrWeekend(d) ? (room.priceWeekend || room.price) : room.price;
        }
        return total;
      }
    }
    return room.price;
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
    setStep('payment');
  };

  const handleConfirmPayment = () => {
    setStep('processing');
    clearInterval(timerRef.current);
    setTimeout(() => {
      setStep('success');
      if (onBookingConfirmed) onBookingConfirmed(room.id);
    }, 2500);
  };

  const formatCountdown = (sec) => {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const fillDemoCard = () => setCardForm({ number: '4111 1111 1111 1111', name: 'NGUYEN VAN A', expiry: '12/28', cvv: '123' });

  const bookingCode = useRef(`MC${room.number}-${Date.now().toString().slice(-6)}`);

  // ─── PROCESSING SCREEN ───────────────────────────────────────────────────
  if (step === 'processing') {
    return (
      <div className="modal-overlay">
        <div className="modal" style={{ maxWidth: 380, textAlign: 'center' }}>
          <div style={{ padding: '52px 32px' }}>
            <div style={{ fontSize: '3rem', marginBottom: 20, display: 'inline-block', animation: 'spin 1s linear infinite' }}>⏳</div>
            <h3 style={{ color: 'var(--green-dark)', marginBottom: 8 }}>Đang xử lý thanh toán...</h3>
            <p style={{ color: 'var(--text-light)', fontSize: '0.88rem', marginBottom: 24 }}>
              Vui lòng không đóng cửa sổ này
            </p>
            <div style={{ height: 6, background: '#e5e7eb', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ height: '100%', background: 'var(--green-primary)', borderRadius: 3, animation: 'progressBar 2.5s linear forwards' }} />
            </div>
            <p style={{ marginTop: 12, fontSize: '0.78rem', color: 'var(--text-light)' }}>🔒 Kết nối an toàn SSL 256-bit</p>
          </div>
        </div>
      </div>
    );
  }

  // ─── SUCCESS / RECEIPT SCREEN ─────────────────────────────────────────────
  if (step === 'success') {
    const total = calcTotal();
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 540 }}>
          <div className="success-box" style={{ padding: '32px 28px' }}>
            {/* Header */}
            <div style={{ fontSize: '3.5rem', marginBottom: 4 }}>🎉</div>
            <h3 style={{ color: 'var(--green-dark)', marginBottom: 4, fontSize: '1.4rem' }}>Thanh Toán Thành Công!</h3>
            <div style={{
              display: 'inline-block', background: '#f0fdf4', border: '1.5px solid var(--green-mid)',
              borderRadius: 6, padding: '4px 14px', marginBottom: 20,
            }}>
              <span style={{ color: 'var(--text-light)', fontSize: '0.82rem' }}>Mã đặt phòng: </span>
              <strong style={{ color: 'var(--green-primary)', fontFamily: 'monospace', fontSize: '0.95rem', letterSpacing: 1 }}>
                {bookingCode.current}
              </strong>
            </div>

            {/* Biên lai */}
            <div style={{
              background: 'white', border: '1.5px solid var(--border)',
              borderRadius: 'var(--radius-sm)', textAlign: 'left', marginBottom: 20, overflow: 'hidden',
            }}>
              <div style={{ background: 'var(--green-dark)', color: 'white', padding: '10px 16px', fontSize: '0.82rem', fontWeight: 700, letterSpacing: 0.5 }}>
                📋 BIÊN LAI ĐẶT PHÒNG
              </div>
              <div style={{ padding: '14px 16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 16px', fontSize: '0.84rem', marginBottom: 12 }}>
                  <div><span style={{ color: 'var(--text-light)' }}>Khách hàng:</span> <strong>{form.fullName}</strong></div>
                  <div><span style={{ color: 'var(--text-light)' }}>Điện thoại:</span> <strong>{form.phone}</strong></div>
                  <div><span style={{ color: 'var(--text-light)' }}>Phòng:</span> <strong>{room.number} — {room.typeName}</strong></div>
                  <div><span style={{ color: 'var(--text-light)' }}>Số đêm:</span> <strong>{calcNights()} đêm</strong></div>
                  {form.checkIn && <div><span style={{ color: 'var(--text-light)' }}>Check-in:</span> <strong>{form.checkIn}</strong></div>}
                  {form.checkOut && <div><span style={{ color: 'var(--text-light)' }}>Check-out:</span> <strong>{form.checkOut}</strong></div>}
                </div>
                <div style={{ borderTop: '1px dashed var(--border)', paddingTop: 10 }}>
                  <div className="price-summary-row">
                    <span>Tiền phòng × {calcNights()} đêm</span>
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
                  <div className="price-summary-row total" style={{ marginTop: 8, paddingTop: 8, borderTop: '1px solid var(--border)' }}>
                    <span>✅ Đã Thanh Toán</span>
                    <span style={{ color: 'var(--green-primary)', fontSize: '1.1rem' }}>{formatPrice(total)}</span>
                  </div>
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.82rem', color: 'var(--text-light)', marginBottom: 20, lineHeight: 1.7 }}>
              📧 Biên lai đã gửi đến <strong>{form.email || form.phone}</strong><br />
              🤝 Chúng tôi sẽ liên hệ xác nhận trong vòng <strong>2 giờ</strong>.
            </p>
            <button
              className="btn btn-primary"
              onClick={onClose}
              style={{
                width: '100%',
                maxWidth: 280,
                display: 'inline-flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                margin: '0 auto',
              }}
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── PAYMENT SCREEN ───────────────────────────────────────────────────────
  if (step === 'payment') {
    const total = calcTotal();
    const qrUrl = getVietQRUrl(total, form.fullName, room.number);
    const isExpired = countdown === 0;

    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 560 }}>

          {/* Header xanh */}
          <div className="modal-header" style={{
            background: 'linear-gradient(135deg, var(--green-dark), #1e7a4a)',
            color: 'white', borderRadius: 'var(--radius) var(--radius) 0 0',
          }}>
            <div>
              <h2 style={{ color: 'white', margin: 0 }}>💳 Thanh Toán</h2>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.85rem', marginTop: 4 }}>
                Phòng {room.number} · {formatPrice(total)}
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
              {/* Đồng hồ đếm ngược */}
              <div style={{
                background: isExpired ? 'rgba(239,68,68,0.9)' : (countdown < 60 ? 'rgba(239,68,68,0.75)' : 'rgba(0,0,0,0.25)'),
                color: 'white', borderRadius: 8, padding: '5px 12px',
                fontFamily: 'monospace', fontSize: '1.15rem', fontWeight: 700,
                border: '1px solid rgba(255,255,255,0.25)',
                transition: 'background 0.5s',
              }}>
                ⏱ {formatCountdown(countdown)}
              </div>
              <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.65)' }}>thời gian giữ phòng</div>
              <button className="modal-close" onClick={onClose} style={{ color: 'white', background: 'rgba(255,255,255,0.15)', marginTop: 2 }}>✕</button>
            </div>
          </div>

          <div className="modal-body">
            {/* Tóm tắt đơn hàng */}
            <div style={{
              background: '#f0fdf4', border: '1px solid var(--green-mid)',
              borderRadius: 'var(--radius-sm)', padding: '10px 14px', marginBottom: 18,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              fontSize: '0.85rem',
            }}>
              <div>
                <div style={{ fontWeight: 600 }}>Phòng {room.number} — {room.typeName}</div>
                <div style={{ color: 'var(--text-light)' }}>{form.fullName} · {calcNights()} đêm</div>
              </div>
              <strong style={{ color: 'var(--green-primary)', fontSize: '1.05rem' }}>{formatPrice(total)}</strong>
            </div>

            {/* Tabs phương thức */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
              {[
                { key: 'qr', icon: '🏦', label: 'Chuyển khoản QR' },
                { key: 'card', icon: '💳', label: 'Thẻ tín dụng' },
                { key: 'ewallet', icon: '📱', label: 'Ví điện tử' },
              ].map(tab => (
                <button key={tab.key} onClick={() => setPayMethod(tab.key)} style={{
                  flex: 1, padding: '9px 4px', borderRadius: 'var(--radius-sm)',
                  border: `2px solid ${payMethod === tab.key ? 'var(--green-primary)' : 'var(--border)'}`,
                  background: payMethod === tab.key ? '#f0fdf4' : 'white',
                  cursor: 'pointer', fontSize: '0.76rem', fontWeight: 600,
                  color: payMethod === tab.key ? 'var(--green-primary)' : 'var(--text-light)',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
                  transition: 'all 0.18s',
                }}>
                  <span style={{ fontSize: '1.25rem' }}>{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* ── Tab QR Chuyển khoản ── */}
            {payMethod === 'qr' && (
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  display: 'inline-block', border: '3px solid var(--green-primary)',
                  borderRadius: 14, padding: 10, background: 'white', marginBottom: 14,
                  boxShadow: '0 4px 16px rgba(13,61,36,0.12)',
                }}>
                  <img
                    src={qrUrl}
                    alt="VietQR thanh toán"
                    style={{ width: 196, height: 196, display: 'block', borderRadius: 6 }}
                    onError={e => {
                      // Nếu QR API lỗi, hiển thị placeholder
                      e.target.src = '';
                      e.target.style.display = 'none';
                      if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  {/* Fallback QR placeholder */}
                  <div style={{
                    display: 'none', width: 196, height: 196,
                    alignItems: 'center', justifyContent: 'center',
                    flexDirection: 'column', color: 'var(--text-light)', fontSize: '0.8rem', gap: 10,
                    background: '#f8f8f8', borderRadius: 6,
                  }}>
                    <span style={{ fontSize: '2.5rem' }}>📱</span>
                    <span style={{ lineHeight: 1.5 }}>Quét mã QR<br />bằng app ngân hàng</span>
                  </div>
                </div>

                {/* Thông tin chuyển khoản */}
                <div style={{
                  background: '#f8fffe', border: '1px solid #b2dfdb',
                  borderRadius: 'var(--radius-sm)', padding: '12px 16px',
                  textAlign: 'left', fontSize: '0.84rem', marginBottom: 10,
                }}>
                  <div style={{ fontWeight: 700, color: 'var(--green-dark)', marginBottom: 8, fontSize: '0.82rem' }}>
                    📋 Thông tin chuyển khoản
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '5px 12px', alignItems: 'center' }}>
                    <span style={{ color: 'var(--text-light)' }}>Ngân hàng:</span>
                    <strong>MB Bank</strong>
                    <span style={{ color: 'var(--text-light)' }}>Số TK:</span>
                    <strong style={{ fontFamily: 'monospace', letterSpacing: 1.5 }}>1234 5678 90</strong>
                    <span style={{ color: 'var(--text-light)' }}>Chủ TK:</span>
                    <strong>MỘC CHÀM RETREAT</strong>
                    <span style={{ color: 'var(--text-light)' }}>Số tiền:</span>
                    <strong style={{ color: 'var(--green-primary)', fontSize: '1.05rem' }}>{formatPrice(total)}</strong>
                    <span style={{ color: 'var(--text-light)' }}>Nội dung:</span>
                    <strong style={{ fontFamily: 'monospace', fontSize: '0.82rem' }}>
                      DAT PHONG {room.number} {form.fullName.split(' ').pop()?.toUpperCase()}
                    </strong>
                  </div>
                </div>
                <p style={{ fontSize: '0.76rem', color: 'var(--text-light)', lineHeight: 1.6 }}>
                  Mở app ngân hàng → Chuyển khoản → Quét QR hoặc nhập thủ công<br />
                  Sau khi chuyển khoản, bấm <strong>"Xác Nhận Đã Thanh Toán"</strong> bên dưới
                </p>
              </div>
            )}

            {/* ── Tab Thẻ tín dụng ── */}
            {payMethod === 'card' && (
              <div>
                {/* Visual thẻ */}
                <div style={{
                  background: 'linear-gradient(135deg, #0d3d24, #1e7a4a)',
                  borderRadius: 14, padding: '22px 24px', color: 'white', marginBottom: 14,
                  boxShadow: '0 8px 24px rgba(13,61,36,0.3)', position: 'relative', overflow: 'hidden',
                  userSelect: 'none',
                }}>
                  <div style={{ position: 'absolute', right: -30, top: -30, width: 140, height: 140, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
                  <div style={{ position: 'absolute', right: 20, bottom: -50, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
                  <div style={{ fontSize: '1.5rem', marginBottom: 18, letterSpacing: 2.5, fontFamily: 'monospace', opacity: 0.95 }}>
                    {cardForm.number || '•••• •••• •••• ••••'}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', fontSize: '0.8rem', opacity: 0.88 }}>
                    <div>
                      <div style={{ opacity: 0.6, fontSize: '0.62rem', marginBottom: 2, letterSpacing: 0.5 }}>TÊN CHỦ THẺ</div>
                      <div style={{ fontWeight: 600 }}>{cardForm.name || 'TÊN CHỦ THẺ'}</div>
                    </div>
                    <div>
                      <div style={{ opacity: 0.6, fontSize: '0.62rem', marginBottom: 2, letterSpacing: 0.5 }}>HẾT HẠN</div>
                      <div style={{ fontFamily: 'monospace' }}>{cardForm.expiry || 'MM/YY'}</div>
                    </div>
                    <div style={{ fontSize: '1.6rem', fontStyle: 'italic', fontWeight: 800, letterSpacing: -1 }}>VISA</div>
                  </div>
                </div>

                {/* Nút điền demo */}
                <button type="button" onClick={fillDemoCard} style={{
                  width: '100%', padding: '8px', marginBottom: 12, borderRadius: 'var(--radius-sm)',
                  border: '1.5px dashed var(--gold)', background: 'rgba(201,168,76,0.07)',
                  color: '#8a6508', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer',
                  letterSpacing: 0.3,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                }}>
                  ✨ Điền thẻ demo (để test tính năng)
                </button>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', color: 'var(--text-light)', display: 'block', marginBottom: 4, fontWeight: 600 }}>Số thẻ *</label>
                    <input
                      type="text" placeholder="1234 5678 9012 3456" maxLength={19}
                      value={cardForm.number}
                      onChange={e => {
                        const v = e.target.value.replace(/\D/g, '').slice(0, 16);
                        setCardForm({ ...cardForm, number: v.replace(/(.{4})/g, '$1 ').trim() });
                      }}
                      style={{ width: '100%', padding: '10px 12px', border: '1.5px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: '1rem', fontFamily: 'monospace', letterSpacing: 1.5, boxSizing: 'border-box' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.78rem', color: 'var(--text-light)', display: 'block', marginBottom: 4, fontWeight: 600 }}>Tên chủ thẻ *</label>
                    <input
                      type="text" placeholder="NGUYEN VAN A"
                      value={cardForm.name}
                      onChange={e => setCardForm({ ...cardForm, name: e.target.value.toUpperCase() })}
                      style={{ width: '100%', padding: '10px 12px', border: '1.5px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: '0.9rem', letterSpacing: 0.5, boxSizing: 'border-box' }}
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    <div>
                      <label style={{ fontSize: '0.78rem', color: 'var(--text-light)', display: 'block', marginBottom: 4, fontWeight: 600 }}>Hết hạn *</label>
                      <input
                        type="text" placeholder="MM/YY" maxLength={5}
                        value={cardForm.expiry}
                        onChange={e => {
                          let v = e.target.value.replace(/\D/g, '').slice(0, 4);
                          if (v.length >= 3) v = v.slice(0, 2) + '/' + v.slice(2);
                          setCardForm({ ...cardForm, expiry: v });
                        }}
                        style={{ width: '100%', padding: '10px 12px', border: '1.5px solid var(--border)', borderRadius: 'var(--radius-sm)', fontFamily: 'monospace', fontSize: '0.95rem', letterSpacing: 1, boxSizing: 'border-box' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.78rem', color: 'var(--text-light)', display: 'block', marginBottom: 4, fontWeight: 600 }}>CVV *</label>
                      <input
                        type="password" placeholder="•••" maxLength={4}
                        value={cardForm.cvv}
                        onChange={e => setCardForm({ ...cardForm, cvv: e.target.value.replace(/\D/g, '') })}
                        style={{ width: '100%', padding: '10px 12px', border: '1.5px solid var(--border)', borderRadius: 'var(--radius-sm)', fontFamily: 'monospace', fontSize: '1rem', boxSizing: 'border-box' }}
                      />
                    </div>
                  </div>
                </div>
                <p style={{ fontSize: '0.74rem', color: 'var(--text-light)', marginTop: 8, lineHeight: 1.6 }}>
                  🔒 Thông tin thẻ được mã hóa SSL 256-bit. Demo — không gửi dữ liệu thật.
                </p>
              </div>
            )}

            {/* ── Tab Ví điện tử ── */}
            {payMethod === 'ewallet' && (
              <div>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-light)', marginBottom: 14, textAlign: 'center' }}>
                  Chọn ví để thanh toán <strong style={{ color: 'var(--green-primary)' }}>{formatPrice(total)}</strong>
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  {[
                    { name: 'MoMo', color: '#a50064', bg: '#fff0f7', emoji: '💜', desc: 'Ví điện tử MoMo' },
                    { name: 'VNPay', color: '#0f3460', bg: '#f0f4ff', emoji: '🔵', desc: 'VNPay QR' },
                    { name: 'ZaloPay', color: '#0068ff', bg: '#f0f7ff', emoji: '💙', desc: 'ZaloPay' },
                    { name: 'ShopeePay', color: '#ee4d2d', bg: '#fff5f3', emoji: '🧡', desc: 'ShopeePay' },
                  ].map(w => (
                    <div key={w.name}
                      onClick={handleConfirmPayment}
                      style={{
                        border: `2px solid ${w.color}22`, borderRadius: 'var(--radius-sm)',
                        padding: '18px 12px', cursor: 'pointer', textAlign: 'center',
                        background: w.bg, transition: 'all 0.18s',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = w.color; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = `${w.color}22`; e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
                    >
                      <div style={{ fontSize: '2.2rem', marginBottom: 6 }}>{w.emoji}</div>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem', color: w.color }}>{w.name}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-light)', marginTop: 2 }}>{w.desc}</div>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: '0.76rem', color: 'var(--text-light)', marginTop: 12, textAlign: 'center', lineHeight: 1.6 }}>
                  Bấm vào ví để mô phỏng mở app và thanh toán
                </p>
              </div>
            )}
          </div>

          {/* Footer thanh toán */}
          <div className="modal-footer" style={{ flexDirection: 'column', gap: 10, borderTop: '1px solid var(--border)' }}>
            {payMethod !== 'ewallet' && (
              <button
                className="btn btn-gold btn-lg"
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  opacity: isExpired ? 0.5 : 1,
                  cursor: isExpired ? 'not-allowed' : 'pointer',
                }}
                onClick={!isExpired ? handleConfirmPayment : undefined}
                disabled={isExpired}
              >
                {isExpired ? '⚠️ Hết thời gian giữ phòng — Vui lòng đặt lại' : '✅ Xác Nhận Đã Thanh Toán'}
              </button>
            )}
            <button
              type="button"
              onClick={() => setStep('form')}
              style={{
                background: 'none', border: 'none',
                color: 'var(--text-light)', fontSize: '0.84rem',
                cursor: 'pointer', padding: '4px 8px',
                textDecoration: 'underline',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                width: '100%',
              }}
            >
              ← Quay lại chỉnh sửa đặt phòng
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── FORM SCREEN (Step 1) ─────────────────────────────────────────────────
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
                  {/* Set Đặc Biệt */}
                  <div style={{ marginBottom: 14 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.85rem', fontWeight: 700, color: 'var(--green-dark)', marginBottom: 8 }}>
                      <span>👑</span>
                      <span>Set Đặc Biệt (Tiết kiệm hơn):</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                      {MENU_SETS.map(set => {
                        const isSelected = selectedFoods.includes(set.id);
                        return (
                          <div key={set.id} onClick={() => toggleFood(set.id)} style={{
                            border: isSelected ? '2px solid var(--green-primary)' : '2px solid var(--gold)',
                            background: isSelected ? '#f0fdf4' : 'linear-gradient(135deg, #fffdf8, #fff8ee)',
                            borderRadius: 'var(--radius-sm)', padding: '10px 12px', cursor: 'pointer',
                            position: 'relative', boxShadow: isSelected ? 'var(--shadow-sm)' : '0 2px 8px rgba(201,168,76,0.15)',
                            transition: 'all 0.2s', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                          }}>
                            <div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 6 }}>
                                <div>
                                  <span style={{
                                    display: 'inline-block', fontSize: '0.68rem', fontWeight: 700, color: '#8a6508',
                                    background: 'rgba(201,168,76,0.2)', padding: '2px 6px', borderRadius: 4, marginBottom: 4,
                                  }}>{set.subtitle}</span>
                                  <div style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--green-dark)', lineHeight: 1.3 }}>{set.name}</div>
                                </div>
                                <div style={{
                                  background: isSelected ? 'var(--green-primary)' : 'var(--border)',
                                  color: 'white', width: 20, height: 20, borderRadius: '50%',
                                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                                  fontSize: '0.72rem', flexShrink: 0,
                                }}>{isSelected ? '✓' : ''}</div>
                              </div>
                            </div>
                            <div style={{
                              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                              marginTop: 8, paddingTop: 8, borderTop: '1px dashed rgba(201,168,76,0.35)',
                            }}>
                              <div>
                                <span style={{ textDecoration: 'line-through', fontSize: '0.75rem', color: 'var(--text-light)', marginRight: 6 }}>
                                  {formatPrice(set.originalPrice)}
                                </span>
                                <strong style={{ color: 'var(--green-primary)', fontSize: '0.92rem' }}>
                                  {formatPrice(set.price)}
                                </strong>
                              </div>
                              <button type="button" onClick={e => { e.stopPropagation(); handleViewFoodDetail(); }} style={{
                                background: 'transparent', border: '1px solid var(--green-primary)',
                                color: 'var(--green-primary)', padding: '3px 8px', borderRadius: 4,
                                fontSize: '0.72rem', fontWeight: 600, cursor: 'pointer',
                              }}>Chi tiết →</button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Món lẻ */}
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
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', marginBottom: 10 }}>Chọn gói spa phù hợp:</p>
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
            <button
              type="button"
              className="btn btn-outline"
              onClick={onClose}
              style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center' }}
            >
              Huỷ
            </button>
            <button
              type="submit"
              className="btn btn-gold btn-lg"
              style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center' }}
            >
              💳 Tiếp Tục Thanh Toán →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
