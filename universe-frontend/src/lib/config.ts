export const BRAND = {
  name: "UniVerse",
  tagline: "Everything a student needs, in one universe.",
  headline: "The Operating System for Student Life.",
  university: "Lovely Professional University",
  universityShort: "LPU",
  demoMode: true,
};

export const NAV_GROUPS = [
  { label: "Workspace", items: [
    { label: "Dashboard", href: "/dashboard", icon: "layout" },
  ]},
  { label: "Student life", items: [
    { label: "Lost & Found", href: "/lost-found", icon: "package" },
    { label: "Team Finder", href: "/team-finder", icon: "users" },
    { label: "Roommate Finder", href: "/roommate-finder", icon: "home" },
    { label: "Clubs", href: "/clubs", icon: "sparkles" },
    { label: "Events", href: "/events", icon: "calendar" },
  ]},
  { label: "Tools", items: [
    { label: "Ask Nova", href: "/nova", icon: "orbit" },
    { label: "CGPA Calculator", href: "/cgpa-calculator", icon: "calculator" },
    { label: "Campus Navigation", href: "/campus-navigation", icon: "map" },
  ]},
];

export const MODULE_META = {
  "lost-found": { title: "Lost & Found", eyebrow: "Campus community", description: "Give lost belongings a better chance of finding their way home.", action: "Report an item", singular: "listing" },
  "team-finder": { title: "Team Finder", eyebrow: "Build something together", description: "Find people who bring the skills and energy your next idea needs.", action: "Post an opportunity", singular: "opportunity" },
  "roommate-finder": { title: "Roommate Finder", eyebrow: "Find your fit", description: "Discover potential roommates by habits, preferences and budget.", action: "Create a profile", singular: "profile" },
  clubs: { title: "Clubs & Communities", eyebrow: "Find your people", description: "Explore communities, discover new interests and make campus yours.", action: "Explore clubs", singular: "club" },
  events: { title: "Events", eyebrow: "What’s happening", description: "Find experiences, workshops and campus moments worth showing up for.", action: "Discover events", singular: "event" },
} as const;
