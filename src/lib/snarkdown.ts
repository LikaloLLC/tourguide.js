/**
The MIT License (MIT)

Copyright (c) 2017 Jason Miller

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

https://github.com/developit/snarkdown
*/


const TAGS: { [key: string]: string[] } = {
    '': ['<em>', '</em>'],
    '_': ['<strong>', '</strong>'],
    '*': ['<strong>', '</strong>'],
    '~': ['<s>', '</s>'],
    '\n': ['<br />'],
    ' ': ['<br />'],
    '-': ['<hr />']
};

/**
 * Outdent a string based on the first indented line's leading whitespace
 * @private
 */
function outdent(str: string): string {
    return str.replace(RegExp('^' + (str.match(/^(\t| )+/) || '')[0], 'gm'), '');
}

/**
 * Encode special attribute characters to HTML entities in a String.
 * @private
 */
function encodeAttr(str: string): string {
    return (str + '').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/**
 * Parse Markdown into an HTML String.
 */
export default function parse(md: string, prevLinks?: Record<string, string>): string {
    let tokenizer = /((?:^|\n+)(?:\n---+|\* \*(?: \*)+)\n)|(?:^``` *(\w*)\n([\s\S]*?)\n```$)|((?:(?:^|\n+)(?:\t|  {2,}).+)+\n*)|((?:(?:^|\n)([>*+-]|\d+\.)\s+.*)+)|(?:!\[([^\]]*?)\]\(([^)]+?)\))|(\[)|(\](?:\(([^)]+?)\))?)|(?:(?:^|\n+)([^\s].*)\n(-{3,}|={3,})(?:\n+|$))|(?:(?:^|\n+)(#{1,6})\s*(.+)(?:\n+|$))|(?:`([^`].*?)`)|(  \n\n*|\n{2,}|__|\*\*|[_*]|~~)/gm;
    let context: string[] = [];
    let out: string = '';
    let links: Record<string, string> = prevLinks || {};
    let last: number = 0;
    let chunk: string | null = null;
    let prev: string = '';
    let token: RegExpExecArray | null = null;
    let inner: string = ''
    let t: string = '';

    function tag(token: string): string {
        const desc: string[] = TAGS[token[1] || ''];
        const end: any = context[context.length - 1] === token;
        if (!desc) return token;
        if (!desc[1]) return desc[0];
        if (end) context.pop();
        else context.push(token);
        return desc[end | 0];
    }

    function flush(): string {
        let str: string = '';
        while (context.length > 0) str += tag(context[context.length - 1]);
        return str;
    }

    md = md.replace(/^\[(.+?)\]:\s*(.+)$/gm, (_s, name, url) => {
        links[name.toLowerCase()] = url;
        return '';
    }).replace(/^\n+|\n+$/g, '');

    while ((token = tokenizer.exec(md))) {
        prev = md.substring(last, token.index);
        last = tokenizer.lastIndex;
        chunk = token[0];
        if (prev.match(/[^\\](\\\\)*\\$/)) {
            // escaped
        }
        // Code/Indent blocks:
        else if (t = (token[3] || token[4])) {
            chunk = '<pre class="code '
                + (token[4]
                    ? 'poetry'
                    : token[2].toLowerCase()
                )
                + '"><code'
                + (token[2] ?
                    ` class="language-${token[2].toLowerCase()}"`
                    : ''
                )
                + '>'
                + outdent(encodeAttr(t).replace(/^\n+|\n+$/g, ''))
                + '</code></pre>';
        }
        // > Quotes, -* lists:
        else if (t = token[6]) {
            if (t.match(/\./)) {
                token[5] = token[5].replace(/^\d+/gm, '');
            }
            inner = parse(outdent(token[5].replace(/^\s*[>*+.-]/gm, '')));
            if (t == '>') t = 'blockquote';
            else {
                t = t.match(/\./) ? 'ol' : 'ul';
                inner = inner.replace(/^(.*)(\n|$)/gm, '<li>$1</li>');
            }
            chunk = '<' + t + '>' + inner + '</' + t + '>';
        }
        // Images:
        else if (token[8]) {
            chunk = `<img src="${encodeAttr(token[8])}" alt="${encodeAttr(token[7])}">`;
        }
        // Links:
        else if (token[10]) {
            out = out.replace('<a>', `<a href="${encodeAttr(token[11] || links[prev.toLowerCase()])}" target="_blank">`);
            chunk = flush() + '</a>';
        }
        else if (token[9]) {
            chunk = '<a>';
        }
        // Headings:
        else if (token[12] || token[14]) {
            t = 'h' + (token[14] ? token[14].length : (token[13] > '=' ? 1 : 2));
            chunk = '<' + t + '>' + parse(token[12] || token[15], links) + '</' + t + '>';
        }
        // `code`:
        else if (token[16]) {
            chunk = '<code>' + encodeAttr(token[16]) + '</code>';
        }
        // Inline formatting: *em*, **strong** & friends
        else if (token[17] || token[1]) {
            chunk = tag(token[17] || '--');
        }
        out += prev;
        out += chunk;
    }

    return (out + md.substring(last) + flush()).replace(/^\n+|\n+$/g, '');
}