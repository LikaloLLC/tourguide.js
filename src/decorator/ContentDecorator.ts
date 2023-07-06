import { Tour } from "../types";

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

export class ContentDecorator {
    private decoratorFn: DecoratorFn;
    private match: RegExp | false;
    constructor(match: string | RegExp, decoratorFn: DecoratorFn) {
        if (typeof match === 'string' && match)
            this.match = new RegExp(`{\s*${match.trim()}\s*(,.+?)?\s*?}`, 'gmi');
        else if (!match) this.match = false;
        else this.match = match as RegExp;
        this.decoratorFn = decoratorFn;
    }
    test(text: string): boolean {
        return this.match ? this.match.test(text) : true;
    }
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