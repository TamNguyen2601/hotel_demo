import React, { useState } from 'react';
import {
  MENU_SETS,
  MENU_STARTERS,
  MENU_MAINS,
  MENU_VEGS,
  MENU_RICE,
  MENU_DESSERTS,
  MENU_DRINKS_FREE,
  MENU_DRINKS_PAID,
} from '../data/hotelData';

const formatPrice = (price) =>
  new Intl.NumberFormat('vi-VN').format(price) + 'đ';

// ─────────────────────────────────────────────
// NAV SECTIONS for internal anchor scroll
// ─────────────────────────────────────────────
const MENU_NAV = [
  { id: 'set-dac-biet', label: '🏆 Set Đặc Biệt' },
  { id: 'mon-khai-vi', label: '🥗 Khai Vị' },
  { id: 'mon-chinh', label: '🍖 Món Chính' },
  { id: 'rau-tinh-bot', label: '🥬 Rau & Tinh Bột' },
  { id: 'com-canh', label: '🍚 Cơm & Canh' },
  { id: 'trang-mieng', label: '🍮 Tráng Miệng' },
  { id: 'do-uong', label: '🍵 Đồ Uống' },
];

// ─────────────────────────────────────────────
// ITEM CARD (dùng cho khai vị, chính, rau, cơm, tráng miệng)
// ─────────────────────────────────────────────
const ItemCard = ({ item }) => (
  <div className="food-item-card">
    <div className="food-item-img">
      <img src={item.image} alt={item.name} loading="lazy" />
    </div>
    <div className="food-item-body">
      <h4 className="food-item-name">{item.name}</h4>
      <div className="food-item-price">{formatPrice(item.price)}</div>
    </div>
  </div>
);

// ─────────────────────────────────────────────
// SECTION HEADING
// ─────────────────────────────────────────────
const SectionHeading = ({ emoji, title }) => (
  <div className="food-section-heading">
    <span className="food-section-emoji">{emoji}</span>
    <h2 className="food-section-title">{title}</h2>
    <div className="food-section-line" />
  </div>
);

