import { ArticlePreviewCard } from "@/app/components/article-preview-card";
import type { RelatedArticle } from "@/lib/articles";

export function RelatedArticles({ articles }: { articles: RelatedArticle[] }) {
  if (articles.length === 0) {
    return <aside className="hidden" aria-hidden="true" />;
  }

  return (
    <aside className="article-layout-sidebar w-full max-w-none justify-self-stretch overflow-x-hidden overflow-y-auto">
      <nav aria-label="Related articles">
        <p className="mb-5 px-4 font-mono text-[11px] uppercase tracking-[0.18em] text-faint min-[1400px]:px-5 min-[1536px]:px-6 min-[1800px]:px-8">
          Related
        </p>
        <ul className="space-y-1">
          {articles.map((article) => (
            <li key={article.slug}>
              <ArticlePreviewCard
                slug={article.slug}
                title={article.metadata.title}
                summary={article.metadata.summary}
                keywords={article.sharedKeywords}
                innerClassName="min-[1400px]:px-5 min-[1536px]:px-6 min-[1800px]:px-8"
              />
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
