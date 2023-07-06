export function assert(condition: boolean | string | number | any, message: string): boolean {
    if (!condition) throw `TourguideJS: ${message}`;
    return true;
}