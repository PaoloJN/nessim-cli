import { execSync } from "child_process";
import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from "fs";
import { logger } from "../../utils/index.js";
import { CLIOptions } from "../../types";

import path from "path";
import chalk from "chalk";
import updateLayout from "./files/layout.js";
import updatePage from "./files/page.js";

type CreateNextCommands = {
    [key: string]: {
        create: string;
        template: string;
    };
};

const createNextCommands: CreateNextCommands = {
    npm: {
        create: "npx create-next-app --ts --app",
        template: "npx create-next-app -e [pathOrUrl]",
    },
    yarn: {
        create: "yarn create next-app --ts --app",
        template: "yarn create next-app -e [pathOrUrl]",
    },
    pnpm: {
        create: "pnpx create-next-app --ts --app",
        template: "pnpx create-next-app -e [pathOrUrl]",
    },
    bun: {
        create: "bunx create-next-app --ts --app",
        template: "bunx create-next-app -e [pathOrUrl]",
    },
};

export async function createNextJSTemplate(options: CLIOptions) {
    try {
        const { template } = options;

        if (!template.pathOrURL) {
            console.error("Template must have a valid path or URL.");
            process.exit(1);
        }

        const createCommand = createNextCommands[options.packageManager].template.replace(
            "[pathOrUrl]",
            template.pathOrURL
        );

        const fullCommand = `${createCommand} ${options.projectName}`;

        console.log("\n");
        execSync(fullCommand, { stdio: "inherit" });
        console.log("\n");
    } catch (error) {
        console.error("Failed to create the Next.js project with the template.");
        process.exit(1);
    }
}

export async function createNextJS(options: CLIOptions) {
    try {
        const createCommand = `${createNextCommands[options.packageManager].create} ${
            options.projectName
        } `;

        execSync(createCommand, { stdio: "inherit" });
        process.chdir(path.join(process.cwd(), options.projectName));

        const isSrc = existsSync(path.join(process.cwd(), "src"));
        const tsConfig = readFileSync("tsconfig.json", "utf-8");
        const alias = tsConfig.includes("@/") ? "@/" : "";

        options.src = isSrc;
        options.alias = alias;

        cleanNextJS(options);
    } catch (error) {
        logger.error(`Failed to create the Next.js project: ${error}`);
        process.exit(1);
    }
}

// Clean Next.js base structure
function cleanNextJS(options: CLIOptions) {
    const baseDir = options.src ? "src" : "";
    const publicDir = path.join(baseDir, "public");
    const stylesDir = path.join(baseDir, "styles");

    try {
        // Step 1: Create 'public' folder inside src if it doesn't exist
        if (!existsSync(publicDir)) {
            mkdirSync(publicDir, { recursive: true });
        }

        // Step 2: Move favicon to 'public'
        const faviconSrc = options.src ? "src/app/favicon.ico" : "app/favicon.ico";
        const faviconDest = path.join(publicDir, "favicon.ico");
        if (existsSync(faviconSrc)) {
            renameSync(faviconSrc, faviconDest);
        }

        // Step 3: Move fonts to 'public/fonts' if any exist
        const fontsDir = options.src ? "src/app/fonts" : "app/fonts";
        const publicFontsDir = path.join(publicDir, "fonts");
        if (existsSync(fontsDir)) {
            mkdirSync(publicFontsDir, { recursive: true });
            renameSync(fontsDir, publicFontsDir);
        }

        // Step 4: Create 'styles' folder if it doesn't exist and move 'globals.css'
        if (!existsSync(stylesDir)) {
            mkdirSync(stylesDir, { recursive: true });
        }

        const globalCssSrc = options.src ? "src/app/globals.css" : "app/globals.css";
        const globalCssDest = path.join(stylesDir, "globals.css");
        if (existsSync(globalCssSrc)) {
            renameSync(globalCssSrc, globalCssDest);
        }

        // Step 5: Update layout.tsx with the new path to 'globals.css'
        updateLayout(options);

        // Step 6: Update page.tsx with template starter code
        updatePage(options);

        // Step 7: Update .gitignore to include .env
        const gitignoreFile = ".gitignore";
        if (existsSync(gitignoreFile)) {
            let gitignoreContent = readFileSync(gitignoreFile, "utf-8");
            gitignoreContent += "\n.env\n";
            writeFileSync(gitignoreFile, gitignoreContent);
        }

        logger.success(`Next.js app cleaned and restructured successfully.`);

        console.log(
            `\n\nNext.js project created successfully with ${chalk.blue.bold(
                options.packageManager
            )}. If done, press ${chalk.yellow.bold("Ctrl + C")} to end the process.`
        );
    } catch (error) {
        logger.error(`Failed to clean the Next.js project: ${error}`);
        process.exit(1);
    }
}
