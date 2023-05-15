export function assert(condition: boolean | string | number | any, message: string): boolean {
    if (!Boolean(condition)) throw `TourguideJS: ${message}`;
    return true;
}