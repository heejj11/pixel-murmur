# PixelMurmur Social Desk setup

이 폴더는 별도 백엔드 리포 없이 SNS 통계를 수집하고 `/admin`에 보여 주는 최소 구성입니다.

## 포함 범위

- `social_accounts`: 연결 계정과 마지막 수집 상태
- `social_posts`: Instagram·X 게시물 원문 정보
- `social_metric_snapshots`: 계정·게시물별 일일 지표
- `object_publication`: 작품 공개 여부와 Instagram·X 원문 게시물 주소
- `sync-instagram`, `sync-x`: 플랫폼 API 수집 함수
- Supabase Auth + RLS: 공개 클라이언트는 `object_publication`의 공개된 행만 읽고, 등록된 운영자 메일 또는 `app_metadata.role = admin`인 로그인 사용자는 모든 행을 읽고 변경
- SNS 통계 테이블은 운영자만 조회
- Supabase Cron: 한국 시간 오전 3시대에 플랫폼별 하루 한 번 수집

작품 본문과 이미지는 이 DB로 옮기지 않습니다. 공개 여부와 SNS 원문 주소만 저장합니다.
초기 마이그레이션은 PM-001·PM-002만 공개하고, 나머지 작품은 운영자가 켤 때까지 숨깁니다.
SNS 주소는 Instagram의 게시물·릴스·TV URL 또는 X/Twitter의 상태 게시물 URL이어야 하며,
프론트 검증과 DB 제약이 같은 형식을 강제합니다.
운영자는 비밀번호 대신 Supabase가 발송하는 일회용 이메일 링크로 로그인합니다.

## 1. 프로젝트와 프론트 연결

Supabase 프로젝트를 만든 뒤 루트의 `.env.example`을 `.env.local`로 복사하고 값을 채웁니다.

```dotenv
VITE_SUPABASE_URL=https://PROJECT_REF.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
VITE_ADMIN_EMAIL=admin@example.com
```

배포 환경에도 같은 두 값을 등록한 뒤 프론트를 다시 빌드해야 합니다. Publishable key는
브라우저에 포함되어도 되지만, Service Role/Secret key는 절대 프론트 환경값에 넣지 않습니다.

## 2. DB 적용과 함수 배포

Supabase CLI에 로그인하고 이 리포를 프로젝트에 연결합니다.

```bash
npx supabase login
npx supabase link --project-ref PROJECT_REF
npx supabase db push
npx supabase functions deploy sync-instagram --no-verify-jwt
npx supabase functions deploy sync-x --no-verify-jwt
```

두 함수는 JWT 검사를 끄고 배포하지만 공개 함수는 아닙니다. 함수 내부에서 운영자 JWT 또는
Cron 전용 비밀값을 직접 확인합니다. 수동 동기화는 `app_metadata.role = admin`이거나
`ADMIN_EMAIL`과 일치하는 로그인 사용자만 허용합니다.

## 3. 운영자 한 명 연결하기

프론트의 `VITE_ADMIN_EMAIL`과 `202608270004_magic_link_admin.sql`에 같은 운영자 메일을
설정합니다. `/admin`에서 그 메일로 일회용 링크를 요청하면 첫 요청 시 Auth 사용자가 만들어지고,
메일 링크를 누른 뒤 운영 데스크 세션이 시작됩니다. 비밀번호 사용자는 만들 필요가 없습니다.

메일 주소 대신 별도의 운영자 역할을 더 부여해야 할 때만 SQL Editor에서 아래 쿼리를 사용합니다.

```sql
update auth.users
set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb)
  || '{"role":"admin"}'::jsonb
where email = '운영자 이메일';
```

이미 로그인했던 사용자는 로그아웃 후 다시 로그인해야 새 역할이 JWT에 반영됩니다.

## 4. Edge Function 비밀값

`supabase/functions/.env.example`을 참고해 아래 값을 프로젝트의 Edge Function Secrets에
등록합니다. `SYNC_CRON_SECRET`은 충분히 긴 무작위 문자열을 사용합니다.

공통 필수 값:

- `ADMIN_EMAIL`
- `SYNC_CRON_SECRET`

```bash
npx supabase secrets set --env-file supabase/functions/.env
```

필수 Instagram 값:

- `INSTAGRAM_ACCESS_TOKEN`
- `INSTAGRAM_ACCOUNT_ID`
- `INSTAGRAM_API_VERSION`

필수 X 값:

- `X_BEARER_TOKEN`

X의 비공개·오가닉 지표까지 필요할 때만 본인 계정 사용자 인증으로 발급한
`X_USER_ACCESS_TOKEN`을 추가합니다.

## 5. Cron이 함수를 호출하도록 연결

DB 마이그레이션은 일정만 만듭니다. 다음 세 값을 Vault에 넣기 전까지 예약 작업은 아무
함수도 호출하지 않고 `null`을 반환합니다. 아래의 Cron 비밀값은 Edge Function에 등록한
`SYNC_CRON_SECRET`과 정확히 같아야 합니다.

```sql
select vault.create_secret(
  'https://PROJECT_REF.supabase.co',
  'pixelmurmur_project_url'
);

select vault.create_secret(
  'sb_publishable_...',
  'pixelmurmur_publishable_key'
);

select vault.create_secret(
  '같은 SYNC_CRON_SECRET 값',
  'pixelmurmur_sync_cron_secret'
);
```

기본 일정은 Instagram 03:05 KST, X 03:15 KST입니다. 실행 이력은 Dashboard의 Cron 화면과
`cron.job_run_details`에서 확인할 수 있습니다.

## 6. 연결 확인

1. `/admin`에 운영자 이메일을 입력하고 받은 일회용 링크를 누릅니다.
2. `/admin/objects`에서 작품 공개 여부와 게시물 주소를 바꾸고 `변경사항 저장`을 누릅니다.
3. 공개 사이트에서 목록·상세·관련 작품과 SNS 링크가 바뀌었는지 확인합니다.
4. 통계 화면에서 `지금 동기화`를 누릅니다.
5. Instagram·X 연결 상태와 마지막 동기화 시각을 확인합니다.
6. 다음 날 일별 팔로워 선이 누적되는지 확인합니다.

개발 서버에서 UI만 먼저 볼 때는 `/admin?demo=1`을 사용합니다. 이 예시 데이터 경로는
개발 빌드에서만 활성화됩니다.

## 플랫폼 제약

- Instagram Insights는 Business 또는 Creator 계정 연결이 필요합니다. 일부 계정 지표는
  계정 규모나 보관 기간에 따라 빈 값일 수 있으므로 DB에는 `null`로 저장합니다.
- X 공개 지표는 앱 Bearer token으로 수집합니다. 링크 클릭·프로필 클릭 등 비공개 지표는
  본인 계정 사용자 인증이 필요하며 제공 기간이 짧으므로 매일 스냅샷을 남깁니다.
- 플랫폼 응답 원본은 `social_metric_snapshots.metrics`에 함께 보관해 지표 이름이 바뀌거나
  정규화가 잘못됐을 때 다시 확인할 수 있습니다.
