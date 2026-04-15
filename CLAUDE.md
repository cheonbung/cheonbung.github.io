# CLAUDE.md — 이병천 포트폴리오 사이트

Claude가 이 프로젝트에서 작업할 때 매 대화마다 읽어야 할 핵심 컨텍스트.

---

## 프로젝트 개요

- **URL**: https://cheonbung.github.io/
- **스택**: React 19 + TypeScript + Vite + Tailwind CSS
- **저장소**: https://github.com/cheonbung/cheonbung.github.io

---

## 배포 방식 (반드시 숙지)

> **`git push`만 하면 사이트가 업데이트되지 않는다.**

이 프로젝트는 `gh-pages` 패키지로 배포한다.

| 브랜치 | 역할 |
|--------|------|
| `main` | 소스 코드 (`.gitignore`에 `dist/` 포함) |
| `gh-pages` | 빌드 결과물 — GitHub Pages가 이 브랜치를 서빙 |

### 코드 수정 후 올바른 순서

```bash
# 1. 소스 코드 커밋
git add <파일>
git commit -m "..."
git push origin main

# 2. 빌드 + gh-pages 브랜치에 배포 (이 단계를 빠뜨리면 사이트 미반영)
npm run deploy
```

`npm run deploy`는 내부적으로 `npm run build && gh-pages -d dist`를 실행한다.  
**항상 두 단계를 모두 실행해야 한다.**

---

## 핵심 파일

| 파일 | 역할 |
|------|------|
| `src/constants.tsx` | 모든 콘텐츠 데이터 (한국어 `DATA_KO` + 영어 `DATA_EN`) |
| `src/types.ts` | TypeScript 인터페이스 정의 |
| `src/App.tsx` | 메인 앱 컴포넌트 |
| `src/components/Sidebar.tsx` | 좌측 프로필 사이드바 |
| `src/components/Section.tsx` | 각 섹션 렌더러 |

---

## 데이터 수정 규칙

### 수상 이력 추가 (`awards`)

`src/constants.tsx`에 **한국어(`DATA_KO`)와 영어(`DATA_EN`) 두 곳 모두** 추가해야 한다.

```ts
{
  date: "YYYY.MM",          // 날짜 (최신순 정렬)
  title: "수상명 (등급)",    // 예: "CAU-Junior 융합연구그룹 (우수상)"
  issuer: "수여 기관",
  rank: "gold" | "silver" | "bronze"  // 최우수=gold, 우수=silver, 장려/동=bronze
}
```

**rank 기준**
- `gold` — 최우수상, 대상, Grand Prize
- `silver` — 우수상, Excellence Award, Best Paper
- `bronze` — 장려상, 동상, Encouragement Award

### 논문 추가 (`publications` / `conferences`)

`publications` = 저널 논문, `conferences` = 학술대회 발표.  
두 언어 섹션 모두 수정.

### 특허 추가 (`patents`)

`DATA_KO`와 `DATA_EN`의 `patents` 배열에 각각 추가.

---

## 콘텐츠 수정 시 반드시 함께 업데이트할 것

콘텐츠(수상, 논문, 특허 등)를 추가하거나 변경할 때마다 `src/constants.tsx`의 **`lastUpdatedDate`를 오늘 날짜로 수정**해야 한다.

```ts
// DATA_KO와 DATA_EN 두 곳 모두
lastUpdatedDate: "YYYY.MM.DD",  // 예: "2026.04.15"
```

> **과거 실수 (2026.04.15)**: 수상 이력을 추가하면서 `lastUpdatedDate`를 갱신하지 않아 사이트에 잘못된 날짜가 표시됨.

---

## 검증

코드 수정 후 배포 전에 검증 스크립트를 실행:

```bash
node scripts/validate.js
```

빌드 성공 여부 + KO/EN 데이터 항목 수 일치 여부를 확인한다.
