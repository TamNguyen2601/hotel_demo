import React from 'react';
import { SAUNA_FEATURES, SAUNA_PACKAGES } from '../data/hotelData';

const formatPrice = (price) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

const SaunaPage = () => {
  return (
    <>
      {/* Hero */}
      <div style={{ position: 'relative', marginTop: 0 }}>
        <div
          style={{
            height: 520,
            background: `linear-gradient(rgba(13,61,36,0.5) 0%, rgba(13,61,36,0.8) 100%), url('https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1600&q=80') center/cover no-repeat`,
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
            Xông Hơi<br />
            <span style={{ color: 'var(--gold-light)', fontStyle: 'italic' }}>Thảo Dược Núi Rừng</span>
          </h1>
          <p style={{ maxWidth: 600, opacity: 0.9, fontSize: '1.05rem', lineHeight: 1.7 }}>
            Trải nghiệm liệu pháp xông hơi truyền thống người Tày với thảo dược quý rừng Cao Bằng —
            phương pháp chữa lành và phục hồi năng lượng được lưu truyền qua nhiều thế hệ.
          </p>
        </div>
      </div>

      {/* Features */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.78rem', letterSpacing: 3, color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 12 }}>
              Điểm Nổi Bật
            </div>
            <h2 className="section-title">Vì Sao Chọn Xông Hơi Mộc Chàm?</h2>
            <div className="gold-line" style={{ margin: '12px auto 20px' }} />
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              6 phòng xông hơi riêng tư trang bị hiện đại kết hợp thảo dược bản địa đặc sắc
            </p>
          </div>
          <div className="sauna-features-grid">
            {SAUNA_FEATURES.map(f => (
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
              'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80',
              'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&q=80',
              'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=600&q=80',
              'https://images.unsplash.com/photo-1612198790700-14e81d5e6e76?w=600&q=80',
              'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
              'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600&q=80',
            ].map((img, i) => (
              <div
                key={i}
                style={{
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  height: i === 0 || i === 5 ? 280 : 200,
                  boxShadow: 'var(--shadow-md)',
                  transition: 'transform 0.3s',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseLeave={e => e.currentTarget.style.transform = ''}
              >
                <img
                  src={img}
                  alt={`Xông hơi ${i + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.78rem', letterSpacing: 3, color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 12 }}>
              Bảng Giá
            </div>
            <h2 className="section-title">Gói Dịch Vụ</h2>
            <div className="gold-line" style={{ margin: '12px auto 20px' }} />
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Chọn gói dịch vụ phù hợp với nhu cầu thư giãn và phục hồi của bạn
            </p>
          </div>
          <div className="packages-grid">
            {SAUNA_PACKAGES.map(pkg => (
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
              { step: '01', title: 'Đặt Lịch', desc: 'Đặt lịch trước hoặc tại quầy lễ tân. Chọn giờ và gói dịch vụ phù hợp.' },
              { step: '02', title: 'Chuẩn Bị', desc: 'Thay trang phục xông hơi. Nhân viên hướng dẫn và chuẩn bị thảo dược.' },
              { step: '03', title: 'Xông Hơi', desc: 'Thư giãn trong phòng xông hơi riêng với thảo dược và nhạc thiền định.' },
              { step: '04', title: 'Nghỉ Ngơi', desc: 'Thưởng thức trà thảo dược và bánh ngọt sau khi xông hơi.' },
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
          <h2 className="section-title">Đặt Lịch Xông Hơi</h2>
          <div className="gold-line" style={{ margin: '12px auto 20px' }} />
          <p style={{ color: 'var(--text-light)', maxWidth: 500, margin: '0 auto 28px' }}>
            Liên hệ trực tiếp để đặt lịch hoặc bổ sung dịch vụ xông hơi vào đơn đặt phòng của bạn.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <div style={{ background: 'var(--white)', padding: '16px 28px', borderRadius: 'var(--radius-sm)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-light)', marginBottom: 4 }}>Hotline đặt lịch</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--green-primary)' }}>📞 0263 123 4567</div>
            </div>
            <div style={{ background: 'var(--white)', padding: '16px 28px', borderRadius: 'var(--radius-sm)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-light)', marginBottom: 4 }}>Giờ mở cửa</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--green-primary)' }}>🕐 08:00 – 21:00</div>
            </div>
            <div style={{ background: 'var(--white)', padding: '16px 28px', borderRadius: 'var(--radius-sm)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-light)', marginBottom: 4 }}>Vị trí</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--green-primary)' }}>🏢 Tầng 5</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SaunaPage;

