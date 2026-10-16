/**
 * Content for the eight Publishing Pathways solo service pages (blue
 * editorial template). Each page: centred hero → overview → what we handle →
 * why it matters → process → best fit → closing CTA. Copy is written per service.
 *
 * Photography: Unsplash (free licence), verified by ID.
 */

export type PageImage = { src: string; alt: string };

export type PathwayPage = {
  hero: {
    /** Opening statement for the overview; `highlight` is the phrase set in italic accent. */
    title: string;
    highlight: string;
    /** Centred hero purpose line (also the meta description). */
    subtitle: string;
  };
  meaning: {
    title: string;
    lead: string;
    paragraphs: string[];
    image: PageImage;
  };
  handles: {
    title: string;
    intro: string;
    items: { title: string; text: string }[];
    receive: string[];
  };
  matters: {
    title: string;
    intro: string;
    points: { title: string; text: string }[];
    image: PageImage;
    note?: string;
  };
  process: {
    title: string;
    intro: string;
    steps: { title: string; text: string }[];
  };
  fit: {
    title: string;
    intro: string;
    authors: { who: string; why: string }[];
    /** Related Publishing Pathways slugs. */
    related: string[];
  };
  cta: { title: string; text: string };
};

const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=2000&q=80`;

export const pathwayPages: Record<string, PathwayPage> = {
  // ── Book Publishing ──────────────────────────────────────────────────────
  "book-publishing": {
    hero: {
      title: "Your book, published with one expert team behind it.",
      highlight: "one expert team",
      subtitle:
        "Complete, guided publishing — from manuscript preparation to launch day — coordinated by people who explain every step before it happens.",
    },
    meaning: {
      title: "What complete book publishing really means.",
      lead: "Book Publishing is our full-service pathway: we take a finished manuscript and manage everything required to turn it into a professional book that readers can buy.",
      paragraphs: [
        "Publishing a book well involves a surprising number of specialists — editors, cover designers, interior typesetters, metadata and platform experts. Most authors do not want to find, brief and manage each of them separately, and they should not have to.",
        "With this pathway a dedicated publishing manager coordinates the whole journey. Editing is scheduled before design, design before formatting, formatting before setup — so nothing has to be redone, and you always know what is happening and why.",
        "You stay the author and the decision-maker throughout. We bring the structure, the craft and the checklists; you approve each stage before the next one begins.",
      ],
      image: { src: unsplash("1488190211105-8b0e65b80b4e"), alt: "A publishing desk with notebook, tablet, laptop and coffee, planned from above" },
    },
    handles: {
      title: "Everything coordinated, from first read to live listing.",
      intro: "One team, one plan, one point of contact. These are the stages we manage on your behalf.",
      items: [
        { title: "Manuscript preparation", text: "An editorial assessment of your draft and the right level of editing — developmental, line or copy — booked in the right order." },
        { title: "Cover and interior design", text: "A genre-appropriate cover and a reader-friendly interior designed together, so the book feels like one considered object." },
        { title: "Print and eBook formatting", text: "Print-ready PDFs and reflowable eBook files built to each platform's exact specification and checked before upload." },
        { title: "ISBN, metadata and categories", text: "ISBNs assigned per edition, plus titles, descriptions, BISAC subjects and keywords prepared consistently across stores." },
        { title: "Platform setup and pricing", text: "Retailer and distribution accounts configured, with format-by-format pricing and royalties explained in plain language." },
        { title: "Launch readiness", text: "Proof copies reviewed, listings checked and a coordinated release date planned for every edition." },
      ],
      receive: ["Edited, approved manuscript", "Final cover files (front, spine, back, eBook)", "Print-ready interior PDF", "Kindle and EPUB files", "Live retailer listings", "A post-launch summary of every account and setting"],
    },
    matters: {
      title: "Why a coordinated publishing team matters.",
      intro: "A book is judged in seconds — by its cover, its first page and its listing. Coordination is what makes all three feel professional.",
      points: [
        { title: "No costly rework", text: "When editing, design and formatting happen in the right sequence, files are not rebuilt because a late change slipped through." },
        { title: "A consistent reader experience", text: "Cover, interior and description speak with one voice, so readers trust the book before they open it." },
        { title: "Found in the right places", text: "Accurate metadata and categories help stores show your book to readers who are already looking for it." },
        { title: "Time back for writing", text: "You make the creative decisions; we handle the specialists, the specifications and the deadlines." },
      ],
      image: { src: unsplash("1529148482759-b35b25c5f217"), alt: "A bright, modern white library with books on every level" },
    },
    process: {
      title: "How Book Publishing works.",
      intro: "Five guided stages, each approved by you before the next begins.",
      steps: [
        { title: "Consultation and plan", text: "We discuss your goals, genre, formats and timeline, then share a written publishing plan." },
        { title: "Editorial preparation", text: "Your manuscript receives the editing it needs, with tracked changes for you to review." },
        { title: "Design and formatting", text: "Cover and interior are designed, then formatted for print and digital editions." },
        { title: "Setup and proofing", text: "ISBNs, metadata, pricing and listings are prepared; you approve proofs and store pages." },
        { title: "Guided launch", text: "Editions go live in a planned order, and we hand over a clear record of everything set up." },
      ],
    },
    fit: {
      title: "Who Book Publishing is for.",
      intro: "This pathway suits authors who want a professional result without managing every specialist themselves.",
      authors: [
        { who: "First-time authors", why: "You have finished the manuscript and want experienced people to guide everything that comes next." },
        { who: "Busy professionals", why: "Your expertise belongs in the book; you would rather not learn publishing platforms to share it." },
        { who: "Memoir and family-history writers", why: "You want a beautiful, lasting edition handled with care — often in print and digital." },
        { who: "Authors who tried DIY", why: "You have seen how many details there are and want them done properly this time." },
      ],
      related: ["self-publishing-support", "paperback-publishing", "global-book-distribution"],
    },
    cta: {
      title: "Ready to publish with a team beside you?",
      text: "Tell us about your manuscript and your hopes for it. We will recommend a clear plan — editions, timeline and next steps — in plain language.",
    },
  },

  // ── Self-Publishing Support ─────────────────────────────────────────────
  "self-publishing-support": {
    hero: {
      title: "Self-publish on your terms, with professionals in your corner.",
      highlight: "on your terms",
      subtitle:
        "Keep your rights, your royalties and your accounts. We provide the expertise that helps you avoid the costly mistakes of going it alone.",
    },
    meaning: {
      title: "What Self-Publishing Support means.",
      lead: "Self-publishing means you are the publisher. Self-Publishing Support means you do not have to be the publisher alone.",
      paragraphs: [
        "When you self-publish, the book is released under your own name and accounts. You set the price, you receive the royalties directly, and you keep full ownership of every edition. That control is valuable — but it also means every technical decision lands on your desk.",
        "Our role is to sit beside you as an experienced publishing partner. We set up platforms with you, prepare and check your files, write and structure your metadata, and answer the questions that usually send authors searching forums late at night.",
        "You can lean on us for a single step or for the whole release. Either way, the book, the accounts and the income remain entirely yours.",
      ],
      image: { src: unsplash("1562564055-71e051d33c19"), alt: "Two people reviewing and signing documents at a table" },
    },
    handles: {
      title: "Professional help exactly where self-publishers need it.",
      intro: "We handle the technical and editorial details while you keep ownership and the final word.",
      items: [
        { title: "Platform and account setup", text: "KDP and other retailer and distribution accounts set up with you — tax, payment and author profile details in order." },
        { title: "Formatting and file checks", text: "Interior and cover files prepared or reviewed against each platform's specification before anything is uploaded." },
        { title: "Metadata and categories", text: "Title, subtitle, series, description, BISAC categories and keywords written and structured to help discovery." },
        { title: "Pricing and royalty guidance", text: "Format-by-format pricing options with the royalty impact of each choice explained clearly." },
        { title: "Launch guidance", text: "A practical launch checklist, release order and timing advice so editions go live smoothly." },
        { title: "Ongoing expert answers", text: "A real person to ask when a platform message, rejection or setting is unclear." },
      ],
      receive: ["Accounts set up in your name", "Platform-ready interior and cover files", "Complete metadata document", "Pricing and royalty summary", "Personal launch checklist"],
    },
    matters: {
      title: "Why expert support protects your independence.",
      intro: "Most self-publishing problems are invisible until a book is live: wrong categories, rejected files, low-quality interiors, missed royalties.",
      points: [
        { title: "Ownership stays with you", text: "Your name on the accounts, your rights in the work, your royalties paid directly — nothing is signed away." },
        { title: "Avoid DIY mistakes", text: "Trim sizes, bleed, spine width and file standards are checked before upload, not after a reader complains." },
        { title: "Better discoverability", text: "Thoughtful metadata and categories give your book a fair chance to be found among millions of titles." },
        { title: "Confidence to do it again", text: "You learn how your own setup works, so the next book is faster and easier." },
      ],
      image: { src: unsplash("1517842645767-c639042777db"), alt: "A notebook marked 'Notes' with a fountain pen and glasses" },
    },
    process: {
      title: "How Self-Publishing Support works.",
      intro: "A flexible sequence — use all of it, or only the steps you need.",
      steps: [
        { title: "Goals and gaps", text: "We review where your book stands and which parts of self-publishing you want help with." },
        { title: "Account setup", text: "Retailer and distribution accounts are created or reviewed together, in your name." },
        { title: "Files and metadata", text: "Interior, cover and metadata are prepared or checked to each platform's standards." },
        { title: "Upload and review", text: "We guide uploads, check previews and proofs, and resolve any platform questions." },
        { title: "Launch and handover", text: "Your book goes live and you receive a clear summary of every setting and account." },
      ],
    },
    fit: {
      title: "Who Self-Publishing Support is for.",
      intro: "For authors who want control and income to stay with them — with expert hands on the details.",
      authors: [
        { who: "Independent-minded authors", why: "You want to keep full ownership and royalties, and make every final decision yourself." },
        { who: "Previously self-published authors", why: "You want your next release — or a relaunch — set up more professionally than the last." },
        { who: "Series writers", why: "You plan several books and want a clean, repeatable setup you understand." },
        { who: "Authors on a focused budget", why: "You only need help with specific steps rather than a full-service package." },
      ],
      related: ["amazon-kdp-publishing", "ebook-publishing", "book-publishing"],
    },
    cta: {
      title: "Keep control. Gain a professional partner.",
      text: "Tell us which parts of self-publishing you want help with. We will suggest the right level of support — nothing more than you need.",
    },
  },

  // ── Amazon KDP Publishing ───────────────────────────────────────────────
  "amazon-kdp-publishing": {
    hero: {
      title: "Launch on Amazon with a listing built to be found.",
      highlight: "built to be found",
      subtitle:
        "Kindle eBook, paperback and hardcover editions set up properly on Kindle Direct Publishing — files, listing, categories, keywords and pricing.",
    },
    meaning: {
      title: "What Amazon KDP Publishing means.",
      lead: "Kindle Direct Publishing is Amazon's own publishing platform — the route by which most independent books reach Kindle readers and Amazon's print-on-demand customers.",
      paragraphs: [
        "KDP lets you publish a Kindle eBook, a paperback and, where eligible, a hardcover, all linked to a single Amazon product page. Readers see every format together, and your reviews are shared across them.",
        "Uploading a file is the easy part. What determines whether readers find your book is everything around it: the title and subtitle, the description, the categories it sits in, the seven keyword slots, the price and the series details.",
        "Our KDP pathway prepares all of it — files that pass review first time, and a listing that gives Amazon's search and category pages the information they need to show your book to the right readers.",
      ],
      image: { src: unsplash("1515378791036-0648a3ef77b2"), alt: "An author working on a laptop at a wooden desk" },
    },
    handles: {
      title: "Your KDP setup, done thoroughly.",
      intro: "From the first file upload to linked editions on a single product page.",
      items: [
        { title: "Kindle eBook preparation", text: "A reflowable Kindle file with linked contents and clean images, previewed on Kindle devices and apps." },
        { title: "Paperback and hardcover setup", text: "Trim size, paper, bleed and full-wrap cover prepared to KDP's print specifications for each edition offered." },
        { title: "Listing and description", text: "A compelling description formatted for Amazon, with title, subtitle, contributors and series details entered correctly." },
        { title: "Categories and keywords", text: "Researched categories and seven keyword phrases chosen from how real readers search in your genre." },
        { title: "Pricing and royalties", text: "eBook royalty options, print pricing against cost, and territory settings explained and configured." },
        { title: "Edition linking and review", text: "Formats linked to one product page and every listing checked once Amazon publishes it." },
      ],
      receive: ["KDP-ready Kindle file", "Print-ready interior and cover PDFs", "Optimised listing copy", "Category and keyword research", "Linked, live Amazon editions"],
    },
    matters: {
      title: "Why a careful KDP setup matters.",
      intro: "Amazon is where most readers start looking. A rushed setup can hide a good book; a careful one gives it every fair chance.",
      points: [
        { title: "Discoverability basics", text: "Accurate categories and well-chosen keywords help Amazon show your book in the searches and lists your readers browse." },
        { title: "A listing that converts", text: "A clear description, correct subtitle and series details turn a browsing reader into a buyer." },
        { title: "Files that pass review", text: "Correctly sized covers and interiors avoid rejection emails and launch-day delays." },
        { title: "Every format together", text: "Linked editions show readers their choice of Kindle, paperback or hardcover on one page." },
      ],
      image: { src: unsplash("1513475382585-d06e58bcb0e0"), alt: "A reader choosing a book from a shelf" },
    },
    process: {
      title: "How Amazon KDP Publishing works.",
      intro: "A focused sequence from manuscript files to a live Amazon product page.",
      steps: [
        { title: "Formats and goals", text: "We confirm which editions you want on Amazon and how you plan to price and launch them." },
        { title: "File preparation", text: "Kindle, paperback and hardcover files are prepared and checked against KDP specifications." },
        { title: "Listing research", text: "Categories, keywords and description are researched and written for your genre." },
        { title: "Setup and preview", text: "Each edition is entered in KDP, previewed and proofed before you approve publishing." },
        { title: "Live and linked", text: "Editions go live, are linked together, and every detail is checked on the store." },
      ],
    },
    fit: {
      title: "Who Amazon KDP Publishing is for.",
      intro: "For authors whose first priority is a strong presence on the world's largest book store.",
      authors: [
        { who: "Authors preparing an Amazon launch", why: "You want your release on Kindle and in print with every listing detail right from day one." },
        { who: "Genre fiction writers", why: "Romance, thriller and fantasy readers buy heavily on Kindle; categories and keywords matter." },
        { who: "Authors relaunching a book", why: "Your current listing underperforms and needs better categories, keywords or description." },
        { who: "Non-fiction experts", why: "You want readers searching a topic to find your book alongside the established titles." },
      ],
      related: ["ebook-publishing", "paperback-publishing", "self-publishing-support"],
    },
    cta: {
      title: "Ready to launch properly on Amazon?",
      text: "Share your manuscript and goals. We will recommend the right Amazon editions and walk you through a clear KDP plan.",
    },
  },

  // ── Global Distribution ─────────────────────────────────────────────────
  "global-book-distribution": {
    hero: {
      title: "Reach readers beyond a single store.",
      highlight: "beyond a single store",
      subtitle:
        "Distribution through major online retailers and wholesale networks — Amazon, Barnes & Noble, Apple Books, Google Play Books, Kobo and more.",
    },
    meaning: {
      title: "What Global Distribution means.",
      lead: "Global Distribution makes your book available to order through a wide network of online retailers, wholesalers and library suppliers — not just one store.",
      paragraphs: [
        "Readers buy books in many places: Amazon, Barnes & Noble, Apple Books, Google Play Books, Kobo, independent online shops, and the wholesale catalogues that bookstores and libraries order from. Each channel has its own requirements for files, metadata and pricing.",
        "Our distribution pathway prepares your print and eBook editions for that wider network, with consistent metadata so your title, author name, description and categories appear correctly everywhere it is listed.",
        "The result is availability: readers and institutions in many countries can find, request and order your book through the channels they already use.",
      ],
      image: { src: unsplash("1494412574643-ff11b0a5c1c3"), alt: "An aerial view of a busy international shipping port" },
    },
    handles: {
      title: "A wider network, prepared properly.",
      intro: "We set up each channel so your book is listed consistently and ready to be ordered.",
      items: [
        { title: "Channel planning", text: "Which retailers and wholesale networks suit your book, formats and goals — and in what order to enable them." },
        { title: "Print distribution setup", text: "Print-on-demand distribution through wholesale catalogues used by online retailers, bookstores and libraries." },
        { title: "eBook retailer setup", text: "eBook editions delivered to Apple Books, Google Play Books, Kobo, Barnes & Noble and other digital stores." },
        { title: "Consistent metadata", text: "One master record of title, contributors, description, categories and pricing applied across every channel." },
        { title: "Pricing by territory", text: "Prices set sensibly for each currency and market, with wholesale discount options explained." },
        { title: "Listing checks", text: "Live listings reviewed across retailers so details, covers and formats display correctly." },
      ],
      receive: ["Distribution plan by channel", "Print and eBook editions enabled for wide distribution", "Master metadata record", "Territory pricing summary", "Live-listing review report"],
    },
    matters: {
      title: "Why wide distribution matters.",
      intro: "Not every reader shops on Amazon. Wider availability meets readers, libraries and bookstores where they already are.",
      points: [
        { title: "More places to be found", text: "Your book appears in the catalogues and stores used by readers in many countries." },
        { title: "Orderable by stores and libraries", text: "Wholesale availability means bookstores and libraries can order copies on request." },
        { title: "One consistent identity", text: "Matching metadata everywhere builds trust and avoids confusing duplicate listings." },
        { title: "Less dependence on one platform", text: "Sales and visibility are spread across several retailers rather than tied to a single store." },
      ],
      image: { src: unsplash("1568667256549-094345857637"), alt: "Curved wooden shelves in a large library" },
      note: "Availability across platforms does not guarantee physical bookstore shelf placement.",
    },
    process: {
      title: "How Global Distribution works.",
      intro: "From channel planning to listings checked across the network.",
      steps: [
        { title: "Choose channels", text: "We recommend retailers and networks based on your book, formats and readers." },
        { title: "Prepare editions", text: "Print and eBook files and ISBNs are confirmed as distribution-ready." },
        { title: "Build metadata", text: "A single, consistent metadata record is created for every channel." },
        { title: "Enable distribution", text: "Editions are submitted to each retailer and wholesale network." },
        { title: "Verify listings", text: "We check live listings across stores and correct anything that displays wrongly." },
      ],
    },
    fit: {
      title: "Who Global Distribution is for.",
      intro: "For authors who want their book available wherever readers, libraries and stores look for it.",
      authors: [
        { who: "Authors wanting global reach", why: "You want readers in other countries and on other stores to be able to buy your book." },
        { who: "Authors approaching libraries", why: "You want libraries and schools to be able to order copies through their usual suppliers." },
        { who: "Authors outgrowing Amazon-only", why: "Your book is on Amazon and you are ready to widen availability." },
        { who: "Local and speaking authors", why: "You want bookshops and event partners to be able to order copies easily." },
      ],
      related: ["book-publishing", "paperback-publishing", "ebook-publishing"],
    },
    cta: {
      title: "Ready to widen your book's reach?",
      text: "Tell us where your book is available today. We will recommend the channels that make sense next and prepare each one properly.",
    },
  },

  // ── eBook Publishing ────────────────────────────────────────────────────
  "ebook-publishing": {
    hero: {
      title: "eBooks that read beautifully on every screen.",
      highlight: "every screen",
      subtitle:
        "Clean Kindle and EPUB files with reflowable text, clickable contents and carefully handled images — prepared for every major digital store.",
    },
    meaning: {
      title: "What eBook Publishing means.",
      lead: "An eBook is not a PDF of your print book. It is a flexible digital edition that reshapes itself to each reader's device, font and text size.",
      paragraphs: [
        "Digital readers choose their own reading conditions — a phone on a commute, a Kindle in bed, a tablet at night with large text. A properly built eBook reflows gracefully to all of them while keeping chapter breaks, scene breaks, emphasis and images intact.",
        "eBook Publishing turns your manuscript into professional Kindle and EPUB files: clean structure, a clickable table of contents, correct navigation, and images sized for screens. We then prepare the metadata and setup each digital store needs.",
        "The aim is invisible quality — a reader should never notice the formatting, only the story.",
      ],
      image: { src: unsplash("1553729784-e91953dec042"), alt: "A woman reading comfortably in a café" },
    },
    handles: {
      title: "Digital editions built carefully, then tested.",
      intro: "Every detail that makes an eBook comfortable to read on any device.",
      items: [
        { title: "Kindle and EPUB conversion", text: "Your manuscript converted to clean, standards-compliant files for Kindle and every EPUB store." },
        { title: "Reflowable layout", text: "Text that adapts to any screen and font size, with chapter openings, scene breaks and emphasis preserved." },
        { title: "Clickable table of contents", text: "Linked contents and device navigation so readers can move through the book easily." },
        { title: "Images and special elements", text: "Photos, tables, footnotes and special characters handled so they display correctly on screens." },
        { title: "Digital metadata", text: "eBook-specific details, categories, keywords and pricing prepared for each digital retailer." },
        { title: "Device testing", text: "Files checked on Kindle devices and apps, phones and tablets before release." },
      ],
      receive: ["Kindle-ready eBook file", "EPUB file for other stores", "Linked table of contents", "eBook metadata sheet", "Device-test confirmation"],
    },
    matters: {
      title: "Why a well-made eBook matters.",
      intro: "Readers judge an eBook by how it feels to read. Poor formatting is the fastest route to a disappointed review.",
      points: [
        { title: "A comfortable reading experience", text: "Clean reflow, sensible spacing and working navigation keep readers immersed rather than distracted." },
        { title: "Reviews that reflect your writing", text: "Readers review the story, not broken formatting or missing chapters." },
        { title: "Platform readiness", text: "Files that meet each store's technical requirements publish without errors or delays." },
        { title: "Reach on every device", text: "A single edition serves readers on Kindles, phones, tablets and computers worldwide." },
      ],
      image: { src: unsplash("1519791883288-dc8bd696e667"), alt: "A glowing open book held in the dark" },
    },
    process: {
      title: "How eBook Publishing works.",
      intro: "From manuscript to tested digital edition, in five steps.",
      steps: [
        { title: "Manuscript review", text: "We check structure, styles, images and special elements before conversion." },
        { title: "Conversion and styling", text: "Kindle and EPUB files are built with consistent, reader-friendly styling." },
        { title: "Navigation", text: "The clickable contents and device navigation are created and linked." },
        { title: "Device testing", text: "Files are tested across devices and apps, and anything awkward is refined." },
        { title: "Digital launch", text: "Metadata and files are prepared for each store and the eBook goes live." },
      ],
    },
    fit: {
      title: "Who eBook Publishing is for.",
      intro: "For authors who want to reach digital readers quickly and look professional doing it.",
      authors: [
        { who: "Authors reaching digital readers", why: "Your genre's readers buy heavily on Kindle and other e-readers." },
        { who: "Authors with print editions", why: "Your book is already in print and needs a matching, properly built digital edition." },
        { who: "Non-fiction and illustrated books", why: "You have tables, images or footnotes that must display well on small screens." },
        { who: "Authors launching quickly", why: "You want a professional first edition available worldwide as soon as possible." },
      ],
      related: ["amazon-kdp-publishing", "global-book-distribution", "paperback-publishing"],
    },
    cta: {
      title: "Ready for a digital edition readers will enjoy?",
      text: "Send us your manuscript details. We will confirm the right digital formats and a clear path to launch.",
    },
  },

  // ── Paperback Publishing ────────────────────────────────────────────────
  "paperback-publishing": {
    hero: {
      title: "A paperback you will be proud to hand to a reader.",
      highlight: "proud to hand",
      subtitle:
        "Trim size, margins, spine, full-wrap cover and print-ready interior — set up for print-on-demand and for your own author copies.",
    },
    meaning: {
      title: "What Paperback Publishing means.",
      lead: "Paperback Publishing prepares a print edition of your book — inside and out — to the exact specifications printers require.",
      paragraphs: [
        "A paperback is held, flipped and read for hours, so small details matter: the trim size, the margins near the spine, the paper colour, how chapters open, and whether the spine text sits perfectly centred.",
        "We design and build the interior and the full-wrap cover — front, spine and back — to your page count and paper choice, then produce print-ready files that pass printer checks first time.",
        "Your paperback is then set up for print-on-demand, so copies are printed as readers order them. You can also order author copies for events, reviewers and friends.",
      ],
      image: { src: unsplash("1503694978374-8a2fa686963a"), alt: "Pages running through a commercial printing press" },
    },
    handles: {
      title: "Every print detail, inside and out.",
      intro: "The specifications that separate a professional paperback from a homemade one.",
      items: [
        { title: "Trim size and paper", text: "Guidance on trim size, paper colour and finish to suit your genre, page count and budget." },
        { title: "Interior layout", text: "Typography, margins, headers, chapter openings and scene breaks designed for comfortable reading." },
        { title: "Spine calculation", text: "Spine width calculated from your final page count and paper, with spine text sized to fit." },
        { title: "Front and back cover", text: "A full-wrap cover with front design, back-cover description, author note, barcode and ISBN." },
        { title: "Print-ready files", text: "Interior and cover PDFs with correct bleed, resolution and colour settings for the printer." },
        { title: "POD setup and author copies", text: "Print-on-demand configured on your chosen platforms and author-copy ordering explained." },
      ],
      receive: ["Print-ready interior PDF", "Full-wrap cover PDF", "Paperback ISBN and barcode", "Proof copy review", "Print-on-demand listing", "Author-copy ordering guide"],
    },
    matters: {
      title: "Why print quality matters.",
      intro: "A paperback is a physical first impression. Readers notice margins, fonts and spines even if they could not name what is wrong.",
      points: [
        { title: "Professional in the hand", text: "Balanced margins, clean type and a centred spine make your book look at home beside traditionally published titles." },
        { title: "No printer rejections", text: "Correct bleed, trim and spine calculations prevent delays and reprints." },
        { title: "Affordable and giftable", text: "Paperbacks keep prices accessible — ideal for wide availability, events and gifts." },
        { title: "No inventory risk", text: "Print-on-demand means no boxes of unsold books and no upfront print run." },
      ],
      image: { src: unsplash("1506880018603-83d5b814b5a6"), alt: "A reader holding an open paperback in warm sunlight" },
    },
    process: {
      title: "How Paperback Publishing works.",
      intro: "From specification to a proof copy in your hands.",
      steps: [
        { title: "Specifications", text: "We agree trim size, paper and finish based on your book and readers." },
        { title: "Interior design", text: "The interior is typeset and laid out, then shared for your review." },
        { title: "Cover wrap", text: "Front, spine and back are designed to the final page count." },
        { title: "Proof copy", text: "A printed proof is ordered so you can check the real book before release." },
        { title: "POD release", text: "The paperback is set live for print-on-demand, ready for readers and author copies." },
      ],
    },
    fit: {
      title: "Who Paperback Publishing is for.",
      intro: "For authors who want a professional, affordable print edition readers can hold.",
      authors: [
        { who: "Authors wanting print copies", why: "You want a real book for readers, events, signings and gifts." },
        { who: "eBook-first authors", why: "Your eBook is selling and readers are asking for a print edition." },
        { who: "Speakers and coaches", why: "You need copies to sell or give away at talks, workshops and events." },
        { who: "First-time authors", why: "You want your first book to look as good on the shelf as it reads." },
      ],
      related: ["hardcover-publishing", "amazon-kdp-publishing", "global-book-distribution"],
    },
    cta: {
      title: "Ready to hold your paperback?",
      text: "Tell us about your manuscript, length and audience. We will recommend specifications and a clear path to your first proof copy.",
    },
  },

  // ── Hardcover Publishing ────────────────────────────────────────────────
  "hardcover-publishing": {
    hero: {
      title: "A hardcover edition made to be kept.",
      highlight: "made to be kept",
      subtitle:
        "A premium, durable edition with case-laminate or dust-jacket covers — formatted, designed and print-ready for collectors, gifts and libraries.",
    },
    meaning: {
      title: "What Hardcover Publishing means.",
      lead: "A hardcover is your book's most lasting, premium form — the edition people keep, gift, display and pass on.",
      paragraphs: [
        "Hardcovers are bound with rigid boards and can be finished as a case-laminate (the design printed directly on the cover) or with a removable dust jacket. Each has its own specifications for wrap, hinge, spine and flaps.",
        "Hardcover Publishing prepares your edition to those exact specifications: an interior formatted for the larger trim and heavier presentation, and a cover or jacket designed precisely to the board size and spine.",
        "The result is a book that feels substantial and considered — fit for a collector's shelf, a family heirloom, a library or a meaningful gift.",
      ],
      image: { src: unsplash("1474932430478-367dbb6832c1"), alt: "Old hardcover books with gilded spines on a shelf" },
    },
    handles: {
      title: "Premium presentation, precisely specified.",
      intro: "The extra care a hardcover requires, handled in detail.",
      items: [
        { title: "Binding and finish guidance", text: "Case-laminate or dust-jacket, matte or gloss — chosen for your genre, audience and budget." },
        { title: "Hardcover interior formatting", text: "An interior set for hardcover trim sizes, with elegant typography and generous margins." },
        { title: "Case and spine design", text: "The case wrap and spine designed to board size, hinge allowance and final page count." },
        { title: "Dust-jacket design", text: "Front, spine, back and flaps — with author photo, bio and description — where a jacket is chosen." },
        { title: "Print-ready production files", text: "Cover and interior files with correct wrap, bleed and resolution for hardcover printing." },
        { title: "Proof and release", text: "A hardcover proof reviewed in hand, then the edition set live alongside your other formats." },
      ],
      receive: ["Hardcover interior PDF", "Case wrap or dust-jacket PDF", "Hardcover ISBN and barcode", "Hardcover proof review", "Live hardcover edition linked to other formats"],
    },
    matters: {
      title: "Why a hardcover edition matters.",
      intro: "A hardcover tells readers the book was made to last — and gives it a place on shelves where paperbacks rarely go.",
      points: [
        { title: "Professional presentation", text: "A well-made hardcover signals quality instantly, in person and in photographs." },
        { title: "Collector and gift value", text: "Readers buy hardcovers to keep, to give and to have signed — they are the edition people treasure." },
        { title: "Library-friendly durability", text: "Rigid boards and quality binding stand up to repeated reading and lending." },
        { title: "A premium price point", text: "Hardcovers support a higher price, offering readers a deluxe choice alongside paperback and eBook." },
      ],
      image: { src: unsplash("1535905557558-afc4877a26fc"), alt: "Tall library shelves of hardcover books with a rolling ladder" },
    },
    process: {
      title: "How Hardcover Publishing works.",
      intro: "Five careful stages toward a premium edition.",
      steps: [
        { title: "Edition planning", text: "We choose binding, finish, trim size and paper for your hardcover." },
        { title: "Interior formatting", text: "The interior is set for hardcover presentation and approved by you." },
        { title: "Case or jacket design", text: "The cover is designed to board, spine and hinge specifications." },
        { title: "Hardcover proof", text: "A physical proof is reviewed for binding, colour and finish." },
        { title: "Release", text: "The hardcover goes live and is linked with your paperback and eBook." },
      ],
    },
    fit: {
      title: "Who Hardcover Publishing is for.",
      intro: "For authors who want an edition that feels as important as the story inside it.",
      authors: [
        { who: "Memoir and family-history authors", why: "Your book is a legacy for family and future generations." },
        { who: "Authors wanting a collector's edition", why: "Your readers want a premium, signable copy to keep." },
        { who: "Gift and illustrated books", why: "Your book is often given as a present and deserves premium presentation." },
        { who: "Authors approaching libraries", why: "You want a durable edition suited to library shelves and lending." },
      ],
      related: ["paperback-publishing", "book-publishing", "global-book-distribution"],
    },
    cta: {
      title: "Ready to create an edition worth keeping?",
      text: "Tell us about your book and who it is for. We will recommend binding, finish and a clear path to your hardcover proof.",
    },
  },

  // ── Audiobook Production ────────────────────────────────────────────────
  "audiobook-production": {
    hero: {
      title: "Your story, told aloud with care.",
      highlight: "told aloud",
      subtitle:
        "Narration, recording, editing and mastering — produced to audio retailer standards and delivered to Audible, Amazon, Apple Books and more.",
    },
    meaning: {
      title: "What Audiobook Production means.",
      lead: "Audiobook Production turns your written book into a professionally narrated recording that listeners can enjoy anywhere.",
      paragraphs: [
        "An audiobook is a performance. The right voice, steady pacing, consistent sound and clean edits are what make listeners stay for ten hours rather than ten minutes.",
        "We manage the whole production: helping you choose a narrator who suits your story, directing the recording, editing each chapter, and mastering the audio to the technical standards audio retailers require.",
        "The finished files are then prepared and delivered to audio platforms, so your book reaches commuters, walkers, multitaskers and readers who prefer to listen.",
      ],
      image: { src: unsplash("1478737270239-2f02b77fc618"), alt: "A condenser microphone with a pop filter in a dark recording studio" },
    },
    handles: {
      title: "Studio production, managed end to end.",
      intro: "Every stage from first audition to finished files on audio stores.",
      items: [
        { title: "Voice selection", text: "Narrator auditions matched to your genre, characters and tone — you choose the voice." },
        { title: "Directed recording", text: "Professional recording with direction on pacing, pronunciation and character voices." },
        { title: "Editing", text: "Every chapter edited for clean, natural pacing, removing breaths, noise and errors." },
        { title: "Mastering", text: "Levels, noise floor and file format mastered to audio retailer specifications." },
        { title: "Quality review", text: "A full listen-through checked against your manuscript before delivery." },
        { title: "Audio distribution", text: "Files and metadata delivered to Audible, Amazon, Apple Books and other audio platforms." },
      ],
      receive: ["Narrator auditions", "Edited, mastered chapter files", "Opening and closing credits", "Retail-ready audio package", "Audio platform listings"],
    },
    matters: {
      title: "Why an audiobook matters.",
      intro: "Listening is how many people now read. An audio edition opens your book to an audience you may never reach in print.",
      points: [
        { title: "Audio reach", text: "Listeners on Audible, Amazon, Apple Books and other platforms can discover your book." },
        { title: "Accessible reading", text: "Audio welcomes readers with visual impairments, dyslexia, or simply busy hands." },
        { title: "A quality listening experience", text: "Professional narration and mastering keep listeners engaged and reviews positive." },
        { title: "A new format for your catalogue", text: "Audio sits alongside print and eBook, giving every reader their preferred way in." },
      ],
      image: { src: unsplash("1484704849700-f032a568e944"), alt: "A pair of headphones resting on a table" },
    },
    process: {
      title: "How Audiobook Production works.",
      intro: "From casting call to listeners' ears.",
      steps: [
        { title: "Script preparation", text: "Your manuscript is prepared for narration, with pronunciations and character notes." },
        { title: "Casting", text: "Narrator auditions are gathered and you select the voice for your book." },
        { title: "Recording", text: "Chapters are recorded with direction and reviewed as production progresses." },
        { title: "Editing and mastering", text: "Audio is edited, mastered and checked against retailer standards." },
        { title: "Release", text: "After your approval, the audiobook is delivered to audio platforms." },
      ],
    },
    fit: {
      title: "Who Audiobook Production is for.",
      intro: "For authors ready to reach listeners as well as readers.",
      authors: [
        { who: "Authors wanting audiobook listeners", why: "Your genre has strong audio demand — thrillers, romance, fantasy, self-help and memoir." },
        { who: "Non-fiction and self-help authors", why: "Your readers learn on the move and prefer to listen during commutes and workouts." },
        { who: "Memoir authors", why: "Your story gains warmth and intimacy when heard in a carefully chosen voice." },
        { who: "Authors with established editions", why: "Your print and eBook are live; audio completes the set." },
      ],
      related: ["global-book-distribution", "ebook-publishing", "book-publishing"],
    },
    cta: {
      title: "Ready to give your book a voice?",
      text: "Tell us about your book, its length and tone. We will outline narration options and a clear production plan.",
    },
  },
};

export const getPathwayPage = (slug: string) => pathwayPages[slug];
