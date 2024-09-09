import { readFileSync } from "fs";
import { CLIOptions } from "../../../../types";
import { replaceFile } from "../../../../utils/index.js";

function updateLayout(options: CLIOptions) {
    const { src } = options;
    const layoutPath = src ? "src/app/layout.tsx" : "app/layout.tsx";

    let layout = readFileSync(layoutPath, "utf-8");

    // Add import statement if not present
    layout = `import { ClerkProvider } from '@clerk/nextjs'\n${layout}`;

    // Wrap html with <ClerkProvider>...</ClerkProvider>
    layout = layout.replace(
        /(<html[^>]*>)([\s\S]*?)(<\/html>)/,
        `<ClerkProvider>$1$2$3</ClerkProvider>`
    );

    // Write the updated layout back to the file
    replaceFile(layoutPath, layout);
}

export default updateLayout;
