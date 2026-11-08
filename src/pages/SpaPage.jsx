import React, { useState } from 'react';
import { SPA_FEATURES, SPA_PACKAGES } from '../data/hotelData';

const formatPrice = (price) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

const SpaPage = ({ onNavigate }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPkg, setSelectedPkg] = useState(null);

  const handleSelectPackage = (pkg) => {
    setSelectedPkg(pkg);
    setShowModal(true);
  };
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
              { url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80', h: 220 },
              { url: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&q=80', h: 220 },
              { url: '/spa-facial.jpg', h: 220 },
              { url: '/spa-massage.jpg', h: 220 },
              { url: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600&q=80', h: 220 },
              { url: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=600&q=80', h: 220 },
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
                <button
                  className={`btn ${pkg.recommended ? 'btn-gold' : 'btn-outline'} w-full`}
                  style={{ justifyContent: 'center' }}
                  onClick={() => handleSelectPackage(pkg)}
                >
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
              { step: '04', title: 'Thư Giãn', desc: 'Nghỉ ngơi, thư giãn và ngắm trọn cảnh sắc núi rừng mây trời sau liệu trình.' },
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
              { label: 'Hotline đặt lịch', value: '📞 0868 111 126' },
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

      {/* Modal Thông Báo */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div
            className="modal"
            style={{ maxWidth: 440, textAlign: 'center', padding: '36px 28px', position: 'relative' }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              style={{
                position: 'absolute',
                top: 14,
                right: 14,
                background: 'var(--pink-soft)',
                border: 'none',
                width: 32,
                height: 32,
                borderRadius: '50%',
                fontSize: '1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-light)',
                transition: 'all 0.2s',
              }}
              aria-label="Đóng"
            >
              ✕
            </button>

            <div style={{ fontSize: '2.8rem', marginBottom: 12 }}>🌿</div>
            <h3 style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '1.35rem',
              color: 'var(--green-dark)',
              marginBottom: 12,
              lineHeight: 1.4,
            }}>
              Cùng đặt phòng và tận hưởng dịch vụ cùng chúng tôi nhé!
            </h3>
            {selectedPkg && (
              <p style={{ fontSize: '0.88rem', color: 'var(--text-light)', marginBottom: 24, lineHeight: 1.6 }}>
                Gói <strong>{selectedPkg.name}</strong> ({formatPrice(selectedPkg.price)}) có thể được chọn trực tiếp ngay khi bạn đặt phòng.
              </p>
            )}

            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button
                className="btn btn-gold btn-lg"
                style={{ padding: '12px 36px', fontSize: '1rem', fontWeight: 700 }}
                onClick={() => {
                  setShowModal(false);
                  if (onNavigate) {
                    onNavigate('rooms', { filter: 'all' });
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
              >
                Đi nào!
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SpaPage;

