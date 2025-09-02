# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

Assume the user has the dev server running. You should not have to start it. 

- `npm run dev`: Start development server with Turbopack (Next.js 15+)
- `npm run build`: Build production version with Turbopack
- `npm start`: Start production server
- `npm run lint`: Run ESLint for code linting

You should not need to run npm dev or npm start. Always run lint after making changes.

## Project Architecture

This is a Next.js 15 directory/catalog application using the App Router with server-side rendering for SEO optimization. The project follows these key patterns:

### Core Technologies
- **Next.js 15** with App Router and Turbopack
- **TypeScript** with strict mode enabled
- **Tailwind CSS v4** with CSS variables for theming
- **Supabase** for database (uses 'publishable'/'secret' keys, not ANON/Service Role)
- **Radix UI** components with shadcn/ui styling
- **MDX** support for content pages (configured in next.config.ts)
- **next-themes** for dark mode support

### Directory Structure
- `app/` - Next.js App Router pages and layouts
- `components/` - Reusable UI components (shadcn/ui based)
- `lib/` - Utilities and shared logic
- `types/` - TypeScript type definitions
- `docs/` - Documentation content

### Key Architecture Patterns

@README.md

**Component Architecture**: 
- Uses shadcn/ui components with Radix UI primitives
- Components follow the `cn()` utility pattern from `lib/utils.ts` for className merging
- All components use Tailwind CSS variables defined in globals.css

## Development Guidelines (from .cursor/rules)

**Design System**:
- Only use colors and styles defined in globals.css
- Keep JSX minimal - styling should come from global CSS
- Use spacing of 1, 2, or multiples of 5 only

**Data & Rendering**:
- SEO is critical - render everything server-side when possible
- Leverage Next.js App Router for SSR/SSG

**Development Principles**:
- DRY maximalist approach - extract repeated code into functions after 2+ occurrences  
- Always implement the simplest solution (KISS, YAGNI)
- Additional shadcn components and Motion Primitives can be installed as needed

## Path Aliases
- `@/*` maps to project root for imports

## Environment
- Uses `.env.local` for environment variables
- Supabase configuration should use publishable/secret key pattern

## MDX Configuration
- MDX files supported in pages via @next/mdx
- Custom MDX components configured in `mdx-components.tsx`