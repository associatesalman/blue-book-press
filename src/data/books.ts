import type { ModelId } from "./models";

/** Shelf used to filter the homepage collage. */
export type BookShelf = "Romance" | "Dark Romance" | "Fiction & Suspense" | "Self-Help" | "Children's & Faith";

/** Published books shown on the Bookshelf and homepage previews. */
export type Book = {
  slug: string;
  title: string;
  author: string;
  genre: string;
  shelf: BookShelf;
  /** Public path to the front-cover image (2:3). */
  cover: string;
  featured?: boolean;
};

const cover = (file: string) => `/portfolio/books-web/${file}`;

/** Portfolio titles (covers in /public/portfolio/books-web, 600×900). */
export const books: Book[] = [
  {
    slug: "emotional-intelligence-for-anxiety",
    title: "Emotional Intelligence for Anxiety",
    author: "Somer Zappe",
    genre: "Self-Help",
    shelf: "Self-Help",
    cover: cover("emotional-intelligence-for-anxiety.jpg"),
    featured: true,
  },
  {
    slug: "the-insanity-criterion",
    title: "The Insanity Criterion",
    author: "Raymond Finkle",
    genre: "Thriller",
    shelf: "Fiction & Suspense",
    cover: cover("the-insanity-criterion.jpg"),
    featured: true,
  },
  {
    slug: "graves",
    title: "Graves",
    author: "Katelyn Taylor",
    genre: "Gothic Fiction",
    shelf: "Fiction & Suspense",
    cover: cover("graves.jpg"),
    featured: true,
  },
  {
    slug: "life-after-phantom",
    title: "Life After Phantom",
    author: "Samantha",
    genre: "Gothic Romance",
    shelf: "Romance",
    cover: cover("life-after-phantom.jpg"),
    featured: true,
  },
  {
    slug: "seeing-sound",
    title: "Seeing Sound",
    author: "Albany Walker",
    genre: "Fiction · Series",
    shelf: "Fiction & Suspense",
    cover: cover("seeing-sound.jpg"),
    featured: true,
  },
  {
    slug: "catalyst",
    title: "Catalyst",
    author: "Nicole Fanning",
    genre: "Dark Romance · Series",
    shelf: "Dark Romance",
    cover: cover("catalyst.jpg"),
    featured: true,
  },
  {
    slug: "a-baptism-book-for-girls",
    title: "A Baptism Book for Girls",
    author: "Kingdom Press",
    genre: "Children's · Faith",
    shelf: "Children's & Faith",
    cover: cover("a-baptism-book-for-girls.jpg"),
  },
  {
    slug: "a-christmas-dare",
    title: "A Christmas Dare",
    author: "Heather Miekstyn",
    genre: "Holiday Romance",
    shelf: "Romance",
    cover: cover("a-christmas-dare.jpg"),
  },
  {
    slug: "chaotic",
    title: "Chaotic",
    author: "Shantel Tessier",
    genre: "Dark Romance",
    shelf: "Dark Romance",
    cover: cover("chaotic.jpg"),
  },
  {
    slug: "his-darkest-craving",
    title: "His Darkest Craving",
    author: "Tiffany Roberts",
    genre: "Fantasy Romance",
    shelf: "Romance",
    cover: cover("his-darkest-craving.jpg"),
  },
  {
    slug: "a-tempting-arrangement",
    title: "A Tempting Arrangement",
    author: "J. Wilder",
    genre: "Romance",
    shelf: "Romance",
    cover: cover("a-tempting-arrangement.jpg"),
  },
  {
    slug: "touching-oblivion",
    title: "Touching Oblivion",
    author: "Albany Walker",
    genre: "Fiction · Series",
    shelf: "Fiction & Suspense",
    cover: cover("touching-oblivion.jpg"),
  },
  {
    slug: "mind-to-bend",
    title: "Mind to Bend",
    author: "Aurelia Knight",
    genre: "Dark Romance · Series",
    shelf: "Dark Romance",
    cover: cover("mind-to-bend.jpg"),
  },
  {
    slug: "priest",
    title: "Priest",
    author: "Cathleen Cole & Frank Jensen",
    genre: "MC Romance",
    shelf: "Romance",
    cover: cover("priest.jpg"),
  },
  {
    slug: "little-dove",
    title: "Little Dove",
    author: "Layla Frost",
    genre: "Romance",
    shelf: "Romance",
    cover: cover("little-dove.jpg"),
  },
  {
    slug: "sabotage",
    title: "Sabotage",
    author: "Shantel Tessier",
    genre: "Dark Romance",
    shelf: "Dark Romance",
    cover: cover("sabotage.jpg"),
  },
  {
    slug: "the-rage-of-angels",
    title: "The Rage of Angels",
    author: "Elizabeth N. Harris",
    genre: "MC Romance · Series",
    shelf: "Romance",
    cover: cover("the-rage-of-angels.jpg"),
  },
  {
    slug: "make-me",
    title: "Make Me",
    author: "Summer O'Toole",
    genre: "Dark Romance",
    shelf: "Dark Romance",
    cover: cover("make-me.jpg"),
  },
  {
    slug: "little-bird",
    title: "Little Bird",
    author: "Ria Wilde",
    genre: "Dark Romance · Duet",
    shelf: "Dark Romance",
    cover: cover("little-bird.jpg"),
  },
  {
    slug: "f-ck-you",
    title: "F*ck You",
    author: "Crystal North & Jaye Pratt",
    genre: "Dark Romance · Series",
    shelf: "Dark Romance",
    cover: cover("f-ck-you.jpg"),
  },
  {
    slug: "stolen",
    title: "Stolen",
    author: "J.M. Johnson",
    genre: "MC Romance",
    shelf: "Romance",
    cover: cover("stolen.jpg"),
  },
  {
    slug: "ruining-him",
    title: "Ruining Him",
    author: "S. Wilson",
    genre: "Dark College Romance",
    shelf: "Dark Romance",
    cover: cover("ruining-him.jpg"),
  },
  {
    slug: "playing-with-fire",
    title: "Playing with Fire",
    author: "Ria Wilde",
    genre: "Dark Romance",
    shelf: "Dark Romance",
    cover: cover("playing-with-fire.jpg"),
  },
  {
    slug: "wicked-heart",
    title: "Wicked Heart",
    author: "Ria Wilde",
    genre: "Dark Romance · Series",
    shelf: "Dark Romance",
    cover: cover("wicked-heart.jpg"),
  },
];

export const getFeaturedBooks = () => books.filter((b) => b.featured);

// ── 3D showcase (homepage Bookshelf section) ──────────────────────────────

export type ShelfCategory = "Best Selling" | "Upcoming" | "New Releases" | "Featured Titles";

export type ShelfBook = {
  model: ModelId;
  title: string;
  author: string;
  category: ShelfCategory;
  /** One line shown under the category label. */
  note: string;
};

export const shelfBooks: ShelfBook[] = [
  {
    model: "darkestCraving",
    title: "His Darkest Craving",
    author: "Tiffany Roberts",
    category: "Best Selling",
    note: "Reader favourites, reprinted and reordered.",
  },
  {
    model: "mindToBend",
    title: "Mind to Bend",
    author: "Aurelia Knight",
    category: "Featured Titles",
    note: "Hand-picked by our editorial team.",
  },
  {
    model: "loserLuna",
    title: "Loser Luna",
    author: "S. F. Heart",
    category: "New Releases",
    note: "Freshly published and on shelves now.",
  },
  {
    model: "kingpinsBaby",
    title: "Kingpin's Baby",
    author: "Evie Rose",
    category: "Upcoming",
    note: "In production and coming soon.",
  },
];
