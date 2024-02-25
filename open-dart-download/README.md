# open dart download

## 프로젝트 설정

1. 환경 변수 설정

.env 파일에 API KEY, DART URL, DATABASE URL 설정

```.env
DART_API_KEY= OPEN DART에서 발급 받는 key
DART_URL=https://opendart.fss.or.kr
DATABASE_URL= 데이터 베이스 URL
```

2. prisma 초기화

```bash
npx prisma migrate dev
```

3. download 실행

DART_API_KEY는 1일 2만회 호출 제한이 있습니다. 하루에 한번씩 실행하거나, DART_API_KEY 를 여러개 발급 받아 여러번 실행해야 합니다.

```bash
// npm 이용시
npm start download

// yarn 이용시
yarn start download
```

4. sql 데이터 입력

```bash
// npm 이용시
npm start sql

// yarn 이용시
yarn start sql
```
