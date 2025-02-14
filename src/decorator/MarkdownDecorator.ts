import snarkdown from "../lib/snarkdown";
import { ContentDecorator } from "./ContentDecorator";

export const MarkdownDecorator = new ContentDecorator(
    "",
    (text) => {
        return snarkdown(text);
    }
);