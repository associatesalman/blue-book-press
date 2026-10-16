import { redirect } from "next/navigation";
import { pages } from "@/data/pages";

/** The Bookshelf landing page became the Portfolio (also redirected in next.config). */
export default function Page() {
  redirect(pages.portfolio.path);
}
