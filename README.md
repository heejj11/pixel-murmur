# PixelMurmur

**Things that don't exist. Yet.**

아직 실물이 되지 않은 아이디어를 조용히 쌓아두는 제품 디자인 아카이브입니다.

현재는 픽셀로만 존재하지만, 언젠가 실제 물건이 될 수 있는 오브젝트를 기록합니다.

## Published object dossiers

- `/objects/pm-001` - Toast Power Bank / 토스트 보조배터리
- `/objects/pm-002` - Toast T-Shirt / 토스트 티셔츠

현재 공개 기본값은 PM-001과 PM-002입니다. 나머지 작품은 `/admin/objects`에서 공개로
전환할 때까지 목록, 관련 작품, 직접 상세 주소에서 숨겨집니다.

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

## Studio desk / 운영 화면

`/admin`에는 PixelMurmur 운영자 한 명을 위한 비공개 운영 화면이 있습니다.
Instagram과 X의 통계·동기화 상태를 확인하고, `/admin/objects`에서 작품 공개 여부와
작품별 Instagram·X 원문 게시물 링크를 저장할 수 있습니다. 작품 본문과 이미지는
기존 `src/catalog.js`에서 관리하고 공개 설정만 Supabase에서 읽습니다. 편집 내용은
`변경사항 저장`으로 한 번에 반영되며, SNS 주소는 실제 Instagram 게시물·릴스 또는
X/Twitter 상태 게시물 주소만 허용합니다.

로컬에서는 `.env.example`을 `.env.local`로 복사한 뒤 Supabase 프로젝트 값을 넣습니다.
`VITE_ADMIN_EMAIL`에는 일회용 로그인 링크를 받을 운영자 메일을 넣습니다.
전체 데이터베이스·로그인·API 토큰·매일 수집 설정은
[`supabase/README.md`](supabase/README.md)에 정리되어 있습니다.
