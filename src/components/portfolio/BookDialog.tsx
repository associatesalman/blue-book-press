"use client";

import Image from "next/image";
import { ArrowUpRight, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { useLenis } from "@/components/common/Providers";
import type { PortfolioBook } from "@/data/portfolio";
import { cn } from "@/lib/cn";

/**
 * "View on Amazon" for books with a configured product URL. Without one it
 * renders a disabled, non-link state — no Amazon URL is ever guessed.
 */
export function AmazonButton({
  book,
  tone = "light",
  className,
}: {
  book: Pick<PortfolioBook, "title" | "author" | "amazon">;
  tone?: "light" | "dark";
  className?: string;
}) {
  if (!book.amazon) {
    return (
      <span
        aria-disabled="true"
        className={cn(
          "inline-flex min-h-12 cursor-not-allowed items-center gap-2 rounded-full border px-6 text-[0.98rem] font-semibold",
          tone === "light" ? "border-ink/15 text-ink/45" : "border-white/25 text-white/50",
          className,
        )}
      >
        Amazon link coming soon
      </span>
    );
  }
  return (
    <a
      href={book.amazon}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View ${book.title} on Amazon (opens in a new tab)`}
      className={cn(
        "group inline-flex min-h-12 items-center gap-2 rounded-full px-6 text-[0.98rem] font-semibold transition-colors duration-300",
        tone === "light" ? "bg-ink text-white hover:bg-brand" : "bg-white text-ink hover:bg-brand hover:text-white",
        className,
      )}
    >
      View on Amazon
      <ArrowUpRight aria-hidden className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </a>
  );
}

/**
 * Book detail dialog. Uses the native <dialog> element, so focus is trapped,
 * Escape closes it and the page behind is inert. Smooth scrolling pauses
 * while it is open.
 */
export function BookDialog({ book, onClose }: { book: PortfolioBook | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (book && !dialog.open) {
      dialog.showModal();
      lenis?.stop();
    } else if (!book && dialog.open) dialog.close();
  }, [book, lenis]);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const onDialogClose = () => {
      lenis?.start();
      onClose();
    };
    dialog.addEventListener("close", onDialogClose);
    return () => dialog.removeEventListener("close", onDialogClose);
  }, [lenis, onClose]);

  return (
    <dialog
      ref={ref}
      aria-labelledby="book-dialog-title"
      onClick={(e) => e.target === e.currentTarget && ref.current?.close()}
      className="book-dialog m-auto w-[min(56rem,calc(100vw-2rem))] max-h-[calc(100svh-2rem)] overflow-y-auto rounded-[4px] bg-white p-0 text-ink backdrop:bg-ink/70 backdrop:backdrop-blur-sm"
      data-lenis-prevent
    >
      {book && (
        <div className="grid gap-8 p-6 sm:grid-cols-[minmax(0,17rem)_1fr] sm:p-9">
          <div className="relative mx-auto aspect-[2/3] w-full max-w-[15rem] overflow-hidden rounded-[3px] shadow-[0_30px_50px_-24px_rgba(0,0,0,0.55)] sm:max-w-none">
            <Image src={book.cover} alt={`${book.title} by ${book.author}, book cover`} fill sizes="(min-width: 640px) 17rem, 15rem" className="object-cover" />
            <span aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-[7%] bg-gradient-to-r from-black/25 via-white/10 to-transparent" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-start justify-between gap-4">
              <p className="eyebrow pt-2 text-[0.75rem] text-brand">{book.genre}</p>
              <button
                type="button"
                onClick={() => ref.current?.close()}
                aria-label="Close"
                className="-mr-2 -mt-1 flex size-11 shrink-0 items-center justify-center rounded-full border border-line transition-colors hover:border-ink hover:bg-ink hover:text-white"
              >
                <X aria-hidden className="size-5" />
              </button>
            </div>
            <h2 id="book-dialog-title" className="mt-3 text-[clamp(1.9rem,3.4vw,2.6rem)] leading-[1.08] tracking-[-0.02em]">
              {book.title}
            </h2>
            <p className="mt-2 text-[1.05rem] text-ink-muted">by {book.author}</p>
            <p className="mt-6 text-[1.06rem] leading-relaxed text-ink-soft">{book.description}</p>

            <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-5 text-[0.95rem]">
              <div>
                <dt className="eyebrow text-[0.7rem] text-ink-muted">Shelf</dt>
                <dd className="mt-1 font-semibold">{book.shelf}</dd>
              </div>
              {book.format && (
                <div>
                  <dt className="eyebrow text-[0.7rem] text-ink-muted">Format</dt>
                  <dd className="mt-1 font-semibold">{book.format}</dd>
                </div>
              )}
              {book.release && (
                <div className="col-span-2">
                  <dt className="eyebrow text-[0.7rem] text-ink-muted">{book.status ?? "Release"}</dt>
                  <dd className="mt-1 font-semibold">{book.release}</dd>
                </div>
              )}
              {book.credential && (
                <div className="col-span-2">
                  <dt className="eyebrow text-[0.7rem] text-ink-muted">On the cover</dt>
                  <dd className="mt-1 font-semibold">{book.credential}</dd>
                </div>
              )}
            </dl>

            <div className="mt-auto pt-8">
              <AmazonButton book={book} />
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
