import { useState, useEffect, useRef } from 'react';
import './JavinDeSeoul.css';

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const heroSlides = [
  {
    tag: 'authentic',
    title: 'LIP PRIMER',
    desc: 'Base care, subtle color, and plumping volume —\na lip primer made for lips.',
    img: 'https://images.unsplash.com/photo-1586495777744-4e6232bf4e5b?w=1920&h=950&fit=crop&crop=center',
  },
  {
    tag: 'new arrival',
    title: 'WINK FOUNDATION\nPACT',
    desc: 'Skin-true coverage that moves with you.\nA foundation pact reimagined.',
    img: 'https://images.unsplash.com/photo-1631214524020-3c69f9d8b869?w=1920&h=950&fit=crop&crop=center',
  },
  {
    tag: 'bestseller',
    title: 'WINK CUSHION\nGLOW',
    desc: 'Luminous, buildable coverage with a\nnatural dewy finish.',
    img: 'https://images.unsplash.com/photo-1596704017248-a9df5d21e90b?w=1920&h=950&fit=crop&crop=center',
  },
];

const brandValues = [
  {
    key: 'Authentic',
    title: "Beauty doesn't need to be loud.",
    desc: 'We create products that sit quietly within everyday life, reflecting individuality, balance, and intention.',
  },
  {
    key: 'Balanced',
    title: 'Balance in every detail.',
    desc: 'We create products that sit quietly within everyday life, reflecting individuality, balance, and intention.',
  },
  {
    key: 'Intentional',
    title: 'Intentional by design.',
    desc: 'We create products that sit quietly within everyday life, reflecting individuality, balance, and intention.',
  },
];

const allProducts = {
  '#WINK': [
    {
      id: 1,
      name: 'WINK Liquid Concealer',
      price: '₩16,000',
      img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop',
    },
    {
      id: 2,
      name: 'WINK FOUNDATION PACT',
      price: '₩30,000',
      img: 'https://images.unsplash.com/photo-1631214524020-3c69f9d8b869?w=400&h=400&fit=crop',
    },
    {
      id: 3,
      name: 'WINK Eye Shade Primer Discovery Kit',
      price: '₩10,000',
      img: 'https://images.unsplash.com/photo-1583241800698-e8ab01830a66?w=400&h=400&fit=crop',
    },
    {
      id: 4,
      name: 'WINK Cushion Glow',
      price: '₩35,000',
      img: 'https://images.unsplash.com/photo-1614156412657-a71dc5b2a9e8?w=400&h=400&fit=crop',
    },
    {
      id: 5,
      name: 'WINK Lip Primer',
      price: '₩18,000',
      img: 'https://images.unsplash.com/photo-1586495777744-4e6232bf4e5b?w=400&h=400&fit=crop',
    },
  ],
  '#UGGING': [
    {
      id: 6,
      name: 'UGGING Blush Stick',
      price: '₩22,000',
      img: 'https://images.unsplash.com/photo-1599733594230-6b823276d37f?w=400&h=400&fit=crop',
    },
    {
      id: 7,
      name: 'UGGING Glow Serum',
      price: '₩45,000',
      img: 'https://images.unsplash.com/photo-1617897903246-719242758050?w=400&h=400&fit=crop',
    },
    {
      id: 8,
      name: 'UGGING Skin Tint',
      price: '₩28,000',
      img: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop',
    },
    {
      id: 9,
      name: 'UGGING Lip Balm',
      price: '₩12,000',
      img: 'https://images.unsplash.com/photo-1596704017248-a9df5d21e90b?w=400&h=400&fit=crop',
    },
  ],
  '#TOOL': [
    {
      id: 10,
      name: 'Precision Liner Brush',
      price: '₩14,000',
      img: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=400&fit=crop',
    },
    {
      id: 11,
      name: 'Blending Sponge Set',
      price: '₩9,000',
      img: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop',
    },
    {
      id: 12,
      name: 'Foundation Brush',
      price: '₩19,000',
      img: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&h=400&fit=crop',
    },
    {
      id: 13,
      name: 'Contour Kit',
      price: '₩25,000',
      img: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop',
    },
  ],
};

/* 인스타그램: 큰 사진 1장 + 작은 사진 3장 */
const instaMain =
  'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=900&h=1000&fit=crop';
