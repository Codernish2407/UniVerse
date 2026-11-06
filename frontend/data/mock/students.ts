import type { StudentProfile } from "@/types/domain";
import { DEMO_USER } from "@/config/demoUser";

const s = (p: Partial<StudentProfile> & Pick<StudentProfile, "id" | "name" | "course" | "skills" | "interests">): StudentProfile => ({
  universityId: "lpu", email: "", graduationYear: 2027, semester: 5, bio: "", github: "", linkedin: "", portfolio: "",
  availability: "open", projectExperience: [], collaborationPrefs: "", ...p,
});

export const STUDENTS: StudentProfile[] = [
  DEMO_USER,
  s({ id: "stu_01", name: "Ishita Verma", course: "B.Tech CSE", graduationYear: 2027, semester: 5, skills: ["Python", "Machine Learning", "Pandas"], interests: ["AI", "Research", "Kaggle"], bio: "Likes turning messy datasets into something useful.", projectExperience: ["Crop-yield prediction model", "Sentiment analysis of campus feedback"], collaborationPrefs: "Evening calls, shared notebooks." }),
  s({ id: "stu_02", name: "Rohan Mehta", course: "B.Tech ECE", graduationYear: 2027, semester: 5, skills: ["Arduino", "C++", "PCB Design"], interests: ["IoT", "Robotics"], availability: "limited", projectExperience: ["Smart attendance prototype"], bio: "Hardware first, then software." }),
  s({ id: "stu_03", name: "Simran Kaur", course: "B.Des", graduationYear: 2028, semester: 3, skills: ["Figma", "UI Design", "Illustration"], interests: ["Design systems", "Startups"], projectExperience: ["Redesign of a hostel complaint flow"], bio: "Designs interfaces people can actually use." }),
  s({ id: "stu_04", name: "Kabir Singh", course: "BCA", graduationYear: 2027, semester: 5, skills: ["Flutter", "Firebase", "Dart"], interests: ["Mobile apps", "Hackathons"], projectExperience: ["Expense splitter app"], bio: "Ships small apps fast." }),
  s({ id: "stu_05", name: "Ananya Das", course: "B.Tech CSE", graduationYear: 2026, semester: 7, skills: ["Java", "Spring Boot", "MongoDB", "DSA"], interests: ["Backend", "Competitive programming"], availability: "limited", projectExperience: ["Library management REST API"], bio: "Competitive programmer, backend tinkerer." }),
  s({ id: "stu_06", name: "Dev Malhotra", course: "MBA", graduationYear: 2027, semester: 3, skills: ["Product Strategy", "Market Research", "Pitching"], interests: ["Startups", "Fintech"], projectExperience: ["Pitch deck for a campus laundry service"], bio: "Business side of startup teams." }),
  s({ id: "stu_07", name: "Meera Nair", course: "B.Sc", graduationYear: 2028, semester: 3, skills: ["R", "Statistics", "Technical Writing"], interests: ["Research", "Data journalism"], projectExperience: ["Survey study on student sleep patterns"], bio: "Enjoys careful analysis and clear writing." }),
  s({ id: "stu_08", name: "Harpreet Gill", course: "B.Tech ME", graduationYear: 2027, semester: 5, skills: ["CAD", "SolidWorks", "3D Printing"], interests: ["Robotics", "Baja SAE"], availability: "unavailable", projectExperience: ["Mini drone frame design"], bio: "Mechanical design for robotics teams." }),
];
