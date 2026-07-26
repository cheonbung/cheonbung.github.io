# cheonbung.github.io

이병천(Byeongcheon Lee)의 연구 포트폴리오 — **https://cheonbung.github.io**

중앙대학교 융합보안학과 [PURE 연구실](https://cau-purelab.github.io/)(지도교수 노승민) 박사과정.
Machine Unlearning, Trustworthy AI, 생성 모델 보안, 시계열 이상탐지를 연구합니다.

## 주요 기능

- **이중 언어 (한국어/영어)** — 최초 방문 시 영어로 표시되며 사이드바에서 전환할 수 있습니다.
  링크에 `?lang=ko`(한국어)·`?lang=en`(영어)를 붙여 특정 언어로 공유할 수 있고,
  마지막 선택은 브라우저에 저장되어 다음 방문 시 유지됩니다.
- **다크 모드** — 사이드바 토글로 전환하며, 최초 방문 기본값은 라이트 모드입니다.
  선택한 테마는 브라우저에 저장되어 다음 방문 시 유지됩니다.
- **이력서(CV) 다운로드** — 브라우저 인쇄 기능으로 학술 CV 레이아웃을 PDF로 저장합니다.
  별도 파일이 아니라 화면 데이터를 그대로 출력하므로 항상 최신 상태입니다.
- **단일 소스 콘텐츠 관리** — 논문·특허·수상 등 모든 데이터를 KO/EN 오버레이 한 구조로
  관리해 언어 간 불일치를 방지합니다.

## 콘텐츠 구성

프로필 · 학력 · 연구 논문(저널/학술대회) · 특허 · 수상 · 해외연수 · 수강 과목

## 스택

React 19 · TypeScript · Vite · Tailwind CSS (SPA, 라우터 없음)

## 로컬 실행

```bash
npm install
npm run dev        # 개발 서버
npm run build      # 프로덕션 빌드 (dist/)
```

## 배포

`main`에 push하면 GitHub Actions가 자동으로 빌드해 `gh-pages` 브랜치로 배포합니다.

```bash
node scripts/validate.js   # push 전 검증 (빌드 + KO/EN 정합성 + 데이터 포맷)
```

작업 규칙은 [CLAUDE.md](CLAUDE.md), 운영 가이드는 [HARNESS.md](HARNESS.md)를 참고하세요.
