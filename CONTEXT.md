# Portfolio

This context describes the public portfolio site and its authored content.

## Language

**Article**:
An authored long-form piece published on the portfolio under `/blog`.
_Avoid_: Post, entry

**Slug**:
The URL-safe identifier derived from an article markdown filename.
_Avoid_: ID

**Article Source**:
The MDX file that contains an article's metadata and body.
_Avoid_: Markdown file

**Static Article**:
An article generated from an Article Source at build time.
_Avoid_: Runtime article, CMS article

**Article Metadata**:
The frontmatter fields that describe how an article appears in listings, SEO, and publication history.
_Avoid_: Post metadata

**Mermaid Diagram**:
A diagram embedded in an Article Source through an explicit MDX component.
_Avoid_: Mermaid code fence

**Article Asset**:
A public image or media file associated with one article slug.
_Avoid_: Content image

**Blog Index**:
The public listing page for all non-draft articles.
_Avoid_: Posts page

**Draft Article**:
An article source intentionally excluded from public blog pages.
_Avoid_: Hidden post

**Document Layout**:
The portfolio's minimal text-first presentation style used for pages and articles.
_Avoid_: Card-heavy layout, publication UI

**Article Validation**:
The build-time checks that keep every article source complete and consistently dated.
_Avoid_: Lenient content parsing

## Relationships

- An **Article** has exactly one **Slug**
- An **Article** is authored in exactly one **Article Source**
- An **Article Source** begins with **Article Metadata**
- An **Article Source** may include zero or more **Mermaid Diagrams**
- An **Article Asset** belongs to exactly one **Slug** under `public/blog/[slug]`
- The **Blog Index** is linked from the site footer
- The **Blog Index** excludes **Draft Articles**
- The **Blog Index** and each **Article** use the **Document Layout**
- **Article Validation** applies to every **Article Source**, including drafts
- A **Static Article** is regenerated when the site is rebuilt
- A **Slug** maps an **Article** to `/blog/[slug]`

## Example dialogue

> **Dev:** "Should the article ID come from frontmatter?"
> **Domain expert:** "No — the **Slug** comes from the markdown filename and becomes `/blog/[slug]`."
> **Dev:** "Are these plain Markdown files?"
> **Domain expert:** "No — an **Article Source** is MDX so articles can grow into richer components."
> **Dev:** "Can editors publish articles without a deploy?"
> **Domain expert:** "No — a **Static Article** is published by committing its **Article Source** and rebuilding the site."
> **Dev:** "Which fields are required in **Article Metadata**?"
> **Domain expert:** "Title, publication date, summary, and keywords are required; update date, cover image, and draft status are optional."
> **Dev:** "Can I write Mermaid as fenced markdown?"
> **Domain expert:** "No — a **Mermaid Diagram** is embedded with an explicit MDX component so rendering stays predictable."
> **Dev:** "Where should article images live?"
> **Domain expert:** "An **Article Asset** lives under `public/blog/[slug]` and is referenced with an absolute `/blog/[slug]/...` path."
> **Dev:** "Should the homepage promote articles?"
> **Domain expert:** "No — the **Blog Index** is linked from the footer only."
> **Dev:** "How should articles be ordered?"
> **Domain expert:** "The **Blog Index** shows non-draft articles newest first by publication date."
> **Dev:** "Should articles use a magazine-style UI?"
> **Domain expert:** "No — articles use the same **Document Layout** as the rest of the portfolio."
> **Dev:** "Can invalid article metadata be ignored during builds?"
> **Domain expert:** "No — **Article Validation** fails the build when required metadata is missing or dates are invalid."
> **Dev:** "Should the first example article be visible?"
> **Domain expert:** "No — the first example is a **Draft Article** template for authoring and verification."

## Flagged ambiguities

- "id" was used for the dynamic route, but the resolved domain term is **Slug** because it is human-readable and filename-derived.
