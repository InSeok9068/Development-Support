# 개발 도우미

[TOC]

## 환경구성

Server OS : Ubuntu

Server : Oracle Cloud

Language : TypeScript

Backend Framework : Express

Frontend Framework : VueJS

CSS Framework : Tailwind CSS + Daisy UI

RDB Database : SQLite

NoSQL Database : Firestore (Firebase)

Database ORM Framework : Prisma

API Interface : GraphQL

Cache System : Redis

Message Queue : Redis Pub/Sub

Package Manager : Pnpm

Front Build Tool : Vite

Monorepo Tool : Turborepo

CI/CD : GitHub Action (+ Self-hosted Runner)

Notification : Telegram

Authentication : Firebase

API Interface Spec : Postman

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

---

## 기능 구현

### 예정

- 업무 대시보드 표기 (chart.js)

### 진행중

- 금일 업무 작성 기능 -> 자동으로 주간보고서 엑셀 작성 후 이메일 전송
- 메이저 IT 기업 채용 공고 알림 서비스 (스크래핑 활용)
  - <docs/채용공고 스크랩.md>

### 완료

- 미작성

## 기타 작업

- GitHub Action CI/CI 구축 (Turorepo, Docker)
- 공통 팝업창 작업
- 메뉴창 사이드바로 구현??
- 해당 사이드 프로젝트 기술스텍을 볼 수 있는 페이지 구현
