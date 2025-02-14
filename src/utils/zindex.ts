/**
 * Returns the maximum z-index value of all elements in the document.
 *
 * @returns {number} The maximum z-index value found in the document. If no elements have a z-index set, it returns 0.
 */
export function getMaxZIndex(): number {
    return Math.max(
        ...Array.from(document.querySelectorAll('body *'), el =>
            parseFloat(window.getComputedStyle(el).zIndex),
        ).filter(zIndex => !Number.isNaN(zIndex)),
        0,
    );
}