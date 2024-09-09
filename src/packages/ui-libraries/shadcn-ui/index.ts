import { execSync } from "child_process";

import addThemeProvider from "./files/theme-provider.js";
import addThemeToggle from "./files/theme-toggle.js";
import updateLayout from "./files/layout.js";

import { input } from "@inquirer/prompts";
import { CLIOptions } from "../../../types";
import { logger } from "../../../utils/index.js";

type ShadcnUICommands = {
    [key: string]: {
        install: string;
        init: string;
        add: string;
    };
};

const shadcnUICommands: ShadcnUICommands = {
    npm: {
        install: `npm -g install shadcn@latest`,
        init: `npx shadcn init`,
        add: `npx shadcn add`,
    },
    yarn: {
        install: `yarn global add shadcn@latest`,
        init: `yarn create shadcn init`,
        add: `yarn  shadcn add`,
    },
    pnpm: {
        install: `pnpm add -g shadcn@latest`,
        init: `pnpx shadcn init`,
        add: `pnpx shadcn add`,
    },
    bun: {
        install: `bun add -g shadcn@latest`,
        init: `bunx --bun shadcn init`,
        add: `bunx --bun shadcn add`,
    },
};

async function addShadcnUI(options: CLIOptions) {
    try {
        const remoteComponents = await input({
            message: "Would you like to add remote components? ie. sidebar-01:",
        });

        execSync(`${shadcnUICommands[options.packageManager].init} ${remoteComponents}`, {
            stdio: "inherit",
        });

        try {
            execSync(shadcnUICommands[options.packageManager].add, {
                stdio: "inherit",
            });
        } catch (error) {}

        logger.info("Installing next-themes and lucide-react...\n");

        // time those show info of installing next-themes lucide-react ...
        execSync(`${options.packageManager} install next-themes lucide-react`, {
            stdio: "inherit",
        });

        console.log("\n");
        logger.info("Adding ThemeProvider, ThemeToggle and updating layout...\n");

        addThemeProvider(options);
        updateLayout(options);
        addThemeToggle(options);

        logger.success(`Shadcn UI configuration complete.`);
    } catch (error) {
        logger.error("Shadcn UI installation failed");
        process.exit(1);
    }
}

export default addShadcnUI;
