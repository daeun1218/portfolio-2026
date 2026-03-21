const products = [
  // FACE
  {
    id: 1,
    name: "윙크 쿠션 쉐이드 프라이머 8g",
    price: 20000,
    category: "FACE",
    imageUrl: "https://cafe24img.poxo.com/dahaus/web/product/medium/202603/22d795a74be9984211e3374c87e5ffb5.jpg",
    description: "결 정돈, 톤 보정, 생기 혈색까지 한 번에 잡아주는 3-in-1 컬러 베이스 프라이머. 8가지 컬러 스펙트럼으로 볼류머부터 포인트 블러셔까지 연출 가능.",
  },
  {
    id: 2,
    name: "윙크 쿠션 매트 16g",
    price: 30000,
    category: "FACE",
    imageUrl: "https://cafe24img.poxo.com/dahaus/web/product/medium/202507/1ab07cb78080e8733d881643794a5f22.jpg",
    description: "매트한 피부 표현을 오래 유지해주는 쿠션 파운데이션. 밀착력과 지속력을 동시에 잡은 자빈드서울 대표 베이스 제품.",
  },
  {
    id: 3,
    name: "윙크 쿠션 매트 포켓 8g",
    price: 20000,
    category: "FACE",
    imageUrl: "https://cafe24img.poxo.com/dahaus/web/product/medium/202407/6d0ca0442475a1e11dfc4b3fb9691ae4.jpg",
    description: "언제 어디서나 간편하게 휴대할 수 있는 포켓 사이즈 매트 쿠션. 외출 시 터치업에 최적화된 미니 사이즈.",
  },
  {
    id: 4,
    name: "윙크 쿠션 글로우 16g",
    price: 30000,
    category: "FACE",
    imageUrl: "https://cafe24img.poxo.com/dahaus/web/product/medium/202312/c6ad400d7095315861a4f49b3e078699.jpg",
    description: "촉촉하고 빛나는 글로우 피부를 만들어주는 쿠션 파운데이션. 생기있는 혈색과 자연스러운 광택 표현.",
  },
  {
    id: 5,
    name: "윙크 쿠션 글로우 포켓 8g",
    price: 20000,
    category: "FACE",
    imageUrl: "https://cafe24img.poxo.com/dahaus/web/product/medium/202404/1d922fcb69951fb635bea32ee5622d20.jpg",
    description: "글로우 쿠션의 포켓 버전. 핸드백 속에 쏙 들어가는 작은 사이즈로 언제든 빛나는 피부 연출 가능.",
  },
  {
    id: 6,
    name: "윙크 파운데이션 팩트",
    price: 28000,
    category: "FACE",
    imageUrl: "https://cafe24img.poxo.com/dahaus/web/product/medium/202204/024df8002304b0abed3aa1b4b29e786a.jpg",
    description: "밀착 커버력과 자연스러운 피부 표현을 동시에 구현하는 파운데이션 팩트. 매끄럽고 균일한 베이스 완성.",
  },
  {
    id: 7,
    name: "윙크 리퀴드 컨실러",
    price: 18000,
    category: "FACE",
    imageUrl: "https://cafe24img.poxo.com/dahaus/web/product/medium/202408/90590bec56a50b59ce38e21f7756036f.jpg",
    description: "다크서클, 잡티, 기미를 자연스럽게 커버하는 리퀴드 컨실러. 가볍게 밀착되어 촉촉한 마무리감.",
  },
  {
    id: 8,
    name: "[본품1+리필2] 윙크 파운데이션 팩트 15g",
    price: 64000,
    category: "FACE",
    imageUrl: "https://cafe24img.poxo.com/dahaus/web/product/medium/202503/bdd42b1a58b9ca15665960d2a2a94967.jpg",
    description: "본품 1개 + 리필 2개 구성 기획세트. 퍼프 5매 증정. 합리적인 가격으로 오래 사용할 수 있는 알뜰 구성.",
  },
  {
    id: 9,
    name: "[본품1+리필2] 윙크 쿠션 글로우 16g",
    price: 70000,
    category: "FACE",
    imageUrl: "https://cafe24img.poxo.com/dahaus/web/product/medium/202503/0d86b9038dba68e1b8e5caa1e180f14d.jpg",
    description: "윙크 쿠션 글로우 본품 1개 + 리필 2개 구성 세트. 퍼프 5매 포함 증정. 꾸준한 사용자를 위한 베스트 구성.",
  },

  // EYE
  {
    id: 10,
    name: "윙크 아이 쉬머 라이트 (13종 택1)",
    price: 18000,
    category: "EYE",
    imageUrl: "https://cafe24img.poxo.com/dahaus/web/product/medium/202312/b47c238506f2bbed6cdfd873313f675c.jpg",
    description: "선명하고 오래 지속되는 아이 쉬머 라이트. 13가지 컬러 중 원하는 색상을 선택 가능. 눈가를 화사하게 밝혀주는 펄감.",
  },
  {
    id: 11,
    name: "윙크 아이 쉐이드 프라이머 (15종 택1)",
    price: 16000,
    category: "EYE",
    imageUrl: "https://cafe24img.poxo.com/dahaus/web/product/medium/202312/7b083c51cf7897dad30e843ccf1afb17.jpg",
    description: "아이 메이크업의 지속력을 높여주는 아이 쉐이드 프라이머. 15가지 컬러 라인업. 단독 사용 또는 베이스로 활용 가능.",
  },
  {
    id: 12,
    name: "윙크 아이 쉐이드 프라이머 디스커버리 포켓",
    price: 40000,
    category: "EYE",
    imageUrl: "https://cafe24img.poxo.com/dahaus/web/product/medium/202501/7a52153768d3b9c8c9129994b463e55a.jpg",
    description: "인기 아이 쉐이드 프라이머 여러 컬러를 한 번에 경험해볼 수 있는 디스커버리 포켓 세트. 다양한 무드 연출에 최적.",
  },

  // LIP
  {
    id: 13,
    name: "윙크 립 쉐이드 프라이머 (15종 택1)",
    price: 16000,
    category: "LIP",
    imageUrl: "https://cafe24img.poxo.com/dahaus/web/product/medium/202411/acd278ecdaa817836043958dcb69ae57.jpg",
    description: "입술 본연의 색을 보정하고 립 메이크업 지속력을 높여주는 립 쉐이드 프라이머. 15가지 컬러로 다양한 립 무드 완성.",
  },

  // TOOL
  {
    id: 14,
    name: "허깅 스킨 틴트 퍼프 볼",
    price: 11000,
    category: "TOOL",
    imageUrl: "https://cafe24img.poxo.com/dahaus/web/product/medium/202206/cd641010181c56d0de86a1cb398d5672.jpg",
    description: "촉촉하게 밀착되는 퍼프 볼. 파운데이션이나 쿠션을 더욱 자연스럽게 펴발라주는 어플리케이터.",
  },
  {
    id: 15,
    name: "셀렉 포 마이 쿠션 포켓 퍼프",
    price: 14000,
    category: "TOOL",
    imageUrl: "https://cafe24img.poxo.com/dahaus/web/product/medium/202407/af48e72db4b797e6ef2469630d2c4125.jpg",
    description: "포켓 쿠션에 맞게 설계된 미니 퍼프. 쿠션을 균일하게 밀착시켜주는 최적의 도구.",
  },
  {
    id: 16,
    name: "셀렉 포 마이 쿠션 퍼프",
    price: 17000,
    category: "TOOL",
    imageUrl: "https://cafe24img.poxo.com/dahaus/web/product/medium/202409/8b30eb9f90d8ba8b31284642bf62749f.jpg",
    description: "일반 쿠션 사이즈에 맞는 표준형 퍼프. 부드러운 소재로 피부에 자극 없이 베이스를 완성.",
  },
];

export default products;