// ─────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────
const FoodPage = () => {
  const [activeNav, setActiveNav] = useState('set-dac-biet');

  const scrollTo = (id) => {
    setActiveNav(id);
    const el = document.getElementById(id);
    if (el) {
      const offset = 130;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* ── HEADER ── */}
      <div
        className="page-header"
        style={{
          background: `linear-gradient(rgba(13,61,36,0.55), rgba(13,61,36,0.88)),
            url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&q=80') center/cover`,
        }}
      >
        <h1>Nhà Hàng Mộc Chàm</h1>
        <p>Thực đơn đặc sản vùng cao Cao Bằng thuần chất — do đầu bếp người Tày chế biến từ nguyên liệu tươi sạch địa phương</p>
        <div style={{ marginTop: 20, display: 'flex', gap: 24, justifyContent: 'center', fontSize: '0.9rem', opacity: 0.85, flexWrap: 'wrap' }}>
          <span>🏢 Tầng 1 Khách Sạn</span>
          <span>🕐 06:00 – 22:00</span>
          <span>👥 Sức chứa 80 khách</span>
        </div>
      </div>

      {/* ── STICKY MENU NAV ── */}
      <div className="food-menu-nav">
        <div className="container">
          <div className="food-menu-nav-inner">
            {MENU_NAV.map((n) => (
              <button
                key={n.id}
                className={`food-menu-nav-btn ${activeNav === n.id ? 'active' : ''}`}
                onClick={() => scrollTo(n.id)}
              >
                {n.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════
          SET ĐẶC BIỆT  (nổi bật nhất)
          ══════════════════════════════════ */}
      <section id="set-dac-biet" className="food-section food-section-sets">
        <div className="container">
          {/* Tiêu đề section */}
          <div className="set-section-header">
            <div className="set-section-crown">👑</div>
            <h2 className="set-section-title">SET ĐẶC BIỆT</h2>
            <p className="set-section-sub">Trải nghiệm ẩm thực Cao Bằng trọn vẹn — tiết kiệm hơn gọi từng món</p>
            <div className="gold-line" style={{ margin: '12px auto 0', width: 80 }} />
          </div>

          <div className="set-cards-wrap">
            {MENU_SETS.map((set, idx) => (
              <div key={set.id} className={`set-card ${idx === 0 ? 'set-card--featured' : 'set-card--large'}`}>
                {/* Ribbon */}
                <div className="set-ribbon">
                  {idx === 0 ? '🌿 Phổ biến nhất' : '🏆 Dành cho nhóm lớn'}
                </div>

                <div className="set-card-inner">
                  {/* Ảnh */}
                  <div className="set-card-img-wrap">
                    <img src={set.image} alt={set.name} loading="lazy" />
                    <div className="set-card-img-overlay" />
                  </div>

                  {/* Nội dung */}
                  <div className="set-card-body">
                    <h3 className="set-card-name">{set.name}</h3>
                    <p className="set-card-subtitle">{set.subtitle}</p>

                    <ul className="set-card-items">
                      {set.items.map((it, i) => (
                        <li key={i}>
                          <span className="set-item-dot">▸</span> {it}
                        </li>
                      ))}
                    </ul>

                    <div className="set-card-price-block">
                      <span className="set-price-old">{formatPrice(set.originalPrice)}</span>
                      <span className="set-price-new">{formatPrice(set.price)}</span>
                      <span className="set-price-save">
                        Tiết kiệm {formatPrice(set.originalPrice - set.price)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          MÓN KHAI VỊ
          ══════════════════════════════════ */}
      <section id="mon-khai-vi" className="food-section food-section-alt">
        <div className="container">
          <SectionHeading emoji="🥗" title="Món Khai Vị" />
          <div className="food-items-grid">
            {MENU_STARTERS.map((item) => <ItemCard key={item.id} item={item} />)}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          MÓN CHÍNH
          ══════════════════════════════════ */}
      <section id="mon-chinh" className="food-section">
        <div className="container">
          <SectionHeading emoji="🍖" title="Món Chính" />
          <div className="food-items-grid">
            {MENU_MAINS.map((item) => <ItemCard key={item.id} item={item} />)}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          RAU & TINH BỘT  +  CƠM & CANH  (2 cột)
          ══════════════════════════════════ */}
      <section className="food-section food-section-alt">
        <div className="container">
          <div className="food-two-col">
            {/* Rau & Tinh bột */}
            <div id="rau-tinh-bot">
              <SectionHeading emoji="🥬" title="Rau & Tinh Bột" />
              <div className="food-items-grid food-items-grid--half">
                {MENU_VEGS.map((item) => <ItemCard key={item.id} item={item} />)}
              </div>
            </div>
            {/* Cơm & Canh */}
            <div id="com-canh">
              <SectionHeading emoji="🍚" title="Cơm & Canh" />
              <div className="food-items-grid food-items-grid--half">
                {MENU_RICE.map((item) => <ItemCard key={item.id} item={item} />)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          TRÁNG MIỆNG
          ══════════════════════════════════ */}
      <section id="trang-mieng" className="food-section">
        <div className="container">
          <SectionHeading emoji="🍮" title="Tráng Miệng" />
          <div className="food-items-grid food-items-grid--center">
            {MENU_DESSERTS.map((item) => <ItemCard key={item.id} item={item} />)}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          ĐỒ UỐNG
          ══════════════════════════════════ */}
      <section id="do-uong" className="food-section food-section-alt">
        <div className="container">
          <SectionHeading emoji="🍵" title="Đồ Uống" />

          <div className="drinks-grid">
            {/* Đồ uống MIỄN PHÍ — nổi bật */}
            <div className="drinks-free-card">
              <div className="drinks-free-badge">✨ MIỄN PHÍ</div>
              <div className="drinks-free-icon">🍃</div>
              <h3 className="drinks-free-title">Đồ Uống Miễn Phí</h3>
              {MENU_DRINKS_FREE.map((d) => (
                <div key={d.id} className="drinks-free-name">{d.name}</div>
              ))}
              <p className="drinks-free-note">Phục vụ miễn phí cho tất cả thực khách</p>
            </div>

            {/* Đồ uống kinh doanh */}
            <div className="drinks-paid-card">
              <h3 className="drinks-paid-title">🥤 Đồ Uống Kinh Doanh</h3>
              <div className="drinks-paid-list">
                {MENU_DRINKS_PAID.map((d) => (
                  <div key={d.id} className="drinks-paid-row">
                    <span className="drinks-paid-name">{d.name}</span>
                    <span className="drinks-paid-price">{formatPrice(d.price)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── NOTE / CTA ── */}
      <section style={{ padding: '0 0 60px' }}>
        <div className="container">
          <div
            style={{
              textAlign: 'center',
              padding: '36px 32px',
              background: 'var(--pink-soft)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--pink-mid)',
            }}
          >
            <div style={{ fontSize: '1.6rem', marginBottom: 12 }}>📋</div>
            <h3 style={{ color: 'var(--green-dark)', marginBottom: 8 }}>Đặt Bữa Ăn Trước</h3>
            <p style={{ color: 'var(--text-light)', maxWidth: 500, margin: '0 auto 16px' }}>
              Bạn có thể đặt trước các món ăn khi đặt phòng để chúng tôi chuẩn bị sẵn sàng ngay
              khi bạn đến. Hoặc gọi thẳng tại nhà hàng — chúng tôi luôn sẵn sàng phục vụ!
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.88rem', color: 'var(--green-dark)' }}>
                📞 Đặt bàn: <strong>0868 111 126</strong>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.88rem', color: 'var(--green-dark)' }}>
                🕐 Phục vụ: <strong>06:00 – 22:00</strong>
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FoodPage;
