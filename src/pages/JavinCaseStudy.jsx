import { useState, useEffect, useRef } from 'react';
import styles from '../styles/pages/JavinCaseStudy.module.css';

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
export default function JavinCaseStudy() {
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
      <nav className={styles.nav}>
        <div className={styles.navLeft}>
          <a href="#">신제품</a>
          <a href="/javin/about">ABOUT</a>
          <a href="#">컬렉션 ▾</a>
        </div>
        <a href="/javin" className={styles.navLogo}>
          JAVIN DE SEOUL
        </a>
        <div className={styles.navRight}>
          <a href="#">로그인</a>
          <a href="#">가방</a>
        </div>
      </nav>

      {/* ── 1. HERO — 중앙 정렬 ── */}
      <section className={styles.hero}>
        {heroSlides.map((s, i) => (
          <div
            key={i}
            className={`${styles.heroSlide}${i === heroIndex ? ` ${styles.active}` : ''}`}
          >
            <img src={s.img} alt={s.title} />
            <div className={styles.heroSlideOverlay} />
          </div>
        ))}

        <div
          className={`${styles.heroContent}${heroAnimating ? ` ${styles.animating}` : ''}`}
        >
          <span className={styles.heroTag}>{slide.tag}</span>
          <h1 className={styles.heroTitle}>{slide.title}</h1>
          <p className={styles.heroDesc}>{slide.desc}</p>
          <button className={styles.heroBtn}>SHOP NOW &nbsp;›</button>
        </div>

        <div className={styles.heroControls}>
          <span className={styles.heroIndex}>
            0{heroIndex + 1} / 0{heroSlides.length}
          </span>
          <div className={styles.heroTrack}>
            <div className={styles.heroTrackFill} key={heroIndex} />
          </div>
        </div>

        <div className={styles.heroArrows}>
          <button
            className={styles.heroArrow}
            onClick={() => {
              clearInterval(heroTimer.current);
              goToSlide((heroIndex - 1 + heroSlides.length) % heroSlides.length);
            }}
          >
            ‹
          </button>
          <button
            className={styles.heroArrow}
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
      <section className={styles.aboutSection}>
        <div className={styles.aboutDecoLabels}>
          {brandValues.map((v) => (
            <span key={v.key} className={styles.aboutDecoLabel}>
              {v.key}
            </span>
          ))}
        </div>

        <div className={styles.aboutImageWrap}>
          <img src="/images/Javin/about.png" alt="About Brand" />
        </div>

        <div className={styles.aboutText}>
          <span className={styles.aboutLabel}>About the brand</span>
          <h2 className={styles.aboutTitle}>Beauty doesn't need to be loud.</h2>
          <div className={styles.aboutRule} />
          <p className={styles.aboutDesc}>
            We create products that sit quietly within everyday life, reflecting
            individuality, balance, and intention.
          </p>
        </div>
      </section>

      {/* ── 3. SIGNATURE SELECTION ── */}
      <section className={styles.signatureSection}>
        <div className={styles.signatureHeader}>
          <div className={styles.signatureDividerFull} />
          <div className={styles.signatureTitleRow}>
            <h2 className={styles.signatureTitle}>Signature Selection</h2>
          </div>
          <div className={styles.signatureDividerFull} />
          <p className={styles.signatureSub}>
            A curated edit of our newest essentials.
          </p>
          <div className={styles.signatureDividerFull} />
        </div>

        <div className={styles.signatureGrid}>
          <div className={styles.sigCard}>
            <img
              src="https://images.unsplash.com/photo-1631214524020-3c69f9d8b869?w=960&h=660&fit=crop"
              alt="WINK Foundation Pact"
            />
            <div className={styles.sigCardContent}>
              <div className={styles.sigCardTitle}>WINK FOUNDATION PACT</div>
              <a href="#" className={styles.sigCardBtn}>
                SHOP NOW ›
              </a>
            </div>
          </div>
          <div className={styles.sigCard}>
            <img
              src="https://images.unsplash.com/photo-1614156412657-a71dc5b2a9e8?w=960&h=660&fit=crop"
              alt="WINK Cushion Glow"
            />
            <div className={styles.sigCardContent}>
              <div className={styles.sigCardTitle}>WINK CUSHION GLOW</div>
              <a href="#" className={styles.sigCardBtn}>
                SHOP NOW ›
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── BESTSELLERS ── */}
      <section className={styles.bestsellersSection}>
        <div className={styles.bestsellersHeader}>
          <span className={styles.bestsellersEyebrow}>Our Selection</span>
          <h2 className={styles.bestsellersTitle}>BESTSELLERS</h2>
          <div className={styles.bestsellersTabs}>
            {Object.keys(allProducts).map((tab, i, arr) => (
              <>
                <button
                  key={tab}
                  className={`${styles.bestsellersTab}${activeTab === tab ? ` ${styles.active}` : ''}`}
                  onClick={() => handleTab(tab)}
                >
                  {tab}
                </button>
                {i < arr.length - 1 && (
                  <span className={styles.tabSep} key={`sep-${i}`} />
                )}
              </>
            ))}
          </div>
        </div>

        <div className={styles.productsCarousel}>
          <button
            className={styles.carouselArrow}
            onClick={() => setProductPage((p) => Math.max(0, p - 1))}
            disabled={productPage === 0}
          >
            ‹
          </button>
          <div className={styles.productsTrack}>
            {visibleProducts.map((product) => (
              <div className={styles.productCard} key={product.id}>
                <div className={styles.productImgWrap}>
                  <img
                    className={styles.productImg}
                    src={product.img}
                    alt={product.name}
                  />
                </div>
                <div className={styles.productName}>{product.name}</div>
                <div className={styles.productPrice}>{product.price}</div>
              </div>
            ))}
          </div>
          <button
            className={styles.carouselArrow}
            onClick={() => setProductPage((p) => Math.min(maxPage, p + 1))}
            disabled={productPage >= maxPage}
          >
            ›
          </button>
        </div>
      </section>

      {/* ── 4. INSTAGRAM — 비대칭 레이아웃 ── */}
      <section className={styles.instagramSection}>
        <div className={styles.instaInner}>
          {/* 왼쪽: 큰 사진 */}
          <a
            className={styles.instaMain}
            href="https://www.instagram.com/javindseoul/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={instaMain} alt="Instagram main" />
          </a>

          {/* 오른쪽 */}
          <div className={styles.instaRight}>
            {/* 상단: 텍스트 */}
            <div className={styles.instaTextArea}>
              <span className={styles.instaEyebrow}>Follow Along</span>
              <h2 className={styles.instaHandle}>@javindseoul</h2>
              <a
                href="https://www.instagram.com/javindseoul/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.instaLink}
              >
                FOLLOW US ON INSTAGRAM ›
              </a>
            </div>

            {/* 하단: 작은 사진들 */}
            <div className={styles.instaSubGrid}>
              {instaSubs.map((src, i) => (
                <a
                  key={i}
                  className={styles.instaSub}
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
      <footer className={styles.footer}>
        <div className={styles.footerTop}>
          <nav className={styles.footerNav}>
            <a href="#">Home</a>
            <a href="#">Agreement</a>
            <a href="#">Privacy</a>
            <a href="#">Guide</a>
            <a href="#">Contact</a>
          </nav>
          <div className={styles.footerSocial}>
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
        <div className={styles.footerInfo}>
          사업자번호: 000-00-00000 &nbsp;|&nbsp; MON – FRI 11:00am – 4:00pm
          &nbsp;|&nbsp; Lunch 12:00pm – 1:00pm (SAT, SUN, Holiday Off)
          <br />
          서울특별시 강남구 청담동 000-00 &nbsp;|&nbsp; 대표: 김자빈 &nbsp;|&nbsp;
          happymail@javindseoul.com
        </div>
        <div className={styles.footerBottom}>
          <span className={styles.footerCopy}>
            Copyright ©자빈드서울. All rights reserved. &nbsp;|&nbsp; Hosting by
            cafe24. Designed by moon.
          </span>
        </div>
      </footer>
    </>
  );
}
