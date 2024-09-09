import { readFileSync } from "fs";
import { CLIOptions } from "../../../../types";
import { replaceFile } from "../../../../utils/index.js";

function updateLayout(options: CLIOptions) {
    const alias = options.alias || "@";

    const layoutPath = options.src ? "src/app/layout.tsx" : "app/layout.tsx";

    let layout = readFileSync(layoutPath, "utf-8");

    // Add import statement
    layout = `import "@radix-ui/themes/styles.css";\nimport { Theme, ThemePanel } from "@radix-ui/themes";\n${layout}`;

    // Wrap {children} with <Theme>...</Theme>
    layout = layout.replace(/\{children\}/, `<Theme>{children}\n<ThemePanel /></Theme>`);

    // Write the updated layout back to the file
    replaceFile(layoutPath, layout);
}

export default updateLayout;
