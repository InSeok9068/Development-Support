# 개발 도우미

[TOC]

## 환경구성

Server OS : Ubuntu

Server : Oracle Cloud

Language : TypeScript

Backend Framework : Express

Frontend Framework : VueJS

CSS Framework : PrimeVue

RDB Database : SQLite

NoSQL Database : Firestore (Firebase)

Database ORM Framework : Prisma

API Interface : GraphQL

Cache System : Redis

Message Queue : BullMQ (Redis)

Package Manager : Pnpm

Front Build Tool : Vite

Monorepo Tool : Turborepo

CI/CD : GitHub Action (+ Self-hosted Runner)

Notification : Telegram

Authentication : Firebase

---

## 실행

### 글로벌 패키지 다운로드

```shell
npm i -g pnpm turbo rimraf
```

### 패키지 다운로드

```shell
pnpm install
```

### 개발 환경 실행 (프론트엔드, 백엔드 동시)

```shell
pnpm dev
```

### 백엔드 단위 테스트

`경로 : ./apps/backend`

```shell
pnpm cross-env NODE_ENV=development vitest {파일경로}
```

---

## 1. 기획

[옵시디언/개발도우미/UI&UX 기획](<https://github.com/InSeok9068/Obsidian/tree/main/A.%20Projects%20(%EB%AA%A9%ED%91%9C%2C%20%EB%A7%88%EA%B0%90)/%EC%82%AC%EC%9D%B4%EB%93%9C%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8/%EA%B0%9C%EB%B0%9C%EB%8F%84%EC%9A%B0%EB%AF%B8/%EC%84%A4%EA%B3%84>)

Figma를 통하여 화면 기획 및 기능 설명 작성

※ Bard 기획서 검토 (이미지 업로드)

## 2. 개발 설계

[옵시디언/개발도우미/개발 설계](<https://github.com/InSeok9068/Obsidian/tree/main/A.%20Projects%20(%EB%AA%A9%ED%91%9C%2C%20%EB%A7%88%EA%B0%90)/%EC%82%AC%EC%9D%B4%EB%93%9C%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8/%EA%B0%9C%EB%B0%9C%EB%8F%84%EC%9A%B0%EB%AF%B8/%EC%84%A4%EA%B3%84>)

## 3. 기능 구현

※ ChatGPT와 페어 코딩 진행 (+ AWS CodeWhisperer)

```
<ChatGPT를 구현 단계에 활용하기>
1. 코딩 지원: 구현과 디버깅에 ChatGPT를 활용
2. 최적화 지원: 코드 최적화를 위한 제안을 받아 더 나은 코드를 작성하는 습관을 익히게 함
3. 코드리뷰: 코드를 검토해 버그, 보안 취약점을 찾아냄
```

---

## 프로젝트 공통화 및 CI/CD 개선 TODO 리스트

- [ ] GitHub Action CI/CI 구축 (Turorepo, Docker 서버 배포)
- [ ] 권한마다 보여질 카드 표기
- [ ] 업무 대시보드 표기 (chart.js)
- [ ] Sentry 운영 모니터링 진행
- [ ] log 파일 삭제 `winston`을 통한 설정하였지만 동작 X 파악 필요
