declare module "umbrellajs" {
    export type Element = string | HTMLElement | ShadowRoot | U;
    export interface U {
        nodes: Array<U>;
        length: number;
        addClass: (...classname: string[]) => U;
        after: (html: Element) => U;
        append: (html: Element) => U;
        array: (callback: (value: never, index: number) => never) => Array<HTMLElement>;
        before: (html: Element) => U;
        children: (selector?: string) => U;
        clone: () => U;
        getAll: (context: Element) => U;
        closest: (selector: string) => U;
        data: (name: string, value?: string) => string;
        each: (callback: (value: never, index: number, array: never[]) => void) => U;
        empty: () => U;
        filter: (selector: string) => U;
        find: (selector: string) => U;
        first: (selector?: string) => HTMLElement | false;
        handle: (...event: string[]) => U;
        hasClass: (...classname: string[]) => boolean;
        html: () => string;
        is: (selector?: string) => boolean;
        last: (selector?: string) => HTMLElement | false;
        map: (callback: (value: never, index: number) => never) => Array<HTMLElement>;
        not: (filter: string) => U;
        off: (events: string | Array<string>, cb: (event: Event) => void, cb2?: (event: Event) => void) => U;
        on: (events: string | Array<string>, cb: (event: Event) => void, cb2?: (event: Event) => void) => U;
        param: (obj: { key: string, value: string }) => string;
        parent: (selector?: string) => U;
        prepend: (html: Element) => U;
        remove: () => U;
        removeClass: (...classname: string[]) => U;
        replace: (html: Element) => U;
        scroll: () => U;
        serialize: () => { key: string, value: string | number | boolean };
        siblings: (selector: string) => U;
        size: () => DOMRect | undefined;
        text: (text?: string) => U | string;
        toggleClass: (...classname: string[]) => U;
        trigger: (events: Array<string>) => U;
        wrap: (selector: string) => U;
    }
    const u: (parameter?: Element, context?: HTMLElement | ShadowRoot | U) => U;
    export default u;
}