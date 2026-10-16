# Site Plan — Modern Classic Publishing House

Status: **Phase 1 complete, plus The Press, Publishing Pathways and its 8 solo service pages.** All other routes still render placeholders.

## 1. Project setup findings

| Item | Finding |
| --- | --- |
| This folder | Empty — no framework, no git, no package.json yet |
| Reference project | `../blue book press/` (previous futuristic/3D build) |
| Framework (reference) | Next.js **16.4.0** App Router, React 19, TypeScript (strict), `@/*` → `src/*` |
| Styling (reference) | Tailwind CSS v4 via `@tailwindcss/postcss`, tokens in `@theme` in `src/styles/globals.css` |
| Package manager | **npm** (reference uses `package-lock.json`; npm 11.11 / Node 24.14 available) |
| Conventions to keep | `src/app` routes · `src/data/*.ts` typed content · `src/layout` (Header/Footer/Menu) · `src/sections` page sections · `src/components/ui` primitives · `src/lib` (`cn`, `fonts`) · `src/hooks` |
| Next 16 notes | `params` is a `Promise` in pages; use `generateStaticParams` for service/case-study/article slugs. Read `node_modules/next/dist/docs/` before coding (per reference `AGENTS.md`). |

## 2. Brand direction (summary)

Modern classic publishing house: calm, warm, literary, trustworthy, easy for older authors to read and use.

- **3D appears in exactly two places:** the homepage **hero** (`components/three/HeroBooks.tsx`) and the **Bookshelf** section (`components/bookshelf/ShelfCanvas.tsx`). Everything else stays 2D. Both share `components/three/BookModel.tsx` and the model registry `data/models.ts`. The models are web-optimised copies in `/public/3d` (about 0.85 MB in total, down from 5.2 MB).
- Real photography: books, libraries, writing desks, paper, hands with manuscripts.
- Motion is smooth and professional: fade-up and slide reveals, staggered lists, soft hover lifts, and site-wide Lenis smooth scrolling. Lenis is gentle, keeps native scrolling on touch screens, and is off for reduced-motion visitors. There is no pinning, scrubbing, or preloader.

- **Scrolling:** smooth scrolling comes only from Lenis. Do **not** add CSS `scroll-behavior: smooth`: Next.js 16 scrolls new pages into place with `scrollIntoView`, and CSS smoothing makes navigation land mid-page.
- **Cursor:** a desktop-only trailing cursor (`components/common/CustomCursor.tsx`, styles in `animations.css`): a white circle with a dotted brand-blue ring. It only runs with a fine pointer, keeps the native cursor visible, and switches to a white ring on blue and black sections.
- **Service page loader:** `components/common/ServicePageLoader.tsx` (cloud intro) is mounted from `template.tsx` in `app/publishing-pathways`, `app/author-services` and `app/marketing-visibility`. It plays on each category hub and on every solo service page beneath it, and never on general pages. Heroes read `useServicePageReady()` to start their entrance.
- **Platform icons:** `react-icons` (only the imported icons are bundled). Simple Icons provides Apple, Google Play, Rakuten Kobo and Audible; Font Awesome provides Amazon. Barnes & Noble and Kindle have no icon, so they use a neutral book or tablet icon with a text label.
- **Storyteller covers:** `/public/storytellers/*.webp` are used only in The Press "Built for Storytellers" section. They are copied from the independent-publisher portfolio covers.

### Color system (Phase 1, replaces the earlier ivory/navy/brass proposal)

Mostly white, black ink and **one** brand blue. The blue is defined once as `--brand-blue` in `src/styles/variables.css` and used through the Tailwind `brand` color. Lighter tints use opacity (`bg-brand/10`), never a second blue.

| Token | Value | Use |
| --- | --- | --- |
| `--brand-blue` / `brand` | `#1f4fe0` | the only blue: buttons, accents, the 4 blue sections |
| `paper` | `#ffffff` | main background |
| `mist` | `#f5f5f3` | occasional alternate section |
| `line` | `#e5e5e2` | rules and borders |
| `ink` | `#0d0d0d` | text, black accents, footer |
| `ink-soft` / `ink-muted` | `#3b3b3b` / `#63635f` | secondary text |

Blue sections on the homepage are Publishing Pathways, Marketing & Visibility, Why Choose Us, and the Final CTA. They use white text with black accents.

