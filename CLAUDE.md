# CLAUDE.md — 이병천 포트폴리오 사이트

Claude가 이 프로젝트에서 작업할 때 매 세션마다 읽는 지침 파일.

## 프로젝트 개요

- **URL**: https://cheonbung.github.io/
- **스택**: React 19 + TypeScript + Vite + Tailwind CSS (SPA, 라우터 없음)
- **저장소**: https://github.com/cheonbung/cheonbung.github.io
- **성격**: 학술 포트폴리오 — 콘텐츠(논문·특허·수상)의 정확성이 최우선

## 명령어

| 명령 | 용도 |
|------|------|
| `npm run dev` | 로컬 개발 서버 |
| `npm run build` | 프로덕션 빌드 (`dist/`) |
| `npx tsc --noEmit` | 타입 검사 (strict 모드) |
| `node scripts/validate.js` | 빌드 + KO/EN 개수·rank·date 검증 (push 전 필수) |
| `npm run deploy` | 수동 배포 (Actions 실패 시 폴백) |

## 배포 방식

| 브랜치 | 역할 |
|--------|------|
| `main` | 소스 코드 (`dist/`는 gitignore) |
| `gh-pages` | 빌드 결과물 — GitHub Pages가 이 브랜치를 서빙 |

**`main`에 push하면 GitHub Actions(`.github/workflows/deploy.yml`)가
자동으로 빌드해서 `gh-pages`에 배포한다.** 별도 수동 배포는 필요 없다.

```bash
node scripts/validate.js        # 1. 검증
git add <파일> && git commit    # 2. 소스 커밋
git push origin main            # 3. push → Actions가 자동 배포
```

push 후 Actions 실행이 성공했는지 확인한다
(실패 시 `npm run deploy`로 수동 배포 가능).

## 파일 구조

| 파일 | 역할 |
|------|------|
| `src/constants.tsx` | 모든 콘텐츠 데이터 (공통 + ko/en 오버레이 → `DATA_KO`/`DATA_EN` 자동 조립) |
| `src/types.ts` | TypeScript 인터페이스 정의 |
| `src/App.tsx` | 메인 앱 (모든 섹션 렌더링) |
| `src/components/Sidebar.tsx` | 좌측 내비게이션 사이드바 (CV 다운로드 버튼 포함) |
| `src/components/Section.tsx` | 섹션 래퍼 컴포넌트 |
| `src/components/PrintCV.tsx` | 인쇄(PDF 저장) 시에만 출력되는 CV 레이아웃 |
| `scripts/validate.js` | push 전 검증 스크립트 |
| `.github/workflows/deploy.yml` | push 시 자동 배포 워크플로우 |
| `HARNESS.md` | 사람이 읽는 운영 가이드 |

## 코드 스타일

- 들여쓰기 2칸, 컴포넌트는 함수형 + `export default`
- 타입은 `src/types.ts`에 인터페이스로 정의 (`any` 사용 금지)
- 스타일은 Tailwind 유틸리티 클래스만 사용 (별도 CSS 파일 추가 금지)
- **색상 클래스는 라이트/다크 쌍으로 작성** — `bg-white dark:bg-slate-900`처럼
  `dark:` 변형을 항상 함께 지정 (다크 모드는 class 전략, 토글은 사이드바에 있음)
- 한국어가 들어가는 텍스트 컨테이너는 어절 단위 줄바꿈(`break-keep`) 유지
- 아이콘은 `lucide-react`에서 named import
- UI에 노출되는 문자열은 하드코딩하지 말고 `ui` 객체(`UIStrings`)에 KO/EN으로 추가

## 데이터 수정 규칙

콘텐츠는 `src/constants.tsx`의 **공통 필드 + ko/en 오버레이** 구조다.
항목은 배열(`PUBLICATIONS`, `CONFERENCES`, `PATENTS`, `AWARDS`, `EDUCATION`,
`OVERSEAS_EXPERIENCES`)에 **한 번만** 추가하고, 언어 무관 필드(날짜·타입 등)는
공통에, 언어별 텍스트는 `ko`/`en` 블록에 **둘 다** 작성한다.
`DATA_KO`/`DATA_EN`은 파일 하단의 `buildData()`가 자동 조립하므로 직접 수정하지 않는다.

### 수상 (`AWARDS`) — 최신순 정렬

```ts
{
  date: "YYYY.MM",
  rank: "gold" | "silver" | "bronze",
  ko: { title: "수상명 (등급)", issuer: "수여 기관" },
  en: { title: "Award Name (Grade)", issuer: "Issuer" }
}
```

