export type ArticleHeading = {
  id: string;
  title: string;
  depth: 2 | 3;
};

export function slugifyHeading(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/`([^`]+)`/g, "$1")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function getArticleHeadings(content: string): ArticleHeading[] {
  const headings: ArticleHeading[] = [];
  let insideCodeBlock = false;

  for (const line of content.split("\n")) {
    if (line.startsWith("```")) {
      insideCodeBlock = !insideCodeBlock;
      continue;
    }

    if (insideCodeBlock) {
      continue;
    }

    const match = /^(##|###)\s+(.+)$/.exec(line);

    if (!match) {
      continue;
    }

    const title = match[2].trim();
    const id = slugifyHeading(title);

    if (id) {
      headings.push({
        id,
        title,
        depth: match[1].length as 2 | 3,
      });
    }
  }

  return headings;
}
