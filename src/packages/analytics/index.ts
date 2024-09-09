import { box } from "../../utils/index.js";
import { CLIOptions } from "../../types";
import { select, Separator } from "@inquirer/prompts";

import chalk from "chalk";

import addGoogleAnalytics from "./google-analytics/index.js";
import addVercelAnalytics from "./vercel-analytics/index.js";

const nullOption = { name: "None", value: null };

async function addAnalytics(options: CLIOptions) {
    if (!options.analytics) {
        box(`📊 ${chalk.bold("Would you like to add analytics")}`);

        options.analytics = await select({
            message: "Select analytics to use:",
            choices: [
                new Separator(),
                { name: "Google Analytics", value: "google-analytics" },
                { name: "Vercel Analytics", value: "vercel-analytics" },
                new Separator(),
                nullOption,
            ],
        });
    }

    if (options.analytics === "google-analytics") {
        await addGoogleAnalytics(options);
    }

    if (options.analytics === "vercel-analytics") {
        await addVercelAnalytics(options);
    }

    return options.analytics;
}

export default addAnalytics;
