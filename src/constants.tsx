import React from 'react';
import {
  Award, Course, Education, Language, OverseasExperience,
  Patent, PortfolioData, Profile, Publication, UIStrings
} from './types';

// =============================================================================
// 데이터 구조 안내
// - 언어와 무관한 사실(날짜·타입·특허번호 등)은 항목당 한 번만 적는다
// - 언어별 텍스트는 각 항목의 ko/en 오버레이에 나란히 적는다 (둘 다 필수)
// - 파일 하단의 buildData()가 DATA_KO / DATA_EN을 자동 조립한다
// =============================================================================

type Localized<Shared, Local> = Shared & { ko: Local; en: Local };

function localize<Shared extends object, Local extends object>(
  items: Array<Localized<Shared, Local>>,
  lang: Language
): Array<Shared & Local> {
  return items.map((item) => {
    const { ko, en, ...shared } = item;
    return { ...shared, ...(lang === 'KO' ? ko : en) } as Shared & Local;
  });
}

// =============================================================================
// 공통 데이터 (언어 무관)
// =============================================================================

const COMMON_LANGUAGES = [
  {
    name: "English",
    testName: "TOEIC Speaking",
    score: "150 (IH)",
    date: "2025.08.17",
    issuer: "YBM"
  }
];

const COMMON_CERTIFICATIONS = [
  {
    date: "2021.09.24",
    name: "ADsP (Data Analysis Semi-Professional)",
    issuer: "K-Data"
  }
];

const COMMON_INTERESTS = [
  "Machine Unlearning",
  "Trustworthy AI",
  "Anomaly Detection",
  "Time Series Analysis",
  "Generative Model Security"
];

const PROFILE_SHARED = {
  lab: "PURE(Privacy, Unlearning, and Robust Engineering Lab)",
  labUrl: "https://cau-purelab.github.io/",
  email: "qudcjs0208@cau.ac.kr",
  imagePath: "/images/profile.jpg",
  github: "https://github.com/cheonbung",
  interests: COMMON_INTERESTS,
};

// =============================================================================
// 프로필 (언어별)
// =============================================================================

const PROFILE_KO: Profile = {
  ...PROFILE_SHARED,
  name: "이병천",
  role: "박사 과정",
  affiliation: "중앙대학교 융합보안학과",
  bio: (
    <>
      안녕하세요, 중앙대학교 융합보안학과 <strong className="text-slate-900 dark:text-slate-100 font-bold">PURE 연구실</strong>(지도교수 노승민)의 박사 과정 <strong className="text-slate-900 dark:text-slate-100 font-bold">이병천</strong>입니다.
      <br /><br />
      안전하고 투명한 AI 시스템 구축에 기여하고자 <strong className="text-slate-900 dark:text-slate-100 font-bold">머신 언러닝</strong>, <strong className="text-slate-900 dark:text-slate-100 font-bold">생성 모델 보안</strong>, <strong className="text-slate-900 dark:text-slate-100 font-bold">시계열 이상탐지</strong> 등을 중심으로 '<strong className="text-slate-900 dark:text-slate-100 font-bold">신뢰할 수 있는 AI(Trustworthy AI)</strong>'를 연구하고 있습니다. 다수의 SCIE 논문 게재와 특허 실적을 통해 연구의 깊이를 더해왔으며, 이러한 연구 역량을 바탕으로 AI 보안 문제를 해결하는 실용적인 솔루션을 만드는 것이 제 목표입니다.
    </>
  )
};

const PROFILE_EN: Profile = {
  ...PROFILE_SHARED,
  name: "Byeongcheon Lee",
  role: "Ph.D. Student",
  affiliation: "Dept. of Convergence Security, Chung-Ang Univ.",
  bio: (
    <>
      Hello, I am <strong className="text-slate-900 dark:text-slate-100 font-bold">Byeongcheon Lee</strong>, a Ph.D. student at the <strong className="text-slate-900 dark:text-slate-100 font-bold">PURE Lab</strong> (advised by Prof. Seungmin Rho), Department of Convergence Security, Chung-Ang University.
      <br /><br />
      To contribute to building safe and transparent AI systems, I study <strong className="text-slate-900 dark:text-slate-100 font-bold">Trustworthy AI</strong> with a focus on <strong className="text-slate-900 dark:text-slate-100 font-bold">Machine Unlearning</strong>, <strong className="text-slate-900 dark:text-slate-100 font-bold">Generative Model Security</strong>, and <strong className="text-slate-900 dark:text-slate-100 font-bold">Time Series Anomaly Detection</strong>. I have deepened my research through multiple SCIE publications and patents, and my goal is to build on this foundation to create practical solutions to AI security problems.
    </>
  )
};

// =============================================================================
// 학력 (period는 "현재/Present" 표기 때문에 언어별)
// =============================================================================

const EDUCATION: Localized<{}, Education>[] =
[
  {
    ko: {
      period: "2026.03 ~ 현재",
      degree: "박사",
      school: "중앙대학교",
      major: "융합보안학과 산업보안기술전공",
      status: "재학",
      advisor: "노승민",
      advisorLabel: "지도교수"
    },
    en: {
      period: "2026.03 ~ Present",
      degree: "Ph.D.",
      school: "Chung-Ang University",
      major: "Dept. of Convergence Security (Industrial Security Tech)",
      status: "Student",
      advisor: "Seungmin Rho",
      advisorLabel: "Advisor"
    }
  },
  {
    ko: {
      period: "2024.03 ~ 2026.02",
      degree: "석사",
      school: "중앙대학교",
      major: "융합보안학과 산업보안기술전공",
      status: "졸업",
      advisor: "노승민",
      advisorLabel: "지도교수"
    },
    en: {
      period: "2024.03 ~ 2026.02",
      degree: "Master's Degree",
      school: "Chung-Ang University",
      major: "Dept. of Convergence Security (Industrial Security Tech)",
      status: "Graduated",
      advisor: "Seungmin Rho",
      advisorLabel: "Advisor"
    }
  },
  {
    ko: {
      period: "2018.03 ~ 2024.02",
      degree: "학사",
      school: "순천향대학교",
      major: "AI·빅데이터학과",
      status: "졸업",
      advisor: "문지훈",
      advisorLabel: "지도교수"
    },
    en: {
      period: "2018.03 ~ 2024.02",
      degree: "Bachelor's Degree",
      school: "Soonchunhyang University",
      major: "Dept. of AI & Big Data",
      status: "Graduated",
      advisor: "Jihoon Moon",
      advisorLabel: "Advisor"
    }
  },
  {
    ko: {
      period: "2015.03 ~ 2018.02",
      degree: "고교",
      school: "안성고등학교",
      major: "",
      status: "졸업",
      advisor: "-"
    },
    en: {
      period: "2015.03 ~ 2018.02",
      degree: "High School",
      school: "Anseong High School",
      major: "-",
      status: "Graduated",
      advisor: "-"
    }
  }
];

