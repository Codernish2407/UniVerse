import type { StudentProfile } from "@/types/domain";

/** The demo student used by "Continue with demo account". */
export const DEMO_USER: StudentProfile = {
  id: "stu_demo",
  universityId: "lpu",
  name: "Aarav Sharma",
  email: "aarav.demo@example.com",
  course: "B.Tech CSE",
  graduationYear: 2028,
  semester: 4,
  bio: "Second-year CSE student who likes building things with React and learning how systems work.",
  skills: ["React", "TypeScript", "Node.js", "Figma"],
  interests: ["Hackathons", "Open source", "Product design"],
  github: "https://github.com/example-aarav",
  linkedin: "",
  portfolio: "",
  availability: "open",
  projectExperience: ["Campus canteen queue tracker (class project)", "Personal portfolio site"],
  collaborationPrefs: "Weekend sprints, async-first, comfortable with Git workflows.",
};
