/**
 * Clamps a number between a minimum and maximum value.
 *
 * @param value - The number to clamp.
 * @param min - Optional minimum limit. If not provided, it defaults to the value itself.
 * @param max - Optional maximum limit. If not provided, it defaults to the value itself.
 * @returns The clamped value between `min` and `max`.
 */
export function clamp(value: number, min = NaN, max = NaN): number {
    min = isNaN(min) ? value : min;
    max = isNaN(max) ? value : max;
    return Math.max(min, Math.min(value, max));
}