// =============================================================================
// 수강 과목
// =============================================================================

interface CourseSectionSource {
  gpa: string;
  ko: { title: string };
  en: { title: string };
  courses: Localized<Omit<Course, 'name'>, Pick<Course, 'name'>>[];
}

const GRAD_COURSES: CourseSectionSource = {
  gpa: "4.33 / 4.5",
  ko: { title: "대학원 주요 수강과목" },
  en: { title: "Major Graduate Coursework" },
  courses:
[
  {
    period: "2024.03~2024.06",
    credits: 3,
    grade: "4.5/4.5",
    ko: {
      name: "산업보안학"
    },
    en: {
      name: "Industrial Security"
    }
  },
  {
    period: "2024.03~2024.06",
    credits: 3,
    grade: "4/4.5",
    ko: {
      name: "융합보안학"
    },
    en: {
      name: "Convergence Security"
    }
  },
  {
    period: "2024.03~2024.06",
    credits: 3,
    grade: "4.5/4.5",
    ko: {
      name: "보안시스템공학"
    },
    en: {
      name: "Security System Engineering"
    }
  },
  {
    period: "2024.03~2024.06",
    credits: 3,
    grade: "4.5/4.5",
    ko: {
      name: "빅데이터보안분석"
    },
    en: {
      name: "Big Data Security Analysis"
    }
  },
  {
    period: "2024.09~2024.12",
    credits: 3,
    grade: "4.5/4.5",
    ko: {
      name: "최신 SW·IT 보안 세미나"
    },
    en: {
      name: "Seminar in SW & IT Security"
    }
  },
  {
    period: "2024.09~2024.12",
    credits: 3,
    grade: "4/4.5",
    ko: {
      name: "모빌리티 보안"
    },
    en: {
      name: "Mobility Security"
    }
  },
  {
    period: "2024.09~2024.12",
    credits: 3,
    grade: "4/4.5",
    ko: {
      name: "인공지능 규제와 신뢰성"
    },
    en: {
      name: "AI Regulation and Trustworthiness"
    }
  },
  {
    period: "2024.09~2024.12",
    credits: 3,
    grade: "4.5/4.5",
    ko: {
      name: "디지털 금융서비스와 보안"
    },
    en: {
      name: "Digital Finance Service and Security"
    }
  },
  {
    period: "2025.03~2025.06",
    credits: 3,
    grade: "4.5/4.5",
    ko: {
      name: "AI 프로그래밍"
    },
    en: {
      name: "AI Programming"
    }
  },
  {
    period: "2026.03~2026.06",
    credits: 3,
    grade: "4.5/4.5",
    ko: {
      name: "산업보안현장과보안컨설팅"
    },
    en: {
      name: "Industrial Security Field Practice and Security Consulting"
    }
  },
  {
    period: "2026.03~2026.06",
    credits: 3,
    grade: "4/4.5",
    ko: {
      name: "보안데이터과학"
    },
    en: {
      name: "Security Data Science"
    }
  },
  {
    period: "2026.03~2026.06",
    credits: 3,
    grade: "4.5/4.5",
    ko: {
      name: "방위산업보안관리"
    },
    en: {
      name: "Defense Industry Security Management"
    }
  }
]
};

const UNDERGRAD_COURSES: CourseSectionSource = {
  gpa: "3.65 / 4.5",
  ko: { title: "학부 주요 수강과목" },
  en: { title: "Major Undergraduate Coursework" },
  courses:
[
  {
    period: "2018.03~2018.06",
    credits: 3,
    grade: "3.5/4.5",
    ko: {
      name: "파이썬프로그래밍"
    },
    en: {
      name: "Python Programming"
    }
  },
  {
    period: "2018.09~2018.12",
    credits: 3,
    grade: "4/4.5",
    ko: {
      name: "컴퓨터개론"
    },
    en: {
      name: "Introduction to Computer Science"
    }
  },
  {
    period: "2018.09~2018.12",
    credits: 3,
    grade: "3.5/4.5",
    ko: {
      name: "R 프로그래밍"
    },
    en: {
      name: "R Programming"
    }
  },
  {
    period: "2019.03~2019.06",
    credits: 3,
    grade: "3.5/4.5",
    ko: {
      name: "탐색적데이터분석"
    },
    en: {
      name: "Exploratory Data Analysis"
    }
  },
  {
    period: "2021.09~2021.12",
    credits: 3,
    grade: "4.5/4.5",
    ko: {
      name: "데이터베이스개론"
    },
    en: {
      name: "Introduction to Database"
    }
  },
  {
    period: "2021.09~2021.12",
    credits: 3,
    grade: "4.5/4.5",
    ko: {
      name: "데이터마이닝"
    },
    en: {
      name: "Data Mining"
    }
  },
  {
    period: "2021.09~2021.12",
    credits: 3,
    grade: "4.5/4.5",
    ko: {
      name: "이산수학"
    },
    en: {
      name: "Discrete Mathematics"
    }
  },
  {
    period: "2021.09~2021.12",
    credits: 3,
    grade: "4.5/4.5",
    ko: {
      name: "자료구조"
    },
    en: {
      name: "Data Structures"
    }
  },
  {
    period: "2022.03~2022.06",
    credits: 3,
    grade: "3.5/4.5",
    ko: {
      name: "머신러닝"
    },
    en: {
      name: "Machine Learning"
    }
  },
  {
    period: "2022.03~2022.06",
    credits: 3,
    grade: "4.5/4.5",
    ko: {
      name: "소셜네트워크분석"
    },
    en: {
      name: "Social Network Analysis"
    }
  },
  {
    period: "2022.03~2022.06",
    credits: 3,
    grade: "4.5/4.5",
    ko: {
      name: "시계열분석"
    },
    en: {
      name: "Time Series Analysis"
    }
  },
  {
    period: "2022.03~2022.06",
    credits: 3,
    grade: "4.5/4.5",
    ko: {
      name: "하둡"
    },
    en: {
      name: "Hadoop"
    }
  },
  {
    period: "2022.09~2022.12",
    credits: 3,
    grade: "4.5/4.5",
    ko: {
      name: "텍스트마이닝"
    },
    en: {
      name: "Text Mining"
    }
  },
  {
    period: "2022.09~2022.12",
    credits: 3,
    grade: "3.5/4.5",
    ko: {
      name: "분산시스템과클라우드컴퓨팅"
    },
    en: {
      name: "Distributed Systems & Cloud Computing"
    }
  },
  {
    period: "2022.09~2022.12",
    credits: 3,
    grade: "4.5/4.5",
    ko: {
      name: "다변량분석"
    },
    en: {
      name: "Multivariate Analysis"
    }
  },
  {
    period: "2022.09~2022.12",
    credits: 3,
    grade: "4.5/4.5",
    ko: {
      name: "딥러닝과응용"
    },
    en: {
      name: "Deep Learning & Applications"
    }
  },
  {
    period: "2023.03~2023.06",
    credits: 3,
    grade: "4/4.5",
    ko: {
      name: "컴퓨터비전과패턴인식"
    },
    en: {
      name: "Computer Vision & Pattern Recognition"
    }
  },
  {
    period: "2023.03~2023.06",
    credits: 3,
    grade: "3.5/4.5",
    ko: {
      name: "설명가능한인공지능"
    },
    en: {
      name: "Explainable AI"
    }
  },
  {
    period: "2023.09~2023.12",
    credits: 3,
    grade: "4/4.5",
    ko: {
      name: "고급딥러닝"
    },
    en: {
      name: "Advanced Deep Learning"
    }
  }
]
};

