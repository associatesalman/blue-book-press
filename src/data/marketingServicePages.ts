import {
  BadgeCheck,
  CalendarCheck,
  Clapperboard,
  Compass,
  Eye,
  Globe,
  Heart,
  LayoutGrid,
  Library,
  type LucideIcon,
  Mail,
  MessagesSquare,
  Newspaper,
  PiggyBank,
  Repeat,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from "lucide-react";

/**
 * Content for the seven Marketing & Visibility solo pages:
 * hero → understanding the service → what we handle → why it matters →
 * process → closing CTA. Copy is service-specific and makes no promises
 * of sales, rankings or coverage.
 *
 * Photography: Unsplash (free licence), verified by ID.
 */

export type MVImage = { src: string; alt: string };

export type MarketingServicePage = {
  hero: { title: string; highlight: string; purpose: string; image: MVImage };
  understand: {
    /** Large statement that fills in word by word as it scrolls past. */
    statement: string;
    image: MVImage;
    points: { q: string; a: string }[];
  };
  handles: {
    title: string;
    intro: string;
    items: { title: string; text: string; deliverable: string }[];
    receive: string[];
  };
  matters: {
    title: string;
    image: MVImage;
    statements: { icon: LucideIcon; title: string; text: string }[];
    note?: string;
  };
  process: { title: string; intro: string; steps: { title: string; text: string }[] };
};

const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=2000&q=80`;

export const marketingServicePages: Record<string, MarketingServicePage> = {
  // ── Book Marketing Strategy ──────────────────────────────────────────────
  "book-marketing": {
    hero: {
      title: "Strategic Marketing That Helps Your Book Get Discovered",
      highlight: "Get Discovered",
      purpose: "Build a stronger connection between your book, your audience, and the platforms where readers discover new stories.",
      image: { src: unsplash("1634245482394-1bcf5ccffcc0"), alt: "An author mapping out a marketing plan on paper beside a keyboard" },
    },
    understand: {
      statement:
        "Marketing strategy is the plan behind every promotion: who your book is for, what makes it worth their time, where they discover books, and which efforts deserve your budget first.",
      image: { src: unsplash("1543286386-2e659306cd6c"), alt: "A hand-drawn line graph and pens on a sheet of paper" },
      points: [
        { q: "What it is", a: "A written, realistic marketing plan built around your specific book, genre, goals and budget, covering pre-launch, launch week and the months that follow." },
        { q: "Why authors use it", a: "Without a plan, promotion becomes a scatter of posts, ads and favours that is hard to measure. Strategy puts effort where your readers actually are." },
        { q: "How it works", a: "We research your genre and comparable titles, define your reader, shape your positioning, and choose a small set of channels that fit you, then schedule them." },
        { q: "What it achieves", a: "Clarity. You know what to do, when, why and at what cost, and every later service (ads, social, press) works toward the same goal." },
      ],
    },
    handles: {
      title: "Everything a strong plan needs.",
      intro: "We do the research and the thinking; you get a plan you can follow with confidence.",
      items: [
        { title: "Book and market review", text: "We study your book, its genre conventions and comparable titles to see where it fits, and where it can stand out.", deliverable: "Market snapshot" },
        { title: "Reader profile", text: "A clear picture of your ideal readers: what they read, where they discover books and what makes them buy.", deliverable: "Reader profile" },
        { title: "Positioning and messaging", text: "Your book's core promise, hooks and key messages, written so every channel speaks with one voice.", deliverable: "Messaging guide" },
        { title: "Channel and budget plan", text: "The few channels worth your time (ads, social, email, press, events) with a realistic budget for each.", deliverable: "Channel plan" },
        { title: "Launch timeline", text: "A week-by-week calendar from pre-launch to three months after release, with clear owners for each task.", deliverable: "Launch calendar" },
      ],
      receive: ["Written marketing plan", "Reader profile", "Messaging guide", "Launch calendar", "Strategy review call"],
    },
    matters: {
      title: "A plan turns effort into momentum.",
      image: { src: unsplash("1529070538774-1843cb3265df"), alt: "A reader absorbed in a book" },
      statements: [
        { icon: Compass, title: "Direction instead of guesswork", text: "Every promotion has a reason and a place in the plan." },
        { icon: PiggyBank, title: "Budget spent wisely", text: "Money goes to channels that suit your book, not the loudest trend." },
        { icon: Users, title: "The right readers", text: "Messaging speaks to the people most likely to love your book." },
        { icon: Repeat, title: "Momentum after launch", text: "Activity continues past release week, when many books go quiet." },
      ],
    },
    process: {
      title: "How strategy comes together.",
      intro: "Five stages, with your input and approval at each one.",
      steps: [
        { title: "Understand your book and audience", text: "A discovery call and questionnaire about your book, goals, budget and the readers you imagine." },
        { title: "Define marketing direction", text: "We research the market and agree your positioning, core messages and target readers." },
        { title: "Choose channels and assets", text: "We select the channels that fit and list the promotional assets each one needs." },
        { title: "Plan the launch", text: "Everything is scheduled into a practical calendar from pre-launch to post-launch." },
        { title: "Review and refine", text: "We walk through the plan together and adjust it as early results come in." },
      ],
    },
  },

  // ── Amazon Ads ────────────────────────────────────────────────────────────
  "amazon-ads": {
    hero: {
      title: "Put Your Book in Front of Readers Already Searching",
      highlight: "Already Searching",
      purpose: "Carefully built and managed Amazon advertising that places your book in the searches and product pages where readers are ready to buy.",
      image: { src: unsplash("1688561808434-886a6dd97b8c"), alt: "A reader browsing an online store on a laptop" },
    },
    understand: {
      statement:
        "Amazon Ads are paid placements inside Amazon itself: your book appears in search results and on other books' pages, and you pay only when a shopper clicks.",
      image: { src: unsplash("1733503747506-773e56e4078f"), alt: "A shopper with a laptop and a payment card, ready to buy" },
      points: [
        { q: "What it is", a: "Advertising campaigns run through Amazon's own ad console for authors, targeting keywords, categories and comparable books." },
        { q: "Why authors use it", a: "Millions of readers search Amazon every day. Ads help a new or lesser-known book appear beside the titles those readers already buy." },
        { q: "How visibility works", a: "You bid on searches and placements; Amazon shows your ad when it's relevant. Well-chosen targets and a strong product page turn clicks into sales." },
        { q: "What campaigns achieve", a: "Steady, measurable visibility you can adjust over time. Results depend on your book, cover and price, so we monitor and refine rather than promise outcomes." },
      ],
    },
    handles: {
      title: "Campaigns built carefully and watched closely.",
      intro: "We set up, monitor and refine your campaigns in your own account, so you keep full control and visibility.",
      items: [
        { title: "Readiness check", text: "We review your cover, description, price and reviews, because ads amplify a product page and can't fix a weak one.", deliverable: "Ad-readiness notes" },
        { title: "Keyword and target research", text: "Search terms, categories and comparable books your readers actually look at, grouped by intent.", deliverable: "Target list" },
        { title: "Campaign structure", text: "A clear set of campaigns (automatic, keyword and product targeting) with budgets and bids you approve.", deliverable: "Campaign map" },
        { title: "Ad copy and setup", text: "Short, genre-right ad copy where the format allows, and every campaign built in your advertising account.", deliverable: "Live campaigns" },
        { title: "Monitoring and optimisation", text: "Regular reviews: pausing what wastes spend, raising what works and adding new targets as data grows.", deliverable: "Performance reports" },
      ],
      receive: ["Ad-readiness review", "Researched target list", "Campaigns built in your account", "Regular plain-language reports", "Ongoing optimisation"],
    },
    matters: {
      title: "Readers can't buy a book they never see.",
      image: { src: unsplash("1543286386-713bdd548da4"), alt: "A hand-drawn performance graph with a ruler and pens" },
      statements: [
        { icon: Search, title: "Seen at the moment of search", text: "Your book appears when readers are actively looking for their next read." },
        { icon: Target, title: "Targeted, not random", text: "Ads reach readers of comparable books and genres, not everyone." },
        { icon: PiggyBank, title: "Spending you control", text: "Daily budgets and bids you approve, with no surprise costs." },
        { icon: Eye, title: "Learning what works", text: "Data shows which keywords and readers respond, informing all your marketing." },
      ],
      note: "Advertising results vary by book, genre, price and competition. We never guarantee sales or rankings; we manage spend carefully and report honestly.",
    },
    process: {
      title: "How an ad campaign runs.",
      intro: "Start small, learn quickly, then grow what works.",
      steps: [
        { title: "Understand your book and readers", text: "We review your book, goals, budget and comparable titles." },
        { title: "Define targets and budget", text: "Keywords, categories and books to target, with a starting budget you approve." },
        { title: "Build the campaigns", text: "Campaigns are set up in your account with clear names and structure." },
        { title: "Launch and monitor", text: "Ads go live and we watch spend, clicks and sales closely in the first weeks." },
        { title: "Review and refine", text: "Regular reports and adjustments: cut waste, scale what works, test new targets." },
      ],
    },
  },

  // ── Social Media Promotion ───────────────────────────────────────────────
  "social-media-promotion": {
    hero: {
      title: "Share Your Book Where Readers Gather Every Day",
      highlight: "Where Readers Gather",
      purpose: "Consistent, genuine social content that introduces your book, builds your author presence and keeps readers talking.",
      image: { src: unsplash("1758273706007-f1524d2d963f"), alt: "A creator recording a friendly video at home" },
    },
    understand: {
      statement:
        "Social media promotion is the steady work of showing up where readers talk about books, with posts, visuals and short videos that feel like you and fit your genre.",
      image: { src: unsplash("1618228123700-a1c948bb2bd1"), alt: "A camera on a tripod set up to film content" },
      points: [
        { q: "What it is", a: "A content plan and ready-made posts, graphics and short-video ideas for the platforms your readers use, such as Instagram, Facebook or TikTok." },
        { q: "Why authors use it", a: "Readers discover books through recommendations, aesthetics and author personalities. Social media is where that happens daily." },
        { q: "How it works", a: "We choose one or two platforms that suit your genre, define your content themes, and create a calendar of posts built around your book's story." },
        { q: "What it achieves", a: "A recognisable, consistent presence that builds familiarity over time, so launch announcements reach people who already know you." },
      ],
    },
    handles: {
      title: "Your social presence, planned and produced.",
      intro: "We handle the planning and design so posting becomes simple and consistent.",
      items: [
        { title: "Platform selection", text: "We recommend where to focus based on your genre and readers, rather than trying to be everywhere.", deliverable: "Platform plan" },
        { title: "Profile polish", text: "Bio, links, profile and header visuals aligned with your author brand and book.", deliverable: "Optimised profiles" },
        { title: "Content themes", text: "Recurring themes (behind the book, quotes, reader moments, launch news) that keep content varied but on-brand.", deliverable: "Content pillars" },
        { title: "Designed posts", text: "Branded graphics, quote cards, carousel slides and story templates made for your book.", deliverable: "Post library" },
        { title: "Content calendar", text: "A practical schedule with captions and hashtags, timed around your launch and key dates.", deliverable: "Posting calendar" },
      ],
      receive: ["Platform recommendation", "Profile optimisation", "Branded post and story templates", "Captioned content calendar", "Short-video ideas"],
    },
    matters: {
      title: "Readers buy from authors they feel they know.",
      image: { src: unsplash("1764664281859-36f1b637b6a8"), alt: "A person watching a short video on a smartphone" },
      statements: [
        { icon: Heart, title: "Real connection", text: "Readers meet the person behind the book, not only the product." },
        { icon: Sparkles, title: "A recognisable look", text: "Consistent visuals make your posts familiar at a glance." },
        { icon: MessagesSquare, title: "Word of mouth", text: "Shareable content helps readers recommend your book to friends." },
        { icon: CalendarCheck, title: "Consistency without stress", text: "A ready calendar removes the daily question of what to post." },
      ],
    },
    process: {
      title: "How social promotion works.",
      intro: "Simple, sustainable, and built around your book.",
      steps: [
        { title: "Understand your book and audience", text: "We learn your genre, readers, comfort with being on camera and the time you can give." },
        { title: "Define your social direction", text: "Platforms, voice, visual style and content themes agreed together." },
        { title: "Create promotional assets", text: "Templates, graphics and captions designed for your book and brand." },
        { title: "Launch your presence", text: "Profiles refreshed and posting begins on a manageable schedule." },
        { title: "Review and refine", text: "We look at what readers respond to and adjust themes and formats." },
      ],
    },
  },

  // ── Press Release ─────────────────────────────────────────────────────────
  "press-release": {
    hero: {
      title: "Announce Your Book With the Credibility of the Press",
      highlight: "Credibility",
      purpose: "A professionally written press release and media outreach that present your book as news worth sharing.",
      image: { src: unsplash("1503694978374-8a2fa686963a"), alt: "Newspapers running through a printing press" },
    },
    understand: {
      statement:
        "A press release is a short, news-style announcement written for journalists, editors and bloggers, giving them a clear story, the key facts and a reason to cover your book.",
      image: { src: unsplash("1759659334772-c3a05b8178e9"), alt: "A journalist interviewing someone with a microphone and camera" },
      points: [
        { q: "Media positioning", a: "We find the angle that makes your book newsworthy: your expertise, a timely theme, a local connection or the story behind the writing." },
        { q: "Author credibility", a: "Coverage from a newspaper, magazine, podcast or respected blog tells readers that others have taken your book seriously." },
        { q: "Announcement strategy", a: "Timing matters. We plan the release around your launch date, events or relevant awareness days." },
        { q: "Public awareness", a: "A well-placed story reaches readers who might never see an ad, and gives you quotes and links to use for years." },
      ],
    },
    handles: {
      title: "From story angle to media outreach.",
      intro: "We write the story, prepare the press materials and share them with the right media.",
      items: [
        { title: "Angle discovery", text: "An interview to find the newsworthy hook in you and your book.", deliverable: "Story angle" },
        { title: "Press release writing", text: "A professional release in journalistic format: headline, lead, quotes, book details and contact information.", deliverable: "Press release" },
        { title: "Media kit", text: "Author bio, headshot guidance, cover images, book facts and sample interview questions in one place.", deliverable: "Digital media kit" },
        { title: "Targeted media list", text: "Local press, genre and trade publications, podcasts and bloggers relevant to your book and location.", deliverable: "Media list" },
        { title: "Distribution and follow-up", text: "The release shared with your list on a planned date, with polite follow-up to interested contacts.", deliverable: "Outreach summary" },
      ],
      receive: ["Professionally written press release", "Digital media kit", "Targeted media list", "Distribution and follow-up", "Outreach summary"],
    },
    matters: {
      title: "Credibility is earned, and the press can lend it.",
      image: { src: unsplash("1444653614773-995cb1ef9efa"), alt: "A person reading the business pages of a newspaper" },
      statements: [
        { icon: BadgeCheck, title: "Third-party trust", text: "Being featured carries a credibility that self-promotion can't." },
        { icon: Newspaper, title: "Reach beyond ads", text: "Media audiences include readers who never see online advertising." },
        { icon: Library, title: "Lasting assets", text: "Quotes, features and links you can use on covers, websites and pitches." },
        { icon: Users, title: "Local and niche communities", text: "Local press and specialist outlets connect you with engaged audiences." },
      ],
      note: "Editors decide what they publish, so media coverage can never be guaranteed. We prepare a strong story and share it with the outlets most likely to be interested.",
    },
    process: {
      title: "How a press campaign unfolds.",
      intro: "Careful preparation, then well-timed outreach.",
      steps: [
        { title: "Understand your book and story", text: "We interview you to find the angles journalists will care about." },
        { title: "Define the news angle", text: "We agree the headline story, key messages and timing." },
        { title: "Create press materials", text: "The release and media kit are written, designed and approved by you." },
        { title: "Launch outreach", text: "The release goes to your targeted media list on the planned date." },
        { title: "Follow up and review", text: "We follow up with interested contacts and summarise the outreach." },
      ],
    },
  },

  // ── A+ Content Design ─────────────────────────────────────────────────────
  "a-plus-content-design": {
    hero: {
      title: "Turn Your Amazon Page Into a Richer Book Experience",
      highlight: "Richer Book Experience",
      purpose: "Designed image-and-text modules that show readers more of your story, style and voice, right where they decide to buy.",
      image: { src: unsplash("1609921212029-bb5a28e60960"), alt: "A designer's screen showing a grid of visual layout panels" },
    },
    understand: {
      statement:
        "A+ Content is the designed section further down an Amazon book page: visual panels that combine images and text to tell readers more about the book than a description alone can.",
      image: { src: unsplash("1522542550221-31fd19575a2d"), alt: "Watercolour wireframe sketches of page layouts" },
      points: [
        { q: "What it is", a: "A set of modules (banners, image-and-text blocks, comparison panels) that authors can add to their book's Amazon page through their publishing account." },
        { q: "Why authors use it", a: "Shoppers scroll. A+ Content gives them atmosphere, themes, characters, praise or series order at the moment they're deciding." },
        { q: "How it works", a: "We plan the story of the page, design modules to Amazon's image specifications, and prepare the text for submission and review." },
        { q: "What it achieves", a: "A more complete, professional product page that answers readers' questions and reflects the quality of your book." },
      ],
    },
    handles: {
      title: "Designed panels that sell the experience.",
      intro: "From storyboard to submission-ready files, matched to your cover and brand.",
      items: [
        { title: "Page storyboard", text: "We decide what readers need to see, such as mood, themes, praise, author or series, and in what order.", deliverable: "Module storyboard" },
        { title: "Copywriting", text: "Short, scannable text for each module, written to complement (not repeat) your description.", deliverable: "Module copy" },
        { title: "Visual design", text: "Banners and panels designed in your cover's typography and palette, with mock-ups and atmosphere imagery.", deliverable: "Designed modules" },
        { title: "Specification check", text: "Every image exported at Amazon's required sizes and checked for legibility on mobile.", deliverable: "Upload-ready files" },
        { title: "Submission support", text: "Guidance to add the modules in your account and respond if Amazon requests changes.", deliverable: "Submission guide" },
      ],
      receive: ["Module storyboard", "Designed A+ modules", "Module copy", "Correctly sized image files", "Submission guidance"],
    },
    matters: {
      title: "Your product page is your bookshop window.",
      image: { src: unsplash("1541462608143-67571c6738dd"), alt: "A tidy design desk with a laptop and monitor" },
      statements: [
        { icon: LayoutGrid, title: "More than a description", text: "Images show the mood and quality of your book instantly." },
        { icon: ShieldCheck, title: "Professional presentation", text: "A polished page signals a polished book." },
        { icon: Library, title: "Series made clear", text: "Comparison panels guide readers to book one and onwards." },
        { icon: Target, title: "Supports your ads", text: "Readers arriving from ads find a page worth staying on." },
      ],
    },
    process: {
      title: "How A+ Content is created.",
      intro: "A small design project with a big presence.",
      steps: [
        { title: "Understand your book and readers", text: "We review your book, cover, description and what readers ask about." },
        { title: "Define the page story", text: "A storyboard of modules and messages, approved before design starts." },
        { title: "Design the modules", text: "Visuals and copy designed to match your brand, with revision rounds." },
        { title: "Prepare and submit", text: "Files exported to specification and added to your Amazon page." },
        { title: "Review and refresh", text: "Update panels later with new reviews, awards or series releases." },
      ],
    },
  },

  // ── Author Website Design ────────────────────────────────────────────────
  "author-website-design": {
    hero: {
      title: "A Home Online That Belongs to You and Your Books",
      highlight: "Belongs to You",
      purpose: "A simple, elegant author website where readers, media and event organisers can find you, your books and your news.",
      image: { src: unsplash("1499951360447-b19be8fe80f5"), alt: "A bright author workspace with a laptop and desktop monitor" },
    },
    understand: {
      statement:
        "An author website is the one place online you fully own: a permanent home for your books, your story and your readers, independent of any store or social platform.",
      image: { src: unsplash("1573867639040-6dd25fa5f597"), alt: "Sketched layouts for website and mobile screens" },
      points: [
        { q: "What it is", a: "A professionally designed, responsive website with pages for your books, your biography, news or events, and a way for readers to contact you or join your mailing list." },
        { q: "Why authors need one", a: "Stores and platforms change their rules; your website doesn't. It is where interviewers, bookshops and readers go to check who you are." },
        { q: "How it works", a: "We plan your pages, design a look that matches your books, build the site and set it up so you can update it easily." },
        { q: "What it achieves", a: "A credible, central hub that every other channel (social, ads, press, A+ Content) can point back to." },
      ],
    },
    handles: {
      title: "Designed, built and handed over.",
      intro: "Everything from structure to launch, without you needing technical skills.",
      items: [
        { title: "Site plan", text: "We define the pages you need (home, books, about, news, contact) and what each must do.", deliverable: "Sitemap" },
        { title: "Design direction", text: "Typography, colours and layout matched to your covers and genre, approved on a homepage design first.", deliverable: "Homepage design" },
        { title: "Book pages", text: "A page per book with cover, description, formats and links to every store that sells it.", deliverable: "Book pages" },
        { title: "Build and connect", text: "A responsive, fast site with mailing-list sign-up, contact form and social links, set up on a domain in your name.", deliverable: "Live website" },
        { title: "Handover", text: "A simple walkthrough so you can add news, events and new books yourself.", deliverable: "Editing guide" },
      ],
      receive: ["Responsive author website", "Individual book pages", "Mailing-list and contact setup", "Domain in your name", "Training walkthrough"],
    },
    matters: {
      title: "Every other channel needs somewhere to point.",
      image: { src: unsplash("1487014679447-9f8336841d58"), alt: "A laptop showing a website on a calm desk" },
      statements: [
        { icon: Globe, title: "Yours permanently", text: "A home online that no algorithm or policy change can take away." },
        { icon: BadgeCheck, title: "Instant credibility", text: "Media, bookshops and event organisers expect to find you." },
        { icon: Mail, title: "Direct reader connection", text: "Mailing-list sign-ups build an audience you can reach any time." },
        { icon: Library, title: "All your books together", text: "Readers of one book can easily discover the rest." },
      ],
    },
    process: {
      title: "How your website is made.",
      intro: "Clear stages, with your approval before we build.",
      steps: [
        { title: "Understand you and your readers", text: "We discuss your books, brand, goals and sites you admire." },
        { title: "Define structure and style", text: "Sitemap and homepage design agreed before building begins." },
        { title: "Design and build", text: "All pages designed and built, responsive on every device." },
        { title: "Launch", text: "Domain connected, forms tested, and the site goes live." },
        { title: "Review and hand over", text: "A walkthrough, final tweaks, and you're in control." },
      ],
    },
  },

  // ── Book Trailer & Visual Promo ──────────────────────────────────────────
  "book-trailer": {
    hero: {
      title: "Bring the Mood of Your Book to Life in Seconds",
      highlight: "to Life",
      purpose: "A short, cinematic book trailer and matching visuals that capture your story's feeling and stop readers mid-scroll.",
      image: { src: unsplash("1632187989763-c9c620420b4d"), alt: "A film crew setting up a camera on set" },
    },
    understand: {
      statement:
        "A book trailer is a short promotional video, usually 30 to 90 seconds, that uses imagery, motion, text and music to convey the tone of a book and invite readers in.",
      image: { src: unsplash("1492619375914-88005aa9e8fb"), alt: "A video edit in progress on a desktop computer" },
      points: [
        { q: "What it is", a: "A professionally edited trailer plus still visuals and short cut-downs sized for social media, your website and your store page where supported." },
        { q: "Why authors use it", a: "Video is the most watched content on social platforms. A trailer gives readers a feeling for your book faster than any description." },
        { q: "How it works", a: "We write a short script and storyboard from your book's hook, select licensed footage, music and type, then edit and refine with you." },
        { q: "What it achieves", a: "A memorable, shareable asset for launch, ads and social posts that represents your book with cinematic quality." },
      ],
    },
    handles: {
      title: "From script to final cut.",
      intro: "We handle the creative and technical production; you approve each stage.",
      items: [
        { title: "Concept and script", text: "A short script built on your book's hook and mood, without spoilers.", deliverable: "Approved script" },
        { title: "Storyboard", text: "Scene-by-scene plan of imagery, text and pacing, so you can see the trailer before it's made.", deliverable: "Storyboard" },
        { title: "Footage and music", text: "Properly licensed stock footage, imagery and music chosen to match your genre.", deliverable: "Licensed assets" },
        { title: "Edit and motion design", text: "Editing, typography animation and colour grading to create a cinematic feel.", deliverable: "Trailer edit" },
        { title: "Formats and visuals", text: "Widescreen, square and vertical versions, plus still promotional graphics.", deliverable: "Platform-ready files" },
      ],
      receive: ["Finished book trailer", "Vertical and square cut-downs", "Promotional still graphics", "Licensing details for all assets", "Revision rounds"],
    },
    matters: {
      title: "Feeling sells a story before words do.",
      image: { src: unsplash("1596483941348-cb6d15e0fd60"), alt: "A camera operator filming with a professional video camera" },
      statements: [
        { icon: Clapperboard, title: "Stops the scroll", text: "Motion catches the eye where static posts are skipped." },
        { icon: Sparkles, title: "Captures the mood", text: "Music, imagery and pacing convey genre and tone instantly." },
        { icon: MessagesSquare, title: "Made to be shared", text: "A trailer is easy for readers to pass on to friends." },
        { icon: Repeat, title: "Used everywhere", text: "One production powers posts, ads, your website and events." },
      ],
    },
    process: {
      title: "How your trailer is produced.",
      intro: "A creative process with clear approvals.",
      steps: [
        { title: "Understand your book and audience", text: "We discuss your story, genre, readers and the feeling the trailer should leave." },
        { title: "Define creative direction", text: "Script, storyboard, visual style and music direction agreed." },
        { title: "Produce the trailer", text: "Footage, music and motion graphics edited into a first cut." },
        { title: "Refine and finalise", text: "Your feedback shapes the final cut and every format version." },
        { title: "Launch your visuals", text: "Files delivered with guidance on where and how to use them." },
      ],
    },
  },
};

export const getMarketingServicePage = (slug: string) => marketingServicePages[slug];
