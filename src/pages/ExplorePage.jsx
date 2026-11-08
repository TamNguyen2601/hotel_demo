import React, { useEffect, useRef, useState } from 'react';

/* ─────────────────────────── DATA ─────────────────────────── */
const FLOORS = [
  {
    num: 1,
    id: 'f1',
    tag: 'Tầng 1 · ~350 m²',
    title: 'Nhà Hàng & Lễ Tân',
    subtitle: 'Nơi Hành Trình Bắt Đầu',
    color: '#c9a84c',
    bg: 'var(--cream)',
    heroImg: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1400&q=85',
    photos: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=700&q=80',
      'https://images.unsplash.com/photo-1544025162-d76694265947?w=700&q=80',
      'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=700&q=80',
    ],
    desc: 'Khởi đầu hành trình tại sảnh lễ tân mang đậm hồn văn hóa Tày – Nùng, nơi thổ cẩm rực rỡ và nhạc cụ bản địa chào đón từng vị khách. Nhà hàng Mộc Chàm phục vụ thực đơn 50+ món đặc sản vùng cao do đầu bếp người Tày chế biến từ nguyên liệu tươi địa phương mỗi sáng sớm.',
    items: [
      { icon: '🏛️', title: 'Sảnh Lễ Tân', sub: '~70 m²', note: 'Tiếp đón văn hóa bản địa' },
      { icon: '🍜', title: 'Nhà Hàng Đặc Sản', sub: '~220 m² · 80 chỗ', note: '06:00–22:00 mỗi ngày' },
      { icon: '🛗', title: 'Hạ Tầng Kỹ Thuật', sub: '~60 m²', note: 'Thang máy & kho lạnh' },
    ],
    cta: { label: '🍜 Xem Thực Đơn', page: 'food' },
  },
  {
    num: 2,
    id: 'f2',
    tag: 'Tầng 2 · ~320 m²',
    title: 'Phòng Cao Cấp',
    subtitle: '8 Phòng Cận Hạng Sang · 28–30 m²',
    color: '#1a5c3a',
    bg: 'var(--white)',
    heroImg: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1400&q=85',
    photos: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=700&q=80',
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=700&q=80',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=700&q=80',
    ],
    desc: '8 phòng cao cấp rộng 28–30 m² với nội thất gỗ tự nhiên tinh tế, lấy cảm hứng từ kiến trúc nhà sàn truyền thống. Mỗi phòng có ban công riêng hướng ra núi rừng hùng vĩ, bồn tắm Jacuzzi, giường King size và dịch vụ quản gia tận tâm 24/7. Sảnh tiếp đón văn hóa ~70 m² trưng bày thổ cẩm và tác phẩm nghệ thuật bản địa.',
    items: [
      { icon: '👑', title: '08 Phòng Cao Cấp', sub: '~230 m² · 28–30 m²/phòng', note: 'Giường King · Jacuzzi · Ban công' },
      { icon: '🎎', title: 'Sảnh Văn Hóa', sub: '~70 m²', note: 'Triển lãm văn hóa Tày – Nùng' },
      { icon: '🛗', title: 'Hành Lang', sub: '~20 m²', note: 'Thang máy & kỹ thuật tầng' },
    ],
    cta: { label: '👑 Xem Phòng Cao Cấp', page: 'rooms', filter: 'premium' },
  },
  {
    num: 3,
    id: 'f3',
    tag: 'Tầng 3 · ~320 m²',
    title: 'Phòng Đôi Tiêu Chuẩn',
    subtitle: '11 Phòng · 23–24 m²',
    color: '#2d7a52',
    bg: 'var(--pink-soft)',
    heroImg: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1400&q=85',
    photos: [
      'https://images.unsplash.com/photo-1587985064135-0366536eab42?w=700&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=700&q=80',
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=700&q=80',
    ],
    desc: '11 phòng đôi tiêu chuẩn 23–24 m² được thiết kế ấm cúng với màu sắc tươi sáng và nội thất gỗ tự nhiên. Giường Queen size, bồn tắm rộng rãi và cửa sổ view thành phố tạo không gian lý tưởng cho cặp đôi và nhóm bạn. Hành lang rộng thoáng kết nối 11 phòng với thang máy và kho đồ vải tích hợp thiết bị giặt là chuyên nghiệp.',
    items: [
      { icon: '🛏️', title: '11 Phòng Đôi TC', sub: '~260 m² · 23–24 m²/phòng', note: 'Giường Queen · Bồn tắm · View phố' },
      { icon: '🧺', title: 'Không Gian Phụ Trợ', sub: '~60 m²', note: 'Kho vải · Hành lang · 2 lối PCCC' },
    ],
    cta: { label: '🛏️ Xem Phòng Đôi', page: 'rooms', filter: 'double' },
  },
  {
    num: 4,
    id: 'f4',
    tag: 'Tầng 4 · ~320 m²',
    title: 'Phòng Đơn Tiêu Chuẩn',
    subtitle: '11 Phòng · 22–24 m²',
    color: '#4a9e72',
    bg: 'var(--white)',
    heroImg: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=1400&q=85',
    photos: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=700&q=80',
      'https://images.unsplash.com/photo-1495433324511-bf8e92934d90?w=700&q=80',
      'https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=700&q=80',
    ],
    desc: '11 phòng đơn 22–24 m² thiết kế đồng trục với tầng 3, tối ưu kết cấu và chi phí kỹ thuật. Mỗi phòng bố trí 02 giường đơn (1,2m × 2m), bàn làm việc nhỏ gọn và ban công thoáng mát — lý tưởng cho bạn bè, đồng nghiệp và khách đoàn công tác. Vệ sinh khép kín, đầy đủ tiện nghi thiết yếu.',
    items: [
      { icon: '🛏', title: '11 Phòng Đơn TC', sub: '~260 m² · 22–24 m²/phòng', note: '2 giường đơn · Ban công · Bàn làm việc' },
      { icon: '🔒', title: 'Hành Lang & Kỹ Thuật', sub: '~60 m²', note: 'Thang máy · 2 lối thoát hiểm PCCC' },
    ],
    cta: { label: '🛏 Xem Phòng Đơn', page: 'rooms', filter: 'single' },
  },
  {
    num: 5,
    id: 'f5',
    tag: 'Tầng Thượng · ~320 m²',
    title: 'Trải Nghiệm & Thư Giãn',
    subtitle: 'Trà Chiều Panorama · Bản Spa Thảo Dược',
    color: '#c9a84c',
    bg: 'var(--green-dark)',
    dark: true,
    heroImg: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1400&q=85',
    photos: [
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=700&q=80',
      'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=700&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&q=80',
    ],
    desc: 'Tầng thượng là điểm đến thư giãn đỉnh cao của Mộc Chàm. Quầy trà panorama ~140 m² với mặt kính toàn cảnh mở ra tầm nhìn thung lũng, núi non hùng vĩ vùng biên giới. Khu spa ~120 m² sở hữu 04 bồn ngâm lá thuốc cổ truyền người Dao/Tày và phòng xông hơi thảo dược view mây trời — phục hồi năng lượng hoàn toàn.',
    items: [
      { icon: '🫖', title: 'Quầy Trà Panorama', sub: '~140 m²', note: 'Cà phê · Chè đắng · Trà hoa quả Cao Bằng' },
      { icon: '🌿', title: 'Bản Spa Thảo Dược', sub: '~120 m² · 04 bồn ngâm', note: 'Lá thuốc người Dao/Tày · View mây' },
      { icon: '🛗', title: 'Hành Lang Tầng Thượng', sub: '~60 m²', note: 'Kỹ thuật mái · Không gian xanh' },
    ],
    cta: { label: '🌿 Xem Dịch Vụ Spa', page: 'spa' },
  },
];

