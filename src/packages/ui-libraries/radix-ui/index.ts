import { execSync } from "child_process";

import updateLayout from "./files/layout.js";
import { CLIOptions } from "../../../types";
import { logger } from "../../../utils/index.js";

type RadixUICommands = {
    [key: string]: string;
};

const radixUICommands: RadixUICommands = {
    npm: "npm install @radix-ui/themes",
    yarn: "yarn add @radix-ui/themes",
    pnpm: "pnpm add @radix-ui/themes",
    bun: "bun add @radix-ui/themes",
};

async function addRadixUI(options: CLIOptions) {
    try {
        console.log("\n");
        execSync(radixUICommands[options.packageManager], {
            stdio: "inherit",
        });
        console.log("\n");

        logger.info("Configuring Radix UI...");
        const startConfig = Date.now();

        updateLayout(options);

        const endConfig = Date.now();
        logger.success(
            `Radix UI configuration completed in ${(endConfig - startConfig) / 1000} seconds`
        );
    } catch (error) {
        console.error("Failed to install Radix UI");
        process.exit(1);
    }
}

export default addRadixUI;
