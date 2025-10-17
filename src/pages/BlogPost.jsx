import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { blogPosts } from "../data/blogPosts";

export const BlogPost = () => {
  const { postId } = useParams();
  const post = blogPosts.find((entry) => entry.id === postId);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [postId]);

  if (!post) {
    return (
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <Navbar />
        <main className="pt-32 pb-24 px-4">
          <div className="container mx-auto max-w-3xl text-center space-y-6">
            <h1 className="text-3xl md:text-4xl font-semibold">
              This article could not be found.
            </h1>
            <p className="text-muted-foreground">
              It might have been moved or removed. You can browse all posts from the blog index.
            </p>
            <Link
              to="/blog"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-border/40 text-sm font-medium text-foreground/80 hover:text-primary hover:border-primary/60 transition-colors duration-300"
            >
              <ArrowLeft size={16} />
              Back to blog
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <main className="pt-32 pb-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            <ArrowLeft size={16} />
            All posts
          </Link>

          <article className="bg-card border border-border/40 rounded-3xl p-8 md:p-12 shadow-xs mt-6">
            <header className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div className="text-left md:max-w-3xl">
                <h1 className="text-3xl md:text-4xl font-semibold text-primary tracking-tight text-left">
                  {post.title}
                </h1>
                <p className="text-muted-foreground mt-3 text-base md:text-lg leading-relaxed text-left">
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

            <div className="mt-10 space-y-10">
              {post.sections.map((section) => (
                <section key={`${post.id}-${section.heading}`} className="space-y-4">
                  <h2 className="text-xl font-semibold text-foreground/90">
                    {section.heading}
                  </h2>
                  {section.body.map((paragraph, index) => (
                    <p
                      key={`${post.id}-${section.heading}-${index}`}
                      className="text-base leading-relaxed text-muted-foreground"
                    >
                      {paragraph}
                    </p>
                  ))}
                </section>
              ))}
            </div>

            <div className="mt-10 pt-6 border-t border-border/40">
              <h3 className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                Key Takeaways
              </h3>
              <ul className="mt-4 space-y-2 text-base leading-relaxed text-muted-foreground list-disc list-inside">
                {post.takeaways.map((takeaway, index) => (
                  <li key={`${post.id}-takeaway-${index}`}>{takeaway}</li>
                ))}
              </ul>
            </div>
          </article>

          <div className="mt-10 flex justify-center">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border/40 text-sm font-medium text-foreground/80 hover:text-primary hover:border-primary/60 transition-colors duration-300"
            >
              <ArrowLeft size={16} />
              Back to all posts
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