### Typography

- Headings: **Newsreader** (serif, 500–600 weight; it worked in the reference build). Alternative: **Lora**.
- Body: **Source Sans 3**, warmer than Inter and very legible.
- Base size **18px** (1.125rem), line-height 1.7, nothing under 16px. Fluid heading scale, but less extreme than the reference (max ~4.5rem).

### Accessibility for older audiences

Tap targets of 48px or more. Visible focus rings. Body text links are underlined. The desktop nav is always visible (no hamburger-only menu). The phone number and "Start Your Book" stay in the header. Every animation respects `prefers-reduced-motion`. Contrast meets WCAG AA throughout.

## 3. Main navigation (8 items)

```
Home
The Press                       /the-press   (single link; Our Story, Why Choose Us,
                                Journey and Success Path are linked from that page and the footer)
Publishing Pathways ▾ (mega)    /publishing-pathways
    — 8 publishing & format services —
Author Services ▾ (mega)        /author-services
    Editing · Design & Formatting · Book Setup · Book Copy
Marketing & Visibility ▾ (mega) /marketing-visibility
    — 7 marketing services —
Bookshelf ▾                     /bookshelf
    Featured Authors            /bookshelf/featured-authors
    Case Studies                /bookshelf/case-studies
Author Resources ▾              /author-resources
    Articles & Guides           /author-resources
    FAQs                        /faqs
[ Start Your Book ] (button) ▾  /start-your-book
    Book a Consultation         /book-consultation
    Get a Publishing Quote      /get-a-quote
```

Footer repeats all groups plus Privacy and Terms.

## 4. Services (27 solo pages, 3 categories)

### Publishing Pathways — `/publishing-pathways/[slug]` (8)

| # | Service | Slug |
| --- | --- | --- |
| 1 | Book Publishing | `book-publishing` |
| 2 | Self-Publishing Support | `self-publishing-support` |
| 3 | Amazon KDP Publishing | `amazon-kdp-publishing` |
| 4 | Global Book Distribution | `global-book-distribution` |
| 5 | eBook Publishing | `ebook-publishing` |
| 6 | Paperback Publishing | `paperback-publishing` |
| 7 | Hardcover Publishing | `hardcover-publishing` |
| 8 | Audiobook Production | `audiobook-production` |

### Author Services — `/author-services/[slug]` (12)

| Group | # | Service | Slug |
| --- | --- | --- | --- |
| Editing | 9 | Editing & Proofreading | `editing-proofreading` |
| | 10 | Developmental Editing | `developmental-editing` |
| | 11 | Line Editing | `line-editing` |
| | 12 | Copy Editing | `copy-editing` |
| Design & Formatting | 13 | Book Formatting | `book-formatting` |
| | 14 | Interior Layout Design | `interior-layout-design` |
| | 15 | Cover Design | `cover-design` |
| Book Setup | 16 | ISBN Setup | `isbn-setup` |
| | 17 | Metadata Optimization | `metadata-optimization` |
| | 18 | BISAC & Keyword Research | `bisac-keyword-research` |
| Book Copy | 19 | Book Description Writing | `book-description-writing` |
| | 20 | Author Bio Writing | `author-bio-writing` |

### Marketing & Visibility — `/marketing-visibility/[slug]` (7)

| # | Service | Slug |
| --- | --- | --- |
| 21 | Book Marketing | `book-marketing` |
| 22 | Amazon Ads | `amazon-ads` |
| 23 | A+ Content Design | `a-plus-content-design` |
| 24 | Social Media Promotion | `social-media-promotion` |
| 25 | Press Release | `press-release` |
| 26 | Author Website Design | `author-website-design` |
| 27 | Book Trailer & Visual Promo | `book-trailer` |

> A+ Content moved from Author Services to Marketing because it is Amazon product-page merchandising. The page list's single "ISBN & Metadata Setup" page is split into the three Book Setup pages from the service list. Book Marketing is both a service page and the Marketing hub's lead service.

## 5. Full page inventory (44 routes)

