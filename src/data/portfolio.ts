import { books, type Book, type BookShelf } from "./books";
import { pages } from "./pages";
import { getService, serviceHref } from "./services";

/**
 * Portfolio page content. Every cover lives in /public/portfolio/books-web
 * (600×900, 2:3) — 24 published titles plus 2 upcoming ones whose covers come
 * from the existing 3D book models in /public/3d.
 *
 * Descriptions are drawn from each book's own cover copy, series line and
 * genre — never invented plot claims or sales figures. Add `amazon` (a full
 * product URL) to show a "View on Amazon" button, and `format` once
 * confirmed with the author. Nothing links to Amazon until a real URL is set.
 */

export type PortfolioBook = Book & {
  description: string;
  /** Edition / format, e.g. "Paperback · eBook". Shown only when set. */
  format?: string;
  /** Direct Amazon product URL. No Amazon link is shown without one. */
  amazon?: string;
  /** Wording printed on the cover itself (e.g. an author credential). */
  credential?: string;
  /** Upcoming titles only: production status and release information. */
  status?: string;
  release?: string;
};

const descriptions: Record<string, Pick<PortfolioBook, "description" | "credential">> = {
  "emotional-intelligence-for-anxiety": {
    description:
      "A practical guide to managing emotions, easing stress and quieting overthinking — without suppressing what you feel.",
  },
  "the-insanity-criterion": {
    description: "A thriller that places a parent and child inside a rifle scope, so the threat is the first thing a reader sees.",
  },
  graves: {
    description: "Gothic fiction behind a wrought-iron cemetery gate, set in stark monochrome so the atmosphere arrives before page one.",
  },
  "life-after-phantom": {
    description: "A gothic romance in the theatrical tradition, framed by ornate borders and candlelit portraiture.",
  },
  "seeing-sound": {
    description: "Book One of the Tasting Madness series — ornate florals and a hanging key open a dark, lyrical world.",
  },
  catalyst: {
    description: "The Heart of the Inferno series opens against a red-lit skyline, its title torn through the centre of the cover.",
  },
  "a-baptism-book-for-girls": {
    description: "Christian faith-building stories, prayers and activities for girls aged 8 to 10, illustrated in warm, bright colour.",
  },
  "a-christmas-dare": {
    description: "A holiday romance with a hand-lettered title and an illustrated winter scene — light, warm and seasonal.",
  },
  chaotic: {
    description: "A dark romance from Shantel Tessier, its blackletter title cutting across a hooded, tattooed portrait.",
    credential: "New York Times & USA Today bestselling author",
  },
  "his-darkest-craving": {
    description: "The Cursed Ones, Book One — a fantasy romance of horns, magic and moonlight from Tiffany Roberts.",
  },
  "a-tempting-arrangement": {
    description: "A romance built around a black-card proposal; roses, a diamond ring and gold type set an expensive tone.",
    credential: "USA Today bestselling author",
  },
  "touching-oblivion": {
    description: "Book Two of Tasting Madness carries the series frame forward in warmer gold, so the pair reads as a set.",
  },
  "mind-to-bend": {
    description: "Stolen Obsessions, Book One. “How far can he bend her before she breaks?” — a dark romance in ink and violet.",
  },
  priest: {
    description: "A motorcycle-club romance co-written by Cathleen Cole and Frank Jensen, with the club patch at the heart of the cover.",
  },
  "little-dove": {
    description: "A romance from Layla Frost — sharp tailoring, a playing-card motif and a script title balance danger with elegance.",
    credential: "USA Today bestselling author",
  },
  sabotage: {
    description: "Shattered glass, a crimson wash and a signature script title introduce Shantel Tessier’s dark romance.",
    credential: "USA Today & Wall Street Journal bestselling author",
  },
  "the-rage-of-angels": {
    description: "Book Ten of the Rage MC series — storm-lit and biker-bold, designed to sit in line with the volumes before it.",
  },
  "make-me": {
    description: "The Fox Family Crime Syndicate: “Every kingdom needs a queen.” A mafia romance in black, gold and bullet brass.",
  },
  "little-bird": {
    description: "Book One of the Twisted City Duet — a red-washed portrait and hand-script title in Ria Wilde’s signature style.",
  },
  "f-ck-you": {
    description: "Knox Academy, Term One — a dark academy romance from Crystal North and Jaye Pratt, set in black and gold.",
  },
  stolen: {
    description: "A Devil’s Disciples novel; a skull, a spiderweb and a bloodied blade signal the motorcycle-club world inside.",
  },
  "ruining-him": {
    description: "A dark college romance framed by cathedral windows, red roses and a serpent coiled around the title.",
  },
  "playing-with-fire": {
    description: "Ria Wilde’s dark romance in smoke and ember, with lettering that seems to burn through the cover.",
  },
  "wicked-heart": {
    description: "A Wreck & Ruin novel — a close-cropped portrait, crown motif and gold serif carry the series’ theme of obsession.",
  },
};


