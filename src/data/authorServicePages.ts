/**
 * Content for the ten Author Services solo pages. Each page explains its
 * service in the same order a visitor needs it: the problem → how we handle
 * it → what improves → what is included → before/after → what you receive.
 * Section order, layout variants, the hero glyph and the before/after kind
 * differ per page so no two pages read as the same template.
 *
 * Photography: Unsplash (free licence), verified by ID.
 */

export type ASImage = { src: string; alt: string };

export type ASSection = "solves" | "handles" | "improves" | "details" | "beforeAfter" | "outcome";

export type BeforeAfter =
  | { kind: "text"; before: string; after: string }
  | { kind: "fields"; rows: { label: string; before: string; after: string }[] }
  | { kind: "page"; focus: "body" | "opener" }
  | { kind: "cover"; title: string; author: string; cover: string };

export type AuthorServicePage = {
  hero: {
    purpose: string;
    /** Oversized typographic mark drifting behind the heading. */
    glyph: string;
  };
  solves: {
    variant: "split" | "manifesto";
    title: string;
    intro: string;
    problems: { title: string; text: string }[];
    image?: ASImage;
  };
  handles: {
    variant: "flow" | "stack";
    title: string;
    intro: string;
    steps: { title: string; text: string }[];
  };
  improves: {
    variant: "words" | "image";
    title: string;
    intro: string;
    qualities: { word: string; text: string }[];
    image?: ASImage;
  };
  details: {
    title: string;
    intro: string;
    groups: { title: string; items: string[] }[];
    image?: ASImage;
  };
  beforeAfter: {
    title: string;
    intro: string;
    sample: BeforeAfter;
    notes: { before: string[]; after: string[] };
  };
  outcome: {
    title: string;
    text: string;
    receive: string[];
    benefits: { title: string; text: string }[];
  };
  cta: { title: string; text: string; next: string[] };
  /** Middle-section order; defaults to the list in ASSection order. */
  order?: ASSection[];
};

