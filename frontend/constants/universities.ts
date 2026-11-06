import type { University } from "@/types/university";

/** Add a university here (plus campus data + grade scale) to support it. */
export const UNIVERSITIES: University[] = [
  {
    id: "lpu",
    name: "Lovely Professional University",
    shortName: "LPU",
    city: "Phagwara, Punjab",
    country: "India",
    programs: ["B.Tech CSE", "B.Tech ECE", "B.Tech ME", "BCA", "MCA", "BBA", "MBA", "B.Des", "B.Sc"],
    // Configurable EXAMPLE scale, not verified official LPU rules.
    gradeScale: {
      verified: false,
      label: "Example 10-point scale (not verified against official LPU rules)",
      grades: [
        { grade: "O", points: 10 },
        { grade: "A+", points: 9 },
        { grade: "A", points: 8 },
        { grade: "B+", points: 7 },
        { grade: "B", points: 6 },
        { grade: "C", points: 5 },
        { grade: "D", points: 4 },
        { grade: "F", points: 0 },
      ],
    },
  },
];