// =============================================================================
// 수상 (날짜·등급은 공통, 명칭·기관은 언어별)
// =============================================================================

const AWARDS: Localized<Pick<Award, 'date' | 'rank'>, Omit<Award, 'date' | 'rank'>>[] =
[
  {
    date: "2026.03",
    rank: "silver",
    ko: {
      title: "2025학년도 CAU-Junior 융합연구그룹 (우수상)",
      issuer: "중앙대학교 미래융합원"
    },
    en: {
      title: "2025 CAU-Junior Convergence Research Group (Excellence Award)",
      issuer: "Chung-Ang University Institute of Future Convergence"
    }
  },
  {
    date: "2025.11",
    rank: "gold",
    ko: {
      title: "한국전자거래학회 2025 추계학술대회 대학(원)생 아이디어 공모전 (최우수상)",
      issuer: "한국전자거래학회"
    },
    en: {
      title: "University/Graduate Student Idea Competition (Grand Prize)",
      issuer: "The Korea Society for Electronic Commerce"
    }
  },
  {
    date: "2025.11",
    rank: "silver",
    ko: {
      title: "한국전자거래학회 2025 추계학술대회 (우수논문상)",
      issuer: "한국전자거래학회"
    },
    en: {
      title: "The Korea Society for Electronic Commerce Fall Conference 2025 (Best Paper Award)",
      issuer: "The Korea Society for Electronic Commerce"
    }
  },
  {
    date: "2024.11",
    rank: "bronze",
    ko: {
      title: "DID(Decentralized Identity) 비즈니스 모델 특허 아이디어 공모전 (장려상)",
      issuer: "한국전자거래학회"
    },
    en: {
      title: "DID(Decentralized Identity) Business Model Patent Idea Contest (Encouragement Award)",
      issuer: "The Korea Society for Electronic Commerce"
    }
  },
  {
    date: "2023.05",
    rank: "bronze",
    ko: {
      title: "ASK 2023 학부생논문경진대회 (동상)",
      issuer: "한국정보처리학회"
    },
    en: {
      title: "ASK 2023 Undergraduate Paper Competition (Bronze Award)",
      issuer: "Korea Information Processing Society"
    }
  },
  {
    date: "2022.12",
    rank: "silver",
    ko: {
      title: "한국전자거래학회 2022 추계학술대회 (우수논문상)",
      issuer: "한국전자거래학회"
    },
    en: {
      title: "The Korea Society for Electronic Commerce Fall Conference 2022 (Best Paper Award)",
      issuer: "The Korea Society for Electronic Commerce"
    }
  }
];

// =============================================================================
// 해외연수 (기간·기관·과목은 공통, 제목만 언어별)
// =============================================================================

const OVERSEAS_EXPERIENCES: Localized<Omit<OverseasExperience, 'title'>, Pick<OverseasExperience, 'title'>>[] =
[
  {
    period: "2026.09 ~ 2027.02",
    institution: "Kellogg College, University of Oxford",
    courses: [
      "Secure Systems Engineering and Design",
      "People and Security",
      "Communication Security",
      "Group Projects"
    ],
    ko: {
      title: "2026년도 영국 University of Oxford 글로벌 사이버보안 인재 양성 교육프로그램 파견교육 예정"
    },
    en: {
      title: "2026 University of Oxford Global Cybersecurity Talent Training Program (Scheduled)"
    }
  }
];

// =============================================================================
// 저널 논문 (날짜·구분은 공통, 제목·저자·저널명·비고는 언어별)
// =============================================================================

