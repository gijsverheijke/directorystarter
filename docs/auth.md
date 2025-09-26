# Authentication Specification

## Authentication Method
- **Magic Links Only**: No passwords, no social logins
- Single `/login` page handles both login and signup automatically
- Uses Supabase `signInWithOtp()` with `shouldCreateUser: true`
- Magic links expire after 1 hour, rate-limited to once per 60 seconds

## User Flow

### Submit Flow
1. User clicks "Submit" button → `/submit` (protected route)
2. Middleware redirects unauthenticated users → `/login`
3. User enters email → receives magic link via `signInWithOtp()`
4. User clicks magic link → verified via `/auth/confirm` → redirected back to original destination
5. User fills form → submits listing

### Edit Flow
1. User goes to `/dashboard` → sees their listings
2. User clicks "Edit" → `/submit/[id]` (protected route)
3. Form pre-populated with existing data
4. User updates and saves

### Alternative Edit Access
- User views their own listing at `/listings/[slug]`
- "Edit" button visible only to listing owner
- Leads to `/submit/[id]`

## Magic Link Implementation
Based on [Supabase Magic Link docs](https://supabase.com/docs/guides/auth/auth-email-passwordless#with-magic-link):

### Login Action (`/app/login/actions.ts`)
```typescript
await supabase.auth.signInWithOtp({
  email,
  options: {
    shouldCreateUser: true, // Auto-signup new users
    emailRedirectTo: `${SITE_URL}/auth/confirm`,
  },
})
```

### Verification Route (`/app/auth/confirm/route.ts`)
- Handles magic link clicks
- Verifies `token_hash` and `type` from URL params
- Redirects to original destination or `/`

### Benefits
- **No separate signup flow needed** - users are automatically registered
- **Improved security** - no password storage or reset flows
- **Better UX** - single email input, automatic account creation

## Route Protection Strategy
- **Protected routes via middleware**: `/submit`, `/dashboard` (includes all sub-routes)
- **Public routes**: `/`, `/listings/*`, `/categories/*`, `/tags/*`, `/blog/*`, `/search`
- **Auth routes**: `/login`, `/auth/*`, `/error`

## Technical Implementation
- Middleware checks auth status using `supabase.auth.getUser()`
- Protected routes redirect to `/login` if unauthenticated
- Magic link verification happens server-side in `/auth/confirm`
- Session management handled automatically by Supabase SSR package
