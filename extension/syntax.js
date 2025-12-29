
export const PangSyntax = {
    /**
     * The Parser: It reads the custom code and breaks it down.
     */
    parse: (rawCode) => {
        const instructions = [];

        // 1. Match txt.prompt("...")send;
        const textRegex = /txt\.prompt\("([^"]+)"\)send;/g;
        let textMatch;
        while ((textMatch = textRegex.exec(rawCode)) !== null) {
            instructions.push({
                type: 'TEXT_PROMPT',
                content: textMatch[1]
            });
        }

        // 2. Match img.prompt("...")
        const imgRegex = /img\.prompt\("([^"]+)"\)/g;
        let imgMatch;
        while ((imgMatch = imgRegex.exec(rawCode)) !== null) {
            instructions.push({
                type: 'IMAGE_PROMPT',
                content: imgMatch[1]
            });
        }

        // 3. Match attachURL(url="...")
        const attachRegex = /attachURL\(url="([^"]+)"\)/g;
        let attachMatch;
        while ((attachMatch = attachRegex.exec(rawCode)) !== null) {
            instructions.push({
                type: 'ATTACH',
                url: attachMatch[1]
            });
        }

        return instructions;
    },

    /**
     * Helper to clean up "Context" blocks
     */
    extractContext: (code) => {
        // Looks for code inside brackets [ ]
        const contextRegex = /\[(.*?)\]/s;
        const match = code.match(contextRegex);
        return match ? match[1] : null;
    }
};
