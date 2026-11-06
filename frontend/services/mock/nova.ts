import type { ChatMessage } from "@/types/domain";
import { makeId } from "./collection";

interface Rule { match: RegExp; text: string; links?: ChatMessage["links"] }

/** Deterministic product-help answers. No campus policies, timings or directions are invented. */
const RULES: Rule[] = [
  { match: /cgpa|sgpa|gpa|grade/i, text: "The CGPA Calculator computes SGPA per semester as the credit-weighted average of grade points, then CGPA across semesters weighted by credits. The grade scale it uses is an editable example, so check it against your university's official rules.", links: [{ label: "Open CGPA Calculator", href: "/cgpa-calculator" }] },
  { match: /team|hackathon|project|teammate/i, text: "In Team Finder you can browse students by skill, post a team opportunity with the skills you need, and apply to open projects. Applications are saved in this demo only; nobody is notified yet.", links: [{ label: "Open Team Finder", href: "/team-finder" }, { label: "Post an opportunity", href: "/team-finder/create" }] },
  { match: /lost|found|missing|belonging/i, text: "To report a lost or found item, open Lost & Found, choose Create listing, and describe the item and where it was last seen. Avoid putting phone numbers or room numbers in the description. Ownership verification and secure messaging need the real backend.", links: [{ label: "Browse Lost & Found", href: "/lost-found" }, { label: "Create listing", href: "/lost-found/create" }] },
  { match: /club|society|join/i, text: "The Clubs directory lets you search by category, save clubs and mark interest. The clubs shown are sample entries. Joining happens through each club's official channel.", links: [{ label: "Browse clubs", href: "/clubs" }] },
  { match: /event|fest|workshop|calendar/i, text: "Events lists upcoming sample events. You can filter by category, save events, and download an .ics file to add one to your calendar.", links: [{ label: "Browse events", href: "/events" }] },
  { match: /roommate|hostel|room|pg|flat/i, text: "Roommate Finder shows listings with a rule-based compatibility score and a breakdown of why. It compares stated preferences only. Private details like phone numbers and room numbers are never shown.", links: [{ label: "Open Roommate Finder", href: "/roommate-finder" }] },
  { match: /campus|map|navigate|where|block|library|gate|facilit|direction/i, text: "Campus Navigation shows a sample layout with search, category filters and demo route previews. It is not a real map of the campus, and I can't give verified directions until official campus data is connected.", links: [{ label: "Open Campus Navigation", href: "/campus-navigation" }] },
  { match: /hi\b|hello|hey|who are you|what can you do|help/i, text: "I'm Nova, UniVerse's demo assistant. I can explain how each UniVerse module works and point you to the right page. I'm running in mock mode, so I can't answer open-ended questions yet." },
];

const FALLBACK = "I can't answer that yet. Nova is in demo mode and no AI backend is connected, so I only know how UniVerse's own features work. Try asking about the CGPA calculator, Team Finder, Lost & Found, clubs, events or Campus Navigation.";

export function novaMockReply(message: string): ChatMessage {
  const rule = RULES.find((r) => r.match.test(message));
  return { id: makeId("msg"), role: "nova", at: new Date().toISOString(), text: rule?.text ?? FALLBACK, links: rule?.links };
}
