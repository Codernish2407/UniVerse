export type Listing = {
  id: string; universityId?: string; title: string; description: string; category: string; location: string;
  status: string; date: string; owner: string; initials: string; tags: string[];
  kind?: string; budget?: string; preference?: string; meta?: string;
};

export const lostFoundSeed: Listing[] = [
  { id: "lf-101", title: "Black wireless earbuds case", description: "Found near the library entrance. Case only; please describe the brand to claim.", category: "Electronics", location: "Central Library", status: "Found", date: "2026-11-03", owner: "Aarav Mehta", initials: "AM", tags: ["Electronics", "Found"], kind: "Found" },
  { id: "lf-102", title: "Blue university ID card", description: "Lost around the academic block corridor. Name is partly visible in the photo.", category: "ID & Cards", location: "Block 14", status: "Lost", date: "2026-11-02", owner: "Riya Sharma", initials: "RS", tags: ["ID & Cards", "Lost"], kind: "Lost" },
  { id: "lf-103", title: "Stainless steel water bottle", description: "Grey bottle left behind after an afternoon study session.", category: "Accessories", location: "Reading Hall", status: "Found", date: "2026-10-30", owner: "Kabir Singh", initials: "KS", tags: ["Accessories", "Found"], kind: "Found" },
  { id: "lf-104", title: "Notebook with calculus notes", description: "A ruled notebook with a red cover. Last seen near the food court.", category: "Books & Stationery", location: "Uni Mall", status: "Lost", date: "2026-10-28", owner: "Meera Nair", initials: "MN", tags: ["Books & Stationery", "Lost"], kind: "Lost" },
];

export const teamSeed: Listing[] = [
  { id: "tm-101", title: "Building a campus accessibility app", description: "Looking for a frontend developer and a UX researcher to help prototype an inclusive navigation experience.", category: "Product / Design", location: "Hybrid · LPU", status: "Open", date: "2026-11-04", owner: "Ananya Rao", initials: "AR", tags: ["React", "Figma", "Accessibility"], meta: "Hackathon · 3–5 members" },
  { id: "tm-102", title: "AI-powered study companion", description: "A small team exploring a focused AI study planner. Seeking someone comfortable with Python and APIs.", category: "AI / ML", location: "On campus", status: "Open", date: "2026-11-01", owner: "Dev Malhotra", initials: "DM", tags: ["Python", "Machine Learning", "APIs"], meta: "Personal project · 4 members" },
  { id: "tm-103", title: "Open-source design system", description: "Creating accessible UI components for student-led projects. Designers and React contributors welcome.", category: "Open Source", location: "Remote friendly", status: "Open", date: "2026-10-29", owner: "Ishita Jain", initials: "IJ", tags: ["TypeScript", "UI Design", "Open Source"], meta: "Open source · Flexible" },
  { id: "tm-104", title: "Ananya Rao · Frontend developer", description: "Student profile · Interested in React, accessibility and building thoughtful interfaces. Open to hackathon and product collaborations.", category: "Student profile", location: "LPU · On campus", status: "Available", date: "2026-11-04", owner: "Ananya Rao", initials: "AR", tags: ["React", "TypeScript", "Accessibility"], meta: "2nd year · Student profile" },
  { id: "tm-105", title: "Dev Malhotra · AI / ML enthusiast", description: "Student profile · Enjoys Python, data projects and exploring practical machine learning applications.", category: "Student profile", location: "LPU · Hybrid", status: "Available", date: "2026-11-01", owner: "Dev Malhotra", initials: "DM", tags: ["Python", "Machine Learning", "Data"], meta: "2nd year · Student profile" },
];

export const roommateSeed: Listing[] = [
  { id: "rm-101", title: "Aanya · looking for a tidy roommate", description: "Prefers a calm shared space, regular study hours and a predictable sleep routine.", category: "Shared room", location: "LPU area", status: "Available", date: "2026-11-02", owner: "Aanya Verma", initials: "AV", tags: ["Early sleeper", "Quiet study", "Vegetarian"], budget: "₹6k–₹8k / month", preference: "Cleanliness: High · Sleep: 10:30 PM" },
  { id: "rm-102", title: "Sana · seeking a study-friendly flatmate", description: "Friendly and organised. Likes shared meals but values personal time during exam weeks.", category: "2 BHK sharing", location: "Near campus", status: "Available", date: "2026-10-31", owner: "Sana Khan", initials: "SK", tags: ["Flexible sleeper", "Study focused", "Non-smoker"], budget: "₹7k–₹10k / month", preference: "Cleanliness: High · Sleep: 11:30 PM" },
  { id: "rm-103", title: "Rohan · looking for a compatible flatmate", description: "Enjoys sports and a social environment, while keeping weekdays structured.", category: "Private room", location: "LPU area", status: "Available", date: "2026-10-26", owner: "Rohan Das", initials: "RD", tags: ["Sports", "Social", "Late sleeper"], budget: "₹5k–₹7k / month", preference: "Cleanliness: Medium · Sleep: 12:30 AM" },
];