const PUBLICATIONS: Localized<Pick<Publication, 'date' | 'type'>, Omit<Publication, 'date' | 'type'>>[] =
[
  {
    date: "2025.12",
    type: "Domestic",
    ko: {
      title: "비가시성 워터마킹과 선택적 클래스 언러닝을 통합한 이미지 생성 프레임워크\n(An Image Generation Framework Integrating Invisible Watermarking and Selective Class Unlearning)",
      authors: [
        "박성우",
        "이병천",
        "김상민",
        "채승엽",
        "이미영",
        "노승민"
      ],
      journalOrConference: "Journal of Platform Technology"
    },
    en: {
      title: "An Image Generation Framework Integrating Invisible Watermarking and Selective Class Unlearning",
      authors: [
        "Sungwoo Park",
        "Byeongcheon Lee",
        "Sangmin Kim",
        "Seungyeop Chae",
        "Miyoung Lee",
        "Seungmin Rho"
      ],
      journalOrConference: "Journal of Platform Technology"
    }
  },
  {
    date: "2025.08",
    type: "Domestic",
    ko: {
      title: "기상데이터를 결합한 경부고속도로 시계열 교통량 예측 모델링\n(Time Series-Based Traffic Volume Forecasting on the Gyeongbu Expressway with Weather Data)",
      authors: [
        "이병천",
        "노승민"
      ],
      journalOrConference: "한국전자거래학회지"
    },
    en: {
      title: "Time Series-Based Traffic Volume Forecasting on the Gyeongbu Expressway with Weather Data",
      authors: [
        "Byeongcheon Lee",
        "Seungmin Rho"
      ],
      journalOrConference: "Journal of The Korea Society for Electronic Commerce"
    }
  },
  {
    date: "2025.05",
    type: "SCIE",
    ko: {
      title: "Detection of online grooming on social networking services using a deep learning-based natural language processing model and optical character recognition",
      authors: [
        "Sangmin Kim",
        "Byeongcheon Lee",
        "Jihoon Moon",
        "Seungmin Rho"
      ],
      journalOrConference: "Computer Modeling in Engineering & Sciences (CMES)"
    },
    en: {
      title: "Detection of online grooming on social networking services using a deep learning-based natural language processing model and optical character recognition",
      authors: [
        "Sangmin Kim",
        "Byeongcheon Lee",
        "Jihoon Moon",
        "Seungmin Rho"
      ],
      journalOrConference: "Computer Modeling in Engineering & Sciences (CMES)"
    }
  },
  {
    date: "2024.10",
    type: "SCIE",
    ko: {
      title: "Advancing Autoencoder Architectures for Enhanced Anomaly Detection in Multivariate Industrial Time Series",
      authors: [
        "Byeongcheon Lee",
        "Sangmin Kim",
        "Muazzam Maqsood",
        "Jihoon Moon",
        "Seungmin Rho"
      ],
      journalOrConference: "Computers, Materials & Continua (CMC)"
    },
    en: {
      title: "Advancing Autoencoder Architectures for Enhanced Anomaly Detection in Multivariate Industrial Time Series",
      authors: [
        "Byeongcheon Lee",
        "Sangmin Kim",
        "Muazzam Maqsood",
        "Jihoon Moon",
        "Seungmin Rho"
      ],
      journalOrConference: "Computers, Materials & Continua (CMC)"
    }
  },
  {
    date: "2024.06",
    type: "SCIE",
    ko: {
      title: "A Multifaceted Approach to Stock Market Trading Using Reinforcement Learning",
      authors: [
        "Yasmeen Ansari",
        "Saira Gillani",
        "Maryam Bukhari",
        "Byeongcheon Lee",
        "Muazzam Maqsood",
        "Seungmin Rho"
      ],
      journalOrConference: "IEEE Access"
    },
    en: {
      title: "A Multifaceted Approach to Stock Market Trading Using Reinforcement Learning",
      authors: [
        "Yasmeen Ansari",
        "Saira Gillani",
        "Maryam Bukhari",
        "Byeongcheon Lee",
        "Muazzam Maqsood",
        "Seungmin Rho"
      ],
      journalOrConference: "IEEE Access"
    }
  },
  {
    date: "2023.05",
    type: "Domestic",
    ko: {
      title: "텍스트 마이닝 기반의 국내 빅데이터 처리 및 분석 사례 연구: 아마존 웹 서비스를 중심으로\n(A Case Study on Big Data Processing and Analysis Based on Text Mining: Focusing on Amazon Web Services in South Korea)",
      authors: [
        "이병천",
        "오진영",
        "임수빈",
        "손우진",
        "문지훈"
      ],
      journalOrConference: "한국전자거래학회지"
    },
    en: {
      title: "A Case Study on Big Data Processing and Analysis Based on Text Mining: Focusing on Amazon Web Services in South Korea",
      authors: [
        "Byeongcheon Lee",
        "Jinyoung Oh",
        "Subin Lim",
        "Woojin Shon",
        "Jihoon Moon"
      ],
      journalOrConference: "Journal of The Korea Society for Electronic Commerce"
    }
  },
  {
    date: "2023.04",
    type: "SSCI",
    ko: {
      title: "RAID: Robust and Interpretable Daily Peak Load Forecasting via Multiple Deep Neural Networks and Shapley Values",
      authors: [
        "Joohyun Jang",
        "Woonyoung Jeong",
        "Sangmin Kim",
        "Byeongcheon Lee",
        "Miyoung Lee",
        "Jihoon Moon"
      ],
      journalOrConference: "Sustainability"
    },
    en: {
      title: "RAID: Robust and Interpretable Daily Peak Load Forecasting via Multiple Deep Neural Networks and Shapley Values",
      authors: [
        "Joohyun Jang",
        "Woonyoung Jeong",
        "Sangmin Kim",
        "Byeongcheon Lee",
        "Miyoung Lee",
        "Jihoon Moon"
      ],
      journalOrConference: "Sustainability"
    }
  }
];

// =============================================================================
// 학술대회 발표
// =============================================================================