| # | Page | Route | Template |
| --- | --- | --- | --- |
| 1 | Home | `/` | unique |
| 2 | The Press | `/the-press` | unique: **built** (9 sections; content in `data/thePress.ts`, sections in `components/press/`) |
| 3 | Our Story | `/the-press/our-story` | editorial |
| 4 | Why Choose Us | `/the-press/why-choose-us` | editorial |
| 5 | Your Publishing Journey | `/your-publishing-journey` | process |
| 6 | Author Success Path | `/your-publishing-journey/author-success-path` | process |
| 7 | Publishing Pathways (hub) | `/publishing-pathways` | category hub: **built** (cloud intro + 12 sections; content in `data/publishingPathways.ts`, sections in `components/pathways/`; images in `/public/publishing-pathways`) |
| 8 | Author Services (hub) | `/author-services` | category hub |
| 9 | Marketing & Visibility (hub) | `/marketing-visibility` | category hub |
| 10–36 | 27 service pages | `/<category>/[slug]` | **ServicePageTemplate** (black, exactly 5 sections; content in `data/servicePages.ts`). Built: all 8 Publishing Pathways pages. |
| 37 | Bookshelf | `/bookshelf` | showcase |
| 38 | Featured Authors | `/bookshelf/featured-authors` | showcase |
| 39 | Case Studies | `/bookshelf/case-studies` (+ `[slug]` detail) | showcase |
| 40 | Author Resources | `/author-resources` (+ `[slug]` article) | blog |
| 41 | FAQs | `/faqs` | unique |
| 42 | Start Your Book (contact) | `/start-your-book` | form |
| 43 | Book Consultation | `/book-consultation` | form |
| 44 | Get a Publishing Quote | `/get-a-quote` | form (multi-step) |

Utility routes, not counted: `/privacy`, `/terms`, `not-found`, `api/contact`.

Because of the templates, there are only **about 12 distinct layouts** to design. Most of the 44 pages come from data.

## 6. Homepage flow

1. **Hero**: full-bleed writing-desk/library photo with a warm overlay, serif headline, one-line promise, two buttons (Start Your Book · Explore Pathways), and a trust line (platform logos).
2. **Trust introduction**: short welcome paragraph plus 3–4 stats (books published, years, countries, rating).
3. **Publishing Pathways overview**: 3 large cards (Publishing · Author Services · Marketing) linking to the hubs.
4. **Storytelling brand section**: split image/text on memoirs, family histories, fiction, and children's books.
5. **Services overview**: grid of 8–9 featured services with a "View all 27 services" link.
6. **Your Publishing Journey**: 5–6 numbered steps on a horizontal rule (vertical on mobile).
7. **Featured Bookshelf**: row of real cover images (flat, no 3D) linking to Bookshelf.
8. **Author support section**: "a real person guides you" message with a dedicated-manager photo and phone/email.
9. **Testimonials and credibility**: large-type quotes from authors (with age and genre for relatability) and platform logos.
10. **Final consultation CTA**: paper-texture band with a "Book a free consultation" form link and phone number.

## 7. Service page template (shared by all 27)

Hero (title, summary, image, CTA) → Who it's for → What's included → How it works (steps) → Formats/deliverables → Related bookshelf samples → FAQs (accordion) → Related services → Consultation CTA.

All content comes from `src/data/services.ts`:

```ts
type ServiceCategory = "publishing-pathways" | "author-services" | "marketing-visibility";
type Service = {
  slug: string; category: ServiceCategory; group?: string;
  title: string; navLabel: string; summary: string; heroImage: string;
  forWho: string[]; includes: { title: string; text: string }[];
  steps: { title: string; text: string }[]; deliverables: string[];
  faqs: { q: string; a: string }[]; related: string[]; // slugs
};
```

## 8. Source structure (scaffolded)

Next.js App Router provides the routing, so the generic React tree maps onto it like this:

| Generic tree | This project |
| --- | --- |
| `pages/*.jsx` + `routes/AppRoutes.jsx` | `src/app/**/page.tsx` (file-based routing; no `react-router-dom`) |
| `pages/ServicePage.jsx` | `src/app/<category>/[slug]/page.tsx` → shared `components/services/*` |
| `pages/BlogPage.jsx` | `src/app/author-resources/[slug]/page.tsx` |
| `.jsx` / `.js` | `.tsx` / `.ts` (strict TypeScript, matching the reference build) |
| `styles/variables.css` etc. | Same files, imported by `globals.css`; tokens live in Tailwind `@theme` |

