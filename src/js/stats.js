/**
 * Возвращает количество оценок в массиве.
 * @param {array} grades - Массив оценок.
 * @returns {number} Количество оценок в массиве.
 */
export function getNumberOfGrades(grades) {
  return grades.length
}

/**
 * Возвращает первую оценку из массива оценок.
 * @param {array} grades - Массив оценок.
 * @returns {number|null} Первая оценка из массива или null, если массив пуст.
 */
export function getFirstGrade(grades) {
  return grades.at(0)||null
}

/**
 * Возвращает последнюю оценку из массива оценок.
 * @param {array} grades - Массив оценок.
 * @returns {number|null} Последняя оценка из массива или null, если массив пуст.
 */
export function getLastGrade(grades) {
 return grades.at(-1)||null
}

/**
 * Возвращает cреднее арифметическое массива оценок.
 * @param {array} grades - Массив оценок.
 * @returns {number} Среднее арифметическое.
 */
export function getAverageGrade(grades) {
   if (!grades.length) return null;
 return grades.reduce((acc,grade)=>acc + grade,0)/grades.length

}