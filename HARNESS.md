# HARNESS.md — 포트폴리오 사이트 운영 가이드

이 문서는 사이트를 관리하는 사람(나)이 읽는 문서다.  
Claude와 협업하는 방법, 배포 방법, 데이터 추가 방법을 정리한다.

---

## 배포 구조

```
main 브랜치          →  소스 코드 (React/TS)
gh-pages 브랜치      →  빌드 결과물 → GitHub Pages가 서빙
```

**`main`에 push하면 GitHub Actions가 자동으로 빌드해서 gh-pages에 배포한다**
(`.github/workflows/deploy.yml`). 수동 배포(`npm run deploy`)는 Actions가
실패했을 때의 폴백이다.

### 전체 작업 흐름

```
코드 수정
    ↓
node scripts/validate.js      # 검증 (빌드 성공 + KO/EN 일치 확인)
    ↓
git add / commit / push       # push하면 Actions가 자동 배포
    ↓
GitHub Actions 성공 확인      # 저장소 → Actions 탭 (1~2분 소요)
```

> 과거에는 `npm run deploy`를 수동 실행해야 했고, 이를 빠뜨려 사이트가
> 미반영되는 사고가 있었다(2026.07.11). 지금은 push만 하면 자동 배포된다.

---

## 데이터 추가 방법

모든 콘텐츠는 `src/constants.tsx` 한 파일에 있다.
항목마다 **공통 필드 + `ko`/`en` 오버레이**를 함께 작성한다 — 항목은 배열에
한 번만 추가하면 되고, 한쪽 언어를 빠뜨리면 타입 오류로 빌드가 실패한다.

### 수상 이력 추가

```ts
// AWARDS 배열에 추가 (최신순)
{
  date: "YYYY.MM",
  rank: "gold" | "silver" | "bronze",
  ko: { title: "수상명 (등급)", issuer: "수여 기관" },
  en: { title: "Award Name (Grade)", issuer: "Issuer" }
}
```

rank 기준:
| rank | 해당 등급 |
|------|----------|
| `gold` | 최우수상, 대상 |
| `silver` | 우수상, 우수논문상 |
| `bronze` | 장려상, 동상 |

### 논문 추가

- 저널 논문 → `PUBLICATIONS` 배열
- 학술대회 → `CONFERENCES` 배열
- 공통: `date`, `type` / `ko`·`en`: `title`, `authors`, `journalOrConference`, `note`

### 특허 추가

`PATENTS` 배열에 추가. 공통은 `type`뿐이고 날짜·번호·제목·발명자·출원인은
`ko`/`en`에 작성한다 (출원/등록 병기 표기가 언어별이라서).

---

## Claude와 협업하는 방법

Claude는 매 대화 시작 시 `CLAUDE.md`를 읽고 컨텍스트를 파악한다.

### 요청 예시

```
수상 이력 추가해줘:
- 날짜: 2026.03
- 수상명: CAU-Junior 융합연구그룹 우수상
- 기관: 중앙대학교 미래융합원
- 등급: 우수상
```

### Claude에게 기대하는 행동

1. `src/constants.tsx`의 해당 배열에 항목 추가 — `ko`/`en` 오버레이 모두 작성
   (+ `UI_KO`/`UI_EN`의 `lastUpdatedDate` 갱신)
2. `node scripts/validate.js` 실행으로 검증
3. `git commit` + `git push origin main` → Actions가 자동 배포
4. Actions 실행 성공 확인 (실패 시 `npm run deploy` 폴백)

---

## 검증 스크립트

```bash
node scripts/validate.js
```

| 검증 항목 | 설명 |
|----------|------|
| 빌드 성공 | `npm run build`가 오류 없이 완료되는지 |
| ko/en 오버레이 | 모든 항목에 `ko`/`en` 블록이 둘 다 작성됐는지 |
| rank 유효성 | `gold`/`silver`/`bronze` 외 값이 없는지 |
| date 포맷 | `YYYY.MM` 형식을 따르는지 |

스크립트가 실패하면 배포하지 말고 오류를 먼저 수정한다.

---

## 파일 구조 요약

```
cheonbung.github.io/
├── CLAUDE.md              # Claude 컨텍스트 (매 대화마다 읽힘)
├── HARNESS.md             # 이 문서 (사람이 읽는 운영 가이드)
├── .github/workflows/
│   └── deploy.yml         # push 시 자동 배포 (Actions)
├── scripts/
│   └── validate.js        # 코드 수정 후 실행하는 검증기
├── src/
│   ├── constants.tsx      # 모든 콘텐츠 데이터 (KO + EN)
│   ├── types.ts           # TypeScript 인터페이스
│   ├── App.tsx            # 메인 컴포넌트
│   └── components/
│       ├── Sidebar.tsx    # 프로필 사이드바 (CV 다운로드 버튼)
│       ├── Section.tsx    # 섹션 렌더러
│       └── PrintCV.tsx    # 인쇄 시에만 출력되는 CV 레이아웃
├── public/
│   ├── favicon.svg        # 파비콘
│   ├── robots.txt         # 검색엔진 크롤링 설정
│   ├── sitemap.xml        # 사이트맵
│   └── images/
│       └── profile.jpg    # 프로필 사진
└── package.json           # scripts.deploy = 수동 배포 폴백
```