/* ─────────────────────── Animated section ───────────────────── */
const useFadeIn = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.08 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return [ref, visible];
};

/* ─────────────────────── Floor Section ─────────────────────── */
const FloorSection = ({ floor, reversed, onNavigate }) => {
  const [secRef, secVis] = useFadeIn();
  const [gallRef, gallVis] = useFadeIn();

  const handleCta = () => {
    if (floor.cta.filter) onNavigate(floor.cta.page, { filter: floor.cta.filter });
    else onNavigate(floor.cta.page);
  };

  return (
    <section
      id={floor.id}
      style={{ background: floor.bg, scrollMarginTop: 72 }}
    >
      {/* ── Full-bleed hero ── */}
      <div style={{ position: 'relative', height: 'clamp(380px, 52vh, 560px)', overflow: 'hidden' }}>
        <img
          src={floor.heroImg}
          alt={floor.title}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        {/* gradient */}
        <div style={{
          position: 'absolute', inset: 0,
          background: reversed
            ? 'linear-gradient(to left, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.38) 55%, transparent 100%)'
            : 'linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.38) 55%, transparent 100%)',
        }} />

        {/* Floor number watermark */}
        <div style={{
          position: 'absolute',
          [reversed ? 'left' : 'right']: '5%',
          top: '50%', transform: 'translateY(-50%)',
          fontSize: 'clamp(100px, 18vw, 200px)',
          fontFamily: 'Playfair Display, serif',
          fontWeight: 700,
          color: 'rgba(255,255,255,0.06)',
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none',
        }}>{floor.num}</div>

        {/* Text block */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center',
          [reversed ? 'justifyContent' : 'justifyContent']: reversed ? 'flex-end' : 'flex-start',
          padding: '0 clamp(28px, 6vw, 80px)',
        }}>
          <div style={{ maxWidth: 500, color: 'white', textAlign: reversed ? 'right' : 'left' }}>
            {/* tag */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: floor.color,
              color: floor.num === 1 || floor.num === 5 ? '#1a1a1a' : '#fff',
              padding: '5px 18px', borderRadius: 24,
              fontSize: '0.75rem', fontWeight: 700,
              letterSpacing: '1.5px', textTransform: 'uppercase',
              marginBottom: 20,
            }}>
              {floor.tag}
            </div>
            <h2 style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(2rem, 4.5vw, 3.4rem)',
              color: 'white', lineHeight: 1.15, marginBottom: 8,
            }}>
              {floor.title}
            </h2>
            <p style={{
              color: floor.color === '#c9a84c' ? '#f0d080' : '#a7f3d0',
              fontFamily: 'Playfair Display, serif',
              fontStyle: 'italic', fontSize: '1.05rem', marginBottom: 24,
            }}>
              {floor.subtitle}
            </p>
            <button
              onClick={handleCta}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '11px 28px',
                background: 'transparent',
                border: `2px solid ${floor.color}`,
                color: floor.color,
                borderRadius: 6,
                fontFamily: 'inherit', fontSize: '0.88rem', fontWeight: 700,
                cursor: 'pointer', transition: 'all 0.25s',
                letterSpacing: '0.3px',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = floor.color; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = floor.color; }}
            >
              {floor.cta.label}
            </button>
          </div>
        </div>
      </div>

      {/* ── Content block ── */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(40px, 6vw, 72px) clamp(20px, 5vw, 60px)' }}>
        <div
          ref={secRef}
          style={{
            display: 'grid',
            gridTemplateColumns: reversed ? '1fr 1.1fr' : '1.1fr 1fr',
            gap: 'clamp(32px, 5vw, 72px)',
            alignItems: 'center',
            opacity: secVis ? 1 : 0,
            transform: secVis ? 'none' : 'translateY(28px)',
            transition: 'opacity 0.65s ease, transform 0.65s ease',
          }}
        >
          {/* Text side */}
          <div style={{ order: reversed ? 2 : 1 }}>
            <p style={{
              fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)',
              color: floor.dark ? 'rgba(255,255,255,0.82)' : 'var(--text-light)',
              lineHeight: 1.85, marginBottom: 36,
            }}>
              {floor.desc}
            </p>

            {/* Item list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {floor.items.map((item, i) => (
                <div key={i} style={{
                  display: 'flex', gap: 16, alignItems: 'flex-start',
                  padding: '18px 20px',
                  background: floor.dark ? 'rgba(255,255,255,0.06)' : 'var(--white)',
                  borderRadius: 12,
                  borderLeft: `4px solid ${floor.color}`,
                  boxShadow: floor.dark ? 'none' : '0 2px 10px rgba(0,0,0,0.06)',
                  transition: 'transform 0.25s, box-shadow 0.25s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateX(4px)'; if (!floor.dark) e.currentTarget.style.boxShadow = '0 4px 18px rgba(0,0,0,0.1)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; if (!floor.dark) e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.06)'; }}
                >
                  <span style={{ fontSize: '1.6rem', flexShrink: 0 }}>{item.icon}</span>
                  <div>
                    <div style={{ fontFamily: 'Playfair Display, serif', fontWeight: 600, color: floor.dark ? '#fff' : 'var(--green-dark)', fontSize: '0.98rem', marginBottom: 3 }}>
                      {item.title}
                    </div>
                    <div style={{
                      display: 'inline-block', fontSize: '0.72rem', fontWeight: 700,
                      padding: '2px 10px', borderRadius: 20,
                      background: `${floor.color}22`, color: floor.dark ? floor.color : '#8a6a1a',
                      border: `1px solid ${floor.color}44`, marginBottom: 4,
                    }}>
                      {item.sub}
                    </div>
                    <div style={{ fontSize: '0.82rem', color: floor.dark ? 'rgba(255,255,255,0.55)' : 'var(--text-light)' }}>
                      {item.note}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Photo collage side */}
          <div
            ref={gallRef}
            style={{
              order: reversed ? 1 : 2,
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gridTemplateRows: '220px 160px',
              gap: 10,
              opacity: gallVis ? 1 : 0,
              transform: gallVis ? 'none' : `translateX(${reversed ? '-' : ''}24px)`,
              transition: 'opacity 0.65s ease 0.15s, transform 0.65s ease 0.15s',
            }}
          >
            {/* Big photo */}
            <div style={{
              gridColumn: '1 / 3', borderRadius: 14, overflow: 'hidden',
              boxShadow: '0 6px 24px rgba(0,0,0,0.15)',
            }}>
              <img src={floor.photos[0]} alt="" loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'none'}
              />
            </div>
            {/* Small photos */}
            {floor.photos.slice(1).map((p, i) => (
              <div key={i} style={{ borderRadius: 12, overflow: 'hidden', boxShadow: '0 4px 14px rgba(0,0,0,0.12)' }}>
                <img src={p} alt="" loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'none'}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Thin colored rule between floors */}
      <div style={{ height: 3, background: `linear-gradient(90deg, transparent 0%, ${floor.color}80 40%, ${floor.color}80 60%, transparent 100%)` }} />
    </section>
  );
};

