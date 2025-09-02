# Monkey Business Directory starter
The idea is that this is one core setup that I can clone to build several directories

## Specs
- Landing page
- Resusable set of directory components
- Search
- MDX based blog
- Supabase setup
- Auth setup for adding a listing, and then being able to edit and delete it
- Admin role who can edit and delete all listings
- Full stack utilities to add, update, and delete entries

## Site URL structure
/categories/[category-title]
/listings/[listing-title]
/blog/




## Data structure

Listing
- id
- created_at
- updated_at
- title -> also becomes url slug and metatitle
- blurb -> becomes meta description
- slug
- description
- external_url
- logo_url
- category
- tags {JSON}
- status
- is_featured

### Slug Implementation Plan

Approach: Separate slug column in the database

#### Key Implementation Details:

**Slug Generation**
Auto-generate slug from product title during creation
Store in dedicated slug column (independent from title column)
Slug remains unchanged when title is updated

**User Experience**
Display real-time slug preview during product creation
Show full URL format: yoursite.com/products/{slug}
This allows users to catch and correct typos before submission

**Edit Permissions**
Slug is immutable after creation for regular users
Only admins can modify slugs post-creation (for critical fixes)

#### Rationale:
Maintains URL stability when titles are updated
Prevents broken links and SEO issues
Minimal complexity while providing flexibility for edge cases
Visual preview reduces typo-related issues at source

#### Technical Benefits:
Clean separation of display (title) and URL (slug) concerns
No complex time-based rules or redirect management needed
Simple, predictable behavior for users and developers

## Main components
- Header
- Footer
- Hero
- Listing card
- Listing page
- Submit button
- Subscribe newsletter button
- Blog

## Landing page
- Header
- Hero
- Search
- Listings
- Subscribe
- Submit

## Listing page
- Header
- Hero with logo and title
- Category
- Tags
- Description



## Blog