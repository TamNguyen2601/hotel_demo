import React, { useEffect, useRef, useState } from 'react';

/* ─────────────────────────── DATA ─────────────────────────── */
const FLOORS = [
  {
    num: 1,
    id: 'f1',
    tag: 'Tầng 1 · ~450 m²',
    title: 'Nhà Hàng & Đặc Sản Bản Địa',
    subtitle: 'Tổ Hợp Ẩm Thực & Khu Bếp Công Nghiệp',
    color: '#c9a84c',
    bg: 'var(--cream)',
    heroImg: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1400&q=85',
    photos: [
      '/nha-hang.jpg',
      '/foods/mon-an-1.jpg',
      '/foods/mon-an-2.jpg',
      '/foods/mon-an-3.jpg',
      '/foods/mon-an-4.jpg',
      '/foods/mon-an-5.jpg',
      '/foods/mon-an-6.jpg',
    ],
    desc: 'Khu vực ăn uống chính với ~290 m² gồm 30 bàn 6 người, không gian mở trung tâm với bàn ghế gỗ mộc thô và rèm dệt thổ cẩm chàm đặc trưng. Khu bếp một chiều & kho thực phẩm (~90 m²) với đầy đủ bếp xào nấu, khu nướng than hoa/lẩu và hệ thống kho mát/kho đông. Điểm nhấn đặc biệt là khu bán đặc sản riêng biệt (~30 m²) với các sản phẩm đạt tiêu chuẩn OCOP vùng Cao Bằng.',
    items: [
      { icon: '🍜', title: 'Khu Ăn Uống Chính', sub: '~290 m² · 30 bàn 6 người', note: 'Không gian mở · Thổ cẩm chàm · 06:00–22:00' },
      { icon: '🔥', title: 'Bếp Công Nghiệp & Kho', sub: '~90 m²', note: 'Bếp xào nấu · Nướng than hoa/lẩu · Kho mát/kho đông' },
      { icon: '🛍️', title: 'Khu Đặc Sản OCOP', sub: '~30 m²', note: 'Sản phẩm đạt chuẩn OCOP vùng Cao Bằng' },
      { icon: '🚪', title: 'Hạ Tầng & WC Nhà Hàng', sub: '~40 m²', note: 'WC nam/nữ riêng · Quầy thu ngân' },
    ],
    cta: { label: '🍜 Xem Thực Đơn', page: 'food' },
  },
  {
    num: 2,
    id: 'f2',
    tag: 'Tầng 2 · ~320 m²',
    title: 'Sảnh Lễ Tân & Phòng Cận Cao Cấp',
    subtitle: 'Sảnh Đón Tiếp · 08 Phòng 28–30 m²',
    color: '#1a5c3a',
    bg: 'var(--white)',
    heroImg: '/rooms/phong-can-cao-cap.jpg',
    heroPos: 'center 75%',
    photos: [
      '/rooms/phong-can-cao-cap.jpg',
    ],
    desc: 'Sảnh đón tiếp thiết kế bằng đá tự nhiên xám kết hợp gỗ mộc, bàn trà tiếp khách thưởng thức chè đắng và trà hoa quả Cao Bằng theo phong cách bản địa. 08 phòng cận cao cấp (28–30 m²) có góc view đẹp nhất nhìn ra thung lũng hoặc sân vườn, trang bị giường đôi cỡ lớn, ban công rộng, khu sofa tiếp khách nhỏ, vách tường ốp thổ cẩm chàm tinh tế. Điểm nhấn đặc biệt là bồn tắm nằm ngâm thảo dược cổ truyền lá thuốc người Dao/Tày, điều hòa 2 chiều sưởi ấm mùa đông, tivi thông minh và minibar.',
    items: [],
    cta: { label: '👑 Xem Phòng Cận Cao Cấp', page: 'rooms', filter: 'premium' },
  },
  {
    num: 3,
    id: 'f3',
    tag: 'Tầng 3 · ~320 m²',
    title: 'Phòng Đôi Tiêu Chuẩn',
    subtitle: '11 Phòng · 23–24 m²/phòng',
    color: '#2d7a52',
    bg: 'var(--pink-soft)',
    heroImg: '/rooms/phong-doi-tieu-chuan.jpg',
    heroPos: 'center 75%',
    photos: [
      '/rooms/phong-doi-tieu-chuan.jpg',
    ],
    desc: 'Chuyên phục vụ các cặp đôi, vợ chồng trẻ hoặc khách du lịch nghỉ dưỡng cá nhân. Phòng bố trí 01 giường đôi lớn (1,6m × 2m), bài trí mộc mạc với đèn mây tre đan thủ công, ban công hướng núi đón ánh sáng tự nhiên. Vệ sinh khép kín với buồng tắm đứng vách kính cường lực, nước nóng trung tâm ổn định.',
    items: [
      { icon: '🛏️', title: '11 Phòng Đôi Tiêu Chuẩn', sub: '~260 m² · 23–24 m²/phòng', note: 'Giường đôi 1,6m × 2m · Ban công hướng núi · Vòi sen kính cường lực' },
      { icon: '🧺', title: 'Không Gian Phụ Trợ', sub: '~60 m²', note: 'Kho đồ vải · Máy giặt/sấy công nghiệp · 2 lối PCCC' },
    ],
    cta: { label: '🛏️ Xem Phòng Đôi', page: 'rooms', filter: 'double' },
  },
  {
    num: 4,
    id: 'f4',
    tag: 'Tầng 4 · ~320 m²',
    title: 'Phòng Đơn Tiêu Chuẩn',
    subtitle: '11 Phòng · 22–24 m²/phòng',
    color: '#4a9e72',
    bg: 'var(--white)',
    heroImg: '/rooms/phong-don-tieu-chuan.jpg',
    heroPos: 'center bottom',
    photos: [
      '/rooms/phong-don-tieu-chuan.jpg',
    ],
    desc: 'Chuyên phục vụ khách đi theo cặp bạn bè, đồng nghiệp hoặc khách đoàn công tác. Phòng bố trí 02 giường đơn (1,2m × 2m/giường), thiết kế tối ưu không gian lưu trú linh hoạt, có bàn làm việc nhỏ gọn và ban công thoáng mát. Thiết kế đồng trục thẳng với tầng 3, tối ưu hóa chi phí đường ống kỹ thuật và kết cấu dầm cột chịu lực.',
    items: [
      { icon: '🛏', title: '11 Phòng Đơn Tiêu Chuẩn', sub: '~260 m² · 22–24 m²/phòng', note: '2 giường đơn 1,2m × 2m · Bàn làm việc · Ban công' },
      { icon: '🔒', title: 'Hành Lang & Hạ Tầng Kỹ Thuật', sub: '~60 m²', note: 'Thang máy · 2 lối thoát hiểm PCCC' },
    ],
    cta: { label: '🛏 Xem Phòng Đơn', page: 'rooms', filter: 'single' },
  },
  {
    num: 5,
    id: 'f5',
    tag: 'Tầng Thượng · ~320 m²',
    title: 'Trải Nghiệm & Thư Giãn',
    subtitle: 'Quầy Trà Panorama · Bản Spa Thảo Dược',
    color: '#c9a84c',
    bg: 'var(--green-dark)',
    dark: true,
    heroImg: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1400&q=85',
    photos: [
      '/spa-facial.jpg',
      'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=700&q=80',
      '/spa-massage.jpg',
    ],
    desc: 'Tầng thượng là điểm đến thư giãn đỉnh cao của Mộc Chàm. Quầy trà chiều (~140 m²) phục vụ cà phê, chè đắng và trà hoa quả Cao Bằng với thiết kế kính panorama mở trọn tầm nhìn ngắm thung lũng và núi non hùng vĩ vùng biên giới. Khu spa (~120 m²) sở hữu 04 bồn ngâm lá thuốc cổ truyền người Dao/Tày và phòng xông hơi thảo dược view mây trời.',
    items: [
      { icon: '☕', title: 'Quầy Trà & Ngắm Cảnh', sub: '~140 m²', note: 'Kính panorama · Chè đắng · Trà hoa quả Cao Bằng' },
      { icon: '🌿', title: 'Bản Spa Thảo Dược', sub: '~120 m² · 04 bồn ngâm', note: 'Lá thuốc người Dao/Tày · Xông hơi view mây' },
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
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: floor.heroPos || 'center',
            display: 'block',
          }}
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
          justifyContent: reversed ? 'flex-end' : 'flex-start',
          padding: '0 clamp(28px, 6vw, 80px)',
        }}>
          <div style={{ maxWidth: 700, color: 'white', textAlign: reversed ? 'right' : 'left' }}>
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
              fontSize: 'clamp(1.9rem, 4vw, 3.2rem)',
              color: 'white', lineHeight: 1.15, marginBottom: 8,
              whiteSpace: floor.num === 5 ? 'nowrap' : 'normal',
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
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 'clamp(32px, 5vw, 64px)',
            alignItems: floor.num === 2 ? 'center' : 'start',
            opacity: secVis ? 1 : 0,
            transform: secVis ? 'none' : 'translateY(28px)',
            transition: 'opacity 0.65s ease, transform 0.65s ease',
          }}
        >
          {/* Text side */}
          <div style={{ order: reversed ? 2 : 1 }}>
            <p style={{
              fontSize: 'clamp(0.95rem, 1.4vw, 1.05rem)',
              color: floor.dark ? 'rgba(255,255,255,0.82)' : 'var(--text-light)',
              lineHeight: 1.9,
              marginBottom: floor.items && floor.items.length > 0 ? 28 : 0,
            }}>
              {floor.desc}
            </p>

            {/* Item list */}
            {floor.items && floor.items.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {floor.items.map((item, i) => (
                  <div key={i} style={{
                    display: 'flex', gap: 14, alignItems: 'flex-start',
                    padding: '14px 16px',
                    background: floor.dark ? 'rgba(255,255,255,0.06)' : 'var(--white)',
                    borderRadius: 12,
                    borderLeft: `4px solid ${floor.color}`,
                    boxShadow: floor.dark ? 'none' : '0 2px 10px rgba(0,0,0,0.06)',
                    transition: 'transform 0.25s, box-shadow 0.25s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateX(4px)'; if (!floor.dark) e.currentTarget.style.boxShadow = '0 4px 18px rgba(0,0,0,0.1)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'none'; if (!floor.dark) e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.06)'; }}
                  >
                    <span style={{ fontSize: '1.4rem', flexShrink: 0, marginTop: 2 }}>{item.icon}</span>
                    <div>
                      <div style={{ fontFamily: 'Playfair Display, serif', fontWeight: 600, color: floor.dark ? '#fff' : 'var(--green-dark)', fontSize: '0.95rem', marginBottom: 3 }}>
                        {item.title}
                      </div>
                      <div style={{
                        display: 'inline-block', fontSize: '0.70rem', fontWeight: 700,
                        padding: '2px 10px', borderRadius: 20,
                        background: `${floor.color}22`, color: floor.dark ? floor.color : '#8a6a1a',
                        border: `1px solid ${floor.color}44`, marginBottom: 3,
                      }}>
                        {item.sub}
                      </div>
                      <div style={{ fontSize: '0.80rem', color: floor.dark ? 'rgba(255,255,255,0.55)' : 'var(--text-light)' }}>
                        {item.note}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Photo collage side */}
          <div
            ref={gallRef}
            style={{
              order: reversed ? 1 : 2,
              display: 'grid',
              gridTemplateColumns: floor.photos.length > 1 ? '1fr 1fr' : '1fr',
              gridTemplateRows: floor.photos.length > 5
                ? '190px 120px 120px 120px'
                : floor.photos.length > 3
                ? '210px 145px 145px'
                : floor.photos.length > 1
                ? '240px 160px'
                : 'auto',
              gap: 10,
              opacity: gallVis ? 1 : 0,
              transform: gallVis ? 'none' : `translateX(${reversed ? '-' : ''}24px)`,
              transition: 'opacity 0.65s ease 0.15s, transform 0.65s ease 0.15s',
            }}
          >
            {/* Big photo */}
            <div style={{
              gridColumn: floor.photos.length > 1 ? '1 / 3' : '1',
              borderRadius: 14, overflow: 'hidden',
              boxShadow: '0 6px 24px rgba(0,0,0,0.15)',
              height: floor.photos.length === 1 ? '100%' : undefined,
              minHeight: floor.photos.length === 1 ? (floor.num === 2 ? 300 : 400) : undefined,
            }}>
              <img src={floor.photos[0]} alt="" loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: floor.heroPos || 'center',
                  display: 'block',
                  transition: 'transform 0.5s',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'none'}
              />
            </div>
            {/* Small photos */}
            {floor.photos.slice(1).map((p, i) => (
              <div key={i} style={{ borderRadius: 12, overflow: 'hidden', boxShadow: '0 4px 14px rgba(0,0,0,0.12)', height: '100%' }}>
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

        <div style={{ position: 'relative', maxWidth: 740, margin: '0 auto' }}>
          <div style={{ fontSize: '0.72rem', letterSpacing: '4px', color: 'var(--gold-light)', textTransform: 'uppercase', fontWeight: 700, marginBottom: 20 }}>
            Khám Phá Không Gian
          </div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.4rem, 6vw, 4.5rem)', color: 'white', lineHeight: 1.1, marginBottom: 16 }}>
            Mộc Chàm<br />
            <span style={{ color: 'var(--gold-light)', fontStyle: 'italic' }}>Retreat & Restaurant</span>
          </h1>
          <div style={{ width: 80, height: 2, background: 'linear-gradient(90deg, transparent, var(--gold), transparent)', margin: '24px auto 28px' }} />
          <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)', lineHeight: 1.8, marginBottom: 40 }}>
            Hành trình khám phá 5 tầng không gian — từ nhà hàng đặc sản tầng trệt đến<br />
            khu spa thảo dược và quầy trà panorama tầng thượng.
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
        <div style={{ position: 'relative', maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ fontSize: '0.72rem', letterSpacing: '4px', color: 'var(--gold-light)', textTransform: 'uppercase', fontWeight: 700, marginBottom: 12 }}>Con Số Nổi Bật</div>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: 'white', marginBottom: 56 }}>
            Mộc Chàm trong <span style={{ color: 'var(--gold-light)', fontStyle: 'italic' }}>Tổng Quan</span>
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(135px, 1fr))', gap: '28px 16px', marginBottom: 60 }}>
            {[
              { n: '5', l: 'Tầng', ic: '🏢' },
              { n: '30', l: 'Phòng nghỉ', ic: '🛏️' },
              { n: '8', l: 'Phòng cận cao cấp', ic: '👑' },
              { n: '22', l: 'Phòng tiêu chuẩn', ic: '🏠' },
              { n: '180', l: 'Chỗ nhà hàng', ic: '🍜' },
              { n: '04', l: 'Bồn spa thảo dược', ic: '🌿' },
            ].map(s => (
              <div key={s.l} style={{ padding: '20px 8px', background: 'rgba(255,255,255,0.05)', borderRadius: 14, border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ fontSize: '1.4rem', marginBottom: 8 }}>{s.ic}</div>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, color: 'var(--gold-light)', lineHeight: 1 }}>{s.n}</div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.65)', marginTop: 8, lineHeight: 1.4, whiteSpace: 'nowrap' }}>{s.l}</div>
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
