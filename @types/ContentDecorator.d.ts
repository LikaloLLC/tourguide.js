export interface Match {
    match: string;
    start: number;
    length: number;
    properties: Array<string>;
}

export type DecoratorFn = (text: string, matches: Array<Match>, step: any, context: any) => string;

export interface ContentDecorator {
    test(text: string): boolean;
    render(text: string, step: any, context: any): string;
}