const CONFERENCES: Localized<Pick<Publication, 'date' | 'type'>, Omit<Publication, 'date' | 'type'>>[] =
[
  {
    date: "2025.11",
    type: "Domestic Conference",
    ko: {
      title: "패턴 보존 기반 생성 모델의 클래스 선택적 언러닝 프레임워크\n(A Class-Selective Unlearning Framework for Pattern-Preserving Generative Models)",
      authors: [
        "김상민",
        "이병천",
        "박성우",
        "이미영",
        "노승민"
      ],
      journalOrConference: "한국전자거래학회 2025 추계학술대회",
      note: "우수논문상 수상"
    },
    en: {
      title: "A Class-Selective Unlearning Framework for Pattern-Preserving Generative Models",
      authors: [
        "Sangmin Kim",
        "Byeongcheon Lee",
        "Sungwoo Park",
        "Miyoung Lee",
        "Seungmin Rho"
      ],
      journalOrConference: "The Korea Society for Electronic Commerce Fall Conference 2025",
      note: "Best Paper Award"
    }
  },
  {
    date: "2025.10",
    type: "International Conference",
    ko: {
      title: "Discriminator-Guided Unlearning: A Framework for Selective Forgetting in Conditional GANs",
      authors: [
        "Byeongcheon Lee",
        "Sangmin Kim",
        "Sungwoo Park",
        "Seungmin Rho",
        "Miyoung Lee"
      ],
      journalOrConference: "28th European Conference on Artificial Intelligence (ECAI2025)",
      note: "Workshop Paper (TRUST-AI)"
    },
    en: {
      title: "Discriminator-Guided Unlearning: A Framework for Selective Forgetting in Conditional GANs",
      authors: [
        "Byeongcheon Lee",
        "Sangmin Kim",
        "Sungwoo Park",
        "Seungmin Rho",
        "Miyoung Lee"
      ],
      journalOrConference: "28th European Conference on Artificial Intelligence (ECAI2025)",
      note: "Workshop Paper (TRUST-AI)"
    }
  },
  {
    date: "2025.09",
    type: "International Conference",
    ko: {
      title: "A Framework for Machine Unlearning Using Selective Knowledge Distillation into Soft Decision Tree",
      authors: [
        "Sangmin Kim",
        "Byeongcheon Lee",
        "Sungwoo Park",
        "Miyoung Lee",
        "Seungmin Rho"
      ],
      journalOrConference: "20th Conference on Computer Science and Intelligence Systems (FedCSIS2025)"
    },
    en: {
      title: "A Framework for Machine Unlearning Using Selective Knowledge Distillation into Soft Decision Tree",
      authors: [
        "Sangmin Kim",
        "Byeongcheon Lee",
        "Sungwoo Park",
        "Miyoung Lee",
        "Seungmin Rho"
      ],
      journalOrConference: "20th Conference on Computer Science and Intelligence Systems (FedCSIS2025)"
    }
  },
  {
    date: "2025.08",
    type: "International Conference",
    ko: {
      title: "Machine Unlearning via Distillation into Soft Decision Tree",
      authors: [
        "Sangmin Kim",
        "Byeongcheon Lee",
        "Sungwoo Park",
        "Seungmin Rho",
        "Miyoung Lee"
      ],
      journalOrConference: "2025 International Conference on Platform Technology and Service (PlatCon-25)"
    },
    en: {
      title: "Machine Unlearning via Distillation into Soft Decision Tree",
      authors: [
        "Sangmin Kim",
        "Byeongcheon Lee",
        "Sungwoo Park",
        "Seungmin Rho",
        "Miyoung Lee"
      ],
      journalOrConference: "2025 International Conference on Platform Technology and Service (PlatCon-25)"
    }
  },
  {
    date: "2025.08",
    type: "International Conference",
    ko: {
      title: "Selective Forgetting in ACGANs via Discriminator-Guided Unlearning",
      authors: [
        "Byeongcheon Lee",
        "Sangmin Kim",
        "Sungwoo Park",
        "Seungmin Rho",
        "Miyoung Lee"
      ],
      journalOrConference: "2025 International Conference on Platform Technology and Service (PlatCon-25)"
    },
    en: {
      title: "Selective Forgetting in ACGANs via Discriminator-Guided Unlearning",
      authors: [
        "Byeongcheon Lee",
        "Sangmin Kim",
        "Sungwoo Park",
        "Seungmin Rho",
        "Miyoung Lee"
      ],
      journalOrConference: "2025 International Conference on Platform Technology and Service (PlatCon-25)"
    }
  },
  {
    date: "2025.05",
    type: "Domestic Conference",
    ko: {
      title: "시계열 딥러닝 모델을 활용한 한국 경부고속도로 교통량 예측 모델링\n(Traffic Volume Forecasting On The Gyeongbu Expressway Using Time Series Deep Learning Models)",
      authors: [
        "이병천",
        "김상민",
        "박성우",
        "이미영",
        "노승민"
      ],
      journalOrConference: "한국전자거래학회 2025 춘계학술대회"
    },
    en: {
      title: "Traffic Volume Forecasting On The Gyeongbu Expressway Using Time Series Deep Learning Models",
      authors: [
        "Byeongcheon Lee",
        "Sangmin Kim",
        "Sungwoo Park",
        "Miyoung Lee",
        "Seungmin Rho"
      ],
      journalOrConference: "The Korea Society for Electronic Commerce Spring Conference 2025"
    }
  },
  {
    date: "2025.01",
    type: "International Conference",
    ko: {
      title: "An Online Grooming Detection System",
      authors: [
        "Sangmin Kim",
        "Byeongcheon Lee",
        "Seungmin Rho"
      ],
      journalOrConference: "The 39th International Conference on Information Networking (ICOIN 2025)",
      note: "Poster"
    },
    en: {
      title: "An Online Grooming Detection System",
      authors: [
        "Sangmin Kim",
        "Byeongcheon Lee",
        "Seungmin Rho"
      ],
      journalOrConference: "The 39th International Conference on Information Networking (ICOIN 2025)",
      note: "Poster"
    }
  },
  {
    date: "2024.08",
    type: "International Conference",
    ko: {
      title: "Voice Phishing Detection Using Deep Learning-Based NLP and Knowledge Distillation Techniques",
      authors: [
        "Sangmin Kim",
        "Byeongcheon Lee",
        "Hyeonwoo Kim",
        "Seungmin Rho"
      ],
      journalOrConference: "2024 International Conference on Platform Technology and Service (PlatCon-24)"
    },
    en: {
      title: "Voice Phishing Detection Using Deep Learning-Based NLP and Knowledge Distillation Techniques",
      authors: [
        "Sangmin Kim",
        "Byeongcheon Lee",
        "Hyeonwoo Kim",
        "Seungmin Rho"
      ],
      journalOrConference: "2024 International Conference on Platform Technology and Service (PlatCon-24)"
    }
  },
  {
    date: "2024.08",
    type: "International Conference",
    ko: {
      title: "Enhancing Trust and Transparency in Machine Learning with Explainable AI: Applications to the Bank Marketing Dataset",
      authors: [
        "Byeongcheon Lee",
        "Sangmin Kim",
        "Hyeonwoo Kim",
        "Seungmin Rho"
      ],
      journalOrConference: "2024 International Conference on Platform Technology and Service (PlatCon-24)"
    },
    en: {
      title: "Enhancing Trust and Transparency in Machine Learning with Explainable AI: Applications to the Bank Marketing Dataset",
      authors: [
        "Byeongcheon Lee",
        "Sangmin Kim",
        "Hyeonwoo Kim",
        "Seungmin Rho"
      ],
      journalOrConference: "2024 International Conference on Platform Technology and Service (PlatCon-24)"
    }
  },
  {
    date: "2023.09",
    type: "Domestic Conference",
    ko: {
      title: "교통안전시설물 및 보행자 유무에 따른 차량 속도와의 관계 연구\n(A Study on the Relationship between Vehicle Speed and the Presence of Traffic Safety Infrastructure and Pedestrians)",
      authors: [
        "김성훈",
        "이병천",
        "김상민",
        "노병준"
      ],
      journalOrConference: "한국통신학회 제 4회 한국인공지능학술대회"
    },
    en: {
      title: "A Study on the Relationship between Vehicle Speed and the Presence of Traffic Safety Infrastructure and Pedestrians",
      authors: [
        "Seonghun Kim",
        "Byeongcheon Lee",
        "Sangmin Kim",
        "Byeongjun Noh"
      ],
      journalOrConference: "KICS The 4th Korea Artificial Intelligence Conference"
    }
  },
  {
    date: "2023.06",
    type: "Domestic Conference",
    ko: {
      title: "강건한 일사량 예측을 위한 딥러닝과 특징 공학의 통합 접근법\n(An Integrated Approach of Deep Learning and Feature Engineering for Robust Solar Irradiance Forecasting)",
      authors: [
        "소다영",
        "오진영",
        "이병천",
        "하휘영",
        "문지훈"
      ],
      journalOrConference: "한국정보보호학회 하계 종합학술대회"
    },
    en: {
      title: "An Integrated Approach of Deep Learning and Feature Engineering for Robust Solar Irradiance Forecasting",
      authors: [
        "Dayoung So",
        "Jinyoung Oh",
        "Byeongcheon Lee",
        "Hwiyoung Ha",
        "Jihoon Moon"
      ],
      journalOrConference: "KIISC Summer Conference 2023"
    }
  },
  {
    date: "2023.05",
    type: "Domestic Conference",
    ko: {
      title: "생체신호 기반의 T-SNE 를 활용한 대화 내 감정 인식\n(Physiological Signal-Based Emotion Recognition in Conversations Using T-SNE)",
      authors: [
        "임수빈",
        "이병천",
        "문지훈"
      ],
      journalOrConference: "한국정보처리학회 ASK 2023 춘계학술대회"
    },
    en: {
      title: "Physiological Signal-Based Emotion Recognition in Conversations Using T-SNE",
      authors: [
        "Subin Lim",
        "Byeongcheon Lee",
        "Jihoon Moon"
      ],
      journalOrConference: "KIPS ASK 2023 Spring Conference"
    }
  },
  {
    date: "2023.05",
    type: "Domestic Conference",
    ko: {
      title: "전이 학습 및 SHAP 분석을 활용한 트랜스포머 기반 감정 분류 모델\n(Transformer-Based Emotion Classification Model Using Transfer Learning and SHAP Analysis)",
      authors: [
        "임수빈",
        "이병천",
        "문지훈"
      ],
      journalOrConference: "한국정보처리학회 ASK 2023 춘계학술대회"
    },
    en: {
      title: "Transformer-Based Emotion Classification Model Using Transfer Learning and SHAP Analysis",
      authors: [
        "Subin Lim",
        "Byeongcheon Lee",
        "Jihoon Moon"
      ],
      journalOrConference: "KIPS ASK 2023 Spring Conference"
    }
  },
  {
    date: "2023.05",
    type: "Domestic Conference",
    ko: {
      title: "얼굴 표정 인식 기술의 동향과 향후 방향: 텍스트 마이닝 분석을 중심으로\n(Trends and Future Directions in Facial Expression Recognition Technology: A Text Mining Analysis Approach)",
      authors: [
        "전인수",
        "이병천",
        "문지훈"
      ],
      journalOrConference: "한국정보처리학회 ASK 2023 춘계학술대회"
    },
    en: {
      title: "Trends and Future Directions in Facial Expression Recognition Technology: A Text Mining Analysis Approach",
      authors: [
        "Insu Jeon",
        "Byeongcheon Lee",
        "Jihoon Moon"
      ],
      journalOrConference: "KIPS ASK 2023 Spring Conference"
    }
  },
  {
    date: "2023.05",
    type: "Domestic Conference",
    ko: {
      title: "태양 위치 정보를 고려한 AutoML 기반의 태양광 발전량 예측\n(Automated Machine Learning-Based Solar PV Forecasting Considering Solar Position Information)",
      authors: [
        "오진영",
        "소다영",
        "이병천",
        "문지훈"
      ],
      journalOrConference: "한국정보처리학회 ASK 2023 춘계학술대회",
      note: "학부생 논문 경진대회 수상 (동상)"
    },
    en: {
      title: "Automated Machine Learning-Based Solar PV Forecasting Considering Solar Position Information",
      authors: [
        "Jinyoung Oh",
        "Dayoung So",
        "Byeongcheon Lee",
        "Jihoon Moon"
      ],
      journalOrConference: "KIPS ASK 2023 Spring Conference",
      note: "Undergraduate Paper Competition Award (Bronze)"
    }
  },
  {
    date: "2023.02",
    type: "International Conference",
    ko: {
      title: "A Literature Review on AWS-Based Cloud Computing: A Case in South Korea",
      authors: [
        "B. Lee",
        "J. Oh",
        "W. Shon",
        "J. Moon"
      ],
      journalOrConference: "2023 IEEE International Conference on Big Data and Smart Computing (BigComp2023)",
      note: "Workshop Paper"
    },
    en: {
      title: "A Literature Review on AWS-Based Cloud Computing: A Case in South Korea",
      authors: [
        "B. Lee",
        "J. Oh",
        "W. Shon",
        "J. Moon"
      ],
      journalOrConference: "2023 IEEE International Conference on Big Data and Smart Computing (BigComp2023)",
      note: "Workshop Paper"
    }
  },
  {
    date: "2022.12",
    type: "Domestic Conference",
    ko: {
      title: "Multimedia Big Data Analytics: A Survey and Data Analytics for Bioinformatics and Biomedical Discoveries",
      authors: [
        "B. Lee",
        "E. Kim",
        "Y. Lee",
        "J. Seo",
        "J. Moon"
      ],
      journalOrConference: "한국전자거래학회 2022 추계학술대회",
      note: "Best Paper Award"
    },
    en: {
      title: "Multimedia Big Data Analytics: A Survey and Data Analytics for Bioinformatics and Biomedical Discoveries",
      authors: [
        "B. Lee",
        "E. Kim",
        "Y. Lee",
        "J. Seo",
        "J. Moon"
      ],
      journalOrConference: "The Korea Society for Electronic Commerce Fall Conference 2022",
      note: "Best Paper Award"
    }
  },
  {
    date: "2022.12",
    type: "Domestic Conference",
    ko: {
      title: "Towards a Big Data System in Public Health: A Case Study of AWS and Data Visualization for Personalized Services",
      authors: [
        "J. Seo",
        "J. Jang",
        "T. Han",
        "B. Lee",
        "J. Moon"
      ],
      journalOrConference: "한국전자거래학회 2022 추계학술대회"
    },
    en: {
      title: "Towards a Big Data System in Public Health: A Case Study of AWS and Data Visualization for Personalized Services",
      authors: [
        "J. Seo",
        "J. Jang",
        "T. Han",
        "B. Lee",
        "J. Moon"
      ],
      journalOrConference: "The Korea Society for Electronic Commerce Fall Conference 2022"
    }
  },
  {
    date: "2022.01",
    type: "Domestic Conference",
    ko: {
      title: "감성대화 말뭉치로 보는 청소년의 문제 도출\n(Identifying issues facing youth through emotional dialogue corpus)",
      authors: [
        "김상민",
        "이병천",
        "우지영"
      ],
      journalOrConference: "한국컴퓨터정보학회 2022 동계학술대회"
    },
    en: {
      title: "Identifying issues facing youth through emotional dialogue corpus",
      authors: [
        "Sangmin Kim",
        "Byeongcheon Lee",
        "Jiyoung Woo"
      ],
      journalOrConference: "KSCI Winter Conference 2022"
    }
  }
];

