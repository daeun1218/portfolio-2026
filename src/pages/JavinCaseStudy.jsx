import { useState, useEffect, useRef } from 'react';
import styles from '../styles/pages/JavinCaseStudy.module.css';
import products from '../data/javinProducts';

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const heroSlides = [
  {
    tag: 'authentic',
    title: 'LIP PRIMER',
    desc: '베이스 케어, 은은한 컬러, 볼륨감까지 —\n입술을 위해 만든 립 프라이머.',
    img: '/images/Javin/hero-02.png',
    moImg: '/images/Javin/mo-hero-02.jpg',
  },
  {
    tag: 'new arrival',
    title: 'WINK FOUNDATION PACT',
    desc: '피부결 그대로, 자연스럽게 밀착되는 커버력.\n새롭게 완성된 파운데이션 팩트.',
    img: '/images/Javin/hero-01.jpg',
  },
  {
    tag: 'bestseller',
    title: 'WINK CUSHION GLOW',
    desc: '빛나는 광채, 자유롭게 쌓이는 커버력.\n자연스러운 글로우 마무리.',
    img: '/images/Javin/hero-03.jpg',
    moImg: '/images/Javin/mo-hero-03.png',
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

const categories = ['ALL', 'FACE', 'EYE', 'LIP', 'TOOL'];
const allProducts = Object.fromEntries(
  categories.map((cat) => [
    cat,
    cat === 'ALL' ? products : products.filter((p) => p.category === cat),
  ])
);

const VISIBLE_COUNT = 3;

/* ─────────────────────────────────────────
   COMPONENT
───────────────────────────────────────── */
export default function JavinCaseStudy() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [heroAnimating, setHeroAnimating] = useState(false);
  const [activeTab, setActiveTab] = useState('ALL');
  const [startIndex, setStartIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const heroTimer = useRef(null);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const visibleCount = isMobile ? 1 : VISIBLE_COUNT;
  const currentProducts = allProducts[activeTab];
  const maxStart = Math.max(0, currentProducts.length - visibleCount);

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
    setStartIndex(0);
  }

  const slide = heroSlides[heroIndex];

  return (
    <>
      {/* ── NAV ── */}
      <nav className={styles.nav}>
        <div className={styles.navLeft}>
          <a href="#">신제품</a>
          <a href="/javin/about">ABOUT</a>
          <a href="#">컬렉션{!isMobile && ' ▾'}</a>
        </div>
        <a href="/javin" className={styles.navLogo}>
          JAVIN DE SEOUL
        </a>
        <div className={styles.navRight}>
          <a href="#">로그인</a>
          <a href="#">Bag</a>
        </div>
      </nav>

      {/* ── 1. HERO — 중앙 정렬 ── */}
      <section className={styles.hero}>
        {heroSlides.map((s, i) => (
          <div
            key={i}
            className={`${styles.heroSlide}${i === heroIndex ? ` ${styles.active}` : ''}`}
          >
            <img src={isMobile && s.moImg ? s.moImg : s.img} alt={s.title} />
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
            일상 속에 조용히 스며드는 제품을 만듭니다.
            <br />
            개성과 균형, 그리고 의도를 담아서.
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
              src="/images/Javin/WINK FOUNDATION PACT.png"
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
            <img src="/images/Javin/WINK CUSHION GLOW.png" alt="WINK Cushion Glow" />
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
            onClick={() => setStartIndex((i) => Math.max(0, i - 1))}
            disabled={startIndex === 0}
          >
            ‹
          </button>
          <div className={styles.productsTrackOuter}>
            <div
              className={styles.productsTrack}
              style={{
                transform: `translateX(-${startIndex * (100 / visibleCount)}%)`,
              }}
            >
              {currentProducts.map((product) => (
                <div className={styles.productCard} key={product.id}>
                  <div className={styles.productImgWrap}>
                    <img
                      className={styles.productImg}
                      src={product.imageUrl}
                      alt={product.name}
                    />
                  </div>
                  <div className={styles.productName}>{product.name}</div>
                  <div className={styles.productPrice}>
                    ₩{product.price.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            className={styles.carouselArrow}
            onClick={() => setStartIndex((i) => Math.min(maxStart, i + 1))}
            disabled={startIndex >= maxStart}
          >
            ›
          </button>
        </div>
      </section>

      {/* ── 4. INSTAGRAM ── */}
      <section className={styles.instagramSection}>
        <div className={styles.instaTextArea}>
          <span className={styles.instaEyebrow}>SNS</span>
          <h2 className={styles.instaHandle}>@javindseoul</h2>
          <a
            href="https://www.instagram.com/javindeseoul/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.instaLink}
          >
            FOLLOW US ON INSTAGRAM ›
          </a>
        </div>
        <img
          src="/images/Javin/Insta.png"
          alt="Instagram"
          className={styles.instagramImage}
        />
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
        </div>

        <div className={styles.footerInfo}>
          <p className={styles.footerCs}>
            고객문의 1899-2043
            <br />
            MON – FRI 11:00am – 4:00pm (Lunch 12:00pm – 1:30pm)
            <br />
            SAT.SUN.Holiday OFF
            <br />
            기업 986-024364-04-025 예금주: ㈜다하우스
          </p>
          <p className={styles.footerBiz}>
            상호 ㈜다하우스 &nbsp; 대표자 Da Jeung Kim
            <br />
            사업자등록번호 275-86-01965[사업자정보확인]
            <br />
            통신판매업 2024-서울용산-0198
            <br />
            주소 04348 서울 용산구 이태원로55가길 21 401호
            <br />
            개인정보보호책임자 dahaus (javindeseoul@gmail.com)
            <br />
            이메일 javindeseoul@gmail.com
          </p>
          <p className={styles.footerSafe}>
            고객님은 안전거래를 위해 결제 시 저희 쇼핑몰에서 가입한 구매안전서비스를
            이용하실 수 있습니다.
          </p>
        </div>

        <div className={styles.footerSocial}>
          <a
            href="https://www.instagram.com/javindeseoul/"
            target="_blank"
            rel="noopener noreferrer"
          >
            IG
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            FB
          </a>
        </div>

        <div className={styles.footerBottom}>
          <span className={styles.footerCopy}>
            Copyright ©㈜다하우스 All rights reserved.
            <br />
            Hosting by cafe24. Designed by moen.
          </span>
        </div>
      </footer>

      {/* ── SCROLL TO TOP ── */}
      <button
        className={styles.scrollTop}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="맨 위로"
      >
        ↑
      </button>
    </>
  );
}
