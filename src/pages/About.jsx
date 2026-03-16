import { useState } from 'react';

const GOOGLE_FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Noto+Sans+KR:wght@300;400;500;700&display=swap');
`;

const galleryImages = [
  'https://images.unsplash.com/photo-1631214524020-3c69f9d8b869?w=600&h=500&fit=crop',
  'https://images.unsplash.com/photo-1583241800698-e8ab01830a66?w=600&h=500&fit=crop',
  'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=500&fit=crop',
  'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&h=500&fit=crop',
  'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&h=500&fit=crop',
  'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&h=500&fit=crop',
];

const philosophyItems = [
  {
    key: 'Authentic',
    en: 'Real beauty begins with authenticity.\n자빈드서울은 있는 그대로의 아름다움을 존중합니다.\n피부를 가리는 메이크업이 아니라 피부를 표현하는 메이크업을 만듭니다.',
  },
  {
    key: 'Balanced',
    en: 'Beauty should feel balanced.\n메이크업은 화려하지 않게 자연스럽게 조화를 이루어야 합니다.\n피부와 조화를 이루는 텍스처와 밸런스를 연구합니다.',
  },
  {
    key: 'Intentional',
    en: 'Every product has a purpose.\n자빈드서울의 제품은 단순한 화장품이 아니라\n일상의 영감을 만드는 도구입니다.',
  },
];

const productLines = [
  {
    name: 'WINK',
    tag: 'Expressive. Modern. Confident.',
    desc: '개성과 프로페셔널함을 표현하는 라인.\n선명한 표현력과\n세련된 누드를 위한 메이크업 제품.',
  },
  {
    name: 'HUGGING',
    tag: 'Comfortable. Soft. Balanced.',
    desc: '휴식과 일상의 균형을 담은 라인.\n피부에 자연스럽게 스며드는\n편안한 뷰티 경험.',
  },
];

export default function About() {
  const [hoveredPhilo, setHoveredPhilo] = useState(null);

  return (
    <>
      <style>{GOOGLE_FONTS}</style>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body {
          font-family: 'Outfit', 'Noto Sans KR', sans-serif;
          background: #fff;
          color: #1a1a1a;
          overflow-x: hidden;
        }

        /* NAV */
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 40px; height: 56px;
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(8px);
          border-bottom: 1px solid rgba(0,0,0,0.07);
        }
        .nav-links { display: flex; gap: 28px; }
        .nav-links a {
          font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase;
          color: #1a1a1a; text-decoration: none; font-weight: 400;
          transition: opacity 0.2s;
        }
        .nav-links a:hover { opacity: 0.45; }
        .nav-links a.active { font-weight: 600; }
        .nav-logo {
          font-family: 'Outfit', sans-serif;
          font-size: 15px; font-weight: 600; letter-spacing: 0.15em;
          text-transform: uppercase; color: #1a1a1a;
          position: absolute; left: 50%; transform: translateX(-50%);
          text-decoration: none;
        }
        .nav-right { display: flex; gap: 20px; }
        .nav-right a {
          font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase;
          color: #1a1a1a; text-decoration: none; font-weight: 400;
          transition: opacity 0.2s;
        }
        .nav-right a:hover { opacity: 0.45; }

        /* HERO IMAGE */
        .about-hero {
          margin-top: 56px;
          width: 100%; height: 70vh; min-height: 420px;
          overflow: hidden; position: relative;
        }
        .about-hero img {
          width: 100%; height: 100%; object-fit: cover;
          object-position: center 20%;
          filter: grayscale(100%) brightness(0.9);
        }

        /* BRAND NAME SECTION */
        .brand-name-section {
          padding: 60px 60px 48px;
          border-bottom: 1px solid #e8e8e8;
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 40px;
          align-items: end;
        }
        .brand-name-left {}
        .brand-name-title {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(52px, 9vw, 110px);
          font-weight: 800;
          letter-spacing: -0.02em;
          line-height: 0.9;
          color: #1a1a1a;
          margin-bottom: 20px;
        }
        .brand-name-sub {
          font-size: 13px;
          line-height: 1.7;
          color: #555;
          font-weight: 300;
          max-width: 280px;
        }
        .brand-name-right {
          text-align: right;
          font-size: 12px;
          line-height: 1.9;
          color: #888;
          font-family: 'Noto Sans KR', sans-serif;
          font-weight: 300;
          max-width: 280px;
          padding-bottom: 4px;
        }

        /* STRIP IMAGE */
        .strip-image {
          width: 100%; height: 260px; overflow: hidden;
        }
        .strip-image img {
          width: 100%; height: 100%; object-fit: cover;
          object-position: center 35%;
          filter: grayscale(80%) contrast(1.05);
        }

        /* MISSION SECTION */
        .mission-section {
          padding: 80px 60px;
          text-align: center;
          border-bottom: 1px solid #e8e8e8;
        }
        .mission-ko {
          font-family: 'Noto Sans KR', sans-serif;
          font-size: 16px;
          line-height: 2.1;
          color: #1a1a1a;
          font-weight: 400;
          margin-bottom: 32px;
        }
        .mission-en {
          font-size: 13px;
          line-height: 2;
          color: #999;
          font-weight: 300;
          font-style: italic;
          max-width: 640px;
          margin: 0 auto;
        }

        /* PHILOSOPHY SECTION */
        .philosophy-section {
          padding: 80px 60px;
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 80px;
          align-items: start;
        }
        .philosophy-left {}
        .philosophy-title {
          font-family: 'Outfit', sans-serif;
          font-size: 22px;
          font-weight: 600;
          letter-spacing: 0.01em;
          margin-bottom: 40px;
        }
        .philosophy-item {
          padding: 28px 0;
          border-bottom: 1px solid #e8e8e8;
          cursor: default;
          transition: background 0.2s;
        }
        .philosophy-item:first-of-type { border-top: 1px solid #e8e8e8; }
        .philosophy-key {
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.08em;
          color: #1a1a1a;
          margin-bottom: 12px;
          text-transform: capitalize;
        }
        .philosophy-desc {
          font-size: 13px;
          line-height: 1.9;
          color: #555;
          font-weight: 300;
          white-space: pre-line;
          font-family: 'Noto Sans KR', sans-serif;
        }
        .philosophy-right {
          position: sticky;
          top: 80px;
        }
        .philosophy-right img {
          width: 100%;
          aspect-ratio: 3/4;
          object-fit: cover;
          filter: grayscale(20%);
        }

        /* GALLERY SECTION */
        .gallery-section {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
        }
        .gallery-item {
          aspect-ratio: 1/0.85;
          overflow: hidden;
          cursor: pointer;
        }
        .gallery-item img {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.6s ease, filter 0.4s;
          filter: grayscale(30%) brightness(0.95);
        }
        .gallery-item:hover img {
          transform: scale(1.05);
          filter: grayscale(0%) brightness(1);
        }

        /* PRODUCTS SECTION */
        .products-section {
          padding: 100px 60px;
          border-top: 1px solid #e8e8e8;
        }
        .products-header {
          text-align: center;
          margin-bottom: 64px;
        }
        .products-title {
          font-family: 'Outfit', sans-serif;
          font-size: 22px;
          font-weight: 600;
          letter-spacing: 0.01em;
          margin-bottom: 16px;
        }
        .products-sub {
          font-size: 13px;
          color: #888;
          line-height: 1.7;
          font-weight: 300;
          font-style: italic;
        }
        .products-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px;
          background: #e8e8e8;
          border: 1px solid #e8e8e8;
        }
        .product-line-card {
          background: #fff;
          padding: 52px 48px;
        }
        .product-line-name {
          font-family: 'Outfit', sans-serif;
          font-size: 28px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 12px;
          color: #1a1a1a;
        }
        .product-line-tag {
          font-size: 12px;
          color: #888;
          font-style: italic;
          margin-bottom: 20px;
          font-weight: 300;
        }
        .product-line-desc {
          font-size: 13px;
          line-height: 2;
          color: #555;
          font-weight: 300;
          white-space: pre-line;
          font-family: 'Noto Sans KR', sans-serif;
        }

        /* FOOTER */
        .footer {
          background: #1a1a1a;
          padding: 40px 40px 24px;
        }
        .footer-nav {
          display: flex; gap: 24px; margin-bottom: 20px; flex-wrap: wrap;
        }
        .footer-nav a {
          font-size: 11px; color: rgba(255,255,255,0.6); text-decoration: none;
          letter-spacing: 0.05em; transition: color 0.2s;
        }
        .footer-nav a:hover { color: #fff; }
        .footer-info {
          font-size: 10px; color: rgba(255,255,255,0.3); line-height: 2;
          margin-bottom: 16px; font-family: 'Noto Sans KR', sans-serif;
        }
        .footer-bottom {
          display: flex; align-items: center;
          justify-content: space-between; padding-top: 16px;
          border-top: 1px solid rgba(255,255,255,0.08);
        }
        .footer-copy {
          font-size: 10px; color: rgba(255,255,255,0.3); letter-spacing: 0.05em;
          font-family: 'Noto Sans KR', sans-serif;
        }
        .footer-social { display: flex; gap: 14px; }
        .footer-social a {
          font-size: 14px; color: rgba(255,255,255,0.4); text-decoration: none;
          transition: color 0.2s;
        }
        .footer-social a:hover { color: #fff; }
      `}</style>

      {/* NAV */}
      <nav className="nav">
        <div className="nav-links">
          <a href="#">신제품</a>
          <a href="#" className="active">
            ABOUT
          </a>
          <a href="#">컬렉션 ▾</a>
        </div>
        <a href="#" className="nav-logo">
          JAVIN DE SEOUL
        </a>
        <div className="nav-right">
          <a href="#">로그인</a>
          <a href="#">가방</a>
        </div>
      </nav>

      {/* HERO IMAGE */}
      <section className="about-hero">
        <img
          src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1600&h=900&fit=crop&crop=face"
          alt="Javin de Seoul"
        />
      </section>

      {/* BRAND NAME */}
      <section className="brand-name-section">
        <div className="brand-name-left">
          <h1 className="brand-name-title">
            JAVIN
            <br />
            DE SEOUL
          </h1>
          <p className="brand-name-sub">
            Beauty doesn't need to be loud.
            <br />
            It lives quietly in everyday moments.
          </p>
        </div>
        <div className="brand-name-right">
          사고가 생략되지 않은 숙제하는 사람이
          <br />
          자연스럽고 조화를 이루는 무언가 만들었습니다.
        </div>
      </section>

      {/* STRIP IMAGE */}
      <div className="strip-image">
        <img
          src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=1600&h=400&fit=crop"
          alt="Brand strip"
        />
      </div>

      {/* MISSION */}
      <section className="mission-section">
        <p className="mission-ko">
          우리는 뷰티가 화려하게 드러날 필요는 없다고 생각합니다.
          <br />
          진짜 아름다움은 일상 속에서 자연스럽게 드러기 때문입니다.
          <br />
          자빈드서울은 개성이 균형, 그리고 의도를 담은 세품을 만듭니다.
        </p>
        <p className="mission-en">
          Beauty doesn't need to be loud. We believe beauty doesn't have to shout.
          <br />
          True beauty lives quietly within everyday life.
          <br />
          At JAVIN DE SEOUL, we design products that reflect individuality, balance,
          and intention.
          <br />
          Our goal is simple — to create cosmetics that enhance who you are, not
          change who you are.
        </p>
      </section>

      {/* BRAND PHILOSOPHY */}
      <section className="philosophy-section">
        <div className="philosophy-left">
          <h2 className="philosophy-title">Brand Philosophy</h2>
          {philosophyItems.map((item) => (
            <div
              key={item.key}
              className="philosophy-item"
              onMouseEnter={() => setHoveredPhilo(item.key)}
              onMouseLeave={() => setHoveredPhilo(null)}
            >
              <div className="philosophy-key">{item.key}</div>
              <p className="philosophy-desc">{item.en}</p>
            </div>
          ))}
        </div>
        <div className="philosophy-right">
          <img
            src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=760&h=1000&fit=crop&crop=face"
            alt="Philosophy"
          />
        </div>
      </section>

      {/* GALLERY */}
      <div className="gallery-section">
        {galleryImages.map((src, i) => (
          <div className="gallery-item" key={i}>
            <img src={src} alt={`Gallery ${i + 1}`} />
          </div>
        ))}
      </div>

      {/* OUR PRODUCTS */}
      <section className="products-section">
        <div className="products-header">
          <h2 className="products-title">Our Products</h2>
          <p className="products-sub">
            Inspired by the moments of Seoul,
            <br />
            our product lines reflect different expressions of beauty.
          </p>
        </div>
        <div className="products-grid">
          {productLines.map((line) => (
            <div className="product-line-card" key={line.name}>
              <div className="product-line-name">{line.name}</div>
              <div className="product-line-tag">{line.tag}</div>
              <p className="product-line-desc">{line.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-nav">
          <a href="#">Home</a>
          <a href="#">Agreement</a>
          <a href="#">Privacy</a>
          <a href="#">Guide</a>
          <a href="#">Contact</a>
        </div>
        <div className="footer-info">
          사업자번호: 000-00-00000 &nbsp;|&nbsp; MON – FRI 11:00am – 4:00pm
          &nbsp;|&nbsp; Lunch 12:00pm – 1:00pm (SAT, SUN, Holiday Off)
          <br />
          서울특별시 강남구 청담동 000-00 &nbsp;|&nbsp; 대표: 김자빈 &nbsp;|&nbsp;
          happymail@javindseoul.com
        </div>
        <div className="footer-bottom">
          <span className="footer-copy">
            Copyright ©자빈드서울. All rights reserved. &nbsp;|&nbsp; Hosting by
            cafe24. Designed by moon.
          </span>
          <div className="footer-social">
            <a
              href="https://www.instagram.com/javindseoul/"
              target="_blank"
              rel="noopener noreferrer"
            >
              ⓘ
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              f
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