// =============================================================================
// 특허 (번호·날짜는 출원/등록 병기 때문에 언어별 표기, 구분만 공통)
// =============================================================================

const PATENTS: Localized<Pick<Patent, 'type'>, Omit<Patent, 'type'>>[] =
[
  {
    type: "Domestic",
    ko: {
      date: "2025.09.17",
      number: "10-2025-0133282",
      title: "판별기 기반 조건부 생성적 적대 신경망에서의 선택적 데이터 망각 방법 및 시스템\n(Method for selective data forgetting in discriminator-based conditional generative adversarial networks)",
      inventors: [
        "이미영",
        "노승민",
        "이병천",
        "김상민",
        "박성우"
      ],
      applicant: "중앙대학교 산학협력단"
    },
    en: {
      date: "2025.09.17",
      number: "10-2025-0133282",
      title: "Method for selective data forgetting in discriminator-based conditional generative adversarial networks",
      inventors: [
        "Miyoung Lee",
        "Seungmin Rho",
        "Byeongcheon Lee",
        "Sangmin Kim",
        "Sungwoo Park"
      ],
      applicant: "Chung-Ang University Industry-Academic Cooperation Foundation"
    }
  },
  {
    type: "Domestic",
    ko: {
      date: "2025.08.08",
      number: "10-2025-0109528",
      title: "선택적 지식 증류를 이용한 소프트 의사결정 트리 기반 머신 언러닝 방법, 이를 수행하는 장치 및 컴퓨터 프로그램\n(Machine unlearning method based on soft decision tree using selective knowledge distillation, apparatus and computer program for performing the method)",
      inventors: [
        "이미영",
        "노승민",
        "이병천",
        "김상민",
        "박성우"
      ],
      applicant: "중앙대학교 산학협력단"
    },
    en: {
      date: "2025.08.08",
      number: "10-2025-0109528",
      title: "Machine unlearning method based on soft decision tree using selective knowledge distillation, apparatus and computer program for performing the method",
      inventors: [
        "Miyoung Lee",
        "Seungmin Rho",
        "Byeongcheon Lee",
        "Sangmin Kim",
        "Sungwoo Park"
      ],
      applicant: "Chung-Ang University Industry-Academic Cooperation Foundation"
    }
  },
  {
    type: "PCT",
    ko: {
      date: "2025.04.10",
      number: "PCT/KR2025/004854",
      title: "통화 중 실시간으로 보이스피싱의 맥락을 인식하는 장치 및 동작 방법\n(APPARATUS AND METHOD FOR REAL-TIME RECOGNITION OF VOICE PHISHING CONTEXT DURING A CALL)",
      inventors: [
        "노병준",
        "김상민",
        "이병천",
        "정운영"
      ],
      applicant: "순천향대학교 산학협력단"
    },
    en: {
      date: "2025.04.10",
      number: "PCT/KR2025/004854",
      title: "APPARATUS AND METHOD FOR REAL-TIME RECOGNITION OF VOICE PHISHING CONTEXT DURING A CALL",
      inventors: [
        "Byeongjun Noh",
        "Sangmin Kim",
        "Byeongcheon Lee",
        "Woonyoung Jeong"
      ],
      applicant: "Soonchunhyang University Industry-Academic Cooperation Foundation"
    }
  },
  {
    type: "Domestic",
    ko: {
      date: "2024.11.14",
      number: "10-2024-0161756",
      title: "다변수 산업 사물 단말 관련 시계열 데이터에서 딥 러닝 모델을 기초로 한, 이상 탐지 방법 그 장치\n(METHOD FOR ANOMALY DETECTING BASED ON DEEP LEARNING MODEL IN TIME SERIES DATA RELATED TO MULTIVARIATE INDUSTRIAL THINGS TERMINALS, AND APPARATUS THEREOF)",
      inventors: [
        "김상민",
        "이병천",
        "문지훈",
        "노승민",
        "무아잠 마쿠수드"
      ],
      applicant: "중앙대학교 산학협력단"
    },
    en: {
      date: "2024.11.14",
      number: "10-2024-0161756",
      title: "METHOD FOR ANOMALY DETECTING BASED ON DEEP LEARNING MODEL IN TIME SERIES DATA RELATED TO MULTIVARIATE INDUSTRIAL THINGS TERMINALS, AND APPARATUS THEREOF",
      inventors: [
        "Sangmin Kim",
        "Byeongcheon Lee",
        "Jihoon Moon",
        "Seungmin Rho",
        "Muazzam Maqsood"
      ],
      applicant: "Chung-Ang University Industry-Academic Cooperation Foundation"
    }
  },
  {
    type: "Domestic",
    ko: {
      date: "2024.11.14 (출원) / 2026.02.27 (등록)",
      number: "10-2024-0161744 (출원) / 10-2934580 (등록)",
      title: "딥 러닝 기반 자연어 처리 모델을 활용한, 온라인 그루밍 범죄 탐지 방법 및 그 장치\n(METHOD FOR DETECTING ONLINE GROOMING CRIMES USING DEEP LEARNING-BASED NATURAL LANGUAGE PROCESSING MODELS, AND APPARATUS THEREOF)",
      inventors: [
        "김상민",
        "이병천",
        "문지훈",
        "노승민",
        "무아잠 마쿠수드"
      ],
      applicant: "중앙대학교 산학협력단"
    },
    en: {
      date: "2024.11.14 (Filing) / 2026.02.27 (Reg.)",
      number: "10-2024-0161744 (Filing) / 10-2934580 (Reg.)",
      title: "METHOD FOR DETECTING ONLINE GROOMING CRIMES USING DEEP LEARNING-BASED NATURAL LANGUAGE PROCESSING MODELS, AND APPARATUS THEREOF",
      inventors: [
        "Sangmin Kim",
        "Byeongcheon Lee",
        "Jihoon Moon",
        "Seungmin Rho",
        "Muazzam Maqsood"
      ],
      applicant: "Chung-Ang University Industry-Academic Cooperation Foundation"
    }
  },
  {
    type: "Domestic",
    ko: {
      date: "2024.04.11 (출원) / 2026.06.25 (등록)",
      number: "10-2024-0048439 (출원) / 10-2984271 (등록)",
      title: "통화 중 실시간으로 보이스피싱의 맥락을 인식하는 장치 및 동작 방법\n(APPARATUS AND METHOD FOR REAL-TIME RECOGNITION OF VOICE PHISHING CONTEXT DURING A CALL)",
      inventors: [
        "노병준",
        "김상민",
        "이병천",
        "정운영"
      ],
      applicant: "순천향대학교 산학협력단"
    },
    en: {
      date: "2024.04.11 (Filing) / 2026.06.25 (Reg.)",
      number: "10-2024-0048439 (Filing) / 10-2984271 (Reg.)",
      title: "APPARATUS AND METHOD FOR REAL-TIME RECOGNITION OF VOICE PHISHING CONTEXT DURING A CALL",
      inventors: [
        "Byeongjun Noh",
        "Sangmin Kim",
        "Byeongcheon Lee",
        "Woonyoung Jeong"
      ],
      applicant: "Soonchunhyang University Industry-Academic Cooperation Foundation"
    }
  }
];

