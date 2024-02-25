# Financial Information Visualization Front App

## Getting Started

1. [open dart download 프로젝트]('../open-dart-download/README.md')를 통해 데이터를 준비합니다.

2. 환경 변수 설정

```.env
DATABASE_URL= 데이터 베이스 URL
```

3. prisma 초기화

```bash
npx prisma migrate dev
```

4. 개발 서버 실행

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
