# 개발 도우미

[TOC]

[Notion Link](https://www.notion.so/4d3b8c7aeb0b4b149da887c6dbdc609b)

## 환경구성

Server OS : Ubuntu

Server : Oracle Cloud

Language : TypeScript

Backend Framework : Express

Frontend Framework : VueJS

CSS Framework : Tailwind CSS + Daisy UI

Database : SQLite

Database ORM Framework : Prisma

API Interface : GraphQL

Cache System : Redis

Message Queue : Redis Pub/Sub

Package Manager : Pnpm

Front Build Tool : Vite

Monorepo Tool : Turborepo

CI/CD : GitHub Action (+ Self-hosted Runner)

Notification : Telegram

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

- [ ] 메이저 IT 기업 채용 공고 알림 서비스

### 완료

- 테스트1

---

## 기타 작업

- 문자열 유틸, 날짜 유틸, 기타 유틸 공통화 (@toss/utils)
- GitHub Action CI/CI 구축 (Turorepo, Docker)
- 프론트엔드, 백엔드 API 통신 타입 DTO 선언 (zod 이용)
- 로그인 기능 구현 (미사용 예정)
- 금일 업무 작성 기능 -> 자동으로 주간보고서 엑셀 작성 후 이메일 전송
