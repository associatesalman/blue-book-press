/**
 * Author Resources articles — listed at /author-resources, detail pages at
 * /author-resources/[slug]. Practical guidance only: no statistics, sales
 * figures or promises. Reading time is calculated from the body text.
 */
export const articleCategories = [
  "Writing",
  "Editing",
  "Book Design",
  "Publishing",
  "Distribution",
  "Marketing",
  "Author Branding",
] as const;

export type ArticleCategory = (typeof articleCategories)[number];

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul" | "ol"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "note"; title: string; text: string };

export type Article = {
  slug: string;
  title: string;
  /** Card summary and meta description. */
  excerpt: string;
  /** Opening paragraph on the detail page. */
  intro: string;
  category: ArticleCategory;
  date: string; // ISO yyyy-mm-dd
  readMinutes: number;
  image: { src: string; alt: string; width?: number; height?: number };
  body: ArticleBlock[];
  /** Shown as the large featured article on the Articles page. */
  featured?: boolean;
};

export const EDITORIAL_TEAM = "Blue Book Press Editorial Team";

const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1800&q=80`;

type Draft = Omit<Article, "readMinutes">;

const drafts: Draft[] = [
  {
    slug: "what-happens-after-your-manuscript-is-complete",
    featured: true,
    category: "Writing",
    date: "2026-10-06",
    title: "What Happens After Your Manuscript Is Complete",
    excerpt:
      "Finishing a draft is a real milestone. Here is a clear, stage-by-stage look at what usually comes next — from editing and design to publishing and finding readers.",
    intro:
      "Typing the last line of a manuscript is a moment worth marking. It is also the point where many authors realise they are not sure what happens next. This guide walks through the usual stages between a finished draft and a published book, so you can plan with confidence instead of guessing.",
    image: { src: unsplash("1532153975070-2e9ab71f1b14"), alt: "Printed manuscript pages spread across a table" },
    body: [
      { type: "h2", text: "Step back before you step forward" },
      {
        type: "p",
        text: "Most writers benefit from a short break between finishing a draft and revising it. Time away lets you read the book more like a reader would, which makes gaps in logic, pacing problems and unclear passages easier to spot. Use the pause to gather practical details: the word count, the genre you would place it in, and a one-paragraph summary of what the book is about.",
      },
      { type: "h2", text: "Revise what you can on your own" },
      {
        type: "p",
        text: "A self-revision pass is not about perfection. It is about handing an editor the strongest version you can produce, so their time goes into the problems you cannot see yourself.",
      },
      {
        type: "ul",
        items: [
          "Read the whole manuscript in as few sittings as possible to judge flow and momentum.",
          "Check that names, dates and timelines stay consistent from start to finish.",
          "Cut scenes or sections that repeat information the reader already has.",
          "Note any chapters you feel uncertain about, so you can raise them with an editor.",
        ],
      },
      { type: "h2", text: "Choose the right kind of editing" },
      {
        type: "p",
        text: "Editing happens in layers. Developmental editing looks at structure, story and argument. Line editing refines the language sentence by sentence. Copy editing corrects grammar, spelling, punctuation and consistency. Proofreading is the final check on the finished layout. Not every book needs every layer, and an honest manuscript assessment can tell you which ones will make the biggest difference.",
      },
      {
        type: "quote",
        text: "The goal of editing is not to make your book sound like someone else wrote it. It is to make it sound more completely like you.",
      },
      { type: "h2", text: "Design the book readers will hold" },
      {
        type: "p",
        text: "Once the text is settled, design begins. The cover needs to signal genre and tone at a glance, including as a small thumbnail on a retailer page. The interior needs comfortable margins, a readable typeface and consistent chapter openings. eBooks need their own file preparation, because text reflows on different screens.",
      },
      { type: "h2", text: "Prepare the publishing details" },
      {
        type: "p",
        text: "Before a book can be listed, it needs accurate information attached to it. This is where many first-time authors are surprised by how many decisions there are.",
      },
      {
        type: "ol",
        items: [
          "Formats: eBook, paperback, hardcover, audiobook, or a combination.",
          "ISBNs for each print format, and the imprint name that will appear with them.",
          "Metadata: title, subtitle, author name, description, categories and keywords.",
          "Pricing for each format and each market you plan to sell in.",
          "Platform accounts, set up in your name so that you stay in control.",
        ],
      },
      { type: "h2", text: "Publish, then keep going" },
      {
        type: "p",
        text: "Publication is a beginning rather than an ending. A short launch plan, a clear author presence online and realistic expectations all help a book continue to find readers after release day. No one can promise sales or rankings, but a well-prepared book gives every reader who finds it a better reason to stay.",
      },
      {
        type: "note",
        title: "Not sure where your book is right now?",
        text: "Tell us what you have finished and what feels uncertain. We can help you understand the most practical next step before you commit to any service.",
      },
    ],
  },
  {
    slug: "how-to-prepare-a-manuscript-for-editing",
    category: "Editing",
    date: "2026-09-22",
    title: "How to Prepare a Manuscript for Editing",
    excerpt:
      "A few practical steps before you send your file can help your editor focus on what matters most — and help you get more value from the process.",
    intro:
      "Editors work best when they can focus on the writing itself rather than on file problems or questions that could have been answered up front. Preparing your manuscript well is a simple way to make the editing stage smoother and more useful.",
    image: { src: unsplash("1581431886288-e216ea4ccf3f"), alt: "A hand marking a printed page with a red pencil" },
    body: [
      { type: "h2", text: "Finish the draft first" },
      {
        type: "p",
        text: "It is tempting to send early chapters while you are still writing, but most editing works best on a complete draft. Changes late in a book often affect earlier chapters, and an editor can only judge structure and pacing when they can see the whole shape of the story or argument.",
      },
      { type: "h2", text: "Clean up the file" },
      {
        type: "ul",
        items: [
          "Use one standard font and size throughout, with consistent line spacing.",
          "Remove manual page breaks made with repeated blank lines; use proper page breaks instead.",
          "Mark chapter headings the same way every time.",
          "Accept or reject any old tracked changes so the editor starts from a clean copy.",
          "Save the file in an editable format such as .docx.",
        ],
      },
      { type: "h2", text: "Write a short brief for your editor" },
      {
        type: "p",
        text: "A one-page note can save a great deal of back-and-forth. Include the genre, your intended readers, the approximate word count and anything you already know you want help with. If certain spellings, invented words or stylistic choices are deliberate, list them so they are not corrected by mistake.",
      },
      {
        type: "quote",
        text: "The more clearly you describe the book you are trying to write, the more precisely an editor can help you get there.",
      },
      { type: "h2", text: "Decide how you will review changes" },
      {
        type: "p",
        text: "Most edits are returned with tracked changes and comments. Set aside dedicated time to work through them calmly. You do not have to accept every suggestion, but it helps to understand the reason behind each one before you decide.",
      },
      { type: "h2", text: "Check the practical details" },
      {
        type: "ul",
        items: [
          "Permissions: if you quote song lyrics, poems or long passages from other works, start checking permissions early.",
          "Images: note where photographs or illustrations will appear and gather the highest-quality originals you have.",
          "Front and back matter: draft your dedication, acknowledgements and author bio so they can be edited too.",
          "Version control: keep one clearly named master file so there is never confusion about the latest draft.",
        ],
      },
      { type: "h2", text: "Be realistic about time" },
      {
        type: "p",
        text: "Editing is a conversation, not a single delivery. Allow time to read your editor's notes, think about them and revise. Rushing this stage to meet a launch date is one of the most common reasons books are published before they are ready.",
      },
      {
        type: "note",
        title: "Want an honest view of what your manuscript needs?",
        text: "Send us a few details about your book. We will suggest the type of editing that will make the most difference, and explain why.",
      },
    ],
  },
  {
    slug: "developmental-editing-vs-copy-editing",
    category: "Editing",
    date: "2026-09-08",
    title: "Developmental Editing vs. Copy Editing: What Is the Difference?",
    excerpt:
      "Both are called editing, but they solve very different problems. Understanding the difference helps you choose the right support at the right time.",
    intro:
      "Authors often hear the word “editing” as if it were a single service. In practice, different types of editing look at a manuscript from different distances. Developmental editing looks at the whole book. Copy editing looks closely at every sentence.",
    image: { src: unsplash("1720411270946-7a530fd12dc9"), alt: "A writer mapping a story on a wall of sticky notes" },
    body: [
      { type: "h2", text: "Developmental editing: the big picture" },
      {
        type: "p",
        text: "A developmental edit asks whether the book works as a whole. For fiction, that might mean plot, character arcs, pacing and point of view. For non-fiction, it might mean the order of chapters, the strength of the argument and whether the reader is given what they need at each stage.",
      },
      {
        type: "ul",
        items: [
          "Usually delivered as an editorial letter plus comments in the manuscript.",
          "Focuses on what to change and why, rather than rewriting your text.",
          "Most useful early, before you invest time polishing individual sentences.",
        ],
      },
      { type: "h2", text: "Line editing: the language in between" },
      {
        type: "p",
        text: "Line editing sits between the two. It refines rhythm, word choice, clarity and tone sentence by sentence, while keeping your voice intact. Some books move straight from developmental editing to copy editing; others benefit from a line edit in the middle.",
      },
      { type: "h2", text: "Copy editing: accuracy and consistency" },
      {
        type: "p",
        text: "Copy editing corrects grammar, spelling, punctuation and usage, and checks that details stay consistent — names, dates, capitalisation and hyphenation. It assumes the structure is already settled.",
      },
      {
        type: "quote",
        text: "Polishing sentences that may later be cut is rarely a good use of time or budget. Structure first, surface second.",
      },
      { type: "h2", text: "Which one does your book need?" },
      {
        type: "p",
        text: "If you are unsure whether the book holds together, start with developmental feedback. If readers say the story works but the writing feels uneven, consider line editing. If the book is in good shape and needs a careful, accurate finish, copy editing followed by proofreading is usually the right path.",
      },
      { type: "h2", text: "Proofreading: the final check" },
      {
        type: "p",
        text: "Proofreading takes place after the book has been formatted. The proofreader looks for typographical errors, missing words, inconsistent formatting and problems introduced during layout, such as bad page breaks. It is not the moment for rewriting — changes at this stage should be small.",
      },
      { type: "h2", text: "How the stages fit together" },
      {
        type: "ol",
        items: [
          "Developmental edit — settle the structure and content.",
          "Revision — the author works through the feedback.",
          "Line edit, if needed — refine the language.",
          "Copy edit — correct and make consistent.",
          "Formatting — design the pages.",
          "Proofread — check the finished layout.",
        ],
      },
      {
        type: "p",
        text: "Doing these in order avoids paying twice for the same text: a sentence polished in a copy edit may still be cut in a structural revision.",
      },
    ],
  },
  {
    slug: "a-self-revision-checklist-for-your-draft",
    category: "Writing",
    date: "2026-08-25",
    title: "Reading Your Draft Like an Editor: A Self-Revision Checklist",
    excerpt:
      "Before you hand your manuscript to anyone else, a structured read-through can resolve many issues on your own. Use this checklist as a guide.",
    intro:
      "Self-revision is easier with a plan. Rather than rereading from the beginning and fixing whatever catches your eye, try reading in focused passes, each looking for one kind of problem.",
    image: { src: unsplash("1580127645995-d43fe9598711"), alt: "A fountain pen resting on a handwritten page" },
    body: [
      { type: "h2", text: "Pass one: the shape of the book" },
      {
        type: "ul",
        items: [
          "Can you describe what each chapter contributes in a single sentence?",
          "Does the opening make a clear promise about the kind of book this is?",
          "Does the ending deliver on that promise?",
        ],
      },
      { type: "h2", text: "Pass two: clarity" },
      {
        type: "p",
        text: "Read as if you know nothing about the subject or the characters. Mark anything that relies on information you never actually put on the page. Writers often understand their own books so well that small explanatory steps get skipped.",
      },
      { type: "h2", text: "Pass three: repetition and pace" },
      {
        type: "p",
        text: "Look for scenes, examples or points that do the same job twice. Notice where your own attention drifts while reading — that is often where a reader's will too.",
      },
      {
        type: "quote",
        text: "Reading aloud is one of the simplest revision tools available. Your ear will catch what your eye skips.",
      },
      { type: "h2", text: "Know when to stop" },
      {
        type: "p",
        text: "Self-revision has limits. When you find yourself changing words back and forth without the book improving, it is usually time for an outside perspective.",
      },
      { type: "h2", text: "Pass four: line-level polish" },
      {
        type: "ul",
        items: [
          "Trim filler words and phrases that do not add meaning.",
          "Vary sentence length where the rhythm feels flat.",
          "Check that dialogue sounds like real people speaking.",
          "Replace vague words with specific ones where it matters.",
        ],
      },
      { type: "h2", text: "Pass five: facts and consistency" },
      {
        type: "p",
        text: "Keep a simple style sheet as you go: character names and spellings, place names, dates, recurring terms and any deliberate stylistic choices. It will help you catch inconsistencies now, and it is extremely useful to share with your editor later.",
      },
    ],
  },
  {
    slug: "using-beta-readers-before-professional-editing",
    category: "Writing",
    date: "2026-07-14",
    title: "Using Beta Readers Before Professional Editing",
    excerpt:
      "Feedback from real readers can show you how your book lands. Here is how to choose beta readers, what to ask them, and how to use their responses.",
    intro:
      "Beta readers are people who read your manuscript before publication and tell you how it felt to read. They are not editors, but their reactions can reveal confusion, slow sections or moments that are not landing the way you intended.",
    image: { src: unsplash("1529070538774-1843cb3265df"), alt: "A reader absorbed in a book" },
    body: [
      { type: "h2", text: "Choose readers who match your audience" },
      {
        type: "p",
        text: "Friends and family can be encouraging, but they may not be the readers your book is written for. Where possible, look for people who already read in your genre or subject area, and who are willing to be honest.",
      },
      { type: "h2", text: "Ask focused questions" },
      {
        type: "ul",
        items: [
          "Where did you feel like putting the book down?",
          "Was anything confusing or hard to follow?",
          "Which characters or sections stayed with you, and why?",
          "Did the ending feel earned?",
        ],
      },
      { type: "h2", text: "Look for patterns, not verdicts" },
      {
        type: "p",
        text: "One reader's opinion is a data point. When several readers stumble in the same place, it is worth investigating. Their suggested fixes may not be right, but the problem they point to usually is.",
      },
      { type: "h2", text: "How to brief your readers" },
      {
        type: "ul",
        items: [
          "Agree a realistic deadline before you send the manuscript.",
          "Send the file in a format they can read comfortably.",
          "Share your questions in advance, so they know what to notice.",
          "Ask them to note reactions as they read, not only at the end.",
        ],
      },
      { type: "h2", text: "Handling difficult feedback" },
      {
        type: "p",
        text: "Honest feedback can sting. Read it, then put it aside for a day before responding or making changes. Thank every reader, even if you disagree with them — they have given you their time.",
      },
      {
        type: "quote",
        text: "Beta readers tell you where the problems are. Editors help you decide how to fix them.",
      },
      {
        type: "note",
        title: "A note on timing",
        text: "Beta feedback is most useful before developmental or line editing, so that changes it prompts can be reviewed professionally afterwards.",
      },
    ],
  },
  {
    slug: "what-authors-should-know-about-isbns",
    category: "Publishing",
    date: "2026-09-29",
    title: "What Authors Should Know About ISBNs",
    excerpt:
      "An ISBN identifies a specific edition of your book. Here is what it does, when you need one, and why the choice of who supplies it matters.",
    intro:
      "The International Standard Book Number, or ISBN, is a 13-digit identifier used by retailers, libraries and distributors to identify a specific edition and format of a book. It sounds technical, but a few decisions about ISBNs have lasting effects on how your book is listed.",
    image: { src: unsplash("1747147292047-7c61f1110897"), alt: "A hand pulling a card from a library card catalogue" },
    body: [
      { type: "h2", text: "One ISBN per format" },
      {
        type: "p",
        text: "Each format of a book is generally treated as a separate product. A paperback, a hardcover and an audiobook of the same title would normally each have their own ISBN. Some eBook platforms do not require an ISBN and use their own identifiers instead, but having one can be useful for wider distribution.",
      },
      { type: "h2", text: "Where ISBNs come from" },
      {
        type: "p",
        text: "ISBNs are issued by national agencies, and the process differs from country to country. In some countries they are sold; in others they are provided free to publishers based there. Some publishing platforms also offer a free ISBN, but it is usually tied to that platform and lists the platform, rather than you, as the publisher.",
      },
      {
        type: "quote",
        text: "Owning your ISBNs means the publisher of record is you, or the imprint name you choose.",
      },
      { type: "h2", text: "When you need a new ISBN" },
      {
        type: "ul",
        items: [
          "A new format, such as adding a hardcover to an existing paperback.",
          "A substantially revised edition.",
          "A change of title, in most cases.",
        ],
      },
      {
        type: "p",
        text: "Correcting small typos usually does not require a new ISBN. If you are unsure, check the guidance from your national ISBN agency before you publish.",
      },
      { type: "h2", text: "ISBNs and barcodes" },
      {
        type: "p",
        text: "The barcode printed on the back cover of a print book is generated from its ISBN, often with price information added. Your cover designer will need the final ISBN before the cover file is completed.",
      },
      { type: "h2", text: "Imprint names and the publisher of record" },
      {
        type: "p",
        text: "When you buy your own ISBNs, you can register them under an imprint name — the publishing name that appears on retailer listings and the copyright page. Many independent authors create a simple imprint so that their books are presented consistently. Whatever name you choose, the ISBN record should be accurate and kept up to date with the agency that issued it.",
      },
      { type: "h2", text: "Your ISBN checklist" },
      {
        type: "ol",
        items: [
          "Decide which formats you are publishing now and which you may add later.",
          "Choose whether to buy your own ISBNs or use a platform-assigned one, understanding the difference.",
          "Assign one ISBN to each format and record which is which.",
          "Register the title details with the issuing agency where required.",
          "Send the final print ISBN to your cover designer for the barcode.",
          "Add the ISBN to the copyright page of each edition.",
        ],
      },
      {
        type: "note",
        title: "Unsure which ISBN route suits you?",
        text: "We can explain the options for your formats and markets, and help you set everything up in your name.",
      },
    ],
  },
  {
    slug: "how-book-metadata-improves-discoverability",
    category: "Distribution",
    date: "2026-08-11",
    title: "How Book Metadata Improves Discoverability",
    excerpt:
      "Metadata is the information that describes your book to retailers and search systems. Getting it right helps the right readers find you.",
    intro:
      "Readers rarely find a book by its ISBN. They search for a topic, browse a category or follow a recommendation. Metadata is the information that makes those routes work — and it is one of the parts of publishing most within an author's control.",
    image: { src: unsplash("1768119997334-bc76e6f60e7d"), alt: "Rows of labelled archive drawers" },
    body: [
      { type: "h2", text: "What counts as metadata" },
      {
        type: "ul",
        items: [
          "Title, subtitle and series information.",
          "Author and contributor names, written consistently.",
          "The book description.",
          "Subject categories, often based on BISAC codes.",
          "Keywords entered on platforms that support them.",
          "Format, page count, language, price and publication date.",
        ],
      },
      { type: "h2", text: "Categories place you on the right shelf" },
      {
        type: "p",
        text: "Categories decide where your book appears when readers browse. A very broad category can bury a book among thousands of others; a category that does not truly fit can disappoint the readers who find it. The aim is accuracy first, then specificity.",
      },
      { type: "h2", text: "Keywords reflect how readers search" },
      {
        type: "p",
        text: "Good keywords describe the book the way a reader would: its setting, themes, tone or the problem it helps solve. Repeating words already in your title rarely adds much. Keywords should never mention other authors or titles you are not connected with.",
      },
      {
        type: "quote",
        text: "Metadata does not create demand on its own. It makes sure that when demand exists, your book can be found.",
      },
      { type: "h2", text: "Keep it consistent everywhere" },
      {
        type: "p",
        text: "Your author name, series title and book details should match across every retailer and on your own website. Small inconsistencies can split your listings or make your other books harder to find.",
      },
      { type: "h2", text: "Your description is metadata too" },
      {
        type: "p",
        text: "The book description is often treated as marketing copy alone, but it is also part of your metadata. It is read by retailers' search systems as well as by people. Clear language that reflects what your book is about helps both.",
      },
      { type: "h2", text: "Review it after launch" },
      {
        type: "p",
        text: "Metadata is not set in stone. If you discover that readers describe your book differently from the way you do, or that a category fits better than the one you chose, you can update many details after publication. Changes should be considered rather than constant, so that you can see what effect each one has.",
      },
      {
        type: "note",
        title: "Not sure your listing describes your book well?",
        text: "We can review your title details, categories, keywords and description, and suggest practical improvements.",
      },
    ],
  },
  {
    slug: "paperback-vs-hardcover-publishing",
    category: "Publishing",
    date: "2026-07-28",
    title: "Paperback vs. Hardcover: Choosing Your Print Formats",
    excerpt:
      "Paperback and hardcover editions serve different readers and purposes. Here is how to think about cost, presentation and which format to start with.",
    intro:
      "Print formats are not just a matter of taste. Paperbacks and hardcovers differ in production cost, retail price, durability and how readers use them. Many authors publish both, but it helps to understand the trade-offs first.",
    image: { src: unsplash("1506880018603-83d5b814b5a6"), alt: "A reader holding an open paperback in warm sunlight" },
    body: [
      { type: "h2", text: "Paperback: accessible and practical" },
      {
        type: "p",
        text: "Paperbacks are lighter, less expensive to print and usually priced lower. They suit most genres, from fiction to practical non-fiction, and are often the first print edition authors release.",
      },
      { type: "h2", text: "Hardcover: durable and presentational" },
      {
        type: "p",
        text: "Hardcovers cost more to produce and are priced accordingly. They are often chosen for gift books, memoirs, family histories, special editions and books expected to be kept and reread. Print-on-demand hardcovers are commonly available as case laminate (the design printed directly on the board) or with a dust jacket, depending on the platform.",
      },
      { type: "h2", text: "Design is not one-size-fits-all" },
      {
        type: "ul",
        items: [
          "Each format needs its own cover file, because spine widths and wraps differ.",
          "Interior margins may change with the trim size and binding.",
          "Each format normally needs its own ISBN.",
        ],
      },
      {
        type: "quote",
        text: "Start with the format your readers are most likely to buy, then add others when the book is ready for them.",
      },
      { type: "h2", text: "Questions to ask before deciding" },
      {
        type: "ol",
        items: [
          "Who is the reader, and how will they use this book?",
          "Will the higher price of a hardcover suit your audience?",
          "Is the book likely to be given as a gift?",
          "Do you need copies for events, libraries or family members?",
        ],
      },
      { type: "h2", text: "Trim size and page count" },
      {
        type: "p",
        text: "Trim size — the physical dimensions of the book — affects the page count, the print cost and how the book feels in the hand. Genres often have common trim sizes, and matching them helps your book sit naturally beside others. Changing the trim size changes the page count, which in turn changes the spine width on the cover.",
      },
      { type: "h2", text: "Don't forget the eBook" },
      {
        type: "p",
        text: "Many readers buy digital editions, and an eBook can be released alongside print editions. It needs its own file and cover image, but it can share the same edited text and design direction.",
      },
      {
        type: "note",
        title: "Deciding on formats?",
        text: "We can talk you through the options for your book and prepare files for each edition you choose.",
      },
    ],
  },
  {
    slug: "understanding-global-book-distribution",
    category: "Distribution",
    date: "2026-06-30",
    title: "Understanding Global Book Distribution",
    excerpt:
      "Distribution makes your book available to order through retailers, libraries and stores. It is important to understand what that does — and does not — mean.",
    intro:
      "Distribution is the system that makes your book available beyond a single website. For independent authors, it usually means listing print and digital editions through platforms that supply retailers and libraries in many countries.",
    image: { src: unsplash("1494412574643-ff11b0a5c1c3"), alt: "An aerial view of a busy international shipping port" },
    body: [
      { type: "h2", text: "How print-on-demand distribution works" },
      {
        type: "p",
        text: "With print-on-demand, copies are printed when an order is placed rather than stored in a warehouse. This removes the need to buy large print runs upfront, and allows a book to be listed with retailers and wholesalers in different regions.",
      },
      { type: "h2", text: "Availability is not the same as placement" },
      {
        type: "p",
        text: "When a book is distributed, bookstores and libraries can order it. That does not mean they will stock it on their shelves. Physical placement is a decision each store makes, often based on local demand, discounts, returns policies and relationships with the author or publisher.",
      },
      {
        type: "quote",
        text: "Distribution opens the door. Readers, events and local relationships are what bring a book through it.",
      },
      { type: "h2", text: "eBook and audiobook distribution" },
      {
        type: "p",
        text: "Digital editions can be distributed to multiple online stores and library platforms. Some programmes offer additional benefits in exchange for exclusivity, so it is worth understanding the terms before enrolling.",
      },
      { type: "h2", text: "Decisions you will make" },
      {
        type: "ul",
        items: [
          "Which territories to make the book available in.",
          "Pricing for each market and currency.",
          "Wholesale discount and returns settings for print editions.",
          "Whether to publish directly on some platforms and through a distributor on others.",
        ],
      },
      { type: "h2", text: "Publishing directly or through a distributor" },
      {
        type: "p",
        text: "Some authors publish directly with each major retailer. Others use a distributor that sends their book to many retailers at once. Many combine the two — for example, publishing directly on one platform and using a distributor for wider print availability. Each approach involves different dashboards, payment terms and update processes.",
      },
      { type: "h2", text: "Libraries" },
      {
        type: "p",
        text: "Libraries can often order print books through the same wholesale channels as bookstores, and some platforms make eBooks and audiobooks available to library services. As with stores, availability makes it possible for a library to acquire your book; it does not mean it will.",
      },
      {
        type: "note",
        title: "Planning where your book should be available?",
        text: "We can explain the options for your formats and goals, and help set up distribution in your name.",
      },
    ],
  },
  {
    slug: "choosing-the-right-book-cover-direction",
    category: "Book Design",
    date: "2026-09-15",
    title: "How to Choose the Right Book Cover Direction",
    excerpt:
      "A cover needs to tell readers what kind of book they are looking at in a single glance. Here is how to brief and judge a cover with that in mind.",
    intro:
      "Readers decide quickly whether a book might be for them, and the cover does much of that work. A strong cover is not necessarily the most original image — it is the one that communicates genre, tone and promise clearly to the right reader.",
    image: {
      src: "/portfolio/portfolio-mockup-3books.webp",
      alt: "Three hardcover books from the Blue Book Press portfolio",
      width: 1068,
      height: 1472,
    },
    body: [
      { type: "h2", text: "Start with your genre" },
      {
        type: "p",
        text: "Every genre has visual conventions — typography, colour, imagery and composition that readers recognise. Look at recently published books in your category and note what they share. Your cover should feel at home among them while still being distinctly yours.",
      },
      { type: "h2", text: "Brief the designer clearly" },
      {
        type: "ul",
        items: [
          "Genre and sub-genre, plus a few comparable recent titles.",
          "The tone: dark, warm, playful, serious, romantic or practical.",
          "Key themes, settings or symbols, without trying to fit in every plot detail.",
          "Formats needed: eBook, paperback, hardcover.",
          "Title, subtitle, series name and author name exactly as they should appear.",
        ],
      },
      {
        type: "quote",
        text: "A cover is a promise to the reader. It should be an accurate one.",
      },
      { type: "h2", text: "Test it at thumbnail size" },
      {
        type: "p",
        text: "Many readers first see a cover as a small image in search results. Check that the title is legible and the overall shape still reads clearly when the image is reduced.",
      },
      { type: "h2", text: "Think beyond the front" },
      {
        type: "p",
        text: "Print covers include a spine and back cover with the description, author information and barcode. A consistent look across a series also helps readers recognise your books together.",
      },
      { type: "h2", text: "Common cover pitfalls" },
      {
        type: "ul",
        items: [
          "Trying to show too many plot details in one image.",
          "Typography that is too thin or too small to read on a phone screen.",
          "Using images without the correct licence for commercial use.",
          "Following a personal favourite style that does not match the genre.",
          "Designing the front only, then struggling to fit the spine and back.",
        ],
      },
      { type: "h2", text: "Reviewing concepts" },
      {
        type: "p",
        text: "When you see first concepts, resist judging them only on personal taste. Ask whether a reader of your genre would immediately understand what kind of book this is. View each option small and large, and in black and white, to test its contrast and shape. Give your designer specific feedback — what feels right, what feels off, and why.",
      },
      {
        type: "note",
        title: "Planning a cover or a redesign?",
        text: "Our designers can help you set a clear direction for your genre before any concepts are drawn.",
      },
    ],
  },
  {
    slug: "how-professional-formatting-improves-readability",
    category: "Book Design",
    date: "2026-06-16",
    title: "How Professional Formatting Improves Readability",
    excerpt:
      "Good interior formatting is mostly invisible. Readers simply find the book easy to read. Here is what goes into that experience.",
    intro:
      "Interior formatting turns a manuscript file into pages a reader can comfortably spend hours with. When it is done well, nobody notices it. When it is not, readers notice immediately — even if they cannot say exactly why.",
    image: { src: unsplash("1594305342010-1f62e803490f"), alt: "A clean, typeset book page in soft light" },
    body: [
      { type: "h2", text: "The elements of a readable page" },
      {
        type: "ul",
        items: [
          "A typeface chosen for long reading, at a comfortable size.",
          "Line spacing that lets the eye move easily from one line to the next.",
          "Margins that keep text away from the binding and the edge of the page.",
          "Consistent chapter openings, headings and scene breaks.",
          "Careful handling of widows, orphans and awkward hyphenation.",
        ],
      },
      { type: "h2", text: "Print and eBook are different" },
      {
        type: "p",
        text: "A print interior is fixed: every page is designed exactly as it will be printed. eBooks usually reflow, adapting to the reader's screen and font settings. Each needs its own preparation, and a print PDF is not a substitute for a properly built eBook file.",
      },
      {
        type: "quote",
        text: "Formatting is where a manuscript starts to feel like a book.",
      },
      { type: "h2", text: "Front and back matter" },
      {
        type: "p",
        text: "Title page, copyright page, dedication, table of contents, acknowledgements and author biography all need consistent styling. These pages also carry practical information, such as the ISBN and edition details.",
      },
      { type: "h2", text: "Common formatting problems" },
      {
        type: "ul",
        items: [
          "Text running too close to the spine, making it hard to read.",
          "Inconsistent spacing between paragraphs or after headings.",
          "Chapters starting in different places on the page.",
          "Blank pages or page numbers appearing where they should not.",
          "Images that look sharp on screen but print blurry.",
        ],
      },
      { type: "h2", text: "Special content needs extra care" },
      {
        type: "p",
        text: "Books with photographs, illustrations, tables, recipes, poetry or footnotes need particular attention. Each element should be placed so that it supports the text, and print images need to be high enough in resolution to reproduce well.",
      },
      {
        type: "note",
        title: "Is your manuscript ready for layout?",
        text: "We prepare print and eBook files to platform specifications, with interiors designed for comfortable reading.",
      },
    ],
  },
  {
    slug: "what-makes-an-effective-book-description",
    category: "Marketing",
    date: "2026-08-04",
    title: "What Makes an Effective Book Description",
    excerpt:
      "Your book description has one job: to help the right reader decide this book is for them. Here is how to write one that does it well.",
    intro:
      "A book description appears on your back cover and on every retailer page. It is often the last thing a reader reads before deciding whether to buy, so it deserves as much care as the opening chapter.",
    image: { src: unsplash("1736147936383-8eb3d7b83d7b"), alt: "A reader browsing the shelves of a bookshop" },
    body: [
      { type: "h2", text: "Lead with what the reader cares about" },
      {
        type: "p",
        text: "For fiction, that is usually the character, the situation and what is at stake. For non-fiction, it is the problem the book addresses and what the reader will gain. Background details can wait.",
      },
      { type: "h2", text: "Keep it focused" },
      {
        type: "ul",
        items: [
          "Introduce only the most important characters or ideas.",
          "Avoid summarising the whole plot; create curiosity instead.",
          "Match the tone of the book — a thriller should not read like a textbook.",
          "Use short paragraphs so the text is easy to scan on a screen.",
        ],
      },
      {
        type: "quote",
        text: "A description is not a summary. It is an invitation.",
      },
      { type: "h2", text: "Be honest" },
      {
        type: "p",
        text: "Avoid claims that the book cannot support. A description that sets accurate expectations attracts readers who are more likely to enjoy the book.",
      },
      { type: "h2", text: "A simple structure to start from" },
      {
        type: "ol",
        items: [
          "An opening line that captures the core situation, question or promise.",
          "One or two short paragraphs that build interest — the stakes, the conflict or the benefit.",
          "A closing line that gives the reader a reason to start now.",
        ],
      },
      {
        type: "p",
        text: "This is a starting point, not a formula. Some genres suit a short, punchy description; others suit a calmer, more detailed approach.",
      },
      { type: "h2", text: "Formatting for screens" },
      {
        type: "p",
        text: "Most readers will see your description on a phone. Short paragraphs, a strong first line and occasional emphasis make it easier to read. Avoid long blocks of text and excessive capital letters.",
      },
      { type: "h2", text: "Test it on real readers" },
      {
        type: "p",
        text: "Ask a few people who read your genre to read only your description and tell you what kind of book they expect. If their answer matches your book, the description is doing its job.",
      },
      {
        type: "note",
        title: "Need help with your book description?",
        text: "We write descriptions and author bios tailored to your genre, always reviewed and approved by you.",
      },
    ],
  },
  {
    slug: "preparing-a-book-for-amazon-kdp",
    category: "Publishing",
    date: "2026-07-07",
    title: "Preparing a Book for Amazon KDP",
    excerpt:
      "Kindle Direct Publishing lets authors publish eBooks and print books on Amazon. Here is what to have ready before you start the setup.",
    intro:
      "Amazon Kindle Direct Publishing (KDP) is one of the most widely used platforms for independent authors. The setup itself is straightforward, but the quality of what you upload — and the details you enter — shape how your book appears to readers.",
    image: { src: unsplash("1688561808434-886a6dd97b8c"), alt: "A reader browsing an online store on a laptop" },
    body: [
      { type: "h2", text: "Set up your own account" },
      {
        type: "p",
        text: "Your KDP account should be in your name, with your own tax and payment details. This keeps the account, the listing and the royalties under your control. If someone helps you, they can guide you through the setup without the account belonging to them.",
      },
      { type: "h2", text: "Files you will need" },
      {
        type: "ul",
        items: [
          "An eBook file built for reflowable reading.",
          "A print-ready interior PDF at your chosen trim size.",
          "A full cover file for print, with the spine width calculated from the final page count.",
          "A front cover image for the eBook edition.",
        ],
      },
      { type: "h2", text: "Details you will enter" },
      {
        type: "ol",
        items: [
          "Title, subtitle, series and edition information.",
          "Author and contributor names.",
          "Description, categories and keywords.",
          "ISBN for print editions.",
          "Pricing, territories and royalty options.",
        ],
      },
      {
        type: "quote",
        text: "Order a printed proof before you publish. Some issues only show up on paper.",
      },
      { type: "h2", text: "Understand the options before you enrol" },
      {
        type: "p",
        text: "KDP offers optional programmes, such as KDP Select for eBooks, which require exclusivity for a set period. Read the current terms carefully and decide based on where you want your book to be available.",
      },
      { type: "h2", text: "Preview everything" },
      {
        type: "p",
        text: "KDP provides previewers for both eBooks and print books. Use them to check every page: chapter openings, images, tables, page numbers and how the cover sits around the spine. Look at the eBook on more than one device size if you can.",
      },
      { type: "h2", text: "After you publish" },
      {
        type: "ul",
        items: [
          "Check the live listing carefully — title, author name, description and formats.",
          "Make sure your editions are linked together on the same product page.",
          "Set up your author page so readers can find your biography and other books.",
          "Keep a record of your files, ISBNs and settings for future updates.",
        ],
      },
      {
        type: "note",
        title: "Would you like help with KDP?",
        text: "We can prepare your files and guide or handle the setup, while the account stays in your name.",
      },
    ],
  },
  {
    slug: "how-a-plus-content-supports-a-book-listing",
    category: "Marketing",
    date: "2026-05-26",
    title: "How A+ Content Supports a Book Listing",
    excerpt:
      "A+ Content adds images and formatted text to an Amazon product page. Used well, it gives readers a richer sense of your book.",
    intro:
      "A+ Content is a feature that lets authors and publishers add visual modules — images, comparison charts and formatted text — to their Amazon book listing. It appears further down the product page and can help a curious reader learn more before buying.",
    image: { src: unsplash("1609921212029-bb5a28e60960"), alt: "A designer's screen showing a grid of visual layout panels" },
    body: [
      { type: "h2", text: "What it can show" },
      {
        type: "ul",
        items: [
          "The mood or setting of a novel through imagery and short quotes from the book.",
          "Key topics or takeaways for non-fiction.",
          "Other books in a series, so readers can see the order.",
          "A brief introduction to the author.",
        ],
      },
      { type: "h2", text: "Design for the listing, not the cover" },
      {
        type: "p",
        text: "Modules have specific image sizes and should be readable on mobile screens. Text inside images needs to be large and minimal. The visual style should feel consistent with your cover.",
      },
      {
        type: "quote",
        text: "A+ Content works best when it answers the question a reader has after reading the description.",
      },
      { type: "h2", text: "Follow the guidelines" },
      {
        type: "p",
        text: "Amazon reviews A+ Content before it appears and has content guidelines — for example, around pricing, time-sensitive promotions, external links and reviews. Checking these before designing saves revisions later.",
      },
      { type: "h2", text: "Planning your modules" },
      {
        type: "ol",
        items: [
          "Decide the single most important thing a reader should take away.",
          "Choose two or three modules that support that message.",
          "Write short text first, then design images around it.",
          "Check every module on a phone-sized screen before submitting.",
        ],
      },
      { type: "h2", text: "Keep it current" },
      {
        type: "p",
        text: "If you release a new book in a series or update your cover, review your A+ Content too, so the listing stays accurate and consistent.",
      },
      {
        type: "note",
        title: "Interested in A+ Content for your book?",
        text: "We design A+ modules that match your cover and follow Amazon's guidelines.",
      },
    ],
  },
  {
    slug: "building-an-author-brand",
    category: "Author Branding",
    date: "2026-09-01",
    title: "Building an Author Brand Readers Recognise",
    excerpt:
      "An author brand is simply what readers come to expect from you. Here is how to make it clear, consistent and sustainable.",
    intro:
      "“Author brand” can sound like marketing jargon, but the idea is simple: readers should be able to recognise you and understand what kind of books you write. A clear brand makes every later book, post and event easier to connect.",
    image: { src: unsplash("1499951360447-b19be8fe80f5"), alt: "A bright author workspace with a laptop and desktop monitor" },
    body: [
      { type: "h2", text: "Start with what your books promise" },
      {
        type: "p",
        text: "What do readers feel or gain when they read your work? Suspense, comfort, insight, faith, humour? That promise is the foundation of your brand, and it should be visible in your covers, descriptions and online presence.",
      },
      { type: "h2", text: "The essentials" },
      {
        type: "ul",
        items: [
          "A consistent author name across every book and platform.",
          "A professional author photo and a short biography.",
          "A simple website that lists your books and how to reach you.",
          "A visual style that connects your covers and online profiles.",
        ],
      },
      {
        type: "quote",
        text: "Consistency builds recognition. Recognition builds trust.",
      },
      { type: "h2", text: "Choose channels you can sustain" },
      {
        type: "p",
        text: "You do not need to be everywhere. One or two channels you can maintain comfortably are more valuable than many you abandon after a few weeks.",
      },
      { type: "h2", text: "Your website is your home base" },
      {
        type: "p",
        text: "Social platforms change their rules and reach. A simple author website — your name, your books, where to buy them, a short biography and a way to contact you — is something you control. Even a single, well-organised page is better than nothing.",
      },
      { type: "h2", text: "A quick consistency check" },
      {
        type: "ul",
        items: [
          "Is your author name written the same way on every cover and listing?",
          "Do your profile photo and bio match across platforms?",
          "Do your covers look like they belong to the same author, especially within a series?",
          "Can a new reader find your other books in one or two clicks?",
        ],
      },
      { type: "h2", text: "Let the brand grow with your books" },
      {
        type: "p",
        text: "Your brand does not need to be fixed forever. As you publish more, you will learn what readers respond to. Adjust gradually, keeping enough continuity that existing readers still recognise you.",
      },
      {
        type: "note",
        title: "Building your presence as an author?",
        text: "We can help with author websites, bios and a consistent visual identity across your books.",
      },
    ],
  },
  {
    slug: "how-to-write-an-author-bio",
    category: "Author Branding",
    date: "2026-05-12",
    title: "How to Write an Author Bio Readers Remember",
    excerpt:
      "A short author bio introduces you to readers. Here is what to include, what to leave out, and why you may need more than one version.",
    intro:
      "Your author bio appears on your book, your retailer pages, your website and in press materials. It should be short, genuine and relevant to the book a reader is looking at.",
    image: { src: unsplash("1504542227056-9178533a9175"), alt: "A notebook and pen on a quiet white desk" },
    body: [
      { type: "h2", text: "What to include" },
      {
        type: "ul",
        items: [
          "Who you are, in relation to the book.",
          "Relevant experience or expertise, especially for non-fiction.",
          "A personal detail that connects with your readers.",
          "Where readers can find more of your work.",
        ],
      },
      { type: "h2", text: "Write more than one length" },
      {
        type: "p",
        text: "A one-line bio works for social profiles. A short paragraph suits the back cover and retailer pages. A longer version is useful for your website and press enquiries.",
      },
      {
        type: "quote",
        text: "Write your bio in the same voice readers will meet in your book.",
      },
      { type: "h2", text: "Keep it accurate" },
      {
        type: "p",
        text: "Only include credentials and achievements you can stand behind. Update your bio as your work grows.",
      },
      { type: "h2", text: "First person or third person?" },
      {
        type: "p",
        text: "Most book bios are written in the third person (“Jane Smith lives in…”), which reads naturally on covers and in press materials. A first-person bio can feel warmer on a personal website. Choose one style for each place it appears and use it consistently.",
      },
      { type: "h2", text: "A simple structure" },
      {
        type: "ol",
        items: [
          "Your name and what you write.",
          "The experience or perspective that connects you to this book.",
          "One human detail — where you live, what you love, what inspires you.",
          "Where readers can find you.",
        ],
      },
      { type: "h2", text: "Pair it with a good photo" },
      {
        type: "p",
        text: "A clear, recent author photo helps readers connect a face to your name. It does not need to be formal, but it should be well lit and suit the tone of your books.",
      },
    ],
  },
  {
    slug: "planning-a-book-marketing-campaign",
    category: "Marketing",
    date: "2026-06-02",
    title: "Planning a Book Marketing Campaign",
    excerpt:
      "Marketing works better as a plan than as a scramble. Here is a simple structure for thinking through a campaign before and after launch.",
    intro:
      "Book marketing does not have to be overwhelming. A practical campaign starts with knowing who the book is for, chooses a few realistic activities, and gives them enough time to work.",
    image: { src: unsplash("1634245482394-1bcf5ccffcc0"), alt: "An author mapping out a marketing plan on paper beside a keyboard" },
    body: [
      { type: "h2", text: "Define your reader" },
      {
        type: "p",
        text: "Be as specific as you can: what else do they read, where do they find books, what problem or pleasure brings them to yours? Every later decision depends on this.",
      },
      { type: "h2", text: "Get the foundations right first" },
      {
        type: "ul",
        items: [
          "A cover and description that suit the genre.",
          "Accurate categories and keywords.",
          "An author page and website that are ready before launch.",
        ],
      },
      { type: "h2", text: "Choose a few activities" },
      {
        type: "ol",
        items: [
          "Pre-launch: share the cover, build an email list, arrange early readers.",
          "Launch: announce to your audience, coordinate any promotions or events.",
          "After launch: continue with steady activity, such as advertising tests, articles or local events.",
        ],
      },
      {
        type: "quote",
        text: "No campaign can guarantee sales. A good one makes sure interested readers can find the book and understand why it is for them.",
      },
      { type: "h2", text: "Review and adjust" },
      {
        type: "p",
        text: "Decide in advance what you will look at to judge each activity — clicks, sign-ups, enquiries — and adjust based on what you learn rather than on assumptions.",
      },
      { type: "h2", text: "Budget realistically" },
      {
        type: "p",
        text: "Decide in advance how much time and money you can commit, and spread it across the weeks before and after launch rather than spending it all at once. Paid advertising, if you use it, is best approached with small tests before larger commitments.",
      },
      { type: "h2", text: "Use channels you own" },
      {
        type: "p",
        text: "An email list is one of the few channels where you control the relationship with your readers. Even a small list of people who genuinely want to hear about your books can be valuable for future launches.",
      },
      {
        type: "note",
        title: "Planning a launch?",
        text: "We can help you build a realistic marketing plan that suits your book, your readers and your budget.",
      },
    ],
  },
  {
    slug: "common-self-publishing-mistakes",
    category: "Publishing",
    date: "2026-05-05",
    title: "Common Self-Publishing Mistakes and How to Avoid Them",
    excerpt:
      "Most self-publishing problems are avoidable with a little planning. Here are the issues we see most often, and simple ways to prevent them.",
    intro:
      "Self-publishing gives authors control over every decision. That freedom is valuable, but it also means there is no one to catch problems unless you plan for them.",
    image: { src: unsplash("1527219525722-f9767a7f2884"), alt: "Planning notes and sticky notes laid over a printed document" },
    body: [
      { type: "h2", text: "Skipping professional editing" },
      {
        type: "p",
        text: "Even experienced writers miss errors in their own work. At a minimum, a copy edit and a proofread help prevent distracting mistakes.",
      },
      { type: "h2", text: "A cover that does not fit the genre" },
      {
        type: "p",
        text: "A beautiful cover that signals the wrong genre can attract the wrong readers — or none at all.",
      },
      { type: "h2", text: "Rushing the publishing details" },
      {
        type: "ul",
        items: [
          "Choosing categories that do not fit the book.",
          "Using a platform-supplied ISBN without understanding what it means for your imprint.",
          "Skipping a printed proof copy.",
          "Setting up accounts in someone else's name.",
        ],
      },
      {
        type: "quote",
        text: "The time to fix a problem is before the book is live, not after the first reviews arrive.",
      },
      { type: "h2", text: "Expecting launch day to do everything" },
      {
        type: "p",
        text: "Publishing makes a book available. Readers still need to discover it, which takes ongoing, realistic effort.",
      },
      { type: "h2", text: "Formatting shortcuts" },
      {
        type: "p",
        text: "Uploading a word-processor file without proper formatting can lead to inconsistent spacing, poor eBook layout and print files that are rejected or look amateur. Professional formatting, or at least careful use of good tools, avoids these issues.",
      },
      { type: "h2", text: "Pricing without research" },
      {
        type: "p",
        text: "Look at how comparable books in your genre and format are priced. Pricing too high can deter new readers; pricing too low can undervalue the work. Consider each format separately.",
      },
      { type: "h2", text: "Losing control of your accounts" },
      {
        type: "p",
        text: "If someone else sets up your publishing accounts in their name, it can be difficult to update your book or receive your royalties later. Make sure every account is in your name, with your own login and payment details.",
      },
      {
        type: "note",
        title: "Want a second pair of eyes before you publish?",
        text: "We can review your plan and files and flag issues before your book goes live.",
      },
    ],
  },
];

/** Words per minute used for reading-time estimates (rounded up). */
const WPM = 200;
const words = (s: string) => s.trim().split(/\s+/).length;
function readingMinutes(d: Draft) {
  const total =
    words(d.intro) +
    d.body.reduce((n, b) => {
      if ("items" in b) return n + b.items.reduce((m, i) => m + words(i), 0);
      if (b.type === "note") return n + words(b.title) + words(b.text);
      return n + words(b.text);
    }, 0);
  return Math.max(2, Math.ceil(total / WPM));
}

/** Newest first. */
export const articles: Article[] = drafts
  .map((d) => ({ ...d, readMinutes: readingMinutes(d) }))
  .sort((a, b) => b.date.localeCompare(a.date));

export const featuredArticle = articles.find((a) => a.featured) ?? articles[0];

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);

export const articleHref = (a: Pick<Article, "slug">) => `/author-resources/${a.slug}`;

/** Related reads: same category first, then the most recent others. */
export function relatedArticles(a: Article, count = 3) {
  const others = articles.filter((x) => x.slug !== a.slug);
  return [...others.filter((x) => x.category === a.category), ...others.filter((x) => x.category !== a.category)].slice(0, count);
}

export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

/** Stable anchor ids for article subheadings (table of contents). */
export const headingId = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