// =============================================================================
// UI 문자열 (언어별 번역)
// =============================================================================

const UI_KO: UIStrings = {
  siteTitle: "이병천 (Byeongcheon Lee) - AI & Security Researcher Portfolio",
  about: "프로필",
  education: "학력",
  publications: "연구 논문",
  patents: "특허",
  awards: "수상",
  overseasExperience: "해외연수",
  coursework: "수강 과목",
  languages: "언어",
  certifications: "자격증",
  journalPapers: "저널 논문 (SCIE/SSCI/국내)",
  confPresentations: "학술대회 발표",
  gradCourses: "대학원",
  undergradCourses: "학부",
  designedBy: "Designed for academic presentation.",
  lastUpdated: "최종 업데이트",
  lastUpdatedDate: "2026.07.12",
  menu: "메뉴",
  emailLabel: "이메일",
  visitProfile: "프로필 방문",
  downloadResume: "이력서 다운로드 (PDF)",
  skipToContent: "본문으로 건너뛰기",
  themeToggle: "다크 모드",
  rankLabels: { gold: "최우수", silver: "우수", bronze: "장려" },
  stats: {
    journals: "저널 논문",
    conferences: "학술대회",
    patents: "특허"
  }
};

const UI_EN: UIStrings = {
  siteTitle: "Byeongcheon Lee - AI & Security Researcher Portfolio",
  about: "Profile",
  education: "Education",
  publications: "Publications",
  patents: "Patents",
  awards: "Awards",
  overseasExperience: "Overseas Training",
  coursework: "Coursework",
  languages: "Languages",
  certifications: "Certifications",
  journalPapers: "Journal Papers (SCIE/SSCI/Domestic)",
  confPresentations: "Conference Presentations",
  gradCourses: "Graduate",
  undergradCourses: "Undergraduate",
  designedBy: "Designed for academic presentation.",
  lastUpdated: "Last Updated",
  lastUpdatedDate: "2026.07.12",
  menu: "Menu",
  emailLabel: "Email",
  visitProfile: "Visit Profile",
  downloadResume: "Download CV (PDF)",
  skipToContent: "Skip to content",
  themeToggle: "Dark mode",
  rankLabels: { gold: "Gold", silver: "Silver", bronze: "Bronze" },
  stats: {
    journals: "Journals",
    conferences: "Conferences",
    patents: "Patents"
  }
};

