export function assert(assertion, message) {
    if (!assertion) throw `TourguideJS: ${message}`;
    return true;
}