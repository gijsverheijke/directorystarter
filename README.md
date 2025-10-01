# Directory Starter

A modern, production-ready Next.js 15 starter template for building directory and catalog websites. Built with TypeScript, Tailwind CSS, and Supabase, this template provides everything you need to launch a fully-featured directory site.

## Features

✨ **Core Functionality**
- 🏠 Dynamic directory listings with search, filtering, and categorization
- 📝 User submission system with authentication
- 🎨 Category and tag-based organization
- 📱 Fully responsive design with dark mode support
- 🔍 Full-text search with SEO optimization
- 📰 MDX-based blog system

🛠️ **Technical Stack**
- **Framework**: Next.js 15 with App Router and Turbopack
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS v4 with CSS variables
- **Database**: Supabase with Row Level Security
- **UI Components**: Radix UI with shadcn/ui
- **Authentication**: Supabase Auth (magic link only)
- **Content**: MDX support for blog posts

🚀 **Production Ready**
- SEO optimized with dynamic sitemap and robots.txt
- Server-side rendering for optimal performance
- Type-safe database queries
- Comprehensive RLS policies for data security

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Supabase account ([sign up free](https://supabase.com))
- Git installed

### Installation

1. **Clone or fork this repository**
   ```bash
   git clone https://github.com/yourusername/directorystarter.git
   cd directorystarter
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Copy the example environment file:
   ```bash
   cp env.example .env.local
   ```

   Update `.env.local` with your values:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
   NEXT_PUBLIC_SUPABASE_SECRET_KEY=your-secret-key
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. **Set up Supabase**

   a. Create a new project in [Supabase](https://app.supabase.com)

   b. Run the database schema:
   - Navigate to SQL Editor in your Supabase dashboard
   - Copy the contents of `schema.sql`
   - Execute the SQL to create tables, indexes, and RLS policies

   c. Configure authentication:
   - Go to Authentication → Providers
   - Enable Email provider
   - Configure magic link settings (disable password auth if desired)

   d. Get your API keys:
   - Go to Project Settings → API
   - Copy your project URL and keys to `.env.local`

5. **Customize your directory**

   Edit `lib/keycopy.ts` to set your site's identity:
   ```typescript
   export const title = 'Your Directory Name';
   export const h2 = 'Your directory tagline';
   export const metaDescription = 'Your SEO description';
   ```

6. **Update the database table name**

   In `utils/supabase/queries.ts`, change `TABLE_NAME` to match your directory:
   ```typescript
   export const TABLE_NAME = 'your_directory_name'
   ```

   Then update `schema.sql` to use your table name instead of `test_directory`.

7. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to see your directory.

## Project Structure

```
directorystarter/
├── app/                    # Next.js App Router pages
│   ├── blog/              # MDX blog posts (one folder per post)
│   ├── categories/        # Category listing pages
│   ├── dashboard/         # User dashboard
│   ├── listings/          # Individual listing pages
│   ├── search/            # Search page
│   ├── submit/            # Submission and edit pages
│   ├── tags/              # Tag listing pages
│   └── sitemap.ts         # Dynamic sitemap generation
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── listings/         # Listing-related components
│   ├── search/           # Search components
│   └── submit/           # Submission form components
├── lib/                  # Utilities and shared logic
│   ├── keycopy.ts        # Site identity and copy
│   └── utils.ts          # Utility functions
├── utils/supabase/       # Supabase client and queries
│   ├── actions.ts        # Server actions
│   ├── client.ts         # Client-side Supabase
│   ├── server.ts         # Server-side Supabase
│   └── queries.ts        # Database queries
├── types/                # TypeScript type definitions
├── docs/                 # Documentation
├── public/               # Static assets
├── schema.sql            # Database schema
└── env.example           # Environment variables template
```

## Customization Guide

### Changing Your Directory's Focus

This template is designed to be easily adapted for any type of directory. Here's how to customize it:

1. **Update site identity** in `lib/keycopy.ts`
2. **Modify the database table name** in `utils/supabase/queries.ts` and `schema.sql`
3. **Customize categories**: Update your Supabase table with relevant categories for your niche
4. **Adjust styling**: Edit `app/globals.css` to match your brand colors
5. **Modify form fields**: Edit `components/submit/SubmitForm.tsx` if you need different fields

### Adding Blog Posts

The blog uses a simple MDX-based system:

1. Create a new folder in `app/blog/` (e.g., `app/blog/my-post-slug/`)
2. Add a `page.mdx` file inside
3. Write your content in Markdown
4. Deploy - the post is automatically added to the sitemap

No frontmatter or complex configuration needed!

### FAQ Section

Edit `lib/faq.md` to customize your FAQ section. The content is rendered automatically in the FAQ component.

## Database Schema

The core listing table includes:

- **id**: UUID primary key
- **title**: Listing title (becomes page title and meta title)
- **blurb**: Short description (becomes meta description)
- **slug**: URL-friendly identifier (immutable after creation)
- **description**: Full description
- **external_url**: Link to the resource
- **logo_url**: Optional logo image
- **category**: Primary category
- **tags**: Array of tags (JSONB)
- **status**: `pending`, `approved`, or `rejected`
- **is_featured**: Boolean for featured listings
- **user_id**: Owner's UUID (for edit permissions)
- **created_at**, **updated_at**: Timestamps

See `schema.sql` for the complete schema including indexes and RLS policies.

## Development Commands

```bash
npm run dev     # Start development server with Turbopack
npm run build   # Build for production
npm start       # Start production server
npm run lint    # Run ESLint
```

## Authentication Flow

This template uses Supabase Auth with magic links only:

1. Users enter their email on `/submit`
2. Receive a magic link via email
3. Click link to authenticate
4. Submit their listing
5. Access `/dashboard` to manage submissions

Listings start as `pending` and require admin approval to become `approved` and visible publicly.

## Row Level Security (RLS)

The database uses RLS policies to secure data:

- **Public read**: Anyone can view approved listings
- **Authenticated insert**: Logged-in users can submit listings
- **Owner edit**: Users can only edit their own listings
- **Owner view**: Users can view their own pending listings

## Deployment

### Vercel (Recommended)

1. Push your repository to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add environment variables from `.env.local`
4. Update `NEXT_PUBLIC_SITE_URL` to your production domain
5. Deploy

### Other Platforms

This is a standard Next.js 15 application and can be deployed to any platform supporting Node.js 18+:

- Netlify
- Cloudflare Pages
- Railway
- Render
- Self-hosted with `npm run build && npm start`

Don't forget to set environment variables on your hosting platform!

## SEO Optimization

This template includes:

- ✅ Dynamic sitemap at `/sitemap.xml`
- ✅ Robots.txt configuration
- ✅ Server-side rendering for all pages
- ✅ Proper meta tags and Open Graph support
- ✅ Full-text search indexes
- ⚠️ Update `public/robots.txt` with your production URL
- ⚠️ Add your logo as `/public/og-image.png` for social sharing

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see [LICENSE.md](LICENSE.md) for details.

## Support

- 📖 Check the `/docs` folder for detailed documentation
- 🐛 Report issues on GitHub
- 💬 Ask questions in GitHub Discussions

## Acknowledgments

Built with:
- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)

---

Made with ❤️ for the directory builder community
