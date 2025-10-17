import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { blogPosts } from "../data/blogPosts";

export const Blog = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <main className="pt-32 pb-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            <span className="text-primary">Blog</span>
          </h1>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Deep dives into the technical decisions, trade-offs, and lessons from each project showcased on my portfolio.
          </p>

          <div className="space-y-8">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="bg-card border border-border/40 rounded-3xl p-8 shadow-xs"
              >
                <header className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  <div className="text-left md:max-w-2xl">
                    <h2 className="text-2xl font-semibold text-primary tracking-tight text-left">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground mt-2 text-sm md:text-base leading-relaxed text-left">
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground md:text-right shrink-0">
                    <p className="font-medium text-foreground/80">{post.publishedAt}</p>
                    <p>{post.readTime}</p>
                  </div>
                </header>

                <div className="flex flex-wrap gap-2 mt-6">
                  {post.tags.map((tag) => (
                    <span
                      key={`${post.id}-${tag}`}
                      className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full tracking-wide uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <div className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                    Read article
                  </div>
                  <Link
                    to={`/blog/${post.id}`}
                    className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-border/40 text-foreground/80 hover:text-primary hover:border-primary/60 transition-colors duration-300"
                    aria-label={`Open ${post.title}`}
                  >
                    <ChevronRight size={20} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
