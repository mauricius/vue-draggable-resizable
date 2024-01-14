/**
 * Calculate Modulo
 * https://www.npmjs.com/package/math.modulo
 * ========== ========== ==========
 * @param value { number }
 * @param divide { number }
 * @param step { number }
 * ========== ========== ==========
 */
export function modulo(value = 0, divide = 1, step = 2) {
  // Set Multiple for
  const multiple = Number(`1${Array(step).fill(0).join("")}`);

  // Use Multiple in Calculate
  return (Math.round(value * multiple) % Math.round(divide * multiple)) / multiple;
}
