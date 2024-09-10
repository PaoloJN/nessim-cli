import { select, Separator } from "@inquirer/prompts";
import { CLIOptions } from "../../types";
import { box } from "../../utils/index.js";

import chalk from "chalk";
import addShadcnUI from "./shadcn-ui/index.js";
import addRadixUI from "./radix-ui/index.js";

const nullOption = { name: "None", value: null };

async function addUILibrary(options: CLIOptions) {
    if (!options.uiLibrary) {
        box(`🖼️ ${chalk.bold("Would you like to add a UI Library")}`);

        try {
            options.uiLibrary = await select({
                message: "Select a component library to use:",
                choices: [
                    new Separator(),
                    { name: "Shadcn UI (with next-themes)", value: "shadcn-ui" },
                    { name: "Radix UI (with themes)", value: "radix-ui" },
                    new Separator(),
                    nullOption,
                ],
            });
        } catch (error) {
            console.log("\nThank you for using Nessim CLI!"); // Graceful exit
            process.exit(0); // Ensure process exits cleanly
        }
    }

    if (options.uiLibrary === "shadcn-ui") await addShadcnUI(options);
    if (options.uiLibrary === "radix-ui") await addRadixUI(options);

    console.log(
        `\n\nUI Library added: ${chalk.yellow(
            options.uiLibrary
        )}. If done, press ${chalk.yellow.bold("Ctrl + C")} to end the process.`
    );

    return options.uiLibrary;
}

export default addUILibrary;
