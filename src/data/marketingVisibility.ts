import type { ImageHeroContent } from "@/components/common/ImageHero";
import { pages } from "./pages";
import { getService, serviceHref } from "./services";

/**
 * Content for the Marketing & Visibility category page:
 * hero → overview → services showcase → author presence (portrait) →
 * campaign reel (video) → how visibility is built → closing CTA.
 * Photography: Unsplash (free licence), verified by ID.
 */

const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=80`;

export const mvMedia = {
  hero: { src: "/marketing-visibility/hero.webp", alt: "Marketing & Visibility: an open book rising from a fountain pen in a cloud of blue ink", width: 1671, height: 941 },
  portrait: { src: "/marketing-visibility/portrait.webp", alt: "A white quill above an ink splash signed “Visibility”", width: 968, height: 1625 },
  video: "/marketing-visibility/marketing-visibility.mp4",
};

export const mvHero: ImageHeroContent = {
  image: mvMedia.hero,
  title: ["Helping", "Your", "Book", "Reach", "the", "Right", "Readers"],
  accentFrom: 4,
  subtitle:
    "From discoverability and promotion to author visibility, Blue Book Press helps position your book where readers can find and connect with your story.",
  primary: { label: "Explore Marketing Services", href: "#services" },
  secondary: { label: "Start Your Campaign", href: `${pages["start-your-book"].path}?service=book-marketing` },
  align: "center",
};

export const mvOverview = {
  eyebrow: "Marketing & Visibility",
  title: "A finished book is a beginning, not an ending.",
  paragraphs: [
    "Publishing makes your book available. It doesn't make it visible. Every day thousands of new titles join the same stores, and a book without a plan for being found can sit unseen, however good it is.",
    "Visibility is built on purpose. It starts with knowing who your readers are and what they are looking for, continues with positioning your book clearly for them, and grows through promotion in the places they already spend time.",
    "Our marketing team works on all of it with you, honestly and in plain language. We focus on realistic, steady reach, never on promises of guaranteed sales.",
  ],
  image: { src: unsplash("1790749871463-70d593c2e8b7"), alt: "A reader absorbed in a book at a café table" },
  pillars: [
    { title: "Positioning", text: "What your book promises, and to whom." },
    { title: "Audience", text: "The readers most likely to love it." },
    { title: "Promotion", text: "Campaigns that reach them on purpose." },
    { title: "Discoverability", text: "Being found when readers search." },
  ],
};

type ServiceCopy = { slug: string; name: string; what: string; why: string; outcome: string; image: { src: string; alt: string } };

const serviceCopy: ServiceCopy[] = [
  {
    slug: "book-marketing",
    name: "Book Marketing Strategy",
    what: "A clear launch and promotion plan built around your book, your goals, your budget and your readers.",
    why: "Without a plan, marketing becomes scattered effort. Strategy decides what to do first, and what not to do at all.",
    outcome: "A written, realistic roadmap from pre-launch to the months after release.",
    image: { src: unsplash("1620325867502-221cfb5faa5f"), alt: "A marketing plan being mapped out with sticky notes on a table" },
  },
  {
    slug: "amazon-ads",
    name: "Amazon Ads",
    what: "Carefully set-up and managed advertising campaigns that show your book to readers already shopping for books like it.",
    why: "Amazon is where many readers search and buy. Well-targeted ads put your book in those results instead of hoping it surfaces.",
    outcome: "Campaigns structured around your keywords and categories, with plain-language reporting.",
    image: { src: unsplash("1557825835-70d97c4aa567"), alt: "A reader browsing books on a tablet" },
  },
  {
    slug: "social-media-promotion",
    name: "Social Media Promotion",
    what: "Consistent, friendly posts and visuals that share your book with readers on the platforms they use.",
    why: "Readers discover and talk about books on social media. A steady, genuine presence keeps your book in that conversation.",
    outcome: "A content plan and branded visuals that sound like you and fit your genre.",
    image: { src: unsplash("1554056878-6911635b1573"), alt: "A styled flat-lay of a tablet, coffee and dessert prepared for social media" },
  },
  {
    slug: "press-release",
    name: "Press Release",
    what: "A professionally written announcement of your book, prepared for media outlets, local press and niche publications.",
    why: "Media coverage builds credibility that advertising can't buy, especially for non-fiction, local and expert authors.",
    outcome: "A polished release and a targeted list of outlets to share it with.",
    image: { src: unsplash("1624269305548-1527ef905ff6"), alt: "A newspaper laid out on a white surface" },
  },
  {
    slug: "a-plus-content-design",
    name: "A+ Content Design",
    what: "Image-and-text panels for your Amazon book page that show readers more of your story, style and author voice.",
    why: "Your product page is where a browsing reader decides. Richer content answers their questions and builds confidence to buy.",
    outcome: "Designed A+ modules sized and prepared for Amazon's requirements.",
    image: { src: unsplash("1561305654-264bb66eee30"), alt: "An open magazine-style layout beside a coffee cup and a plant" },
  },
  {
    slug: "author-website-design",
    name: "Author Website Design",
    what: "A simple, elegant home online for you and your books, easy for readers to visit and for you to update.",
    why: "Stores change; your website stays yours. It is where readers, media and event organisers go to learn who you are.",
    outcome: "A responsive author site with your books, bio, news and a way for readers to stay in touch.",
    image: { src: unsplash("1501504905252-473c47e087f8"), alt: "A laptop on a writer's desk beside an open notebook" },
  },
  {
    slug: "book-trailer",
    name: "Book Trailer & Visual Promo",
    what: "A short, tasteful video and matching promotional visuals that bring the mood of your book to life.",
    why: "Video stops the scroll. A trailer gives readers a feeling for your book in seconds, on social, your website and your store page.",
    outcome: "A finished trailer and a set of visuals sized for each platform you use.",
    image: { src: unsplash("1497015289639-54688650d173"), alt: "A camera filming a scene in front of a bookshelf" },
  },
];

export const mvServices = serviceCopy.map((c, i) => {
  const s = getService("marketing-visibility", c.slug)!;
  return { ...c, index: i + 1, href: serviceHref(s) };
});

export const mvPortrait = {
  eyebrow: "The Author Behind the Book",
  title: "Readers connect with people, not products.",
  lines: [
    { title: "Author branding", text: "A consistent look, voice and story across everything readers see." },
    { title: "Reader connection", text: "Real ways for readers to follow you, hear from you and come back." },
    { title: "Professional presence", text: "A credible profile for media, events and bookstores." },
  ],
};

export const mvReel = {
  eyebrow: "Campaign Reel",
  statements: [
    { word: "Seen.", text: "Your book placed in front of the readers most likely to love it." },
    { word: "Shared.", text: "Visuals and stories people want to pass on." },
    { word: "Remembered.", text: "An author presence that lasts beyond launch week." },
  ],
};

export const mvProcess = {
  eyebrow: "How Marketing Builds Visibility",
  title: "Five steps from book to readers.",
  steps: [
    { title: "Understand the book and audience", text: "We study your book, genre and comparable titles to define exactly who your readers are and where they gather." },
    { title: "Build positioning and messaging", text: "We shape the promise of your book into clear messages, hooks and descriptions that speak to those readers." },
    { title: "Improve discoverability", text: "Categories, keywords, product page and author profiles are refined so your book can be found when readers search." },
    { title: "Create promotional assets", text: "Ad creatives, social visuals, A+ content, press materials and trailers, all designed as one recognisable campaign." },
    { title: "Reach targeted readers", text: "Campaigns go live where your readers are, and we review results with you in plain language, adjusting as we learn." },
  ],
};

export const mvCta = {
  title: "Your Book Deserves More Than a Release Date",
  text: "Blue Book Press helps authors build visibility, strengthen their presence, and create a path for readers to discover their work.",
  primary: { label: "Request Marketing Consultation", href: pages["book-consultation"].path },
  secondary: { label: "Explore Publishing Services", href: pages["publishing-pathways"].path },
  marquee: ["Discoverability", "Positioning", "Audience", "Promotion", "Author Brand", "Reader Reach"],
};
