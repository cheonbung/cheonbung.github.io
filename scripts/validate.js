#!/usr/bin/env node
// validate.js — 포트폴리오 사이트 코드 수정 후 자동 검증기
//
// 사용법:
//   node scripts/validate.js
//
// 검증 항목:
//   1. npm run build 성공 여부
//   2. KO/EN 데이터 항목 수 일치 여부 (awards, publications, conferences, patents)
//   3. award rank 값 유효성 (gold / silver / bronze)
//   4. date 포맷 일관성 (YYYY.MM)
//   5. 배포 리마인더 출력 (npm run deploy)

import { execSync } from "child_process";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const CONSTANTS_PATH = join(ROOT, "src", "constants.tsx");

const PASS = "\x1b[92m[PASS]\x1b[0m";
const FAIL = "\x1b[91m[FAIL]\x1b[0m";
const WARN = "\x1b[93m[WARN]\x1b[0m";
const INFO = "\x1b[94m[INFO]\x1b[0m";

const errors = [];
const warnings = [];

function section(title) {
  console.log(`\n${"─".repeat(50)}`);
  console.log(`  ${title}`);
  console.log("─".repeat(50));
}

// ─────────────────────────────────────────────────
// 1. npm run build
// ─────────────────────────────────────────────────
function checkBuild() {
  section("1. 빌드 검증 (npm run build)");
  try {
    execSync("npm run build", { cwd: ROOT, stdio: "pipe" });
    console.log(`${PASS} 빌드 성공`);
  } catch (e) {
    console.log(`${FAIL} 빌드 실패`);
    console.log(e.stderr?.toString().slice(-1000) ?? "");
    errors.push("빌드 실패 — npm run build 오류를 확인하세요.");
  }
}

// ─────────────────────────────────────────────────
// 2. KO/EN 항목 수 일치
// ─────────────────────────────────────────────────
function extractArrayBlocks(text, field) {
  // field 키의 배열 블록을 대괄호 짝을 맞춰가며 추출 (KO, EN 순)
  // 항목 안에 authors: [...] 같은 중첩 배열이 있어도 끝까지 읽는다
  const blocks = [];
  const regex = new RegExp(`${field}:\\s*\\[`, "g");
  let match;
  while ((match = regex.exec(text)) !== null) {
    const start = match.index + match[0].length;
    let depth = 1;
    let i = start;
    while (i < text.length && depth > 0) {
      if (text[i] === "[") depth++;
      else if (text[i] === "]") depth--;
      i++;
    }
    blocks.push(text.slice(start, i - 1));
  }
  return blocks;
}

function countItems(text, field) {
  return extractArrayBlocks(text, field).map((block) => {
    const byDate = (block.match(/date:\s*"/g) || []).length;
    const byName = (block.match(/name:\s*"/g) || []).length;
    return byDate || byName;
  });
}

function checkKoEnParity() {
  section("2. KO/EN 데이터 항목 수 일치 검증");
  const text = readFileSync(CONSTANTS_PATH, "utf-8");

  const fields = {
    awards: "수상 이력",
    patents: "특허",
    publications: "저널 논문",
    conferences: "학술대회 발표",
  };

  for (const [field, label] of Object.entries(fields)) {
    const counts = countItems(text, field);
    if (counts.length < 2) {
      console.log(`${WARN} ${label}: 섹션을 찾지 못했습니다 (수동 확인 필요)`);
      warnings.push(`${label} 섹션 파싱 실패`);
      continue;
    }
    const [ko, en] = counts;
    if (ko === en) {
      console.log(`${PASS} ${label}: KO=${ko}, EN=${en} 일치`);
    } else {
      console.log(`${FAIL} ${label}: KO=${ko}, EN=${en} 불일치 — 누락 항목 확인 필요`);
      errors.push(`${label} KO/EN 항목 수 불일치 (KO=${ko}, EN=${en})`);
    }
  }
}

// ─────────────────────────────────────────────────
// 3. award rank 유효성
// ─────────────────────────────────────────────────
function checkAwardRanks() {
  section("3. Award rank 값 유효성");
  const text = readFileSync(CONSTANTS_PATH, "utf-8");

  const validRanks = new Set(["gold", "silver", "bronze"]);
  const foundRanks = [...text.matchAll(/rank:\s*"(\w+)"/g)].map((m) => m[1]);
  const invalid = foundRanks.filter((r) => !validRanks.has(r));

  if (invalid.length === 0) {
    console.log(`${PASS} 모든 rank 값이 유효합니다: ${[...new Set(foundRanks)].join(", ")}`);
  } else {
    console.log(`${FAIL} 유효하지 않은 rank 값: ${[...new Set(invalid)].join(", ")}`);
    errors.push(`잘못된 rank 값: ${[...new Set(invalid)].join(", ")} — gold/silver/bronze 만 허용`);
  }
}

// ─────────────────────────────────────────────────
// 4. date 포맷
// ─────────────────────────────────────────────────
function checkDateFormat() {
  section("4. Date 포맷 검증");
  const text = readFileSync(CONSTANTS_PATH, "utf-8");

  const dates = [...text.matchAll(/date:\s*"([^"]+)"/g)].map((m) => m[1]);
  const badDates = dates.filter(
    (d) =>
      !/^\d{4}\.\d{2}$/.test(d) &&
      !/^\d{4}\.\d{2}\.\d{2}$/.test(d) &&
      !/^\d{4}\.\d{2}\.\d{2} \(출원\) \/ \d{4}\.\d{2}\.\d{2} \(등록\)$/.test(d) &&
      !/^\d{4}\.\d{2}\.\d{2} \(Filing\) \/ \d{4}\.\d{2}\.\d{2} \(Reg\.\)$/.test(d)
  );

  if (badDates.length === 0) {
    console.log(`${PASS} 모든 date 포맷이 유효합니다`);
  } else {
    const unique = [...new Set(badDates)].slice(0, 5);
    console.log(`${WARN} 비표준 date 포맷 발견: ${unique.join(", ")}`);
    warnings.push(`비표준 date 포맷: ${unique.join(", ")}`);
  }
}

// ─────────────────────────────────────────────────
// 결과 요약 + 배포 리마인더
// ─────────────────────────────────────────────────
function summary() {
  section("검증 결과 요약");
  if (errors.length === 0 && warnings.length === 0) {
    console.log(`${PASS} 모든 검증 통과`);
  } else {
    for (const e of errors) console.log(`${FAIL} ${e}`);
    for (const w of warnings) console.log(`${WARN} ${w}`);
  }

  console.log(`\n${INFO} 배포 리마인더:`);
  console.log("    git add <파일> && git commit -m '...' && git push origin main");
  console.log("    → push하면 GitHub Actions가 자동으로 빌드·배포합니다.");
  console.log("    → Actions 실패 시 수동 배포: npm run deploy\n");

  if (errors.length > 0) process.exit(1);
}

// ─────────────────────────────────────────────────
// main
// ─────────────────────────────────────────────────
console.log(`\n${INFO} 포트폴리오 사이트 검증 시작 — ${CONSTANTS_PATH}`);
checkBuild();
checkKoEnParity();
checkAwardRanks();
checkDateFormat();
summary();
