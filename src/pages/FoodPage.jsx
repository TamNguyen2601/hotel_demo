import React, { useState } from 'react';
import { MENU_ITEMS } from '../data/hotelData';

const formatPrice = (price) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

const CATEGORIES = ['Tất cả', 'Món khai vị', 'Món chính', 'Món bún phở', 'Món hải sản', 'Món rau', 'Lẩu', 'Món tráng miệng'];

const FoodPage = () => {
  const [activeCategory, setActiveCategory] = useState('Tất cả');

  const filtered = activeCategory === 'Tất cả'
    ? MENU_ITEMS
    : MENU_ITEMS.filter(item => item.category === activeCategory);

  return (
    <>
      {/* Header */}
      <div
        className="page-header"
        style={{
          background: `linear-gradient(rgba(13,61,36,0.6), rgba(13,61,36,0.85)), url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&q=80') center/cover`,
        }}
      >
        <h1>Nhà Hàng Mộc Chàm</h1>
        <p>
          Thực đơn đặc sản vùng cao Cao Bằng thuần chất — do đầu bếp người Tày chế biến
          từ nguyên liệu tươi sạch địa phương
        </p>
        <div style={{ marginTop: 20, display: 'flex', gap: 24, justifyContent: 'center', fontSize: '0.9rem', opacity: 0.85 }}>
          <span>🏢 Tầng 1 Khách Sạn</span>
          <span>🕐 06:00 – 22:00</span>
          <span>👥 Sức chứa 80 khách</span>
        </div>
      </div>

      {/* Intro */}
      <section className="section section-bg-cream" style={{ padding: '48px 0' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 48,
              alignItems: 'center',
            }}
          >
            <div>
              <div style={{ fontSize: '0.78rem', letterSpacing: 3, color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 12 }}>
                Ẩm Thực Đặc Sắc
              </div>
              <h2 className="section-title">Hương Vị Cao Bằng<br />Thuần Chất</h2>
              <div className="gold-line" />
              <p style={{ color: 'var(--text-light)', lineHeight: 1.8, marginBottom: 16 }}>
                Nhà hàng Mộc Chàm tự hào mang đến thực khách những món ăn đặc sản
                vùng cao Cao Bằng nguyên bản nhất — từ lợn quay giòn rụm theo công
                thức gia truyền người Nùng đến phở chua độc đáo chỉ có ở xứ này.
              </p>
              <p style={{ color: 'var(--text-light)', lineHeight: 1.8 }}>
                Đội ngũ đầu bếp là những nghệ nhân ẩm thực người bản địa, sử dụng
                nguồn nguyên liệu tươi sạch được thu mua trực tiếp từ nông dân và
                rừng núi Cao Bằng mỗi sáng sớm.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {MENU_ITEMS.slice(0, 4).map(item => (
                <div key={item.id} style={{ position: 'relative', borderRadius: 'var(--radius-sm)', overflow: 'hidden', height: 140 }}>
                  <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(0,0,0,0.6))', padding: '20px 10px 8px' }}>
                    <div style={{ color: 'white', fontSize: '0.75rem', fontWeight: 600 }}>{item.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Menu */}
      <section style={{ padding: '0 0 60px' }}>
        <div className="container">
          <div style={{ textAlign: 'center', padding: '40px 0 24px' }}>
            <h2 className="section-title">Thực Đơn</h2>
            <div className="gold-line" style={{ margin: '12px auto 24px' }} />
          </div>

          {/* Category Filter */}
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 32 }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
                style={{ padding: '8px 18px', fontSize: '0.85rem' }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="menu-grid">
            {filtered.map(item => (
              <div key={item.id} className="menu-card">
                <div className="menu-card-img">
                  <img src={item.image} alt={item.name} loading="lazy" />
                </div>
                <div className="menu-card-body">
                  <div className="menu-card-category">{item.category}</div>
                  <h3 className="menu-card-name">{item.name}</h3>
                  <p className="menu-card-desc">{item.description}</p>
                  <div className="menu-card-footer">
                    <span className="menu-price">{formatPrice(item.price)}</span>
                    <span className="badge badge-pink">{item.tag}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Note */}
          <div
            style={{
              textAlign: 'center',
              padding: '32px',
              background: 'var(--pink-soft)',
              borderRadius: 'var(--radius-md)',
              marginTop: 40,
            }}
          >
            <div style={{ fontSize: '1.5rem', marginBottom: 12 }}>📋</div>
            <h3 style={{ color: 'var(--green-dark)', marginBottom: 8 }}>Đặt Bữa Ăn Trước</h3>
            <p style={{ color: 'var(--text-light)', maxWidth: 500, margin: '0 auto 16px' }}>
              Bạn có thể đặt trước các món ăn khi đặt phòng để chúng tôi chuẩn bị sẵn sàng ngay
              khi bạn đến. Hoặc gọi thẳng tại nhà hàng — chúng tôi luôn sẵn sàng phục vụ!
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.88rem', color: 'var(--green-dark)' }}>
                📞 Đặt bàn: <strong>0263 123 4567</strong>
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

