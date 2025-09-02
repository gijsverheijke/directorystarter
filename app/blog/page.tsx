import path from 'path'
import { promises as fsPromises } from 'fs'
import Breadcrumbs from '@/components/Breadcrumbs'

interface BlogPost {
  slug: string
  title: string
  date: string
}

async function getBlogPosts(): Promise<BlogPost[]> {
  const blogDir = path.join(process.cwd(), 'app/blog')
  const directories = await fsPromises.readdir(blogDir, { withFileTypes: true })
  
  const posts: BlogPost[] = []
  
  for (const dir of directories) {
    if (dir.isDirectory() && !dir.name.startsWith('.')) {
      try {
        const mdxPath = path.join(blogDir, dir.name, 'page.mdx')
        const fileContents = await fsPromises.readFile(mdxPath, 'utf8')
        
        // Get first line that starts with # for title
        const titleMatch = fileContents.match(/^#\s*(.+)$/m)
        const title = titleMatch ? titleMatch[1].trim() : dir.name

        // Get first italicized text for date
        const dateMatch = fileContents.match(/\*([^*]+)\*/)
        const date = dateMatch ? dateMatch[1].trim() : 'Unknown date'
        
        posts.push({
          slug: dir.name,
          title,
          date,
        })
      } catch (error) {
        console.error(`Error processing ${dir.name}:`, error)
      }
    }
  }
  
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export const metadata = {
  title: 'Blog - Directory Starter',
  description: 'Read our latest insights, updates, and guides about tools and services in our directory.',
}

export default async function BlogPage() {
  const posts = await getBlogPosts()
  
  return (
    <div className="container-spacing">
      <div className="section-spacing">
        <Breadcrumbs breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Blog', href: '/blog' }
        ]} />
      </div>
      <div className="section-spacing">
        <h1 className="text-4xl font-bold element-spacing">Blog</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {posts.map((post) => (
            <a 
              key={post.slug} 
              href={`/blog/${post.slug}`}
              className="block border border-border rounded-lg p-5 hover:border-primary hover:bg-muted/50 transition-all duration-200 group cursor-pointer"
            >
              <article className="cursor-pointer">
                <h2 className="text-xl font-semibold element-spacing group-hover:text-primary transition-colors cursor-pointer">
                  {post.title}
                </h2>
                <time className="text-sm text-muted-foreground cursor-pointer">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </article>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
