import { Tour } from "../types";
export interface Match {
    match: string;
    start: number;
    length: number;
    properties: Array<string>;
}
export type DecoratorFn = (text: string, matches: Array<Match>, step: any, context: any) => string;
export declare class ContentDecorator {
    private decoratorFn;
    private match;
    constructor(match: string | RegExp, decoratorFn: DecoratorFn);
    test(text: string): boolean;
    render(text: string, step: any, context: Tour): string;
}
