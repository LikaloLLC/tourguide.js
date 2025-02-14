/**
 * Asserts that a given condition is true. If the condition is false, it throws an error with the provided message.
 *
 * @param {boolean | string | number | any} condition - The condition to be evaluated. Can be of type boolean, string, number, or any other type.
 * @param {string} message - The error message to be displayed if the condition is false.
 * @returns {boolean} - Always returns true if the condition is true. Throws an error and does not return anything if the condition is false.
 *
 * @throws {Error} - If the condition is false, throws an error with the specified message prefixed by "TourguideJS: ".
 */
export function assert(condition: boolean | string | number | any, message: string): boolean {
    if (!condition) throw `TourguideJS: ${message}`;
    return true;
}