# PixelMurmur

**Things that don't exist. Yet.**

아직 실물이 되지 않은 아이디어를 조용히 쌓아두는 제품 디자인 아카이브입니다.

현재는 픽셀로만 존재하지만, 언젠가 실제 물건이 될 수 있는 오브젝트를 기록합니다.

## Published object dossiers

- `/objects/pm-001` - Toast Power Bank / 토스트 보조배터리
- `/objects/pm-002` - Toast T-Shirt / 토스트 티셔츠
- `/objects/pm-003` - Toast Eco Bag / 토스트 에코백

PM-002와 PM-003은 정면, 후면, 측면, 소재 디테일, 착용 또는 사용 장면, 패키지까지
한 상품 단위의 렌더 갤러리로 구성되어 있습니다.

## Run locally

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

## Stack

- Vite
- React
- CSS
- Phosphor Icons
- Supabase Auth, Postgres, Edge Functions, Cron

## Social desk / SNS 통계 운영 화면

`/admin`에는 PixelMurmur 운영자 한 명을 위한 비공개 SNS 통계 화면이 있습니다.
Instagram과 X의 팔로워 추이, 조회·도달·참여 합계, 최근 게시물 성과와
동기화 상태만 다루며 공개 오브젝트 콘텐츠는 기존 `src/catalog.js`에서 계속 관리합니다.

로컬에서는 `.env.example`을 `.env.local`로 복사한 뒤 Supabase 프로젝트 값을 넣습니다.
전체 데이터베이스·로그인·API 토큰·매일 수집 설정은
[`supabase/README.md`](supabase/README.md)에 정리되어 있습니다.
