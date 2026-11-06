import type { Campus, CampusLocation } from "@/types/domain";

/**
 * SAMPLE campus data on an abstract 1000x700 schematic. NOT a real LPU map:
 * names, positions and routes are placeholders. Replace with verified data
 * (see README: "Adding verified campus data").
 */
const loc = (id: string, name: string, category: CampusLocation["category"], x: number, y: number, description: string, landmark: string): CampusLocation => ({
  id, universityId: "lpu", name, category, schematic: { x, y }, description, landmark, verified: false,
});

export const CAMPUS: Campus = {
  id: "campus_lpu_sample",
  universityId: "lpu",
  name: "Main campus (sample layout)",
  dataStatus: "sample",
  categories: [
    { id: "academic", label: "Academic blocks" }, { id: "library", label: "Libraries" },
    { id: "hostel", label: "Hostels" }, { id: "food", label: "Food outlets" },
    { id: "admin", label: "Administrative" }, { id: "sports", label: "Sports" },
    { id: "medical", label: "Medical" }, { id: "gate", label: "Entry gates" },
    { id: "landmark", label: "Landmarks" },
  ],
  locations: [
    loc("loc_gate_main", "Main Gate (sample)", "gate", 70, 350, "Primary entry point used by visitors and day scholars.", "West edge of the sample map"),
    loc("loc_gate_back", "Back Gate (sample)", "gate", 930, 350, "Secondary entry near the sports side.", "East edge of the sample map"),
    loc("loc_admin", "Administrative Block", "admin", 210, 270, "Student services, records and help desk (sample description).", "Just inside the main gate"),
    loc("loc_lib", "Central Library", "library", 420, 230, "Reading halls, study tables and reference collection.", "North of Central Plaza"),
    loc("loc_blockA", "Academic Block A", "academic", 320, 440, "Lecture halls and classrooms (sample).", "South-west of Central Plaza"),
    loc("loc_blockB", "Academic Block B", "academic", 520, 450, "Labs and tutorial rooms (sample).", "South of Central Plaza"),
    loc("loc_seminar", "Seminar Hall", "academic", 580, 290, "Workshops and talks with a stage and projector.", "East of Central Plaza"),
    loc("loc_audi", "Auditorium", "landmark", 720, 240, "Large hall for cultural evenings and guest talks.", "North-east area"),
    loc("loc_innov", "Innovation Lab", "academic", 660, 440, "Maker space and hackathon venue.", "Beside Academic Block B"),
    loc("loc_sports", "Sports Complex", "sports", 810, 540, "Courts, a football ground and a gym.", "South-east corner"),
    loc("loc_hostelA", "Hostel A (sample)", "hostel", 190, 570, "Residential block (sample).", "South-west corner"),
    loc("loc_hostelB", "Hostel B (sample)", "hostel", 330, 620, "Residential block (sample).", "South of Academic Block A"),
    loc("loc_food", "Food Court", "food", 450, 560, "Cafeteria and snack counters.", "Between hostels and Academic Block B"),
    loc("loc_medical", "Health Centre", "medical", 790, 390, "First-aid and basic consultation (sample).", "Near the back gate"),
    loc("loc_plaza", "Central Plaza", "landmark", 470, 350, "Open meeting point at the centre of campus.", "Centre of the sample map"),
  ],
  routes: [
    { id: "rt_1", universityId: "lpu", fromId: "loc_gate_main", toId: "loc_lib", isDemo: true, note: "Demo route on a schematic map. Not a real walking path.", waypoints: [{ x: 70, y: 350 }, { x: 200, y: 350 }, { x: 330, y: 300 }, { x: 420, y: 230 }] },
    { id: "rt_2", universityId: "lpu", fromId: "loc_gate_main", toId: "loc_admin", isDemo: true, note: "Demo route on a schematic map. Not a real walking path.", waypoints: [{ x: 70, y: 350 }, { x: 140, y: 320 }, { x: 210, y: 270 }] },
    { id: "rt_3", universityId: "lpu", fromId: "loc_lib", toId: "loc_seminar", isDemo: true, note: "Demo route on a schematic map. Not a real walking path.", waypoints: [{ x: 420, y: 230 }, { x: 470, y: 300 }, { x: 580, y: 290 }] },
    { id: "rt_4", universityId: "lpu", fromId: "loc_hostelA", toId: "loc_food", isDemo: true, note: "Demo route on a schematic map. Not a real walking path.", waypoints: [{ x: 190, y: 570 }, { x: 320, y: 580 }, { x: 450, y: 560 }] },
    { id: "rt_5", universityId: "lpu", fromId: "loc_blockB", toId: "loc_innov", isDemo: true, note: "Demo route on a schematic map. Not a real walking path.", waypoints: [{ x: 520, y: 450 }, { x: 590, y: 445 }, { x: 660, y: 440 }] },
    { id: "rt_6", universityId: "lpu", fromId: "loc_plaza", toId: "loc_audi", isDemo: true, note: "Demo route on a schematic map. Not a real walking path.", waypoints: [{ x: 470, y: 350 }, { x: 600, y: 310 }, { x: 720, y: 240 }] },
  ],
};
