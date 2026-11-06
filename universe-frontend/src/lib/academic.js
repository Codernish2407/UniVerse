/**
 * Pure academic calculations shared by the UI and automated tests.
 * @typedef {{id?: string, name?: string, credits: number, grade: string}} CourseInput
 * @typedef {{credits: number, sgpa: number}} SemesterResult
 */

/** @param {CourseInput[]} courses @param {Record<string, number>} gradeMap @returns {SemesterResult} */
export function calculateSemester(courses, gradeMap) {
  const validCourses = courses.map((course) => ({
    credits: Math.max(0, Number(course.credits) || 0),
    points: Math.max(0, Number(gradeMap[course.grade]) || 0),
  }));
  const credits = validCourses.reduce((sum, course) => sum + course.credits, 0);
  const weightedPoints = validCourses.reduce((sum, course) => sum + course.credits * course.points, 0);
  return { credits, sgpa: credits > 0 ? weightedPoints / credits : 0 };
}

/** @param {{courses: CourseInput[]}[]} semesters @param {Record<string, number>} gradeMap */
export function calculateCumulative(semesters, gradeMap) {
  const results = semesters.map((semester) => calculateSemester(semester.courses, gradeMap));
  const totalCredits = results.reduce((sum, semester) => sum + semester.credits, 0);
  const totalWeightedPoints = results.reduce((sum, semester) => sum + semester.credits * semester.sgpa, 0);
  return { semesters: results, credits: totalCredits, cgpa: totalCredits > 0 ? totalWeightedPoints / totalCredits : 0 };
}

/** @param {string[]} candidateTags @param {string[]} presetPreferences */
export function calculatePreferenceOverlap(candidateTags, presetPreferences) {
  const normalized = new Set(candidateTags.map((tag) => tag.trim().toLowerCase()));
  const matched = presetPreferences.filter((preference) => normalized.has(preference.trim().toLowerCase()));
  return { matched, score: presetPreferences.length ? Math.round((matched.length / presetPreferences.length) * 100) : 0 };
}