```
src/
  app/                                ← routes (all exist now, rendering PagePlaceholder)
    layout.tsx  page.tsx  not-found.tsx
    the-press/  our-story/  why-choose-us/
    your-publishing-journey/  author-success-path/
    publishing-pathways/  [slug]/      ← 8 service pages
    author-services/      [slug]/      ← 12 service pages
    marketing-visibility/ [slug]/      ← 7 service pages
    bookshelf/  featured-authors/  case-studies/[slug]/
    author-resources/[slug]/  faqs/
    start-your-book/  book-consultation/  get-a-quote/  privacy/  terms/
  assets/{images,icons}/              ← statically imported images/SVGs (blur placeholders)
  components/
    layout/    TopBar  Header  MegaMenu  MobileMenu  Footer            (Phase 1)
    common/    Button  SectionHeader  ServiceCard  CTASection  PageHero
               Breadcrumb  Reveal  Container  Accordion           (Phase 1)
               PagePlaceholder                                     ✔ temporary
    home/      Hero  TrustIntro  PublishingPathways  StorySection  ServicesOverview
               JourneyPreview  BookshelfPreview  AuthorSupport  Testimonials  FinalCTA
    services/  ServiceHero  ServiceOverview  ServiceBenefits  ServiceProcess
               ServiceFAQ  RelatedServices                         (Phase 2)
    bookshelf/ BookCard  PortfolioGrid  CaseStudyCard              (Phase 4)
  data/                                                            ✔ all created
    site  categories  services (27)  navigation  pages (route registry)
    journey  books  authors  caseStudies  articles  faqs  testimonials
  lib/       cn  fonts  metadata                                   ✔
  styles/    globals  variables  typography  animations           ✔
public/images/{hero,services,bookshelf,authors,textures}/          ✔ empty, awaiting real photos
```

Content rules: `testimonials`, `books`, `authors`, `caseStudies`, `articles` and `faqs` are typed but **empty**. Only add real, approved content to them; never placeholder quotes presented as genuine.

## 9. Packages (installed)

**Dependencies:** `next` 16.4, `react`/`react-dom` 19.3, `framer-motion` 14 (soft reveals), `lucide-react` (line icons), `clsx` (class merging)
**Dev:** `typescript`, `@types/*`, `tailwindcss` 4, `@tailwindcss/postcss`, `postcss`

**Deferred until the phase that needs them:**
- `zod`: Phase 5 forms
- `@tailwindcss/typography`: Phase 4 articles and legal pages
- `swiper`: only if Bookshelf or testimonial sliders need swipe and loop. Try CSS scroll-snap plus framer-motion first.

**Added for the two 3D areas (hero and Bookshelf):** `three`, `@react-three/fiber`, `@react-three/drei`, `@types/three`. They are loaded with `next/dynamic` only when that section nears the viewport, so they are not part of the initial page load.

**Smooth scroll:** `lenis` (about 10 KB), started in `components/common/Providers.tsx`.

**Icons:** `lucide-react` for UI icons; `react-icons` for platform and brand marks only.

**Not used:** `react-router-dom` (Next.js routes by file), `aos` (framer-motion covers it), GSAP.

Fonts load through `next/font/google`, so no extra package is needed.

## 10. Open questions

1. **Brand name**: keep "Blue Book Press" or use a new name? `site.ts` can hold a placeholder for now.
2. **Imagery**: are there licensed photos to use (book, library, desk), or should I source royalty-free images (Unsplash/Pexels) as placeholders?
3. **Bookshelf content**: should real covers and case studies come from the reference project's `public/portfolio`?
4. **Forms**: should submissions go to email (a provider such as Resend or SMTP) or to a CRM?
5. **Contact details**: phone number and email for the header and footer.

## 11. Proposed build phases

1. **Phase 1**: scaffold the project, design tokens, fonts, UI primitives, Header/MegaMenu/Footer, and the full Homepage.
2. **Phase 2**: services data (27 entries), category hubs, and the ServicePage template.
3. **Phase 3**: The Press, Our Story, Why Choose Us, Journey, and Success Path.
4. **Phase 4**: Bookshelf, Featured Authors, Case Studies, Resources/articles, and FAQs.
5. **Phase 5**: contact, consultation, and quote forms with the API route; SEO metadata, sitemap, JSON-LD; accessibility and performance pass.