// =============================================================================
// DATA_KO / DATA_EN 조립
// =============================================================================

const COURSE_HEADERS = {
  ko: { period: "기간", name: "과목명", credits: "학점", grade: "성적" },
  en: { period: "Period", name: "Course Name", credits: "Credits", grade: "Grade" },
};

function buildCourseSection(section: CourseSectionSource, lang: Language) {
  const key = lang === 'KO' ? 'ko' : 'en';
  return {
    title: section[key].title,
    gpa: section.gpa,
    headers: COURSE_HEADERS[key],
    courses: localize(section.courses, lang),
  };
}

function buildData(lang: Language, ui: UIStrings, profile: Profile): PortfolioData {
  return {
    ui,
    profile,
    education: localize(EDUCATION, lang),
    gradCourses: buildCourseSection(GRAD_COURSES, lang),
    undergradCourses: buildCourseSection(UNDERGRAD_COURSES, lang),
    languages: COMMON_LANGUAGES,
    certifications: COMMON_CERTIFICATIONS,
    publications: localize(PUBLICATIONS, lang),
    conferences: localize(CONFERENCES, lang),
    patents: localize(PATENTS, lang),
    awards: localize(AWARDS, lang),
    overseasExperiences: localize(OVERSEAS_EXPERIENCES, lang),
  };
}

export const DATA_KO: PortfolioData = buildData('KO', UI_KO, PROFILE_KO);
export const DATA_EN: PortfolioData = buildData('EN', UI_EN, PROFILE_EN);