/* ─────────────────────── Progress Indicator ─────────────────── */
const FloorProgress = () => {
  const [active, setActive] = useState(null);
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY + window.innerHeight * 0.35;
      for (const f of FLOORS) {
        const el = document.getElementById(f.id);
        if (el && y >= el.offsetTop && y < el.offsetTop + el.offsetHeight) {
          setActive(f.num);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{
      position: 'fixed', right: 20, top: '50%', transform: 'translateY(-50%)',
      display: 'flex', flexDirection: 'column', gap: 8, zIndex: 100,
    }}>
      {FLOORS.map(f => (
        <button
          key={f.id}
          title={f.title}
          onClick={() => document.getElementById(f.id)?.scrollIntoView({ behavior: 'smooth' })}
          style={{
            width: active === f.num ? 10 : 7,
            height: active === f.num ? 10 : 7,
            borderRadius: '50%',
            background: active === f.num ? f.color : 'rgba(0,0,0,0.2)',
            border: `2px solid ${active === f.num ? f.color : 'rgba(0,0,0,0.15)'}`,
            padding: 0, cursor: 'pointer',
            transition: 'all 0.3s',
            boxShadow: active === f.num ? `0 0 8px ${f.color}80` : 'none',
          }}
        />
      ))}
    </div>
  );
};

