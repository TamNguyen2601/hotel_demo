import React from 'react';
import { SPA_FEATURES, SPA_PACKAGES } from '../data/hotelData';

const formatPrice = (price) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

const SpaPage = () => {
  return (
    <>
      {/* Hero */}
      <div
        style={{
          height: 540,
          background: `linear-gradient(rgba(13,61,36,0.45) 0%, rgba(13,61,36,0.82) 100%),
            url('https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1600&q=80') center/cover no-repeat`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center',
          padding: '100px 24px 48px',
        }}
      >
        <div style={{ fontSize: '0.78rem', letterSpacing: 4, color: 'var(--gold-light)', marginBottom: 16, textTransform: 'uppercase' }}>
          Tầng 5 • Khu Chăm Sóc Sức Khỏe
        </div>
        <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontFamily: 'Playfair Display, serif', marginBottom: 20, lineHeight: 1.2, color: 'white' }}>
          Chăm Sóc Sức Khỏe<br />
          <span style={{ color: 'var(--gold-light)', fontStyle: 'italic' }}>Bản Spa Thảo Dược</span>
        </h1>
        <p style={{ maxWidth: 620, opacity: 0.92, fontSize: '1.05rem', lineHeight: 1.7 }}>
          Trải nghiệm liệu pháp thảo dược cổ truyền người Dao/Tày với 04 bồn ngâm lá thuốc
          và phòng xông hơi view mây trời — phục hồi năng lượng hoàn toàn sau chuyến khám phá Cao Bằng.
        </p>
        <div style={{ marginTop: 24, display: 'flex', gap: 24, justifyContent: 'center', fontSize: '0.9rem', opacity: 0.85 }}>
          <span>🏢 Tầng 5 Khách Sạn</span>
          <span>🕐 08:00 – 21:00</span>
          <span>🌿 04 Bồn Ngâm Thảo Dược</span>
        </div>
      </div>

      {/* Features */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.78rem', letterSpacing: 3, color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 12 }}>
              Điểm Nổi Bật
            </div>
            <h2 className="section-title">Vì Sao Chọn Bản Spa Mộc Chàm?</h2>
            <div className="gold-line" style={{ margin: '12px auto 20px' }} />
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Khu chăm sóc sức khỏe ~120m² với thảo dược bản địa đặc sắc và tầm nhìn panorama núi mây
            </p>
          </div>
          <div className="sauna-features-grid">
            {SPA_FEATURES.map(f => (
              <div key={f.title} className="sauna-feature-card">
                <div className="sauna-feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section section-bg-cream" style={{ padding: '48px 0' }}>
        <div className="container">
          <h2 className="section-title text-center">Không Gian Thư Giãn</h2>
          <div className="gold-line" style={{ margin: '12px auto 32px' }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {[
              { url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80', h: 280 },
              { url: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&q=80', h: 200 },
              { url: 'https://images.unsplash.com/photo-1612198790700-14e81d5e6e76?w=600&q=80', h: 200 },
              { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80', h: 200 },
              { url: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600&q=80', h: 200 },
              { url: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=600&q=80', h: 280 },
            ].map((img, i) => (
              <div
                key={i}
                style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', height: img.h, boxShadow: 'var(--shadow-md)', transition: 'transform 0.3s' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseLeave={e => e.currentTarget.style.transform = ''}
              >
                <img src={img.url} alt={`Spa ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trà chiều section */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '0.78rem', letterSpacing: 3, color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 12 }}>Tầng 5 • ~140m²</div>
              <h2 className="section-title">Quầy Trà Chiều<br />Panorama</h2>
              <div className="gold-line" />
              <p style={{ color: 'var(--text-light)', lineHeight: 1.8, marginBottom: 16 }}>
                Khu vực phục vụ <strong style={{ color: 'var(--green-dark)' }}>cà phê, chè đắng và trà hoa quả Cao Bằng</strong> với
                thiết kế kính panorama mở trọn tầm nhìn ngắm trọn cảnh sắc thung lũng và núi non
                hùng vĩ của vùng biên giới từ trên cao.
              </p>
              <p style={{ color: 'var(--text-light)', lineHeight: 1.8 }}>
                Đây là không gian lý tưởng để bắt đầu buổi sáng với tách cà phê nhìn ra mây núi,
                hoặc thư giãn buổi chiều sau chuyến khám phá Thác Bản Giốc, Hồ Thang Hen.
              </p>
              <div style={{ marginTop: 20, display: 'flex', gap: 24 }}>
                {['☕ Cà phê', '🍵 Chè đắng', '🌸 Trà hoa quả'].map(item => (
                  <div key={item} style={{ fontSize: '0.88rem', color: 'var(--green-dark)', fontWeight: 600 }}>{item}</div>
                ))}
              </div>
            </div>
            <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', height: 380, boxShadow: 'var(--shadow-lg)' }}>
              <img
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=700&q=80"
                alt="Quầy trà panorama"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="section section-bg-cream">
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.78rem', letterSpacing: 3, color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 12 }}>
              Bảng Giá
            </div>
            <h2 className="section-title">Gói Dịch Vụ Spa</h2>
            <div className="gold-line" style={{ margin: '12px auto 20px' }} />
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Chọn gói liệu trình phù hợp — ngâm lá thuốc, xông hơi thảo dược và massage phục hồi
            </p>
          </div>
          <div className="packages-grid">
            {SPA_PACKAGES.map(pkg => (
              <div key={pkg.id} className={`package-card ${pkg.recommended ? 'recommended' : ''}`}>
                {pkg.recommended && <div className="recommended-badge">★ Khuyến Nghị</div>}
                <div className="package-name">{pkg.name}</div>
                <div className="package-duration">⏱ {pkg.duration}</div>
                <div className="package-price">{formatPrice(pkg.price)}</div>
                <ul className="package-includes">
                  {pkg.includes.map((inc, i) => <li key={i}>{inc}</li>)}
                </ul>
                <button className={`btn ${pkg.recommended ? 'btn-gold' : 'btn-outline'} w-full`}
                  style={{ justifyContent: 'center' }}>
                  Chọn Gói Này
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section section-bg-green">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ color: 'white', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}>Quy Trình Trải Nghiệm</h2>
            <div className="gold-line" style={{ margin: '12px auto 0', background: 'linear-gradient(90deg, var(--gold), var(--gold-light))' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 32 }}>
            {[
              { step: '01', title: 'Đặt Lịch', desc: 'Đặt trước hoặc tại quầy lễ tân. Chọn giờ và gói dịch vụ phù hợp.' },
              { step: '02', title: 'Chuẩn Bị', desc: 'Thay trang phục spa. Nhân viên hướng dẫn và chuẩn bị bồn ngâm thảo dược.' },
              { step: '03', title: 'Trải Nghiệm', desc: 'Ngâm lá thuốc, xông hơi view mây trời với nhạc thiền định dân gian.' },
              { step: '04', title: 'Thư Giãn', desc: 'Thưởng thức trà hoa quả và bánh ngọt tại quầy panorama sau liệu trình.' },
            ].map(s => (
              <div key={s.step} style={{ textAlign: 'center' }}>
                <div style={{ width: 60, height: 60, background: 'var(--gold)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: '1.2rem', fontWeight: 700, color: 'var(--dark)' }}>
                  {s.step}
                </div>
                <h3 style={{ color: 'white', marginBottom: 8, fontSize: '1rem' }}>{s.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.85rem', lineHeight: 1.65 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '60px 0', background: 'var(--pink-soft)', textAlign: 'center' }}>
        <div className="container">
          <div style={{ fontSize: '2.5rem', marginBottom: 16 }}>🌿</div>
          <h2 className="section-title">Đặt Lịch Chăm Sóc Sức Khỏe</h2>
          <div className="gold-line" style={{ margin: '12px auto 20px' }} />
          <p style={{ color: 'var(--text-light)', maxWidth: 500, margin: '0 auto 28px' }}>
            Liên hệ trực tiếp để đặt lịch hoặc bổ sung dịch vụ spa vào đơn đặt phòng của bạn.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { label: 'Hotline đặt lịch', value: '📞 0263 123 4567' },
              { label: 'Giờ mở cửa', value: '🕐 08:00 – 21:00' },
              { label: 'Vị trí', value: '🏢 Tầng 5' },
            ].map(c => (
              <div key={c.label} style={{ background: 'var(--white)', padding: '16px 28px', borderRadius: 'var(--radius-sm)', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-light)', marginBottom: 4 }}>{c.label}</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--green-primary)' }}>{c.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default SpaPage;

