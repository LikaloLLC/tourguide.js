function parseProperties(props) {
    return (
        (props || "")
            .split(",")
            .map(p => p.trim())
            .filter(Boolean)
    );
}

function getMatches(str, regex) {
    let matches = [], m;
    regex.lastIndex = 0;
    while ((m = regex.exec(str)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }

        // The result can be accessed through the `m`-variable.
        // m.forEach((match, groupIndex) => {
            matches.push({
                match: m[0],
                start: m.index,
                length: m[0].length,
                properties: parseProperties(m[1])
            });
        // });
    }
    return matches;
}

export default class ContentDecorator {
    constructor(match, decoratorFn) {
        if (typeof match === 'string')
            this.match = new RegExp(`{\s*${match.trim()}\s*(,.+?)?\s*?}`, 'gmi');
        else this.match = match;
        this.decoratorFn = decoratorFn;
    }
    test(text) {
        return this.match.test(text);
    }
    render(text, step, context) {
        try {
            const matches = getMatches(text, this.match).reverse();
            return this.decoratorFn(text, matches, step, context);
        } catch (e) {
            console.warn(e);
            return text;
        }
    }
}