/* ─────────────────────── Main Page ─────────────────────── */
const ExplorePage = ({ onNavigate }) => {
  return (
    <>
      <FloorProgress />

      {/* ── Page Hero ── */}
      <div style={{
        position: 'relative',
        background: 'linear-gradient(160deg, var(--green-dark) 0%, #1e4d30 50%, #0a2a18 100%)',
        padding: 'clamp(90px, 15vw, 140px) 24px clamp(60px, 10vw, 100px)',
        textAlign: 'center',
        overflow: 'hidden',
      }}>
        {/* Dot grid */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.045, backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        {/* Gold glow */}
        <div style={{ position: 'absolute', top: '-30%', left: '50%', transform: 'translateX(-50%)', width: '60%', height: '60%', background: 'radial-gradient(ellipse, rgba(201,168,76,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', maxWidth: 680, margin: '0 auto' }}>
          <div style={{ fontSize: '0.72rem', letterSpacing: '4px', color: 'var(--gold-light)', textTransform: 'uppercase', fontWeight: 700, marginBottom: 20 }}>
            Khám Phá Không Gian
          </div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.4rem, 6vw, 4.5rem)', color: 'white', lineHeight: 1.1, marginBottom: 16 }}>
            Mộc Chàm<br />
            <span style={{ color: 'var(--gold-light)', fontStyle: 'italic' }}>Retreat & Restaurant</span>
          </h1>
          <div style={{ width: 80, height: 2, background: 'linear-gradient(90deg, transparent, var(--gold), transparent)', margin: '24px auto 28px' }} />
          <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)', lineHeight: 1.8, marginBottom: 40 }}>
            Hành trình khám phá 5 tầng không gian — từ nhà hàng đặc sản tầng trệt
            đến khu spa thảo dược và quầy trà panorama tầng thượng.
          </p>
          {/* Floor jump pills */}
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            {FLOORS.map(f => (
              <button
                key={f.id}
                onClick={() => document.getElementById(f.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                style={{
                  padding: '8px 20px', borderRadius: 24, border: `1.5px solid rgba(255,255,255,0.22)`,
                  background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.88)',
                  fontFamily: 'inherit', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer',
                  backdropFilter: 'blur(6px)', transition: 'all 0.22s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = f.color; e.currentTarget.style.borderColor = f.color; e.currentTarget.style.color = f.num === 1 || f.num === 5 ? '#1a1a1a' : '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)'; e.currentTarget.style.color = 'rgba(255,255,255,0.88)'; }}
              >
                Tầng {f.num}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Floor Sections ── */}
      {FLOORS.map((floor, i) => (
        <FloorSection key={floor.id} floor={floor} reversed={i % 2 !== 0} onNavigate={onNavigate} />
      ))}

      {/* ── Stats Footer ── */}
      <div style={{
        background: 'linear-gradient(135deg, var(--green-dark) 0%, #0a2a18 100%)',
        padding: 'clamp(60px, 10vw, 100px) 24px',
        textAlign: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div style={{ position: 'relative', maxWidth: 900, margin: '0 auto' }}>
          <div style={{ fontSize: '0.72rem', letterSpacing: '4px', color: 'var(--gold-light)', textTransform: 'uppercase', fontWeight: 700, marginBottom: 12 }}>Con Số Nổi Bật</div>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: 'white', marginBottom: 56 }}>
            Mộc Chàm trong <span style={{ color: 'var(--gold-light)', fontStyle: 'italic' }}>Tổng Quan</span>
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '32px 24px', marginBottom: 60 }}>
            {[
              { n: '5',   l: 'Tầng',              ic: '🏢' },
              { n: '30',  l: 'Phòng nghỉ',         ic: '🛏️' },
              { n: '8',   l: 'Phòng cao cấp',      ic: '👑' },
              { n: '22',  l: 'Phòng tiêu chuẩn',   ic: '🏠' },
              { n: '80',  l: 'Chỗ nhà hàng',       ic: '🍜' },
              { n: '04',  l: 'Bồn spa thảo dược',  ic: '🌿' },
            ].map(s => (
              <div key={s.l} style={{ padding: '20px 12px', background: 'rgba(255,255,255,0.05)', borderRadius: 14, border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ fontSize: '1.4rem', marginBottom: 8 }}>{s.ic}</div>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, color: 'var(--gold-light)', lineHeight: 1 }}>{s.n}</div>
                <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.55)', marginTop: 8, lineHeight: 1.4 }}>{s.l}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              className="btn btn-gold btn-lg"
              onClick={() => onNavigate('rooms', { filter: 'all' })}
            >
              🛏️ Đặt Phòng Ngay
            </button>
            <button
              onClick={() => onNavigate('home')}
              style={{
                padding: '14px 32px', borderRadius: 6, border: '2px solid rgba(255,255,255,0.28)',
                background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.88)',
                fontFamily: 'inherit', fontSize: '1rem', fontWeight: 600, cursor: 'pointer',
                transition: 'all 0.25s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
            >
              ← Về Trang Chủ
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExplorePage;