- `gold` — 최우수상, 대상, Grand Prize
- `silver` — 우수상, 우수논문상, Excellence/Best Paper
- `bronze` — 장려상, 동상, Encouragement Award

### 논문 (`PUBLICATIONS` = 저널 / `CONFERENCES` = 학술대회)

- 공통: `date: "YYYY.MM"`, `type` — 최신순 정렬
- `ko`/`en`: `title`, `authors`, `journalOrConference`, (선택) `note`
- KO 제목은 `"한글 제목\n(영문 제목)"` 형식
- 본인 이름("이병천"/"Byeongcheon Lee"/"B. Lee")은 자동 강조되므로 표기만 정확히

### 특허 (`PATENTS`)

- 공통: `type`만 — 날짜·번호는 `(출원)/(등록)` 병기 표기가 언어별이라 `ko`/`en`에 작성
- 등록 완료 시 기존 출원 항목에 병기:
  ko `"2024.11.14 (출원) / 2026.02.27 (등록)"` / en `"2024.11.14 (Filing) / 2026.02.27 (Reg.)"`

### 콘텐츠 변경 시 필수 동반 수정

`UI_KO`와 `UI_EN` **두 곳 모두** `lastUpdatedDate`를 오늘 날짜(`"YYYY.MM.DD"`)로 갱신한다.

## 금지 사항

- `gh-pages` 브랜치를 직접 수정하거나 checkout하지 않는다
- `dist/`, `node_modules/`를 커밋하지 않는다
- 항목의 `ko`/`en` 오버레이 중 한쪽만 작성하지 않는다 (타입 오류로 빌드 실패)
- `DATA_KO`/`DATA_EN` export를 직접 수정하지 않는다 (`buildData()`가 조립)
- `vite.config.ts`의 `base: '/'`를 변경하지 않는다 (user site는 루트 경로)
- `public/images/profile.jpg`를 임의로 교체·삭제하지 않는다
- 검증(`node scripts/validate.js`) 없이 push하지 않는다 — **push가 곧 배포다**
- Tailwind CDN(`cdn.tailwindcss.com`)을 다시 추가하지 않는다 (PostCSS로 빌드함)
- 개인정보(생년월일, 전화번호 등)를 데이터 파일에 넣지 않는다 (번들에 노출됨)
- 사용자 확인 없이 콘텐츠(경력·논문 사실관계)를 임의로 창작하지 않는다

## 명명 규칙

- **커밋 메시지**: 영어 명령형 한 줄 (예: `Update graduate coursework grades`,
  `Add CAU-Junior award to awards`) — 접두사(`feat:` 등) 없이 작성
- **브랜치**: `main`에서 직접 작업 (개인 프로젝트, PR 없음)

## 과거 실수 기록 (반복 금지)

- **2026.04.15** — 수상 이력을 추가하면서 `lastUpdatedDate`를 갱신하지 않아
  사이트에 잘못된 날짜가 표시됨.
- **2026.07.11** — 연구실명 변경을 `git push`까지만 하고 `npm run deploy`를
  빠뜨려, 라이브 사이트가 5일 전 상태로 방치됨.
  → 재발 방지를 위해 2026.07.12에 GitHub Actions 자동 배포를 도입함.

## 향후 아이디어 (사용자 승인 후 진행)

- **대표 연구/프로젝트 하이라이트 섹션** — 논문 목록과 별도로, 대표 연구
  2~3개를 이미지·요약과 함께 소개하는 섹션 (2026.07.12 사용자가 추후 진행 결정)
- **Google Scholar·ORCID 링크** — 프로필 개설 후 프로필 카드와
  `index.html`의 JSON-LD `sameAs`에 추가 (아직 계정 없음)
- **디자인된 CV PDF 파일로 교체** — 현재 CV 버튼은 `window.print()` +
  인쇄 전용 CV 레이아웃(`PrintCV.tsx`) 기반이라 항상 최신 데이터가 반영됨.
  별도 디자인의 CV PDF가 필요해지면 파일 링크로 교체
- **og:image 전용 이미지 제작** — 현재 세로형 프로필 사진 대신 1200×630
  가로형 이미지 (2026.07.12 가로형 이미지가 없어 보류)

## 방문 통계 (GA4)

- 2026.07.12 도입 완료 — `index.html`에 gtag 스니펫, 측정 ID `G-X50NR2463V`
- `location.hostname === 'cheonbung.github.io'`일 때만 `gtag('config')`를
  호출해 로컬 개발 서버 방문은 집계에서 제외한다 — 이 가드를 제거하지 않는다
- 대시보드: https://analytics.google.com
