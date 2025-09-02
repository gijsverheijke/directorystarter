// Changing key values here like the title and description changes them throughout the site and meta-tags
// The idea is that there is no need to edit many pages or search through JSX to change key copywriting

export const title = 'Awesome Directory';

export const h2 = 'This is a directory of super useful tools and resources';

export const rights = `© ${new Date().getFullYear()} Directory Starter.`;

// SEO & Meta
export const metaDescription = 'Discover the best tools and resources in one curated directory';
export const keywords = ['directory', 'tools', 'resources', 'curated'];
export const ogImage = '/og-image.png';

// Site Identity
export const siteName = title;
export const tagline = h2;

// Social Links
export const socials = {
  twitter: 'https://twitter.com/yourdirectory',
  github: 'https://github.com/yourusername',
  linkedin: 'https://linkedin.com/company/yourdirectory' }