export const clubSeed: Listing[] = [
  { id: "cl-101", title: "WISSEN", description: "A student community focused on learning, collaboration and peer-led initiatives. Sample directory entry; verify current activity through official channels.", category: "Learning & Development", location: "LPU · Sample directory", status: "Discover", date: "2026-11-01", owner: "Student community", initials: "WI", tags: ["Learning", "Community", "Events"] },
  { id: "cl-102", title: "EthicCraft", description: "A sample creative community for thoughtful design, writing and cultural expression. Details are illustrative.", category: "Arts & Culture", location: "LPU · Sample directory", status: "Discover", date: "2026-10-26", owner: "Student community", initials: "EC", tags: ["Design", "Writing", "Culture"] },
  { id: "cl-103", title: "Code & Create", description: "Illustrative technology community entry for students interested in building and sharing projects.", category: "Technology", location: "LPU · Sample directory", status: "Discover", date: "2026-10-20", owner: "Student community", initials: "CC", tags: ["Coding", "Projects", "Peer learning"] },
];

export const eventSeed: Listing[] = [
  { id: "ev-101", title: "Design Thinking Workshop", description: "A sample workshop listing to demonstrate event discovery. Date, venue and registration details require organizer verification.", category: "Workshop", location: "Venue to be verified", status: "Sample", date: "2026-11-14", owner: "Sample organizer", initials: "DT", tags: ["Design", "Workshop"], meta: "Sample listing · Not an official announcement" },
  { id: "ev-102", title: "Student Project Showcase", description: "An illustrative event where student teams can share prototypes and learn from peers.", category: "Community", location: "Venue to be verified", status: "Sample", date: "2026-11-21", owner: "Sample organizer", initials: "PS", tags: ["Projects", "Networking"], meta: "Sample listing · Not an official announcement" },
  { id: "ev-103", title: "Open Source Contribution Hour", description: "A sample peer-learning session for students starting their open-source journey.", category: "Technology", location: "Venue to be verified", status: "Sample", date: "2026-12-02", owner: "Sample organizer", initials: "OS", tags: ["GitHub", "Community"], meta: "Sample listing · Not an official announcement" },
];

export const campusLocations = [
  { id: "loc-1", name: "Academic Blocks", category: "Academic", description: "Academic teaching spaces. Select a specific block after verifying the current campus directory.", landmark: "Campus directory reference needed", verified: false },
  { id: "loc-2", name: "Central Library", category: "Study", description: "Library and study facilities. Confirm building entrance and opening hours with campus sources.", landmark: "Campus directory reference needed", verified: false },
  { id: "loc-3", name: "University Health Centre", category: "Health", description: "Medical support location. Confirm current location and operating hours with the university.", landmark: "Campus directory reference needed", verified: false },
  { id: "loc-4", name: "Food Court", category: "Food", description: "Food and refreshment facilities. Individual outlet locations are not mapped in this demo.", landmark: "Campus directory reference needed", verified: false },
  { id: "loc-5", name: "Hostel Area", category: "Residence", description: "Residential facilities. Choose your exact hostel from a verified campus map before navigating.", landmark: "Campus directory reference needed", verified: false },
  { id: "loc-6", name: "Sports Facilities", category: "Sports", description: "Sports and recreation facilities. Exact venue coordinates are not included in demo data.", landmark: "Campus directory reference needed", verified: false },
];

export const defaultProfile = {
  name: "Nishtha",
  email: "student@example.com",
  university: "Lovely Professional University",
  course: "B.Tech Computer Science & Engineering",
  graduationYear: "2029",
  bio: "Building thoughtful digital experiences and learning by creating.",
  skills: ["React", "TypeScript", "UI Design", "Problem Solving"],
  interests: ["Product building", "Hackathons", "Design", "Open source"],
  github: "https://github.com/Codernish2407",
  linkedin: "",
  portfolio: "",
};
