import type { ProjectValues } from "@/lib/inquiry";
import { startingPoints } from "@/lib/inquiry";

export type StartingPoint = (typeof startingPoints)[number];

export type Guidance = {
  /** Short heading for the guidance panel. */
  title: string;
  text: string;
  /** Possible support paths — suggestions, not packages or promises. */
  paths: string[];
  /** Form fields prefilled when this starting point is chosen. */
  stage: ProjectValues["stage"];
  support: string[];
};

export const guidance: Record<StartingPoint, Guidance> = {
  "I Have an Idea": {
    title: "Turn the idea into a workable plan",
    text: "Many books begin as a single idea. The first step is usually to give it shape: who it is for, what it covers and how the chapters could unfold.",
    paths: ["Manuscript planning and outlining", "Ghostwriting support, with you guiding the story", "Developmental guidance as early chapters take shape"],
    stage: "Initial Idea",
    support: ["Ghostwriting", "Developmental Editing"],
  },
  "I Have Notes or Recordings": {
    title: "Build a manuscript from your material",
    text: "Notes, journals, voice memos and interviews can all become a book. The work is in organising them and finding the structure that holds them together.",
    paths: ["Reviewing and organising your existing material", "Interview-based ghostwriting in your voice", "Outlining chapters before writing begins"],
    stage: "Currently Writing",
    support: ["Ghostwriting", "Developmental Editing"],
  },
  "I Have a Partial Manuscript": {
    title: "Find the way to the final chapter",
    text: "An unfinished draft is a strong starting point. Feedback on what is already there often makes it clearer how to complete the rest.",
    paths: ["Developmental feedback on the chapters so far", "Writing support or ghostwriting to complete the draft", "Line editing once the full story is in place"],
    stage: "Currently Writing",
    support: ["Developmental Editing", "Ghostwriting", "Line Editing"],
  },
  "My Manuscript Is Complete": {
    title: "Prepare the finished manuscript for publication",
    text: "With a complete draft, the focus moves to making it as strong and polished as possible, then preparing it to look professional in every format.",
    paths: ["Editorial review to decide which editing is needed", "Developmental, line or copy editing and proofreading", "Cover design and interior formatting", "Publishing preparation and platform setup"],
    stage: "Manuscript Completed",
    support: ["Developmental Editing", "Copy Editing", "Proofreading", "Cover Design", "Interior Formatting", "Amazon Publishing"],
  },
  "My Book Is Already Published": {
    title: "Give an existing book a stronger presence",
    text: "A published book can still be improved — from its listing and cover to where it is available and how readers discover it.",
    paths: ["Reviewing the book page, description and metadata", "Republishing with an updated cover or interior", "Wider distribution in additional formats or stores", "Marketing and visibility support"],
    stage: "Already Published",
    support: ["Global Distribution", "Book Marketing", "Amazon Ads", "Author Branding"],
  },
  "I Am Not Sure Where to Begin": {
    title: "Start with a conversation",
    text: "That is completely fine. Share whatever you have and what you hope the book will do — we will help you understand the options and a sensible first step.",
    paths: ["A review of where your project stands", "A clear explanation of possible routes", "A suggested first step, with no obligation"],
    stage: "Not Sure Yet",
    support: ["Not Sure Yet"],
  },
};

export { startingPoints };
