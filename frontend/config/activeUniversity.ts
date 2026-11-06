import { UNIVERSITIES } from "@/constants/universities";

/** The university whose branding, campus data and academic rules are active. */
export const ACTIVE_UNIVERSITY_ID = "lpu";
export const ACTIVE_UNIVERSITY = UNIVERSITIES.find((u) => u.id === ACTIVE_UNIVERSITY_ID)!;
