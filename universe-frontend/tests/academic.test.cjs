const test = require('node:test');
const assert = require('node:assert/strict');
const { calculateSemester, calculateCumulative, calculatePreferenceOverlap } = require('../src/lib/academic.js');

const grades = { O: 10, A: 8, B: 6, F: 0 };

test('SGPA is weighted by course credits', () => {
  const result = calculateSemester([{ credits: 4, grade: 'O' }, { credits: 2, grade: 'B' }], grades);
  assert.equal(result.credits, 6);
  assert.equal(result.sgpa, 8.666666666666666);
});

test('zero-credit and empty courses do not create invalid results', () => {
  assert.deepEqual(calculateSemester([{ credits: 0, grade: 'O' }], grades), { credits: 0, sgpa: 0 });
  assert.deepEqual(calculateSemester([], grades), { credits: 0, sgpa: 0 });
});

test('CGPA weights semester SGPA by semester credits', () => {
  const result = calculateCumulative([
    { courses: [{ credits: 20, grade: 'A' }] },
    { courses: [{ credits: 10, grade: 'O' }] },
  ], grades);
  assert.equal(result.credits, 30);
  assert.equal(result.cgpa, 8.666666666666666);
});

test('preference overlap returns transparent rule-based matches', () => {
  const result = calculatePreferenceOverlap(['Quiet study', 'Vegetarian'], ['Quiet study', 'Non-smoker']);
  assert.deepEqual(result.matched, ['Quiet study']);
  assert.equal(result.score, 50);
});