const published: PortfolioBook[] = books.map((b) => ({ ...b, ...descriptions[b.slug] }));

// ── Upcoming releases ───────────────────────────────────────────────────

export const upcomingBooks: PortfolioBook[] = [
  {
    slug: "kingpins-baby",
    title: "Kingpin’s Baby",
    author: "Evie Rose",
    genre: "Mafia Romance · Novella",
    shelf: "Romance",
    cover: "/portfolio/books-web/kingpins-baby.jpg",
    format: "Novella",
    description: "“A sweet & spicy mafia romance novella.” Red roses, a skull and two wedding rings set its terms.",
    status: "In production",
    release: "Release date to be announced",
  },
  {
    slug: "loser-luna",
    title: "Loser Luna",
    author: "S. F. Heart",
    genre: "Romance",
    shelf: "Romance",
    cover: "/portfolio/books-web/loser-luna.jpg",
    description: "Deep forest green, gilded script and four claw marks through the foliage — a romance with something wild underneath.",
    status: "New release",
    release: "Release details to be announced",
  },
];

/** Every unique book in the portfolio (26): published titles, then upcoming. */
export const portfolioBooks: PortfolioBook[] = [...published, ...upcomingBooks];

const bySlug = (slug: string) => portfolioBooks.find((b) => b.slug === slug)!;

// ── Collection filters ──────────────────────────────────────────────────

export type ShelfFilter = "All" | BookShelf | "Upcoming";

export const shelves: { id: BookShelf; label: string; note: string }[] = [
  { id: "Dark Romance", label: "Dark Romance", note: "Mafia, academy and obsession stories, packaged for a reader who knows the genre." },
  { id: "Romance", label: "Romance", note: "Fantasy, gothic, holiday and motorcycle-club romance — each with its own visual promise." },
  { id: "Fiction & Suspense", label: "Fiction & Suspense", note: "Thrillers, gothic fiction and a matched two-book series." },
  { id: "Self-Help", label: "Self-Help", note: "Practical nonfiction designed to be clear at a glance." },
  { id: "Children's & Faith", label: "Children’s & Faith", note: "Illustrated faith-building stories and activities for young readers." },
];

export const filters: { id: ShelfFilter; label: string }[] = [
  { id: "All", label: "All Books" },
  ...shelves.map((s) => ({ id: s.id as ShelfFilter, label: s.label })),
  { id: "Upcoming", label: "Upcoming" },
];

export const booksFor = (f: ShelfFilter) =>
  f === "All" ? portfolioBooks : f === "Upcoming" ? upcomingBooks : published.filter((b) => b.shelf === f);

// ── Best Selling slider ─────────────────────────────────────────────────

export const bestSelling: PortfolioBook[] = [
  "his-darkest-craving",
  "chaotic",
  "sabotage",
  "a-tempting-arrangement",
  "little-dove",
  "mind-to-bend",
  "graves",
  "life-after-phantom",
].map(bySlug);

// ── Project stories: how books moved through the press ──────────────────

export type ProjectStory = {
  id: string;
  label: string;
  title: string;
  author: string;
  books: PortfolioBook[];
  story: string;
  /** Only the services that apply to this project, in the order they happened. */
  steps: { service: string; note: string }[];
  outcome: string;
};

