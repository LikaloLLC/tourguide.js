export function clamp(value: number, min: number, max: number = NaN): number {
    min = isNaN(min) ? value : min;
    max = isNaN(max) ? value : max;
    return Math.max(min, Math.min(value, max));
}