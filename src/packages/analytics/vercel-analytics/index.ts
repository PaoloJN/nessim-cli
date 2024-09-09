// https://vercel.com/docs/analytics/quickstart

import { execSync } from "child_process";
import { CLIOptions } from "../../../types";
import { logger } from "../../../utils/index.js";
import { readFileSync } from "fs";
import { replaceFile } from "../../../utils/index.js";

type VercelAnalyticsCommands = {
    [key: string]: string;
};

const vercelAnalyticsCommands: VercelAnalyticsCommands = {
    npm: `npm i @vercel/analytics`,
    yarn: `yarn add @vercel/analytics`,
    pnpm: `pnpm i @vercel/analytics`,
    bun: `bun add @vercel/analytics`,
};

async function addVercelAnalytics(options: CLIOptions) {
    const { src, packageManager } = options;
    const layoutPath = src ? "src/app/layout.tsx" : "app/layout.tsx";

    try {
        console.log("\n");
        execSync(vercelAnalyticsCommands[packageManager], { stdio: "inherit" });
        console.log("\n");
    } catch (error) {
        logger.error("Failed to install @vercel/analytics");
        return;
    }

    let layout = readFileSync(layoutPath, "utf-8");

    layout = `import { Analytics } from '@vercel/analytics/react';\n${layout}`;

    layout = layout.replace(/\{children\}/, `{children}\n<Analytics />`);

    replaceFile(layoutPath, layout);

    logger.success("Vercel Analytics added successfully");
}

export default addVercelAnalytics;
