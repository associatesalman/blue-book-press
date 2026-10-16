/** "Your Publishing Journey" steps — used on the homepage and journey page. */
export type JourneyStep = { number: number; title: string; text: string };

export const journeySteps: JourneyStep[] = [
  { number: 1, title: "A Friendly Conversation", text: "Tell us about your book and your goals. We listen, answer questions and suggest the right path." },
  { number: 2, title: "Editing & Refinement", text: "Our editors help your manuscript read clearly and confidently, always in your own voice." },
  { number: 3, title: "Design & Formatting", text: "We design your cover and interior so the finished book looks as good as it reads." },
  { number: 4, title: "Your Approval", text: "You review proofs and request changes. Nothing is published until you are happy." },
  { number: 5, title: "Publishing & Distribution", text: "Your book is released in print, eBook and audio formats to readers worldwide." },
  { number: 6, title: "Sharing Your Story", text: "Optional marketing support helps your book find the readers it deserves." },
];
