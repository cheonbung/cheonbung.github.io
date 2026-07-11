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
| `node scripts/validate.js` | 빌드 + 데이터 검증 (배포 전 필수) |
| `npm run deploy` | 빌드 + `gh-pages` 브랜치 배포 |

> `validate.js`의 KO/EN 개수 검증은 현재 `awards`만 정확하다.
> `publications`/`conferences`/`patents`는 중첩 배열 때문에 파싱이 되지 않으므로
> **눈으로 KO/EN 항목 수를 직접 대조**할 것.

## 배포 방식 (가장 중요)

> **`git push`만 하면 사이트가 업데이트되지 않는다.**

| 브랜치 | 역할 |
|--------|------|
| `main` | 소스 코드 (`dist/`는 gitignore) |
| `gh-pages` | 빌드 결과물 — GitHub Pages가 이 브랜치를 서빙 |

콘텐츠·코드 수정 후 반드시 이 순서를 지킨다:

```bash
node scripts/validate.js        # 1. 검증
git add <파일> && git commit    # 2. 소스 커밋
git push origin main            # 3. 소스 push
npm run deploy                  # 4. 사이트 배포 ← 빠뜨리면 사이트 미반영
```

## 파일 구조

| 파일 | 역할 |
|------|------|
| `src/constants.tsx` | 모든 콘텐츠 데이터 (`DATA_KO` + `DATA_EN`) |
| `src/types.ts` | TypeScript 인터페이스 정의 |
| `src/App.tsx` | 메인 앱 (모든 섹션 렌더링) |
| `src/components/Sidebar.tsx` | 좌측 내비게이션 사이드바 |
| `src/components/Section.tsx` | 섹션 래퍼 컴포넌트 |
| `scripts/validate.js` | 배포 전 검증 스크립트 |
| `HARNESS.md` | 사람이 읽는 운영 가이드 |

## 코드 스타일

- 들여쓰기 2칸, 컴포넌트는 함수형 + `export default`
- 타입은 `src/types.ts`에 인터페이스로 정의 (`any` 사용 금지)
- 스타일은 Tailwind 유틸리티 클래스만 사용 (별도 CSS 파일 추가 금지)
- 아이콘은 `lucide-react`에서 named import
- UI에 노출되는 문자열은 하드코딩하지 말고 `ui` 객체(`UIStrings`)에 KO/EN으로 추가

## 데이터 수정 규칙

**모든 콘텐츠는 `DATA_KO`와 `DATA_EN` 두 곳을 반드시 함께 수정한다.**
한 곳만 수정하면 언어 전환 시 데이터가 어긋난다.

### 수상 (`awards`) — 최신순 정렬

```ts
{
  date: "YYYY.MM",
  title: "수상명 (등급)",       // 예: "CAU-Junior 융합연구그룹 (우수상)"
  issuer: "수여 기관",
  rank: "gold" | "silver" | "bronze"
}
```

- `gold` — 최우수상, 대상, Grand Prize
- `silver` — 우수상, 우수논문상, Excellence/Best Paper
- `bronze` — 장려상, 동상, Encouragement Award

### 논문 (`publications` = 저널 / `conferences` = 학술대회)

- 날짜 형식 `"YYYY.MM"`, 최신순 정렬
- KO 데이터의 제목은 `"한글 제목\n(영문 제목)"` 형식
- 본인 이름("이병천"/"Byeongcheon Lee"/"B. Lee")은 자동 강조되므로 표기만 정확히

### 특허 (`patents`)

- 등록 완료 시 기존 출원 항목에 `(출원) / (등록)` 형식으로 병기
  (예: `date: "2024.11.14 (출원) / 2026.02.27 (등록)"`)

### 콘텐츠 변경 시 필수 동반 수정

`DATA_KO`와 `DATA_EN` **두 곳 모두** `lastUpdatedDate`를 오늘 날짜(`"YYYY.MM.DD"`)로 갱신한다.

## 금지 사항

- `gh-pages` 브랜치를 직접 수정하거나 checkout하지 않는다
- `dist/`, `node_modules/`를 커밋하지 않는다
- `DATA_KO`/`DATA_EN` 중 한쪽만 수정하지 않는다
- `vite.config.ts`의 `base: '/'`를 변경하지 않는다 (user site는 루트 경로)
- `public/images/profile.jpg`를 임의로 교체·삭제하지 않는다
- 검증(`node scripts/validate.js`) 없이 배포하지 않는다
- 사용자 확인 없이 콘텐츠(경력·논문 사실관계)를 임의로 창작하지 않는다

## 명명 규칙

- **커밋 메시지**: 영어 명령형 한 줄 (예: `Update graduate coursework grades`,
  `Add CAU-Junior award to awards`) — 접두사(`feat:` 등) 없이 작성
- **브랜치**: `main`에서 직접 작업 (개인 프로젝트, PR 없음)

## 과거 실수 기록 (반복 금지)

- **2026.04.15** — 수상 이력을 추가하면서 `lastUpdatedDate`를 갱신하지 않아
  사이트에 잘못된 날짜가 표시됨.
- **2026.07.11** — 연구실명 변경을 `git push`까지만 하고 `npm run deploy`를
  빠뜨려, 라이브 사이트가 5일 전 상태로 방치됨. **push 후 deploy는 한 세트다.**
