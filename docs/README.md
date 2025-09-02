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

/tags/[tag]

/blog/

/search

## Blog
The blog runs on MDX with a very simple setup that does not require frontmatter and frontmatter related plugins. 
- Simply create a new route for each blogpost and put a new page.mdx file inside
- Write normal markdown in the file
- When pushed to main, the post will be up, that simple

This means that blog posts are very easy to automate now -- it only requires writing markdown files.

## Key attributes and copywriting
In the /lib folder there are faq.md and a keycopy.ts file
- Just write markdown in the faq file, and the FAQ will be rendered in the Faq.tsx component
- Changing the directory title and h2 in the keycopy.ts file will change that on the homepage AND ALSO in the metadata

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

