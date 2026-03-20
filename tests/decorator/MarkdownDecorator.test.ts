import { MarkdownDecorator } from '../../src/decorator/MarkdownDecorator';

describe('MarkdownDecorator', () => {
    it('should create a MarkdownDecorator instance', () => {
        expect(MarkdownDecorator).toBeDefined();
        expect(MarkdownDecorator.test).toBeDefined();
        expect(MarkdownDecorator.render).toBeDefined();
    });

    it('should match any text since pattern is empty string', () => {
        const text = 'This is a test string';
        expect(MarkdownDecorator.test(text)).toBeTruthy();
    });

    it('should convert bold markdown to HTML strong tags', () => {
        const text = '**bold text**';
        const result = MarkdownDecorator.render(text, null as any, null as any);
        expect(result).toContain('<strong>');
        expect(result).toContain('bold text');
        expect(result).toContain('</strong>');
    });

    it('should convert italic markdown to HTML em tags', () => {
        const text = '*italic text*';
        const result = MarkdownDecorator.render(text, null as any, null as any);
        expect(result).toContain('<em>');
        expect(result).toContain('italic text');
        expect(result).toContain('</em>');
    });

    it('should convert strikethrough markdown to HTML s tags', () => {
        const text = '~~strikethrough text~~';
        const result = MarkdownDecorator.render(text, null as any, null as any);
        expect(result).toContain('<s>');
        expect(result).toContain('strikethrough text');
        expect(result).toContain('</s>');
    });

    it('should convert headings to HTML heading tags', () => {
        const text = '# Heading 1';
        const result = MarkdownDecorator.render(text, null as any, null as any);
        expect(result).toContain('<h1>');
        expect(result).toContain('Heading 1');
        expect(result).toContain('</h1>');
    });

    it('should convert code blocks to HTML code tags', () => {
        const text = '`inline code`';
        const result = MarkdownDecorator.render(text, null as any, null as any);
        expect(result).toContain('<code>');
        expect(result).toContain('inline code');
        expect(result).toContain('</code>');
    });

    it('should convert line breaks', () => {
        const text = 'line 1  \nline 2';
        const result = MarkdownDecorator.render(text, null as any, null as any);
        expect(result).toContain('<br />');
    });

    it('should handle complex markdown with multiple elements', () => {
        const text = '# Title\n\nThis is **bold** and *italic* text with `code` and ~~strikethrough~~.\n\n## Subtitle\n\n- Item 1\n- Item 2';
        const result = MarkdownDecorator.render(text, null as any, null as any);
        expect(result).toContain('<h1>');
        expect(result).toContain('<strong>');
        expect(result).toContain('<em>');
        expect(result).toContain('<code>');
        expect(result).toContain('<s>');
        expect(result).toContain('<h2>');
    });

    it('should handle empty text', () => {
        const text = '';
        const result = MarkdownDecorator.render(text, null as any, null as any);
        expect(result).toBe('');
    });

    it('should handle plain text without markdown', () => {
        const text = 'This is plain text without any markdown';
        const result = MarkdownDecorator.render(text, null as any, null as any);
        expect(result).toBe(text);
    });
});