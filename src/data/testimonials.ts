/**
 * Author testimonials. Only add real, approved quotes — never placeholders
 * presented as genuine.
 */
export type Testimonial = {
  quote: string;
  name: string;
  /** e.g. "Memoir author, Ohio" */
  role: string;
  bookTitle?: string;
  image?: string;
};

export const testimonials: Testimonial[] = [];
