### Submit Page Plan (`app/submit/page.tsx`)

- **Goal**: Server-rendered submission form for new listings, following DRY and design rules in `rules.mdc`.
- **Auth**: Enforced by middleware; this page assumes an authenticated session (no route-level redirects).
- **Insert behavior**: Server action inserts with `status='pending'`, `is_featured=false`, and `user_id` from session. Slug is generated on the server from title and de-duped.

### Data model reference

Existing interface:

```1:16:types/listing.ts
export interface Listing {
  id?: string
  created_at?: string
  updated_at?: string
  title: string
  blurb: string
  slug: string
  description: string
  external_url: string
  logo_url: string
  category: string
  tags: string[]
  status?: 'pending' | 'approved' | 'rejected'
  is_featured: boolean
  user_id?: string | null
}
```

DB columns (subset):

```1:17:schema.sql
CREATE TABLE IF NOT EXISTS public.test_directory (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    title VARCHAR(255) NOT NULL,
    blurb TEXT NOT NULL,
    slug VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    external_url VARCHAR(500) NOT NULL,
    logo_url VARCHAR(500),
    category VARCHAR(100) NOT NULL,
    tags JSONB DEFAULT '[]'::jsonb,
    status VARCHAR(20) DEFAULT 'approved'::character varying,
    is_featured BOOLEAN DEFAULT false,
    user_id UUID
);
```

### Form fields (user input)

- **title**: required text, max 255.
- **blurb**: required textarea, short summary.
- **description**: required textarea, long form.
- **external_url**: required URL, must be valid, prefer `https`. Max 500.
- **logo_url**: optional URL, image link. Max 500.
- **category**: required select. Options loaded server-side via `getCategories()`. Allow fallback free-text only if no options exist.
- **tags**: optional, comma-separated input. Server normalizes to `string[]` (trim, lowercase, dedupe). Reasonable limit (e.g., max 10 tags; each 2–30 chars).

### Server-managed fields (not editable by user)

- **slug**: derived from title on server; ensure uniqueness (append `-2`, `-3`, or short hash on conflict).
- **status**: set to `pending` on insert.
- **is_featured**: force to `false` on insert.
- **user_id**: set from current session user.
- **created_at / updated_at**: DB defaults / trigger.

### Validation (server-first, mirrored client-side only if needed)

- **Title**: required, length ≤ 255.
- **Blurb/Description**: required; minimal length checks (e.g., blurb ≥ 10, description ≥ 30).
- **URLs**: syntactic validation; coerce to `https` when possible; reject invalid.
- **Category**: must be from loaded list (or non-empty if we temporarily allow free-text).
- **Tags**: split by comma, trim, lowercase, remove empties, dedupe, enforce limits.
- **Slug**: generated, check uniqueness against `test_directory.slug` unique constraint.

### UX and components (respect `globals.css` and minimal JSX)

- **Layout**: server component; use existing UI components: `components/ui/input`, `components/ui/select`, and a textarea element styled via global classes. Use spacing only of 1, 2, or multiples of 5 (`gap-5`, `space-y-5`, `mt-5`).
- **Submit control**: reuse `components/action-buttons/SubmitButton.tsx` for pending state.
- **Errors**: inline error text under fields; summary at top (aria-live). No custom inline styles; rely on global classes.

### SSR, auth, and submission flow

- **SSR**: Render entire page on the server. Load categories via `getCategories()` on the server.
- **Server Action**: `createListing(formData)` (in `app/submit/actions.ts`):
  - Parse and validate fields.
  - Normalize `tags` into `string[]`.
  - Generate `slug` and de-dupe.
  - Set `status='pending'`, `is_featured=false`, `user_id=session.user.id` (read via Supabase server client; middleware guarantees presence).
  - Insert via Supabase using server client (RLS enforced).
  - On success: redirect to a confirmation page (e.g., `/submit?success=1`) or listing detail route if public; show toast via `sonner` if applicable.
  - On failure: re-render with field errors and a top-level error.

### DRY utilities to add (reusable)

- Place pure submit helpers in `app/submit/submitutils.ts`:
  - **`generateSlug(title: string): string`**: normalize title to URL-safe slug.
  - **`normalizeTags(input: string): string[]`**: split/trim/lowercase/dedupe/limit.
  - **`isValidUrl(url: string): boolean`**: lightweight URL validation; prefer https.
- Centralize DB-related helpers in `utils/supabase/actions.ts`:
  - **`ensureUniqueSlug(baseSlug: string): Promise<string>`**: check slug conflicts via Supabase and return a unique slug.
  - **`submitListing(...)`**: already present; keep insert logic here.

### Accessibility

- Associate `label` with `id` for each input.
- Provide `aria-invalid` and `aria-describedby` for errors.
- Announce submission errors in an `aria-live` region.

### SEO

- Server-rendered page and categories.
- Add `generateMetadata` for canonical, title, and description.
- Consider `robots: { index: false }` for the submit page to avoid indexing a utility page.

### Out of scope (YAGNI for now)

- File uploads for logo; we accept URL only.
- Rate limiting and captcha.
- Rich text editor for description.


