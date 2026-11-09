import React, { useState, useEffect } from 'react';
import { CAO_BANG_ATTRACTIONS } from '../data/hotelData';

const formatPrice = (price) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

const HomePage = ({ onNavigate }) => {
  const [heroBgLoaded, setHeroBgLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setHeroBgLoaded(true);
    img.src = '/cao-bang-hero.jpg';
  }, []);

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="hero">
        <div className={`hero-bg ${heroBgLoaded ? 'loaded' : ''}`} />
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="hero-eyebrow">🏡 Mộc Chàm Retreat & Restaurant</div>
          <h1 className="hero-title">
            Mộc Chàm
            <span>Retreat &amp; Restaurant</span>
          </h1>
          <p className="hero-subtitle">
            Nghỉ dưỡng giữa lòng Cao Bằng — nơi núi rừng hùng vĩ<br />
            gặp gỡ ẩm thực tinh tế và liệu pháp thư giãn truyền thống.
          </p>
          <div className="hero-actions">
            <button
              className="btn btn-gold btn-lg"
              onClick={() => onNavigate('rooms', { filter: 'all' })}
            >
              🛏️ Đặt Phòng Ngay
            </button>
            <button
              className="btn btn-outline"
              style={{ color: 'white', borderColor: 'rgba(255,255,255,0.7)' }}
              onClick={() => onNavigate('explore')}
            >
              🗺️ Khám Phá
            </button>
          </div>
        </div>
        <div
          className="hero-scroll"
          onClick={() => document.getElementById('intro').scrollIntoView({ behavior: 'smooth' })}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9" />
          </svg>
          Cuộn xuống
        </div>
      </section>

      {/* ===== QUICK BOOKING BAR ===== */}
      <div style={{ background: 'var(--pink-soft)', padding: '32px 24px 80px' }}>
        <div className="container">
          <div className="quick-book">
            <h3 className="quick-book-title">🔍 Tìm Phòng Nhanh</h3>
            <div className="quick-book-form">
              <div className="form-group">
                <label>Ngày Nhận Phòng</label>
                <input type="date" min={new Date().toISOString().split('T')[0]} />
              </div>
              <div className="form-group">
                <label>Ngày Trả Phòng</label>
                <input type="date" min={new Date().toISOString().split('T')[0]} />
              </div>
              <div className="form-group">
                <label>Loại Phòng</label>
                <select>
                  <option value="">Tất cả loại phòng</option>
                  <option value="premium">Phòng Cận Cao Cấp</option>
                  <option value="double">Phòng Đôi Tiêu Chuẩn</option>
                  <option value="single">Phòng Đơn Tiêu Chuẩn</option>
                </select>
              </div>
              <button
                className="btn btn-primary"
                style={{ padding: '12px 28px', whiteSpace: 'nowrap' }}
                onClick={() => onNavigate('rooms', { filter: 'all' })}
              >
                🔍 Tìm Phòng
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ===== INTRO / FEATURES ===== */}
      <section className="section" id="intro">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <div className="hero-eyebrow" style={{ color: 'var(--gold)', textAlign: 'left' }}>Về Chúng Tôi</div>
              <h2 className="section-title">Trải Nghiệm Độc Đáo<br />Giữa Núi Rừng Cao Bằng</h2>
              <div className="gold-line" />
              <p style={{ color: 'var(--text-light)', lineHeight: 1.8, marginBottom: 16 }}>
                <strong style={{ color: 'var(--green-dark)' }}>Mộc Chàm Retreat &amp; Restaurant</strong> là điểm đến nghỉ dưỡng cao cấp
                duy nhất tại Cao Bằng, nơi hội tụ kiến trúc bản địa tinh tế, ẩm thực đặc sản
                vùng núi phía Bắc và dịch vụ chăm sóc sức khỏe đẳng cấp.
              </p>
              <p style={{ color: 'var(--text-light)', lineHeight: 1.8, marginBottom: 24 }}>
                Từ những căn phòng cận cao cấp với ban công nhìn ra núi rừng hùng vĩ, nhà hàng phục vụ
                đặc sản Cao Bằng thuần chất đến khu xông hơi thảo dược truyền thống —
                mỗi khoảnh khắc tại Mộc Chàm là một ký ức đáng trân trọng.
              </p>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  marginBottom: 24,
                  fontSize: '0.98rem',
                  fontFamily: 'Playfair Display, serif',
                  fontStyle: 'italic',
                  color: 'var(--green-dark)',
                  letterSpacing: 0.3,
                }}
              >
                <span>From Cao Bằng with love</span>
                <span style={{ color: '#e53e3e', fontStyle: 'normal', fontSize: '1rem' }}>❤️</span>
              </div>
              <div style={{ display: 'flex', gap: 48 }}>
                {[
                  { num: '30+', label: 'Phòng nghỉ' },
                  { num: '15+', label: 'Món đặc sản' },
                ].map(stat => (
                  <div key={stat.label} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--green-primary)', fontFamily: 'Playfair Display, serif' }}>{stat.num}</div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-light)' }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <img
                src="/rooms/phong-can-cao-cap.jpg"
                alt="Phòng cận cao cấp"
                style={{ borderRadius: 'var(--radius-md)', height: 220, objectFit: 'cover', width: '100%' }}
              />
              <img
                src="/rooms/phong-doi-tieu-chuan.jpg"
                alt="Phòng tiêu chuẩn"
                style={{ borderRadius: 'var(--radius-md)', height: 220, objectFit: 'cover', width: '100%', marginTop: 32 }}
              />
              <img
                src="/foods/banh-ap-chao.jpg"
                alt="Ẩm thực đặc sản Cao Bằng"
                style={{ borderRadius: 'var(--radius-md)', height: 180, objectFit: 'cover', width: '100%', marginTop: -32 }}
              />
              <img
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&q=80"
                alt="Xông hơi"
                style={{ borderRadius: 'var(--radius-md)', height: 180, objectFit: 'cover', width: '100%' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="section section-bg-cream">
        <div className="container">
          <div className="text-center">
            <div className="hero-eyebrow" style={{ color: 'var(--gold)' }}>Dịch Vụ Nổi Bật</div>
            <h2 className="section-title">Trải Nghiệm Độc Đáo</h2>
            <div className="gold-line" style={{ margin: '12px auto 20px' }} />
            <p className="section-subtitle" style={{ margin: '0 auto', maxWidth: 'none' }}>
              Chúng tôi mang đến trải nghiệm nghỉ dưỡng toàn diện kết hợp văn hóa bản địa đặc sắc
            </p>
          </div>
          <div className="features-grid">
            {[
              { icon: '🏨', title: 'Phòng Nghỉ Sang Trọng', desc: '30 phòng các loại từ tiêu chuẩn đến cận cao cấp. Nội thất gỗ tự nhiên, view núi rừng thoáng mát.' },
              { icon: '🍜', title: 'Nhà Hàng Đặc Sản', desc: 'Thực đơn 15+ món đặc sản Cao Bằng thuần chất. Vịt quay 7 vị, khau nhục, phở chua... do đầu bếp người Tày chế biến.' },
              { icon: '🧖', title: 'Xông Hơi Thảo Dược', desc: 'Liệu pháp xông hơi và ngâm tắm thảo dược quý rừng Cao Bằng, mang đến các gói phục hồi toàn diện.' },
              { icon: '🗺️', title: 'Tour Khám Phá', desc: 'Dịch vụ hướng dẫn tham quan thác Bản Giốc, hồ Thang Hen, động Ngườm Ngao và các địa danh lịch sử.' },
              { icon: '🚗', title: 'Đưa Đón Sân Bay', desc: 'Dịch vụ đưa đón tận nơi từ sân bay Cao Bằng, đảm bảo an toàn và tiện lợi cho chuyến đi của bạn.' },
              { icon: '🎎', title: 'Văn Hóa Bản Địa', desc: 'Trải nghiệm văn hóa người Tày, Nùng qua trang phục, nhạc cụ truyền thống và các hoạt động thủ công mỹ nghệ.' },
            ].map(f => (
              <div key={f.title} className="feature-card">
                <div className="feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ROOM PREVIEW ===== */}
      <section className="section">
        <div className="container">
          <div className="text-center">
            <div className="hero-eyebrow" style={{ color: 'var(--gold)' }}>Phòng Nghỉ</div>
            <h2 className="section-title">Không Gian Nghỉ Dưỡng</h2>
            <div className="gold-line" style={{ margin: '12px auto 20px' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 28, marginTop: 48 }}>
            {[
              {
                title: 'Phòng Cận Cao Cấp',
                subtitle: 'Tầng 2 • 8 phòng (201–208)',
                price: 'Từ 1.274.000',
                desc: 'Phòng suite sang trọng với ban công view núi, bồn tắm Jacuzzi và minibar cao cấp.',
                img: '/rooms/phong-can-cao-cap.jpg',
                filter: 'premium',
                badge: '👑 Cận Cao Cấp',
              },
              {
                title: 'Phòng Đôi Tiêu Chuẩn',
                subtitle: 'Tầng 3 • 11 phòng (301–311)',
                price: 'Từ 879.000',
                desc: 'Phòng đôi ấm cúng với giường Queen size, cửa sổ view thành phố. Lý tưởng cho cặp đôi và gia đình.',
                img: '/rooms/phong-doi-tieu-chuan.jpg',
                filter: 'standard',
                badge: '🏠 Tiêu Chuẩn',
              },
              {
                title: 'Phòng Đơn Tiêu Chuẩn',
                subtitle: 'Tầng 4 • 11 phòng (401–411)',
                price: 'Từ 879.000',
                desc: 'Phòng đơn tiện nghi, thiết kế thông minh tối ưu không gian. Phù hợp cho du khách đơn thân hoặc khách công tác.',
                img: '/rooms/phong-don-tieu-chuan.jpg',
                filter: 'standard',
                badge: '🏠 Tiêu Chuẩn',
              },
            ].map(room => (
              <div
                key={room.title}
                style={{
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-md)',
                  background: 'var(--white)',
                  transition: 'var(--transition)',
                  cursor: 'pointer',
                }}
                onClick={() => onNavigate('rooms', { filter: room.filter })}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
              >
                <div style={{ position: 'relative', height: 240, overflow: 'hidden' }}>
                  <img src={room.img} alt={room.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: 12, left: 12 }}>
                    <span className="badge badge-green">{room.badge}</span>
                  </div>
                </div>
                <div style={{ padding: 24 }}>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-light)', marginBottom: 4 }}>{room.subtitle}</div>
                  <h3 style={{ color: 'var(--green-dark)', marginBottom: 8 }}>{room.title}</h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-light)', lineHeight: 1.65, marginBottom: 16 }}>{room.desc}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--green-primary)' }}>{room.price}đ/đêm</span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--gold)', fontWeight: 600 }}>Xem chi tiết →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <button className="btn btn-primary" onClick={() => onNavigate('rooms', { filter: 'all' })}>
              Xem Tất Cả Phòng →
            </button>
          </div>
        </div>
      </section>

      {/* ===== ATTRACTIONS ===== */}
      <section className="section section-bg-cream" id="attractions">
        <div className="container">
          <div className="text-center">
            <div className="hero-eyebrow" style={{ color: 'var(--gold)' }}>Khám Phá</div>
            <h2 className="section-title">Địa Danh Nổi Tiếng Cao Bằng</h2>
            <div className="gold-line" style={{ margin: '12px auto 20px' }} />
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Từ Mộc Chàm, bạn dễ dàng khám phá những thắng cảnh tuyệt đẹp của vùng đất địa đầu Tổ quốc
            </p>
          </div>
          <div className="attractions-grid">
            {CAO_BANG_ATTRACTIONS.map(attr => (
              <div key={attr.id} className="attraction-card">
                <div className="attraction-img-wrap">
                  <img src={attr.image} alt={attr.name} />
                </div>
                <div className="attraction-body">
                  <h3>{attr.name}</h3>
                  <p>{attr.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section
        style={{
          padding: '80px 0',
          background: 'linear-gradient(135deg, var(--green-dark) 0%, var(--green-primary) 100%)',
          textAlign: 'center',
          color: 'var(--white)',
        }}
      >
        <div className="container">
          <div style={{ fontSize: 48, marginBottom: 20 }}>🏔️</div>
          <h2 style={{ color: 'var(--white)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', marginBottom: 28 }}>
            Sẵn Sàng Cho Kỳ Nghỉ Hoàn Hảo?
          </h2>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-gold btn-lg" onClick={() => onNavigate('rooms', { filter: 'premium' })}>
              👑 Đặt Phòng Cận Cao Cấp
            </button>
            <button
              className="btn"
              style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: '2px solid rgba(255,255,255,0.4)' }}
              onClick={() => onNavigate('rooms', { filter: 'standard' })}
            >
              🏠 Phòng Tiêu Chuẩn
            </button>
          </div>
          <div style={{ marginTop: 40, display: 'flex', gap: 48, justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { icon: '📞', label: '0868 111 126' },
              { icon: '✉️', label: 'info@moccham.vn' },
              { icon: '📍', label: 'Xã Đàm Thủy, Cao Bằng' },
            ].map(c => (
              <div key={c.label} style={{ display: 'flex', alignItems: 'center', gap: 8, opacity: 0.85, fontSize: '0.9rem' }}>
                <span>{c.icon}</span> {c.label}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;

