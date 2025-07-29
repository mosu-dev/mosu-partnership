export function ViteMarkdownLoader() {
    return {
        name: "mosu-register-info-docs-loader",
        transform(src: string, id: string) {
            if (id.endsWith(".md")) {
                const processedCode = `export default ${JSON.stringify(src)}`;
                return { code: processedCode, map: null };
            }
            return null;
        },
    };
}
