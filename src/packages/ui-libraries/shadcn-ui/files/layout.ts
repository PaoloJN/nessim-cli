import { existsSync, readFileSync } from "fs";
import { CLIOptions } from "../../../../types";
import { replaceFile } from "../../../../utils/index.js";

function updateLayout(options: CLIOptions) {
    const alias = options.alias || "@";

    const layoutPath = options.src ? "src/app/layout.tsx" : "app/layout.tsx";
    const toasterPath = options.src
        ? "src/components/ui/toaster.tsx"
        : "app/components/ui/toaster.tsx";

    let layout = readFileSync(layoutPath, "utf-8");

    // Add import statement if not present
    layout = `import { ThemeProvider } from "${alias}components/theme-provider"\n${layout}`;

    // Wrap {children} with <ThemeProvider>...</ThemeProvider>
    layout = layout.replace(
        /\{children\}/,
        `<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>{children}</ThemeProvider>`
    );

    // If toaster is installed, add import and add <Toaster /> after <main>
    if (existsSync(toasterPath)) {
        layout = `import { Toaster } from "${alias}components/ui/sonner";\n${layout}`;
        layout = layout.replace(/<\/main>/, `</main>\n<Toaster />`);
    }

    // Write the updated layout back to the file
    replaceFile(layoutPath, layout);
}

export default updateLayout;