export const projectStories: ProjectStory[] = [
  {
    id: "emotional-intelligence",
    label: "Nonfiction",
    title: "A self-help book that states its promise",
    author: "Somer Zappe",
    books: ["emotional-intelligence-for-anxiety"].map(bySlug),
    story: "Practical nonfiction is often chosen from a search results page, where the cover is the size of a postage stamp.",
    steps: [
      { service: "Editorial refinement", note: "Each chapter shaped around one practical question." },
      { service: "Cover design", note: "Type-led: the subject in bold black, the emotion in coral, a lotus mark for calm." },
      { service: "Interior formatting", note: "Clear headings and generous spacing for a book readers return to." },
      { service: "Distribution", note: "Print and eBook editions prepared for major retailers." },
    ],
    outcome: "A cover that reads clearly from thumbnail to shelf, with a subtitle that says exactly what the book delivers.",
  },
  {
    id: "tasting-madness",
    label: "Series design",
    title: "A series system built to carry every volume",
    author: "Albany Walker",
    books: ["seeing-sound", "touching-oblivion"].map(bySlug),
    story: "Tasting Madness is a multi-book series. A reader who finds Book Two should know at once where to start.",
    steps: [
      { service: "Cover design", note: "One ornamental frame, one hanging key and one serif title lockup across the series." },
      { service: "Series identity", note: "Only the tone shifts — cool silver for Book One, warm gold for Book Two." },
      { service: "Publishing preparation", note: "Series name and reading order set consistently in each book’s metadata." },
    ],
    outcome: "A ready template for future volumes: new books slot into the series with no redesign.",
  },
  {
    id: "ria-wilde",
    label: "Author brand",
    title: "One author, three covers, one recognisable name",
    author: "Ria Wilde",
    books: ["little-bird", "playing-with-fire", "wicked-heart"].map(bySlug),
    story: "Ria Wilde writes across more than one series. Each needed its own mood without splitting the author’s shelf presence.",
    steps: [
      { service: "Cover design", note: "Each series keeps its own palette: red script, ember smoke, gold serif." },
      { service: "Author branding", note: "A fixed wordmark — the wide-spaced RIA WILDE — at the foot of every cover." },
      { service: "Marketing & visibility", note: "A consistent look that carries from the cover into author promotion." },
    ],
    outcome: "The author’s name is identifiable at thumbnail size, and a new series can join the shelf without redesigning the brand.",
  },
];

// ── Marquee ─────────────────────────────────────────────────────────────

export const marqueeWords = [
  "Dark Romance",
  "Gothic Fiction",
  "Thrillers",
  "Fantasy Romance",
  "Self-Help",
  "Children’s & Faith",
  "Series Design",
  "Author Brands",
];

// ── Publishing craft ────────────────────────────────────────────────────

const svc = (category: "publishing-pathways" | "author-services" | "marketing-visibility", slug: string) => {
  const s = getService(category, slug);
  return s ? serviceHref(s) : pages[category].path;
};

export const crafts = [
  {
    title: "Editorial development",
    text: "Structure, pacing and line-level polish, so the manuscript is as strong as the cover that will carry it.",
    seen: "Behind every title in the collection",
    href: svc("author-services", "developmental-editing"),
  },
  {
    title: "Cover design",
    text: "Genre-literate covers that make a promise a reader understands in seconds — from mafia romance to faith-based activity books.",
    seen: "Make Me · Graves · A Baptism Book for Girls",
    href: svc("author-services", "cover-design"),
  },
  {
    title: "Interior layout",
    text: "Typeset pages, chapter openers and print-ready files for paperback, hardcover and eBook editions.",
    seen: "Emotional Intelligence for Anxiety",
    href: svc("author-services", "interior-layout-design"),
  },
  {
    title: "Publishing preparation",
    text: "ISBNs, metadata, categories and series ordering handled before launch, so each book is set up correctly from day one.",
    seen: "Tasting Madness · Rage MC",
    href: svc("publishing-pathways", "book-publishing"),
  },
  {
    title: "Distribution",
    text: "Print and digital editions placed with major retailers and libraries, with the author keeping full ownership.",
    seen: "Across the full portfolio",
    href: svc("publishing-pathways", "global-book-distribution"),
  },
  {
    title: "Marketing & visibility",
    text: "Book descriptions, author branding and campaigns that help the right readers find the book after launch.",
    seen: "Ria Wilde · Shantel Tessier",
    href: svc("marketing-visibility", "book-marketing"),
  },
];
