/** Featured authors (Bookshelf → Featured Authors). */
export type Author = {
  slug: string;
  name: string;
  bio: string;
  photo?: string;
  /** Book slugs. */
  books: string[];
};

export const authors: Author[] = [];
