import Tour from "@types";

export interface Match {
    match: string;
    start: number;
    length: number;
    properties: Array<string>;
}

export type DecoratorFn = (text: string, matches: Array<Match>, step: any, context: any) => string;

function parseProperties(props: string): Array<string> {
    return (
        (props || "")
            .split(",")
            .map(p => p.trim())
            .filter(Boolean)
    );
}

function getMatches(str: string, regex: RegExp): Array<Match> {
    const matches: Array<Match> = [];
    let m: RegExpExecArray | null;
    regex.lastIndex = 0;
    while ((m = regex.exec(str)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }

        // The result can be accessed through the `m`-variable.
        matches.push({
            match: m[0],
            start: m.index,
            length: m[0].length,
            properties: parseProperties(m[1])
        });
    }
    return matches;
}

/**
 * The `ContentDecorator` class is designed to apply a custom decoration function to specific patterns within text. It supports both regular expressions and literal strings as match patterns, allowing for flexible content manipulation.
 */
export class ContentDecorator {
    private decoratorFn: DecoratorFn;
    private match: RegExp | false;

    /**
     * Constructs a new `ContentDecorator` instance.
     * @param match - A string or regular expression pattern to be matched in the text. If provided as a string, it is wrapped in a regular expression with global and case-insensitive flags.
     * @param decoratorFn - The function that will be applied to the matched content. It receives the entire text, an array of matches, additional step data, and context information.
     */
    constructor(match: string | RegExp, decoratorFn: DecoratorFn) {
        if (typeof match === 'string' && match)
            // eslint-disable-next-line no-useless-escape
            this.match = new RegExp(`{\s*${match.trim()}\s*(,.+?)?\s*?}`, 'gmi');
        else if (!match) this.match = false;
        else this.match = match as RegExp;
        this.decoratorFn = decoratorFn;
    }

    /**
     * Tests whether the given text matches the configured pattern.
     * @param text - The string to be tested against the match pattern.
     * @returns `true` if the text matches the pattern, otherwise `false`. If no pattern is set (`match` is false), it always returns true.
     */
    test(text: string): boolean {
        return this.match ? this.match.test(text) : true;
    }

    /**
     * Applies the decorator function to the text based on the configured match pattern and properties.
     * @param text - The input text in which matches are to be found and decorated.
     * @param step - Additional data or context that might be used by the decorator function during rendering.
     * @param context - A broader context object that can include additional information necessary for decoration.
     * @returns The text with matched patterns decorated according to the configured decorator function.
     */
    render(text: string, step: any, context: Tour): string {
        try {
            const matches = this.match ? getMatches(text, this.match).reverse() : [];
            return this.decoratorFn(text, matches, step, context);
        } catch (e) {
            console.warn(e);
            return text;
        }
    }
}