const instaSubs = [
  'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&h=480&fit=crop',
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&h=480&fit=crop',
  'https://images.unsplash.com/photo-1583241800698-e8ab01830a66?w=500&h=480&fit=crop',
];

const ITEMS_PER_PAGE = 3;

/* ─────────────────────────────────────────
   COMPONENT
───────────────────────────────────────── */
export default function JavinDeSeoul() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [heroAnimating, setHeroAnimating] = useState(false);
  const [activeTab, setActiveTab] = useState('#WINK');
  const [productPage, setProductPage] = useState(0);
  const heroTimer = useRef(null);

  const products = allProducts[activeTab];
  const maxPage = Math.ceil(products.length / ITEMS_PER_PAGE) - 1;
  const visibleProducts = products.slice(
    productPage * ITEMS_PER_PAGE,
    productPage * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  );

  useEffect(() => {
    heroTimer.current = setInterval(
      () => goToSlide((p) => (p + 1) % heroSlides.length),
      5500
    );
    return () => clearInterval(heroTimer.current);
  }, []);

  function goToSlide(indexOrFn) {
    if (heroAnimating) return;
    setHeroAnimating(true);
    setTimeout(() => {
      setHeroIndex(typeof indexOrFn === 'function' ? indexOrFn : indexOrFn);
      setHeroAnimating(false);
    }, 500);
  }

  function handleTab(tab) {
    setActiveTab(tab);
    setProductPage(0);
  }

  const slide = heroSlides[heroIndex];

  return (
    <>
      {/* ── NAV ── */}
      <nav className="nav">
        <div className="nav-left">
          <a href="#">신제품</a>
          <a href="/javin/about">ABOUT</a>
          <a href="#">컬렉션 ▾</a>
        </div>
        <a href="/javin" className="nav-logo">
          JAVIN DE SEOUL
        </a>
        <div className="nav-right">
          <a href="#">로그인</a>
          <a href="#">가방</a>
        </div>
      </nav>

      {/* ── 1. HERO — 중앙 정렬 ── */}
      <section className="hero">
        {heroSlides.map((s, i) => (
          <div key={i} className={`hero-slide${i === heroIndex ? ' active' : ''}`}>
            <img src={s.img} alt={s.title} />
            <div className="hero-slide-overlay" />
          </div>
        ))}

        <div className={`hero-content${heroAnimating ? ' animating' : ''}`}>
          <span className="hero-tag">{slide.tag}</span>
          <h1 className="hero-title">{slide.title}</h1>
          <p className="hero-desc">{slide.desc}</p>
          <button className="hero-btn">SHOP NOW &nbsp;›</button>
        </div>

        <div className="hero-controls">
          <span className="hero-index">
            0{heroIndex + 1} / 0{heroSlides.length}
          </span>
          <div className="hero-track">
            <div className="hero-track-fill" key={heroIndex} />
          </div>
        </div>

        <div className="hero-arrows">
          <button
            className="hero-arrow"
            onClick={() => {
              clearInterval(heroTimer.current);
              goToSlide((heroIndex - 1 + heroSlides.length) % heroSlides.length);
            }}
          >
            ‹
          </button>
          <button
            className="hero-arrow"
            onClick={() => {
              clearInterval(heroTimer.current);
              goToSlide((heroIndex + 1) % heroSlides.length);
            }}
          >
            ›
          </button>
        </div>
      </section>

      {/* ── 2. ABOUT BRAND — 장식용 타이포 (비활성) ── */}
      <section className="about-section">
        {/* 장식용 레이블만 — 인터랙션 없음 */}
        <div className="about-deco-labels">
          {brandValues.map((v) => (
            <span key={v.key} className="about-deco-label">
              {v.key}
            </span>
          ))}
        </div>

        <div className="about-image-wrap">
          <img src="/images/Javin/about.png" alt="About Brand" />
        </div>

        <div className="about-text">
          <span className="about-label">About the brand</span>
          <h2 className="about-title">Beauty doesn’t need to be loud.</h2>
          <div className="about-rule" />
          <p className="about-desc">
            We create products that sit quietly within everyday life, reflecting
            individuality, balance, and intention.
          </p>
        </div>
      </section>

      {/* ── 3. SIGNATURE SELECTION ── */}
      <section className="signature-section">
        <div className="signature-header">
          <div className="signature-divider-full" />
          <div className="signature-title-row">
            <h2 className="signature-title">Signature Selection</h2>
          </div>
          <div className="signature-divider-full" />
          <p className="signature-sub">A curated edit of our newest essentials.</p>
          <div className="signature-divider-full" />
        </div>

        <div className="signature-grid">
          <div className="sig-card">
            <img
              src="https://images.unsplash.com/photo-1631214524020-3c69f9d8b869?w=960&h=660&fit=crop"
              alt="WINK Foundation Pact"
            />
            <div className="sig-card-content">
              <span className="sig-card-eyebrow">New Arrival</span>
              <div className="sig-card-title">
                WINK FOUNDATION
                <br />
                PACT
              </div>
              <a href="#" className="sig-card-btn">
                SHOP NOW ›
              </a>
            </div>
          </div>
          <div className="sig-card">
            <img
              src="https://images.unsplash.com/photo-1614156412657-a71dc5b2a9e8?w=960&h=660&fit=crop"
              alt="WINK Cushion Glow"
            />
            <div className="sig-card-content">
              <span className="sig-card-eyebrow">Bestseller</span>
              <div className="sig-card-title">
                WINK CUSHION
                <br />
                GLOW
              </div>
              <a href="#" className="sig-card-btn">
                SHOP NOW ›
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── BESTSELLERS ── */}
      <section className="bestsellers-section">
        <div className="bestsellers-header">
          <span className="bestsellers-eyebrow">Our Selection</span>
          <h2 className="bestsellers-title">BESTSELLERS</h2>
          <div className="bestsellers-tabs">
            {Object.keys(allProducts).map((tab, i, arr) => (
              <>
                <button
                  key={tab}
                  className={`bestsellers-tab${activeTab === tab ? ' active' : ''}`}
                  onClick={() => handleTab(tab)}
                >
                  {tab}
                </button>
                {i < arr.length - 1 && <span className="tab-sep" key={`sep-${i}`} />}
              </>
            ))}
          </div>
        </div>

        <div className="products-carousel">
          <button
            className="carousel-arrow"
            onClick={() => setProductPage((p) => Math.max(0, p - 1))}
            disabled={productPage === 0}
          >
            ‹
          </button>
          <div className="products-track">
            {visibleProducts.map((product) => (
              <div className="product-card" key={product.id}>
                <div className="product-img-wrap">
                  <img className="product-img" src={product.img} alt={product.name} />
                </div>
                <div className="product-name">{product.name}</div>
                <div className="product-price">{product.price}</div>
              </div>
            ))}
          </div>
          <button
            className="carousel-arrow"
            onClick={() => setProductPage((p) => Math.min(maxPage, p + 1))}
            disabled={productPage >= maxPage}
          >
            ›
          </button>
        </div>
      </section>

      {/* ── 4. INSTAGRAM — 비대칭 레이아웃 ── */}
      <section className="instagram-section">
        <div className="insta-inner">
          {/* 왼쪽: 큰 사진 */}
          <a
            className="insta-main"
            href="https://www.instagram.com/javindseoul/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={instaMain} alt="Instagram main" />
          </a>

          {/* 오른쪽 */}
          <div className="insta-right">
            {/* 상단: 텍스트 */}
            <div className="insta-text-area">
              <span className="insta-eyebrow">Follow Along</span>
              <h2 className="insta-handle">@javindseoul</h2>
              <a
                href="https://www.instagram.com/javindseoul/"
                target="_blank"
                rel="noopener noreferrer"
                className="insta-link"
              >
                FOLLOW US ON INSTAGRAM ›
              </a>
            </div>

            {/* 하단: 작은 사진들 */}
            <div className="insta-sub-grid">
              {instaSubs.map((src, i) => (
                <a
                  key={i}
                  className="insta-sub"
                  href="https://www.instagram.com/javindseoul/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={src} alt={`Instagram ${i + 1}`} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-top">
          <nav className="footer-nav">
            <a href="#">Home</a>
            <a href="#">Agreement</a>
            <a href="#">Privacy</a>
            <a href="#">Guide</a>
            <a href="#">Contact</a>
          </nav>
          <div className="footer-social">
            <a
              href="https://www.instagram.com/javindseoul/"
              target="_blank"
              rel="noopener noreferrer"
            >
              IG
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              FB
            </a>
          </div>
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
        </div>
      </footer>
    </>
  );
}
