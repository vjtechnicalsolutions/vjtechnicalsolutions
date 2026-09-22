# Auth Testing Playbook (Emergent-managed Google OAuth)

## Flow reference
- Login button redirects to `https://auth.emergentagent.com/?redirect=<window.location.origin + '/admin'>` (never hardcoded).
- After Google auth, user lands at `{redirect}#session_id=<id>`.
- `AppRouter` detects `session_id` in `useLocation().hash` during render and mounts `AuthCallback`.
- `AuthCallback` POSTs `/api/auth/session` with `{session_id}`; backend exchanges it at
  `GET https://demobackend.emergentagent.com/auth/v1/env/oauth/session-data` (header `X-Session-ID`),
  upserts the user by email, stores `session_token` in `user_sessions` (7-day aware expiry),
  and sets an httpOnly cookie (`secure`, `samesite=none`, `path=/`).
- `GET /api/auth/me` validates cookie first, then `Authorization: Bearer` fallback.
- `POST /api/auth/logout` deletes the session and clears the cookie.
- Admin routes (`GET /api/enquiries`, `GET /api/tickets`) use `get_admin_user`: authenticated +
  optional `ADMIN_EMAILS` allowlist from `backend/.env` (empty = any signed-in Google user).

## Step 1: Create test user & session
```
mongosh --eval "
use('app');
var userId = 'test-user-' + Date.now();
var sessionToken = 'test_session_' + Date.now();
db.users.insertOne({ user_id: userId, email: 'test.user.' + Date.now() + '@example.com', name: 'Test User', picture: '', created_at: new Date() });
db.user_sessions.insertOne({ user_id: userId, session_token: sessionToken, expires_at: new Date(Date.now() + 7*24*60*60*1000), created_at: new Date() });
print('Session token: ' + sessionToken);
"
```

## Step 2: API checks
```
curl -X GET "https://ocean-broadband.preview.emergentagent.com/api/auth/me" -H "Authorization: Bearer <SESSION_TOKEN>"
curl -X GET "https://ocean-broadband.preview.emergentagent.com/api/enquiries" -H "Authorization: Bearer <SESSION_TOKEN>"
curl -X GET "https://ocean-broadband.preview.emergentagent.com/api/tickets" -H "Authorization: Bearer <SESSION_TOKEN>"
```
Expect user JSON / arrays. Without a token expect 401.

## Step 3: Browser check
Set `session_token` cookie (httpOnly, secure, sameSite=None) for the preview domain, load `/admin`,
expect the operations board instead of the Google sign-in panel.

## Success indicators
- `/api/auth/me` returns user data with `user_id`
- `/admin` renders dashboard, no redirect
- Enquiries/tickets list loads

## Cleanup
```
mongosh --eval "use('app'); db.users.deleteMany({email: /test\.user\./}); db.user_sessions.deleteMany({session_token: /test_session/});"
```
