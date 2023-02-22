/**
 * Converts translate(x, y) into corresponding matrix function
 * @param {int} x
 * @param {int} y
 * @returns
 */
export default function translateToMatrix(x, y) {
  return `matrix(1, 0, 0, 1, ${x}, ${y})`;
}