const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1800&q=80`;

export const authorServicePages: Record<string, AuthorServicePage> = {
  // ── Editing & Proofreading ───────────────────────────────────────────────
  "editing-proofreading": {
    hero: {
      purpose: "A complete editorial polish that corrects every error and sharpens every sentence, while your voice stays yours.",
      glyph: "¶",
    },
    solves: {
      variant: "split",
      title: "Small errors cost big trust.",
      intro:
        "Readers forgive a lot, but not a book that feels careless. After months of writing, authors simply stop seeing their own mistakes: the eye reads what it expects, not what is on the page.",
      problems: [
        { title: "Errors you can no longer see", text: "Typos, missing words and doubled words survive every self-edit because you know what the sentence should say." },
        { title: "Clarity that slips under pressure", text: "Long or tangled sentences make readers re-read, and a re-read is where attention is lost." },
        { title: "Reviews that mention mistakes", text: "One review saying “needed an editor” follows a book for years and quietly lowers its rating." },
        { title: "Last-minute changes, new mistakes", text: "Fixes made in the final weeks often introduce fresh errors just before the book goes to print." },
      ],
      image: { src: unsplash("1581431886288-e216ea4ccf3f"), alt: "A hand marking a printed page with a red pencil" },
    },
    handles: {
      variant: "flow",
      title: "Two careful passes, one clean book.",
      intro: "Editing improves the text; proofreading protects it. We do both, in that order, so nothing is fixed twice.",
      steps: [
        { title: "Manuscript review", text: "We read a sample, agree your style preferences (spelling, dialogue, numbers) and set a clear schedule." },
        { title: "Editing pass", text: "Grammar, clarity, word choice and consistency are corrected with tracked changes and short explanations." },
        { title: "Your review", text: "You accept or reject each change. Questions are answered in the margins, not in jargon." },
        { title: "Final proofread", text: "A fresh editor reads the clean text, catching anything that slipped through or crept in during revisions." },
      ],
    },
    improves: {
      variant: "words",
      title: "What your pages gain.",
      intro: "The story and the ideas stay exactly yours. What changes is how easily a reader moves through them.",
      qualities: [
        { word: "Accuracy", text: "Spelling, grammar and punctuation corrected throughout, consistently." },
        { word: "Clarity", text: "Sentences untangled so each one says one thing well." },
        { word: "Consistency", text: "Names, spellings, capitals and numbers handled the same way on every page." },
        { word: "Confidence", text: "A manuscript you can send to print without that nagging doubt." },
      ],
    },
    details: {
      title: "Exactly what is included.",
      intro: "A complete pass for books that are structurally sound and ready for their final polish.",
      groups: [
        { title: "Editing", items: ["Grammar, spelling and punctuation", "Clarity and sentence flow", "Word choice and repetition", "Consistency of names, terms and style", "Queries where meaning is unclear"] },
        { title: "Proofreading", items: ["A separate final read by a fresh editor", "Missed and introduced errors caught", "Formatting slips in the text flagged", "Final sign-off before layout"] },
        { title: "You also get", items: ["A personal style sheet for your book", "Tracked changes in Word", "A clean, accepted final file"] },
      ],
      image: { src: unsplash("1532153975070-2e9ab71f1b14"), alt: "Printed manuscript pages spread across a table" },
    },
    beforeAfter: {
      title: "The same paragraph, after a careful edit.",
      intro: "Nothing about the scene changed, only the errors that would have pulled a reader out of it.",
      sample: {
        kind: "text",
        before:
          "Their was only one light left on in the house when Mara got home, she stood at the gate for along time wondering weather to go in. The rain had stopped but the the path was still wet, and slippery.",
        after:
          "There was only one light left on in the house when Mara got home. She stood at the gate for a long time, wondering whether to go in. The rain had stopped, but the path was still wet and slippery.",
      },
      notes: {
        before: ["“Their” for “there”", "Run-on sentence", "“along”, “weather”, doubled “the”"],
        after: ["Correct word choices", "Sentences split for rhythm", "Clean, natural punctuation"],
    },
    },
    outcome: {
      title: "A manuscript ready for design.",
      text: "You finish with a clean, approved file and a record of every style decision, so your formatter and future editions follow the same rules.",
      receive: ["Edited manuscript with tracked changes", "Clean final manuscript", "Proofread sign-off", "Personal style sheet", "Editor's short summary note"],
      benefits: [
        { title: "Reader trust", text: "Readers stay in the story instead of noticing the mistakes." },
        { title: "Better reviews", text: "Remove the most common complaint in self-published reviews." },
        { title: "A smoother production", text: "Layout starts from a final text, so no costly re-typesetting." },
      ],
    },
    cta: {
      title: "Ready for a cleaner manuscript?",
      text: "Send us a sample chapter. We will confirm the right level of edit and a clear timeline.",
      next: ["book-formatting", "copy-editing"],
    },
  },

  // ── Developmental Editing ────────────────────────────────────────────────
  "developmental-editing": {
    hero: {
      purpose: "Big-picture guidance on structure, pacing and story so your draft becomes the book you meant to write.",
      glyph: "§",
    },
    solves: {
      variant: "manifesto",
      title: "Most drafts don't fail on sentences. They fail on shape.",
      intro:
        "A beautifully written book can still lose readers if the structure sags, the stakes blur or the argument wanders. These are problems you can't proofread away, and they are the hardest to see from inside your own draft.",
      problems: [
        { title: "A slow or crowded opening", text: "Backstory and set-up delay the moment a reader starts to care." },
        { title: "A sagging middle", text: "Chapters repeat beats, subplots stall and momentum quietly drains away." },
        { title: "Unclear stakes or argument", text: "Readers can't say what the character wants, or what the book is trying to prove." },
        { title: "An ending that doesn't land", text: "The payoff doesn't match the promise the first chapters made." },
      ],
    },
    handles: {
      variant: "stack",
      title: "How a developmental edit works.",
      intro: "We read the whole book as your future reader would, then map exactly where it holds them and where it lets go.",
      steps: [
        { title: "Goals conversation", text: "We discuss your intended reader, genre expectations and what you most want the book to do." },
        { title: "Full manuscript read", text: "An editor reads the complete draft, tracking structure, pacing, character or argument chapter by chapter." },
        { title: "Structural map", text: "We chart the book's shape (turning points, chapter purposes, reader journey) to show where it bends." },
        { title: "Editorial letter and notes", text: "A detailed letter explains the big changes in priority order, with margin notes showing where they apply." },
        { title: "Revision call", text: "We talk the plan through with you and answer questions before you start revising." },
      ],
    },
    improves: {
      variant: "image",
      title: "The changes a reader feels.",
      intro: "Developmental editing works on the architecture: the decisions that decide whether someone finishes your book.",
      qualities: [
        { word: "Structure", text: "Every chapter earns its place and moves the book forward." },
        { word: "Pacing", text: "Tension rises where it should, and quiet scenes feel deliberate, not slow." },
        { word: "Clarity of purpose", text: "Plot, character arcs or argument read as one clear line from first page to last." },
        { word: "Reader journey", text: "Questions are raised and answered at the right moments, so readers keep turning pages." },
      ],
      image: { src: unsplash("1720411270946-7a530fd12dc9"), alt: "A writer mapping a story on a wall of sticky notes" },
    },
    details: {
      title: "What the edit covers.",
      intro: "For fiction and non-fiction drafts that are complete but not yet working as a whole.",
      groups: [
        { title: "For fiction", items: ["Plot structure and turning points", "Character goals, arcs and motivation", "Point of view and narrative distance", "Scene purpose and chapter flow", "Openings, midpoints and endings"] },
        { title: "For non-fiction", items: ["Argument and chapter order", "Reader promise and payoff", "Evidence, examples and repetition", "Section structure and signposting"] },
        { title: "Delivered as", items: ["A detailed editorial letter", "Margin notes throughout the manuscript", "Chapter-by-chapter structural map", "A follow-up revision call"] },
      ],
      image: { src: unsplash("1527219525722-f9767a7f2884"), alt: "Planning notes and sticky notes laid over a printed document" },
    },
    beforeAfter: {
      title: "How the shape of a draft changes.",
      intro: "An illustrative example of the structural changes an editorial letter might recommend for a novel.",
      sample: {
        kind: "fields",
        rows: [
          { label: "Opening", before: "Fourteen pages of family history before anything happens", after: "Opens the night Mara returns home; history woven in later" },
          { label: "Stakes", before: "Her goal is unclear until chapter six", after: "The locked room and the deadline set by chapter one" },
          { label: "Middle", before: "Three chapters repeat the same argument with her brother", after: "Merged into one turning-point scene that changes the plan" },
          { label: "Ending", before: "The secret is revealed in a letter she reads alone", after: "She uncovers it herself, paying off the opening promise" },
        ],
      },
      notes: {
        before: ["Slow start", "Repeated beats", "Passive climax"],
        after: ["Hook in chapter one", "Every chapter turns", "Earned ending"],
    },
    },
    outcome: {
      title: "A clear plan for a stronger book.",
      text: "You come away knowing exactly what to revise, in what order, and why, with an editor's reasoning you can return to throughout the rewrite.",
      receive: ["Detailed editorial letter", "Annotated manuscript", "Structural chapter map", "Prioritised revision plan", "Follow-up revision call"],
      benefits: [
        { title: "Revise with direction", text: "Spend rewrite time on the changes that matter most." },
        { title: "Learn your craft", text: "The letter explains the why, so the lessons carry into every book." },
        { title: "Fewer costly rounds", text: "Fix the foundation before paying for sentence-level edits." },
      ],
    },
    cta: {
      title: "Let's find the book inside your draft.",
      text: "Tell us about your manuscript and what feels unfinished. We will recommend whether a developmental edit is the right first step.",
      next: ["line-editing", "editing-proofreading"],
    },
    order: ["solves", "improves", "handles", "beforeAfter", "details", "outcome"],
  },

  // ── Line Editing ──────────────────────────────────────────────────────────
  "line-editing": {
    hero: {
      purpose: "Sentence-by-sentence refinement of rhythm, word choice and tone, so your prose reads with confidence on every page.",
      glyph: "“",
    },
    solves: {
      variant: "split",
      title: "The story works. The sentences don't, yet.",
      intro:
        "Line editing is for manuscripts whose structure is sound but whose prose feels heavy, flat or uneven. It is the difference between a book readers finish and a book readers recommend.",
      problems: [
        { title: "Wordy, padded sentences", text: "Filler words and doubled descriptions slow every page down." },
        { title: "Flat rhythm", text: "Sentences of the same length and shape make even dramatic moments feel monotone." },
        { title: "Telling, not showing", text: "Emotions are named instead of felt, keeping readers at a distance." },
        { title: "A voice that drifts", text: "Tone shifts between chapters written months apart." },
      ],
      image: { src: unsplash("1580127645995-d43fe9598711"), alt: "A fountain pen resting on a handwritten page" },
    },
    handles: {
      variant: "stack",
      title: "How we refine every line.",
      intro: "Line editing is close, collaborative work. We edit, explain and leave every final choice with you.",
      steps: [
        { title: "Voice sample", text: "We edit your first pages and agree on how lightly or firmly to work before going further." },
        { title: "Line-by-line edit", text: "Every sentence is tightened for rhythm, precision and tone, with tracked changes throughout." },
        { title: "Margin explanations", text: "Comments show why a change helps, so you can apply the same instinct elsewhere." },
        { title: "Voice consistency read", text: "A final pass checks that tone and style hold steady from first chapter to last." },
      ],
    },
    improves: {
      variant: "words",
      title: "Prose that carries the reader.",
      intro: "The meaning stays the same. The experience of reading it changes completely.",
      qualities: [
        { word: "Rhythm", text: "Varied sentence length and shape that matches the mood of each scene." },
        { word: "Precision", text: "The exact word in place of three approximate ones." },
        { word: "Voice", text: "A consistent, recognisable style from opening line to final page." },
        { word: "Immersion", text: "Fewer distractions between the reader and the world of the book." },
      ],
    },
    details: {
      title: "What a line edit includes.",
      intro: "Best for complete drafts after any structural revision, before copy editing.",
      groups: [
        { title: "Sentence craft", items: ["Wordiness and filler removed", "Sentence variety and rhythm", "Stronger verbs and precise nouns", "Clichés and repetition flagged"] },
        { title: "Voice and tone", items: ["Consistent narrative voice", "Dialogue that sounds like each character", "Tone matched to genre and scene", "Show-don't-tell opportunities"] },
        { title: "Working method", items: ["Tracked changes in Word", "Explanatory margin comments", "Sample edit agreed first", "Light grammar fixes along the way"] },
      ],
      image: { src: unsplash("1455390582262-044cdead277a"), alt: "A fountain pen writing on lined paper" },
    },
    beforeAfter: {
      title: "One sentence, rewritten for rhythm.",
      intro: "An illustrative line edit: same moment, same meaning, half the words and twice the tension.",
      sample: {
        kind: "text",
        before:
          "She was feeling very nervous as she slowly walked up towards the old house, and she couldn't help but notice that all of the windows were dark and that it seemed like nobody had really lived there for a very long time.",
        after: "She climbed the path to the old house, nerves tight. Every window was dark. No one, it seemed, had lived there for years.",
      },
      notes: {
        before: ["44 words, one breath", "Feelings named, not shown", "Filler: very, really, couldn't help but"],
        after: ["22 words, three beats", "Tension carried by rhythm", "Every word doing work"],
    },
    },
    outcome: {
      title: "Your voice, at its best.",
      text: "You receive a manuscript that still sounds unmistakably like you, only clearer, sharper and more assured on every page.",
      receive: ["Line-edited manuscript with tracked changes", "Explanatory margin comments", "Voice and style notes", "Clean final file once approved"],
      benefits: [
        { title: "Readers stay immersed", text: "Prose that never gets in the way of the story." },
        { title: "Stand out in sample pages", text: "The opening pages readers preview online read professionally." },
        { title: "A sharper writer", text: "Margin notes teach patterns you will use in every future book." },
      ],
    },
    cta: {
      title: "Let your sentences sing.",
      text: "Share your opening chapter and we will return a sample line edit so you can feel the difference first.",
      next: ["copy-editing", "developmental-editing"],
    },
    order: ["solves", "beforeAfter", "handles", "improves", "details", "outcome"],
  },

  // ── Copy Editing ──────────────────────────────────────────────────────────
  "copy-editing": {
    hero: {
      purpose: "Meticulous correction of grammar, punctuation and consistency, the sentence-level accuracy every professional book needs.",
      glyph: "Aa",
    },
    solves: {
      variant: "manifesto",
      title: "Inconsistency is the quiet mistake readers always notice.",
      intro:
        "Is it “Dr” or “Dr.”, “email” or “e-mail”, “Sarah-Jane” or “Sarah Jane”? In a long manuscript these choices drift, and every drift looks like a mistake to a careful reader.",
      problems: [
        { title: "Grammar and punctuation slips", text: "Commas, apostrophes, dialogue punctuation and agreement errors scattered across chapters." },
        { title: "Shifting style choices", text: "Numbers, dates, capitals and hyphens treated differently from page to page." },
        { title: "Continuity errors", text: "Eye colours, timelines, names and facts that quietly change mid-book." },
        { title: "Tone that wobbles", text: "Formal and casual registers mixed where they shouldn't be." },
      ],
    },
    handles: {
      variant: "flow",
      title: "A systematic, line-accurate edit.",
      intro: "Copy editing is methodical by design. Every decision is recorded so it can be applied everywhere.",
      steps: [
        { title: "Style decisions", text: "We agree a style guide (US or UK spelling, number style, dialogue rules) and record it." },
        { title: "Copy edit", text: "Grammar, punctuation, spelling, usage and consistency corrected line by line with tracked changes." },
        { title: "Continuity check", text: "Names, dates, facts and timelines cross-checked against our running style sheet." },
        { title: "Queries and handover", text: "Anything only you can decide is queried in the margin; you receive the style sheet with the edit." },
      ],
    },
    improves: {
      variant: "image",
      title: "Accuracy, everywhere.",
      intro: "Copy editing makes the text correct and consistent, so readers trust every page.",
      qualities: [
        { word: "Grammar", text: "Agreement, tense, usage and syntax corrected throughout." },
        { word: "Punctuation", text: "Commas, dialogue, dashes and apostrophes handled correctly and consistently." },
        { word: "Consistency", text: "One spelling, one style, one capitalisation rule, applied everywhere." },
        { word: "Accuracy", text: "Facts, names and timelines that hold together from start to finish." },
      ],
      image: { src: unsplash("1693278615140-4523982bae77"), alt: "A close-up of dictionary entries" },
    },
    details: {
      title: "Everything a copy edit checks.",
      intro: "For manuscripts whose structure and prose are settled and need professional accuracy.",
      groups: [
        { title: "Language", items: ["Spelling, grammar and usage", "Punctuation including dialogue", "Sentence-level clarity fixes", "Repeated and misused words"] },
        { title: "Consistency", items: ["Numbers, dates and abbreviations", "Capitalisation and hyphenation", "US or UK conventions", "Character names and terms"] },
        { title: "Continuity and facts", items: ["Timeline and age checks", "Physical details and places", "Light fact-checking of names and dates", "Cross-references and headings"] },
      ],
      image: { src: unsplash("1555431189-0fabf2667795"), alt: "Wooden letter tiles spelling “choose your words”" },
    },
    beforeAfter: {
      title: "Three sentences, five fixes.",
      intro: "An illustrative copy edit. Each change is small; together they are the difference between amateur and professional.",
      sample: {
        kind: "text",
        before:
          "On Monday 3rd March, Dr. Ellis met Sarah Jane at the clinic. 'Its been a long week' she said. Later, Dr Ellis told Sarah-Jane that the results were due on the 5th of march.",
        after:
          "On Monday, 3 March, Dr Ellis met Sarah-Jane at the clinic. ‘It’s been a long week,’ she said. Later, Dr Ellis told Sarah-Jane that the results were due on 5 March.",
      },
      notes: {
        before: ["Two date styles", "“Dr.” and “Dr”, two name spellings", "“Its”, missing comma, lowercase month"],
        after: ["One date style", "One title style, one name", "Correct apostrophe and dialogue punctuation"],
    },
    },
    outcome: {
      title: "A text you can trust, line by line.",
      text: "Your book leaves copy editing correct, consistent and ready for typesetting, with a style sheet that keeps future editions and sequels aligned.",
      receive: ["Copy-edited manuscript with tracked changes", "Clean final manuscript", "Book style sheet", "Character and timeline notes", "Author queries resolved"],
      benefits: [
        { title: "Professional polish", text: "The accuracy readers expect from a traditionally published book." },
        { title: "Series-ready", text: "Your style sheet keeps every future book consistent." },
        { title: "No surprises in layout", text: "A settled text means formatting is done once." },
      ],
    },
    cta: {
      title: "Get every line right.",
      text: "Send us your manuscript details. We will confirm the scope, your style preferences and a delivery date.",
      next: ["editing-proofreading", "book-formatting"],
    },
  },

  // ── Book Formatting ───────────────────────────────────────────────────────
  "book-formatting": {
    hero: {
      purpose: "Your manuscript set to exact print and eBook specifications, ready to upload, approve and publish.",
      glyph: "fi",
    },
    solves: {
      variant: "split",
      title: "A Word file is not a book.",
      intro:
        "Manuscripts are written for screens; books are made for readers. The jump between the two is where self-published books most often look homemade, and where platforms most often reject files.",
      problems: [
        { title: "Files rejected at upload", text: "Wrong trim size, missing bleed or unembedded fonts stop a launch in its tracks." },
        { title: "Pages that look homemade", text: "Double spacing, stray tabs and uneven indents give a book away instantly." },
        { title: "eBooks that break", text: "Hard page breaks and manual spacing scatter text on phones and e-readers." },
        { title: "Widows, orphans and gaps", text: "Single lines stranded at page tops, and rivers of white space, distract readers." },
      ],
      image: { src: unsplash("1574857608227-d121f3acb20f"), alt: "An open printed book lying on a table" },
    },
    handles: {
      variant: "flow",
      title: "From manuscript to upload-ready files.",
      intro: "We format once, properly, for every edition you plan to publish.",
      steps: [
        { title: "Specs and editions", text: "We confirm trim size, paper, page count targets and which print and eBook editions you need." },
        { title: "Clean and style", text: "Your text is cleaned of stray formatting and every element is given a consistent style." },
        { title: "Typeset print interior", text: "Body text, headings, running heads and page numbers set to book standards, with spreads checked." },
        { title: "Build the eBook", text: "A reflowable EPUB and Kindle-ready file with linked contents, tested on devices and apps." },
        { title: "Proof and final files", text: "You review a PDF proof; corrections are made and final files are delivered for upload." },
      ],
    },
    improves: {
      variant: "image",
      title: "Pages that read like a published book.",
      intro: "Good formatting is invisible. Readers simply find the book easy and pleasant to read.",
      qualities: [
        { word: "Readability", text: "Comfortable type size, leading and margins for long reading." },
        { word: "Consistency", text: "Every heading, scene break and indent handled the same way." },
        { word: "Compatibility", text: "Files that meet KDP, print-on-demand and eBook store requirements." },
        { word: "Professionalism", text: "The quiet details (running heads, folios, clean spreads) that signal a real book." },
      ],
      image: { src: unsplash("1594305342010-1f62e803490f"), alt: "A clean, typeset book page in soft light" },
    },
    details: {
      title: "What formatting includes.",
      intro: "Text-led books such as novels, memoirs and non-fiction. For image-rich or highly designed books, see Interior Layout Design.",
      groups: [
        { title: "Print interior", items: ["Trim size and margins set", "Book serif typesetting", "Running heads and page numbers", "Front and back matter", "Widow, orphan and spacing checks"] },
        { title: "eBook", items: ["Reflowable EPUB", "Kindle-compatible file", "Linked table of contents", "Device preview testing"] },
        { title: "Delivery", items: ["Print-ready PDF", "One round of proof corrections", "Files named for each platform"] },
      ],
    },
    beforeAfter: {
      title: "From document to typeset page.",
      intro: "An illustrative comparison: the same text as a manuscript and as a formatted book page.",
      sample: { kind: "page", focus: "body" },
      notes: {
        before: ["Double-spaced default font", "Stray tabs and uneven indents", "No running heads or page numbers"],
        after: ["Book serif, justified with hyphenation", "Consistent first-line indents", "Running head and folio"],
    },
    },
    outcome: {
      title: "Upload-ready, edition by edition.",
      text: "You receive final files that meet platform specifications, so publishing becomes an upload, not a troubleshooting project.",
      receive: ["Print-ready interior PDF", "EPUB file", "Kindle-ready file", "Proof corrections round", "Specification summary per edition"],
      benefits: [
        { title: "Faster approval", text: "Files built to spec pass platform checks the first time." },
        { title: "A better read", text: "Comfortable pages keep readers reading." },
        { title: "Every format aligned", text: "Print and digital editions match in content and quality." },
      ],
    },
    cta: {
      title: "Turn your manuscript into a book.",
      text: "Tell us your editions and trim size, or ask us to recommend them, and we will send a clear formatting plan.",
      next: ["interior-layout-design", "cover-design"],
    },
    order: ["solves", "beforeAfter", "handles", "details", "improves", "outcome"],
  },

  // ── Interior Layout Design ───────────────────────────────────────────────
  "interior-layout-design": {
    hero: {
      purpose: "Considered typography, chapter openings and image placement that make the inside of your book as memorable as the cover.",
      glyph: "&",
    },
    solves: {
      variant: "manifesto",
      title: "Readers judge the inside too.",
      intro:
        "Cookbooks, memoirs with photographs, workbooks, gift books and illustrated non-fiction can't simply be formatted. They need to be designed, page by page, with the reader's eye in mind.",
      problems: [
        { title: "No visual hierarchy", text: "Parts, chapters, sections and sidebars all look the same, so readers lose their place." },
        { title: "Images that fight the text", text: "Photos dropped in at random sizes break the reading flow and print poorly." },
        { title: "A design that doesn't match", text: "The interior feels generic next to a carefully designed cover." },
        { title: "Complex content, crowded pages", text: "Tables, quotes, recipes or exercises squeezed in without breathing room." },
      ],
    },
    handles: {
      variant: "stack",
      title: "How we design your interior.",
      intro: "We design a system first, then apply it to every page, so the book feels intentional from cover to colophon.",
      steps: [
        { title: "Content audit", text: "We review your text, images and special elements to understand what each page must hold." },
        { title: "Design direction", text: "Typefaces, grid, chapter opener and ornament style are proposed on sample spreads for your approval." },
        { title: "Full layout", text: "Every page is laid out by hand, with images sized, placed and captioned for print." },
        { title: "Refinement", text: "Spreads are balanced, breaks are adjusted and every page is checked in context." },
        { title: "Print files", text: "Press-ready PDF with correct bleed, colour settings and resolution checks." },
      ],
    },
    improves: {
      variant: "words",
      title: "What good interior design does.",
      intro: "It guides the eye, sets the mood and makes complex content feel effortless.",
      qualities: [
        { word: "Hierarchy", text: "Clear levels for parts, chapters, sections and asides." },
        { word: "Atmosphere", text: "Typography and openers that echo your book's tone and cover." },
        { word: "Balance", text: "Text and images composed into calm, readable spreads." },
        { word: "Print quality", text: "Images and colours prepared to reproduce well on paper." },
      ],
    },
    details: {
      title: "What the design covers.",
      intro: "For books where the layout is part of the reading experience.",
      groups: [
        { title: "Typography", items: ["Typeface pairing for body and display", "Chapter and part opener design", "Drop caps, ornaments and scene breaks", "Pull quotes, sidebars and captions"] },
        { title: "Images and special elements", items: ["Photo and illustration placement", "Captions and credits", "Tables, recipes, exercises and lists", "Image resolution and colour checks"] },
        { title: "Production", items: ["Sample spreads for approval", "Full-book layout", "Two rounds of revisions", "Press-ready PDF with bleed"] },
      ],
      image: { src: unsplash("1716892001565-09a2d461982f"), alt: "An open book with a minimal, numbered page layout" },
    },
    beforeAfter: {
      title: "A chapter opening, designed.",
      intro: "An illustrative comparison of a default chapter start and a designed opener.",
      sample: { kind: "page", focus: "opener" },
      notes: {
        before: ["Default heading style", "No hierarchy or atmosphere", "Text starts abruptly"],
        after: ["Designed opener with chapter number", "Drop cap and ornament", "Generous, intentional white space"],
    },
    },
    outcome: {
      title: "An interior worth keeping.",
      text: "You receive a fully designed, print-ready interior that feels like it belongs to your cover and your story.",
      receive: ["Approved sample spreads", "Fully designed interior", "Press-ready PDF with bleed", "Image placement and caption set", "Source files on request"],
      benefits: [
        { title: "A keepsake quality", text: "Ideal for memoirs, gift and illustrated books meant to last." },
        { title: "Easier to use", text: "Readers navigate complex content without effort." },
        { title: "One coherent book", text: "Inside and outside designed as one object." },
      ],
    },
    cta: {
      title: "Design the inside of your book.",
      text: "Share a sample chapter and any images. We will suggest a design direction and a page-count estimate.",
      next: ["cover-design", "book-formatting"],
    },
    order: ["solves", "handles", "beforeAfter", "improves", "details", "outcome"],
  },

  // ── Cover Design ──────────────────────────────────────────────────────────
  "cover-design": {
    hero: {
      purpose: "A professional, genre-right cover that earns the click online and the pick-up on the shelf.",
      glyph: "◐",
    },
    solves: {
      variant: "split",
      title: "Your cover has two seconds.",
      intro:
        "Readers decide in a glance, often from a thumbnail smaller than a postage stamp. A cover that looks beautiful at full size can still fail completely in a search result.",
      problems: [
        { title: "Wrong genre signals", text: "A thriller that looks like a romance attracts the wrong readers and disappoints the right ones." },
        { title: "Unreadable at thumbnail size", text: "Thin type and busy images vanish in a store's search results." },
        { title: "Weak hierarchy", text: "Title, author name and imagery compete instead of leading the eye in order." },
        { title: "Print files that fail", text: "Wrong spine width, missing bleed or low-resolution images rejected by the printer." },
      ],
      image: { src: unsplash("1572044162444-ad60f128bdea"), alt: "A designer working with a drawing tablet beside colour swatches" },
    },
    handles: {
      variant: "stack",
      title: "From brief to finished wrap.",
      intro: "Design is research first. We study your genre's market before we draw a single line.",
      steps: [
        { title: "Creative brief", text: "We discuss your story, audience, comparable titles and any ideas you already have." },
        { title: "Market research", text: "We review bestselling covers in your category to understand what readers expect, and where to stand out." },
        { title: "Concepts", text: "You receive initial cover concepts exploring imagery, type and composition." },
        { title: "Refinement", text: "Your chosen concept is refined through revision rounds until it feels right." },
        { title: "Final files", text: "Front cover for eBook and stores, plus a full print wrap with spine and back cover to printer spec." },
      ],
    },
    improves: {
      variant: "image",
      title: "What a professional cover changes.",
      intro: "A cover is marketing, design and promise in a single image.",
      qualities: [
        { word: "Genre fit", text: "Instantly recognisable to the readers who love books like yours." },
        { word: "Market appeal", text: "Competitive beside the bestsellers in your category." },
        { word: "Typography", text: "Title and author name designed for impact and legibility at every size." },
        { word: "Visual hierarchy", text: "The eye moves from image to title to author in the right order." },
      ],
      image: { src: unsplash("1581291518633-83b4ebd1d83e"), alt: "A designer sketching layout ideas on paper" },
    },
    details: {
      title: "What the cover package includes.",
      intro: "Everything you need for both digital storefronts and printed copies.",
      groups: [
        { title: "Design", items: ["Genre and market research", "Initial cover concepts", "Custom typography", "Revision rounds on your chosen concept"] },
        { title: "Print readiness", items: ["Full wrap: front, spine and back", "Spine width from your final page count", "Barcode area and back-cover copy placement", "CMYK, bleed and resolution checks"] },
        { title: "Digital readiness", items: ["High-resolution eBook cover", "Store-ready dimensions", "Thumbnail legibility testing", "3D and social mock-ups"] },
      ],
    },
    beforeAfter: {
      title: "Draft cover vs. designed cover.",
      intro: "An illustrative comparison: a typical first-attempt cover beside a professionally designed one from our portfolio.",
      sample: { kind: "cover", title: "Graves", author: "Katelyn Taylor", cover: "/portfolio/books-web/graves.jpg" },
      notes: {
        before: ["Generic type, no genre signal", "Title lost at thumbnail size", "Flat, unconsidered composition"],
        after: ["Unmistakably gothic in tone", "Bold title readable at any size", "Clear hierarchy: image, title, author"],
    },
    },
    outcome: {
      title: "A cover ready for every shelf.",
      text: "You receive a finished cover in every file you need: for online stores, for eBook, for print and for promotion.",
      receive: ["Front cover (eBook and store)", "Full print wrap with spine", "Promotional mock-ups", "Print-ready PDF to spec", "Source files on request"],
      benefits: [
        { title: "More clicks", text: "A cover that holds up in search results earns attention." },
        { title: "The right readers", text: "Clear genre signals attract readers who will love the book." },
        { title: "Launch-ready marketing", text: "Mock-ups ready for ads, social and your website." },
      ],
    },
    cta: {
      title: "Give your book the cover it deserves.",
      text: "Tell us about your story and genre. We will come back with a design approach and timeline.",
      next: ["book-description-writing", "interior-layout-design"],
    },
    order: ["solves", "beforeAfter", "improves", "handles", "details", "outcome"],
  },

  // ── ISBN & Metadata Setup ────────────────────────────────────────────────
  "isbn-setup": {
    hero: {
      purpose: "Correct ISBNs, barcodes and book details for every edition, so stores, libraries and readers can find your book.",
      glyph: "#",
    },
    solves: {
      variant: "split",
      title: "Invisible details decide whether a book can be found.",
      intro:
        "ISBNs and metadata are the catalogue record of your book. When they are wrong or incomplete, retailers misfile it, searches miss it, and editions get tangled together.",
      problems: [
        { title: "One ISBN for every edition", text: "Paperback, hardcover and eBook each need their own identifier; sharing one causes listing errors." },
        { title: "Platform-assigned identifiers", text: "Free ISBNs can list the platform, not you, as publisher, and can't be moved elsewhere." },
        { title: "Vague categories", text: "A broad category buries your book among thousands of unrelated titles." },
        { title: "Inconsistent details", text: "Title, subtitle or author name differing between stores splits your reviews and sales." },
      ],
      image: { src: unsplash("1747147292047-7c61f1110897"), alt: "A hand pulling a card from a library card catalogue" },
    },
    handles: {
      variant: "flow",
      title: "Setup done once, correctly.",
      intro: "We prepare your book's identity carefully, then apply it identically everywhere it appears.",
      steps: [
        { title: "Edition plan", text: "We confirm every edition you will publish and how many ISBNs you need." },
        { title: "ISBN assignment", text: "ISBNs are obtained through your country's official agency and assigned per edition, with you as publisher of record." },
        { title: "Barcode", text: "A print-ready EAN barcode is generated for each print edition's back cover." },
        { title: "Metadata record", text: "Title, contributors, description, categories, keywords and audience details prepared in one master record." },
        { title: "Consistency check", text: "We review listings once live to make sure every store shows the same details." },
      ],
    },
    improves: {
      variant: "words",
      title: "What correct setup protects.",
      intro: "Good metadata quietly works for your book every day it is on sale.",
      qualities: [
        { word: "Ownership", text: "You are recorded as publisher, with identifiers you control." },
        { word: "Discoverability", text: "Specific categories and keywords put the book where readers search." },
        { word: "Accuracy", text: "Every edition identified correctly in stores and library systems." },
        { word: "Consistency", text: "One title, one author name, one series, everywhere." },
      ],
    },
    details: {
      title: "What setup includes.",
      intro: "For every edition of your book, prepared before you publish.",
      groups: [
        { title: "Identifiers", items: ["ISBN per edition (print, eBook, audio as needed)", "Publisher-of-record registration", "EAN barcode for print editions", "Edition and format details"] },
        { title: "Metadata", items: ["Title, subtitle and series", "Contributor names and roles", "BISAC subject categories", "Keywords and audience range", "Description and author bio fields"] },
        { title: "Checks", items: ["Cross-store consistency review", "Edition linking verified", "Master metadata record for your files"] },
      ],
      image: { src: unsplash("1768119997334-bc76e6f60e7d"), alt: "Rows of labelled archive drawers" },
    },
    beforeAfter: {
      title: "A catalogue record, before and after.",
      intro: "An illustrative example of the metadata most first-time authors submit, and what we prepare instead.",
      sample: {
        kind: "fields",
        rows: [
          { label: "Title", before: "Home Again (final v3)", after: "Home Again: A Novel" },
          { label: "ISBN", before: "One free ISBN for all formats", after: "Unique ISBN per edition, you as publisher" },
          { label: "Category", before: "Fiction / General", after: "Fiction / Family Life + Fiction / Small Town & Rural" },
          { label: "Keywords", before: "book, novel, good read", after: "Seven reader-search phrases, e.g. “small town family secrets novel”" },
          { label: "Author", before: "M. Ellis / Mara Ellis / Ellis, M.", after: "Mara Ellis, identical on every edition" },
        ],
      },
      notes: {
        before: ["Misfiled and hard to find", "Editions tangled", "Reviews split"],
        after: ["Specific, searchable placement", "Clean edition records", "One consistent author identity"],
    },
    },
    outcome: {
      title: "A book that's properly on record.",
      text: "You receive identifiers registered correctly and a complete master metadata record you can reuse for every store, edition and future reprint.",
      receive: ["ISBN per edition", "Print-ready barcodes", "Master metadata record", "BISAC categories and keywords", "Post-launch listing check"],
      benefits: [
        { title: "Found by the right readers", text: "Specific placement instead of a crowded general category." },
        { title: "You stay in control", text: "Identifiers in your name, portable across platforms." },
        { title: "Clean for the long term", text: "New editions and reprints slot in without confusion." },
      ],
    },
    cta: {
      title: "Set up your book properly.",
      text: "Tell us which editions you plan to publish and we will prepare your ISBN and metadata plan.",
      next: ["book-description-writing", "book-formatting"],
    },
  },

  // ── Book Description Writing ─────────────────────────────────────────────
  "book-description-writing": {
    hero: {
      purpose: "A compelling description that turns a curious browser into a reader, on the back cover and on every store page.",
      glyph: "?",
    },
    solves: {
      variant: "split",
      title: "Writing a book is hard. Selling it in 150 words is harder.",
      intro:
        "Authors know their books too well to summarise them. The result is often a synopsis, not a sales description: accurate, but not irresistible.",
      problems: [
        { title: "Summary instead of hook", text: "The description retells the plot instead of creating a question readers need answered." },
        { title: "Too long, too much", text: "Characters, subplots and backstory crowd out the one thing that sells the book." },
        { title: "Wrong tone for the genre", text: "A romance that reads like a report, or a business book that sounds like a novel." },
        { title: "Built for print, not screens", text: "Dense blocks of text that readers skim past on a phone." },
      ],
      image: { src: unsplash("1736147936383-8eb3d7b83d7b"), alt: "A reader browsing the shelves of a bookshop" },
    },
    handles: {
      variant: "stack",
      title: "How we write your description.",
      intro: "We write like your future reader thinks: what is this, why should I care, and why now?",
      steps: [
        { title: "Book and reader brief", text: "We learn the heart of your book, its genre and comparable titles, and who it's for." },
        { title: "Hook and angle", text: "We find the single question or promise that makes your book irresistible." },
        { title: "Draft versions", text: "You receive a store description plus a shorter back-cover version, written for your genre." },
        { title: "Refine and format", text: "We revise with you, then format the online version for easy reading on any screen." },
      ],
    },
    improves: {
      variant: "words",
      title: "What a strong description does.",
      intro: "It doesn't explain everything. It makes the reader need to know more.",
      qualities: [
        { word: "Hook", text: "An opening line that stops the scroll." },
        { word: "Promise", text: "A clear sense of the experience or transformation the book offers." },
        { word: "Genre voice", text: "Tone that tells the right reader “this is for you”." },
        { word: "Conversion", text: "A browser who leaves wanting the book, not more information." },
      ],
    },
    details: {
      title: "What you receive.",
      intro: "Versions for every place your book is described.",
      groups: [
        { title: "Writing", items: ["Online store description", "Back-cover copy", "Short pitch line", "Optional review or praise placement"] },
        { title: "Craft", items: ["Genre and comparable-title research", "Headline hook", "Reader-focused structure", "Two rounds of revision"] },
        { title: "Formatting", items: ["Store-friendly formatting with emphasis", "Short paragraphs for mobile", "Character count checked for each use"] },
      ],
      image: { src: unsplash("1744693660970-3517f524fb28"), alt: "New books arranged on a bookshop display table" },
    },
    beforeAfter: {
      title: "From synopsis to sales copy.",
      intro: "An illustrative rewrite for a fictional novel.",
      sample: {
        kind: "text",
        before:
          "This book is about Mara, a woman who goes back to her home town after many years. There she finds out a lot of things about her family and herself. It is a story about family, secrets and love that I think a lot of people will enjoy.",
        after:
          "Mara swore she would never go back to Alder Creek. Then her mother's letter arrived: three lines, no explanation, and a key she hadn't seen in twenty years. A tender, suspenseful novel about the secrets families keep, and the courage it takes to finally open the door.",
      },
      notes: {
        before: ["Explains instead of intrigues", "No hook, no stakes", "Ends on the author's opinion"],
        after: ["Opens on a promise broken", "A concrete mystery (the key)", "Genre and emotion made clear"],
    },
    },
    outcome: {
      title: "Words that sell your book.",
      text: "You receive polished, genre-right descriptions ready for your store pages, back cover and promotion.",
      receive: ["Store description (formatted)", "Back-cover copy", "Short pitch line", "Revision rounds", "Plain-text and formatted versions"],
      benefits: [
        { title: "More readers convert", text: "Browsers become buyers when the promise is clear." },
        { title: "Consistent message", text: "The same strong pitch across stores, cover and ads." },
        { title: "Reusable for marketing", text: "Pitch lines ready for ads, social posts and interviews." },
      ],
    },
    cta: {
      title: "Make readers need your book.",
      text: "Tell us about your book. We will craft a description that captures it, and sells it.",
      next: ["author-bio-writing", "cover-design"],
    },
    order: ["solves", "beforeAfter", "handles", "improves", "details", "outcome"],
  },

  // ── Author Bio Writing ────────────────────────────────────────────────────
  "author-bio-writing": {
    hero: {
      purpose: "A short, genuine biography that introduces you with confidence and makes readers want to know the person behind the book.",
      glyph: "@",
    },
    solves: {
      variant: "manifesto",
      title: "Writing about yourself is the hardest thing to write.",
      intro:
        "Most authors either undersell themselves or list a résumé. Neither helps a reader connect. A good bio is short, specific and human, and shows why you are the right person to have written this book.",
      problems: [
        { title: "A résumé, not a story", text: "Dates and job titles in order, with nothing a reader remembers." },
        { title: "Too modest", text: "Real expertise and experience hidden for fear of sounding boastful." },
        { title: "No link to the book", text: "The bio doesn't explain why you, specifically, wrote this book." },
        { title: "One version for everything", text: "The same long paragraph used on the back cover, store page and social media." },
      ],
    },
    handles: {
      variant: "flow",
      title: "How we write your bio.",
      intro: "A short conversation gives us everything we need; we do the writing.",
      steps: [
        { title: "Questionnaire", text: "A few friendly questions about your life, work and why you wrote this book." },
        { title: "Short interview", text: "An optional call to find the details and stories that make you memorable." },
        { title: "Drafts in three lengths", text: "Short, medium and long versions written in a tone matched to your book." },
        { title: "Refine together", text: "You review and we revise until it sounds like you on your best day." },
      ],
    },
    improves: {
      variant: "image",
      title: "What a good bio gives you.",
      intro: "It turns a name on a cover into a person readers trust.",
      qualities: [
        { word: "Credibility", text: "Your experience presented clearly and without exaggeration." },
        { word: "Connection", text: "A personal detail readers remember and relate to." },
        { word: "Relevance", text: "A clear line between who you are and what you wrote." },
        { word: "Consistency", text: "One author identity across book, stores, website and social." },
      ],
      image: { src: unsplash("1516342243255-ac2202f9f149"), alt: "An author's desk with a laptop and a cup of coffee" },
    },
    details: {
      title: "What's included.",
      intro: "Every version you'll need as a published author.",
      groups: [
        { title: "Versions", items: ["Short bio (around 50 words) for covers and social", "Medium bio (around 100 words) for store pages", "Long bio (around 250 words) for websites and media"] },
        { title: "Craft", items: ["Questionnaire and optional interview", "Tone matched to your genre", "Third- and first-person options", "Two rounds of revision"] },
        { title: "Extras", items: ["Author profile copy for stores", "Speaker or media intro line", "Headshot guidance"] },
      ],
      image: { src: unsplash("1504542227056-9178533a9175"), alt: "A notebook and pen on a quiet white desk" },
    },
    beforeAfter: {
      title: "A résumé becomes a person.",
      intro: "An illustrative rewrite for a fictional first-time author.",
      sample: {
        kind: "text",
        before:
          "Daniel Reyes was born in 1962 in Ohio. He went to school there and then studied accounting in college. He worked for many years at different companies before retiring and deciding to write this book, which is his first book.",
        after:
          "Daniel Reyes spent thirty years helping small businesses balance their books, and listening to the stories behind the numbers. Now retired in Ohio, he has turned those stories into his first novel. He lives with his wife and a very opinionated beagle.",
      },
      notes: {
        before: ["A list of dates", "Nothing memorable", "No link to the book"],
        after: ["Experience as a story", "A human, memorable detail", "Clear reason he wrote this book"],
    },
    },
    outcome: {
      title: "An introduction you're proud of.",
      text: "You receive a set of bios ready for every place your name appears, all sounding like the same, genuine you.",
      receive: ["Short, medium and long bios", "Store author-profile copy", "Media intro line", "Revision rounds", "Headshot guidance"],
      benefits: [
        { title: "Readers trust you", text: "Credibility without boasting." },
        { title: "Ready everywhere", text: "The right length for every platform, done once." },
        { title: "A brand that grows", text: "A foundation for your website, media and future books." },
      ],
    },
    cta: {
      title: "Let readers meet the author.",
      text: "Answer a few questions and we will write a bio that introduces you with warmth and confidence.",
      next: ["book-description-writing", "isbn-setup"],
    },
    order: ["solves", "handles", "beforeAfter", "details", "improves", "outcome"],
  },
};

export const getAuthorServicePage = (slug: string) => authorServicePages[slug];
