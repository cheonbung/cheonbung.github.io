# cheonbung.github.io

이병천(Byeongcheon Lee)의 연구 포트폴리오 — **https://cheonbung.github.io**

중앙대학교 융합보안학과 [PURE 연구실](https://cau-purelab.github.io/) 박사과정.
Machine Unlearning, Trustworthy AI, 시계열 이상탐지를 연구합니다.

## 주요 기능

- 한국어/영어 이중 언어 (`?lang=en`으로 영어 링크 공유 가능)
- 다크 모드 (시스템 설정 자동 감지 + 수동 토글)
- 이력서 다운로드 — 인쇄 전용 학술 CV 레이아웃으로 PDF 저장
- 논문·특허·수상 데이터는 KO/EN 오버레이 단일 구조로 관리 (언어 간 불일치 방지)

## 스택

React 19 · TypeScript · Vite · Tailwind CSS

## 로컬 실행

```bash
npm install
npm run dev
```

## 배포

`main`에 push하면 GitHub Actions가 자동으로 빌드해 `gh-pages` 브랜치로 배포한다.

```bash
node scripts/validate.js   # push 전 검증 (빌드 + 데이터 정합성)
```

작업 규칙은 [CLAUDE.md](CLAUDE.md), 운영 가이드는 [HARNESS.md](HARNESS.md) 참고.
