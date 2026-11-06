export const greetingFor = (hour: number) => (hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening");

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
export const formatDateTime = (iso: string) =>
  new Date(iso).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" });
export const formatTime = (iso: string) => new Date(iso).toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" });
export const rupees = (n: number) => `₹${n.toLocaleString("en-IN")}`;
export const initials = (name: string) => name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();

/** Case-insensitive match across several text fields. */
export const matchesQuery = (q: string, ...fields: (string | string[])[]) => {
  const needle = q.trim().toLowerCase();
  return !needle || fields.flat().some((f) => f.toLowerCase().includes(needle));
};
