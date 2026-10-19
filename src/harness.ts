import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";

const html = readFileSync("index.html", "utf8");
const sample = readFileSync("samples/2026-10-07.html", "utf8");
const css = readFileSync("styles.css", "utf8");
const workflow = readFileSync(".github/workflows/deploy-pages.yml", "utf8");
const ids = Array.from(html.matchAll(/\bid="([^"]+)"/g), match => match[1]);
assert.equal(new Set(ids).size, ids.length, "HTML IDs must be unique");
for (const match of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.includes(match[1]), "Missing anchor: " + match[1]);

for (const [path, document] of [["index.html", html], ["samples/2026-10-07.html", sample]]) {
  const documentIds = Array.from(document.matchAll(/\bid="([^"]+)"/g), match => match[1]);
  assert.equal(new Set(documentIds).size, documentIds.length, "Duplicate IDs: " + path);
  for (const match of document.matchAll(/href="#([^"]+)"/g)) assert.ok(documentIds.includes(match[1]), "Missing anchor in " + path + ": " + match[1]);
  for (const match of document.matchAll(/(?:href|src)="([^"#]+)"/g)) {
    const href = match[1].replace(/&amp;/g, "&");
    if (/^https:|^mailto:/.test(href)) continue;
    assert.ok(existsSync(join(dirname(path), href.split(/[?#]/)[0])), "Missing local asset in " + path + ": " + href);
  }
  for (const match of document.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)) assert.match(match[0], /rel="[^"]*noopener/);
  assert.doesNotMatch(document, /<iframe|<embed|<object|data:application\/pdf|<script\b/i);
  assert.doesNotMatch(document, /(?:file:\/\/|\/Users\/|[A-Z]:[\\/])/);
}

for (const match of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)) assert.match(match[0], /rel="[^"]*noopener/);
assert.match(html, /<html lang="ko">/);
assert.equal(Array.from(html.matchAll(/<h1\b/g)).length, 1);
assert.match(html, /GLOBAL FI SALES \/ OPERATIONS SUPPORT/);
assert.match(html, /업무 흐름을 이해하고/);
assert.match(html, /정확한 자료 처리를 위한<br>검증 절차/);
for (const project of ["project-settlement", "project-briefing", "project-credit", "project-rates"]) assert.match(html, new RegExp('id="' + project + '"'));
assert.ok(html.indexOf('id="project-settlement"') < html.indexOf('id="project-briefing"'));
assert.ok(html.indexOf('id="project-briefing"') < html.indexOf('id="project-credit"'));
assert.ok(html.indexOf('id="project-credit"') < html.indexOf('id="project-rates"'));
assert.match(html, /담당 기간 정산 오류/);
assert.match(html, /오류는 0건/);
assert.match(html, /수행 경험을 바탕으로 재구성한 업무 절차/);
assert.match(html, /채권 결제나 KYC 업무를 수행한 경험을 뜻하지 않습니다/);
assert.match(html, /Cboe session/);
assert.match(html, /ECOS session/);
assert.match(html, /Stale exclusion/);
assert.match(html, /40<small>분<\/small>/);
assert.match(html, /10<small>분 이내<\/small>/);
assert.match(html, /공개 분석 보고서를 확인하지 못해 질적 논점만/);
assert.match(html, /수익률·스프레드 수치/);
assert.match(html, /1,084개 공통 관측일/);
assert.match(html, /D\+1 3s10s 평균 변화는 \+0\.6bp, 중앙값은 \+0\.4bp/);
assert.match(html, /19회, 축소는 17회/);
assert.match(html, /21<small>\/ 36<\/small>/);
assert.match(html, /가상 포지션입니다/);
assert.match(html, /전체 표본 백테스트 성과가 아닙니다/);
assert.match(html, /href="samples\/2026-10-07\.html"/);
assert.match(sample, /2026\.10\.07 Morning Market Briefing/);
assert.match(sample, /AI 활용 리서치 샘플/);
assert.match(sample, /07:00 KST/);
assert.match(sample, /미국 세션 2026-10-06/);
assert.match(sample, /한국 세션 2026-10-06/);
for (const section of ["Summary", "Rates", "FX", "Commodity", "Equity, Vol", "한국 증시", "주요 일정"]) assert.ok(sample.includes(section), "Missing briefing section: " + section);
assert.doesNotMatch(html, /실제 정산표|실제 KYC|실제 결제 업무/);
assert.doesNotMatch(html, /실현 수익|승률|합격 보장/);
assert.doesNotMatch(html, /<iframe|<embed|<object|data:application\/pdf/);
assert.match(css, /@media \(max-width: 720px\)/);
assert.match(css, /prefers-reduced-motion/);
assert.match(css, /:focus-visible/);
assert.match(workflow, /npm ci/);
assert.match(workflow, /npm run check/);
assert.match(workflow, /npm run typecheck/);
assert.match(workflow, /cp index\.html styles\.css \.nojekyll/);
assert.match(workflow, /cp -R assets _site\//);
assert.match(workflow, /cp -R samples _site\//);
assert.doesNotMatch(workflow, /cp -R \. _site|path: '\.'/);

function filesIn(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    if (["node_modules", ".git", "tmp"].includes(entry.name)) return [];
    const path = join(directory, entry.name);
    return entry.isDirectory() ? filesIn(path) : [path];
  });
}
for (const path of filesIn(".")) assert.doesNotMatch(path, /\.(?:pdf|docx|pptx)$/i, "Private document must not be packaged: " + path);
console.log("Site checks passed: project order, evidence, links, responsive styles, accessibility, document privacy, and Pages configuration.");


