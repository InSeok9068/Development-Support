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

## 1. 기획

Figma를 통하여 화면 기획 및 기능 설명 작성

## 2. 개발 설계

`docs` 폴더 참고

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
- [ ] 공통 팝업창 작업
- [ ] 메뉴창 사이드바로 구현 고려(?)
- [ ] 업무 대시보드 표기 (chart.js)
- [ ] NewRelic 운영 모니터링 진행 (도커 서버를 통해 NewRelic 서버 실행)
- [ ] Express GraphQL 오류 시 GraphQL 오류 포멧으로 리턴
- [ ] log 파일 삭제 `winston`을 통한 설정하였지만 동작 X 파악 필요
