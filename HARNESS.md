# HARNESS.md — 포트폴리오 사이트 운영 가이드

이 문서는 사이트를 관리하는 사람(나)이 읽는 문서다.  
Claude와 협업하는 방법, 배포 방법, 데이터 추가 방법을 정리한다.

---

## 배포 구조

```
main 브랜치          →  소스 코드 (React/TS)
gh-pages 브랜치      →  빌드 결과물 → GitHub Pages가 서빙
```

`npm run deploy` 한 번으로 빌드 + gh-pages 브랜치 업데이트가 함께 된다.

### 전체 작업 흐름

```
코드 수정
    ↓
node scripts/validate.js      # 검증 (빌드 성공 + KO/EN 일치 확인)
    ↓
git add / commit / push       # 소스 코드 저장
    ↓
npm run deploy                # 빌드 + gh-pages 배포 ← 반드시 실행
```

> **자주 하는 실수**: `git push`만 하고 `npm run deploy`를 빠뜨리면  
> GitHub에는 소스가 올라가지만 **사이트는 그대로다**.

---

## 데이터 추가 방법

모든 콘텐츠는 `src/constants.tsx` 한 파일에 있다.  
한국어(`DATA_KO`)와 영어(`DATA_EN`) **두 곳을 반드시 같이** 수정해야 한다.

### 수상 이력 추가

```ts
// DATA_KO.awards 와 DATA_EN.awards 각각에 추가 (최신순)
{
  date: "YYYY.MM",
  title: "수상명 (등급)",
  issuer: "수여 기관",
  rank: "gold" | "silver" | "bronze"
}
```

rank 기준:
| rank | 해당 등급 |
|------|----------|
| `gold` | 최우수상, 대상 |
| `silver` | 우수상, 우수논문상 |
| `bronze` | 장려상, 동상 |

### 논문 추가

- 저널 논문 → `publications` 배열
- 학술대회 → `conferences` 배열
- 두 언어 섹션 모두 수정

### 특허 추가

`patents` 배열에 추가. 두 언어 섹션 모두 수정.

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

1. `src/constants.tsx`의 KO/EN 두 곳 모두 수정
2. `node scripts/validate.js` 실행으로 검증
3. `git commit` + `git push origin main`
4. `npm run deploy` 실행 → 사이트 배포

---

## 검증 스크립트

```bash
node scripts/validate.js
```

| 검증 항목 | 설명 |
|----------|------|
| 빌드 성공 | `npm run build`가 오류 없이 완료되는지 |
| KO/EN 일치 | 수상·논문·특허 항목 수가 두 언어에서 동일한지 |
| rank 유효성 | `gold`/`silver`/`bronze` 외 값이 없는지 |
| date 포맷 | `YYYY.MM` 형식을 따르는지 |

스크립트가 실패하면 배포하지 말고 오류를 먼저 수정한다.

---

## 파일 구조 요약

```
cheonbung.github.io/
├── CLAUDE.md              # Claude 컨텍스트 (매 대화마다 읽힘)
├── HARNESS.md             # 이 문서 (사람이 읽는 운영 가이드)
├── scripts/
│   └── validate.js        # 코드 수정 후 실행하는 검증기
├── src/
│   ├── constants.tsx      # 모든 콘텐츠 데이터 (KO + EN)
│   ├── types.ts           # TypeScript 인터페이스
│   ├── App.tsx            # 메인 컴포넌트
│   └── components/
│       ├── Sidebar.tsx    # 프로필 사이드바
│       └── Section.tsx    # 섹션 렌더러
├── public/
│   └── images/
│       └── profile.jpg    # 프로필 사진
└── package.json           # scripts.deploy = "gh-pages -d dist"
```
