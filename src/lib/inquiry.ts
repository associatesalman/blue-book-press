/**
 * Shared rules for the Consultation and Start Your Book enquiries. Both forms
 * post multipart/form-data (they can carry a manuscript or sample) and use
 * these option lists and validators on the client (instant feedback) and in
 * the API routes (authoritative checks).
 */
import { isEmail } from "./forms";

export const projectStages = [
  "Initial Idea",
  "Currently Writing",
  "Manuscript Completed",
  "Editing",
  "Design and Formatting",
  "Ready to Publish",
  "Already Published",
  "Marketing and Visibility",
  "Not Sure Yet",
] as const;

export const supportOptions = [
  "Ghostwriting",
  "Developmental Editing",
  "Line Editing",
  "Copy Editing",
  "Proofreading",
  "Cover Design",
  "Interior Formatting",
  "Amazon Publishing",
  "Global Distribution",
  "Author Branding",
  "Book Marketing",
  "Amazon Ads",
  "Press Release",
  "Author Website",
  "Audiobook",
  "Not Sure Yet",
] as const;

export const budgetRanges = ["Still Exploring", "Under $1,000", "$1,000 to $2,500", "$2,500 to $5,000", "$5,000+", "Prefer to Discuss"] as const;

export const contactMethods = ["Email", "Phone", "Either"] as const;

export const timelines = [
  "As soon as practical",
  "Within 3 months",
  "3 to 6 months",
  "6 to 12 months",
  "More than a year",
  "Flexible / not sure",
] as const;

export const bookFormats = ["eBook", "Paperback", "Hardcover", "Audiobook", "Not Sure Yet"] as const;

export const startingPoints = [
  "I Have an Idea",
  "I Have Notes or Recordings",
  "I Have a Partial Manuscript",
  "My Manuscript Is Complete",
  "My Book Is Already Published",
  "I Am Not Sure Where to Begin",
] as const;

/** Suggestions only — the genre field accepts any text. */
export const genreSuggestions = [
  "Memoir",
  "Family History",
  "Biography",
  "Self-Help",
  "Business",
  "Faith and Inspiration",
  "Romance",
  "Dark Romance",
  "Thriller and Suspense",
  "Mystery",
  "Fantasy",
  "Science Fiction",
  "Literary Fiction",
  "Historical Fiction",
  "Young Adult",
  "Children's Picture Book",
  "Poetry",
];

/** Manuscript / sample uploads. 4 MB keeps requests under common serverless body limits (about 4.5 MB). */
export const UPLOAD = {
  maxBytes: 4 * 1024 * 1024,
  extensions: [".pdf", ".doc", ".docx", ".rtf", ".odt", ".txt"],
  accept: ".pdf,.doc,.docx,.rtf,.odt,.txt",
  hint: "PDF, Word, RTF, ODT or TXT · up to 4 MB",
} as const;

export function validateFile(file: { name: string; size: number } | null | undefined): string | undefined {
  if (!file) return undefined;
  const dot = file.name.lastIndexOf(".");
  const ext = dot >= 0 ? file.name.slice(dot).toLowerCase() : "";
  if (!(UPLOAD.extensions as readonly string[]).includes(ext)) return "Please upload a PDF, Word (.doc or .docx), RTF, ODT or TXT file.";
  if (file.size === 0) return "That file appears to be empty. Please choose another.";
  if (file.size > UPLOAD.maxBytes)
    return "That file is larger than 4 MB. Please upload a shorter sample — we can arrange another way to share the full manuscript later.";
  return undefined;
}

export const formatBytes = (n: number) => (n < 1024 * 1024 ? `${Math.max(1, Math.round(n / 1024))} KB` : `${(n / 1024 / 1024).toFixed(1)} MB`);

export type Errors = Record<string, string>;

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
const list = (v: unknown) => (Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : []);
const oneOf = (options: readonly string[], v: unknown) => options.includes(str(v));
const allOf = (options: readonly string[], v: unknown) => Array.isArray(v) && list(v).length === v.length && list(v).every((x) => options.includes(x));

function maxLen(p: Record<string, unknown>, e: Errors, key: string, n: number, label: string) {
  if (str(p[key]).length > n) e[key] = `Please keep ${label} under ${n.toLocaleString("en-US")} characters.`;
}

function minLen(p: Record<string, unknown>, e: Errors, key: string, min: number, max: number, message: string, label: string) {
  if (str(p[key]).length < min) e[key] = message;
  else maxLen(p, e, key, max, label);
}

function checkPerson(p: Record<string, unknown>, e: Errors) {
  minLen(p, e, "name", 2, 120, "Please enter your full name.", "your name");
  if (!str(p.email)) e.email = "Please enter your email address.";
  else if (!isEmail(str(p.email))) e.email = "Please enter a valid email address, like name@example.com.";
  const phone = str(p.phone);
  if (phone && !/^[+()\d\s.-]{6,24}$/.test(phone)) e.phone = "Please enter a valid phone number, or leave it blank.";
  else if (!phone && (p.contactMethod === "Phone" || p.contactMethod === "Either"))
    e.phone = "Please add a phone number so we can call you, or choose Email as your contact method.";
  if (!oneOf(contactMethods, p.contactMethod)) e.contactMethod = "Please choose how you would like us to contact you.";
  maxLen(p, e, "timeZone", 80, "the time zone");
}

