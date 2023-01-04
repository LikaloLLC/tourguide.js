export function assert(assertion, message) {
    if (!assertion) throw `Docsie Inapp: ${message}`;
    return true;
}