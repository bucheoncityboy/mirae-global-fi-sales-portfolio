# 김재원 | 미래에셋증권 Global FI Sales 포트폴리오

미래에셋증권 Global채권상품본부 Global FI Sales 지원을 위한 정적 웹 포트폴리오입니다. 기존 [LS증권 포트폴리오](https://github.com/bucheoncityboy/ls-investment-strategy-portfolio)의 레이아웃, 색상 체계와 반응형 스타일을 바탕으로 독립된 프로젝트로 구성했습니다.

## 공개 사이트

- 사이트: https://bucheoncityboy.github.io/mirae-global-fi-sales-portfolio/
- GitHub 저장소: https://github.com/bucheoncityboy/mirae-global-fi-sales-portfolio

## 구성

- `index.html`: 소개, 프로젝트 4건, 검증 절차, 학력·활동, 자격·연락처
- `styles.css`: 기존 포트폴리오의 시각 체계와 데스크톱·모바일·인쇄 스타일
- `samples/2026-10-07.html`: 브리핑 스킬의 실제 실행 예시
- `src/harness.ts`: 링크, 콘텐츠, 문서 비공개 조건 및 Pages 배포 구성 검사
- `src/serve.ts`: 정적 미리보기 서버
- `docs/source-notes.md`: 콘텐츠 출처와 공개 범위

정산 흐름은 수행 경험을 바탕으로 재구성했으며 회사 내부 자료나 고객정보를 포함하지 않습니다. Credit 프로젝트는 공개 분석 보고서를 확인하지 못해 질적 논점만 담았습니다. 국고채 수치는 공개 발표자료와 README를 대조했습니다. DV01 포지션은 가정에 따른 민감도 예시로 표시합니다.

Pages 배포에는 HTML, CSS, favicon, 브리핑 샘플만 포함합니다. 비공개 자료나 PPTX 발표자료를 사이트 산출물에 복사하지 않습니다.

## 로컬 확인

```bash
npm ci
npm run check
npm run typecheck
npm run preview
```

미리보기 주소: `http://127.0.0.1:4173`

GitHub Pages는 `main` 브랜치의 루트에서 사이트 파일을 제공합니다. 변경 전 로컬에서 링크·콘텐츠 검사와 TypeScript 검사를 실행합니다.