function checkOptional(p: Record<string, unknown>, e: Errors) {
  if (!allOf(supportOptions, p.support ?? [])) e.support = "Please choose from the listed options.";
  if (str(p.timeline) && !oneOf(timelines, p.timeline)) e.timeline = "Please choose a timeline from the list.";
  if (str(p.budget) && !oneOf(budgetRanges, p.budget)) e.budget = "Please choose a budget range from the list.";
  if (p.consent !== true) e.consent = "Please confirm that we may use these details to respond to your request.";
}

/* ---------------------------------------------------------------- */

export type ConsultationValues = {
  name: string;
  email: string;
  phone: string;
  contactMethod: string;
  timeZone: string;
  bookTitle: string;
  genre: string;
  wordCount: string;
  stage: string;
  previouslyPublished: string;
  platform: string;
  support: string[];
  goal: string;
  challenge: string;
  timeline: string;
  budget: string;
  message: string;
  consent: boolean;
};

export const emptyConsultation: ConsultationValues = {
  name: "",
  email: "",
  phone: "",
  contactMethod: "Email",
  timeZone: "",
  bookTitle: "",
  genre: "",
  wordCount: "",
  stage: "",
  previouslyPublished: "",
  platform: "",
  support: [],
  goal: "",
  challenge: "",
  timeline: "",
  budget: "",
  message: "",
  consent: false,
};

export function validateConsultation(p: Record<string, unknown>): Errors {
  const e: Errors = {};
  checkPerson(p, e);
  maxLen(p, e, "bookTitle", 200, "the title");
  minLen(p, e, "genre", 1, 80, "Please tell us the genre, or your best guess.", "the genre");
  maxLen(p, e, "wordCount", 40, "the word count");
  if (!oneOf(projectStages, p.stage)) e.stage = "Please choose your current project stage.";
  if (str(p.previouslyPublished) && !oneOf(["Yes", "No"], p.previouslyPublished)) e.previouslyPublished = "Please choose yes or no.";
  maxLen(p, e, "platform", 120, "the platform");
  minLen(p, e, "goal", 10, 2000, "Please describe your main goal in a sentence or two.", "your goal");
  maxLen(p, e, "challenge", 2000, "your challenge");
  maxLen(p, e, "message", 4000, "your message");
  checkOptional(p, e);
  return e;
}

/* ---------------------------------------------------------------- */

export type ProjectValues = {
  startingPoint: string;
  name: string;
  email: string;
  phone: string;
  contactMethod: string;
  timeZone: string;
  bookTitle: string;
  genre: string;
  audience: string;
  stage: string;
  wordCount: string;
  formats: string[];
  description: string;
  reason: string;
  outcome: string;
  support: string[];
  timeline: string;
  budget: string;
  notes: string;
  consent: boolean;
};

export const emptyProject: ProjectValues = {
  startingPoint: "",
  name: "",
  email: "",
  phone: "",
  contactMethod: "Email",
  timeZone: "",
  bookTitle: "",
  genre: "",
  audience: "",
  stage: "",
  wordCount: "",
  formats: [],
  description: "",
  reason: "",
  outcome: "",
  support: [],
  timeline: "",
  budget: "",
  notes: "",
  consent: false,
};

/** Fields validated by each step of the Start Your Book form (the last step is the review). */
export const projectSteps: (keyof ProjectValues | "file")[][] = [
  ["name", "email", "phone", "contactMethod", "timeZone"],
  ["bookTitle", "genre", "audience", "stage", "wordCount", "formats", "description"],
  ["reason", "outcome", "support", "timeline", "budget", "notes", "file"],
  ["consent"],
];

export function validateProject(p: Record<string, unknown>): Errors {
  const e: Errors = {};
  if (str(p.startingPoint) && !oneOf(startingPoints, p.startingPoint)) e.startingPoint = "Please choose a starting point.";
  checkPerson(p, e);
  maxLen(p, e, "bookTitle", 200, "the title");
  minLen(p, e, "genre", 1, 80, "Please tell us the genre, or your best guess.", "the genre");
  maxLen(p, e, "audience", 300, "the audience");
  if (!oneOf(projectStages, p.stage)) e.stage = "Please choose your current stage.";
  maxLen(p, e, "wordCount", 40, "the word count");
  if (!allOf(bookFormats, p.formats ?? [])) e.formats = "Please choose from the listed formats.";
  minLen(p, e, "description", 20, 3000, "Please describe your book in a few sentences (at least 20 characters).", "the description");
  minLen(p, e, "reason", 5, 2000, "Please tell us briefly why you want to create this book.", "your answer");
  minLen(p, e, "outcome", 5, 2000, "Please tell us briefly what outcome you are hoping for.", "your answer");
  maxLen(p, e, "notes", 4000, "your notes");
  checkOptional(p, e);
  return e;
}
