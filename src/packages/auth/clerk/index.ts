import { execSync } from "child_process";
import { CLIOptions } from "../../../types";
import { fileExists } from "../../../utils/index.js";
import { logger } from "../../../utils/index.js";

import chalk from "chalk";

import addMiddleware from "./files/middleware.js";
import addSignInPage from "./files/sign-in.js";
import addSignUpPage from "./files/sign-up.js";
import updateLayout from "./files/layout.js";
import updateEnv from "./files/env.js";

type ClerkCommands = {
    [key: string]: {
        install: string;
        elements: string;
    };
};

const clerkCommands: ClerkCommands = {
    npm: {
        install: "npm install @clerk/nextjs",
        elements: "npm install @clerk/nextjs @clerk/elements",
    },
    yarn: {
        install: "yarn add @clerk/nextjs",
        elements: "yarn add @clerk/nextjs @clerk/elements",
    },
    pnpm: {
        install: "pnpm add @clerk/nextjs",
        elements: "pnpm add @clerk/nextjs @clerk/elements",
    },
    bun: {
        install: "bun add @clerk/nextjs",
        elements: "bun add @clerk/nextjs @clerk/elements",
    },
};

async function addClerk(options: CLIOptions) {
    try {
        const { packageManager, uiLibrary, src, packageManagerX } = options;
        const installCommand = clerkCommands[packageManager]?.install;
        const installWithElementsCommand = clerkCommands[packageManager]?.elements;
        const elementsPath = src ? "src/components/ui" : "components/ui";
        const requiredElements = ["button.tsx", "card.tsx", "input.tsx", "label.tsx"];

        if (uiLibrary === "shadcn-ui") {
            console.log("\n");
            console.info(
                "Shadcn UI detected. Installing Clerk Elements with shadcn/ui to build custom sign-in and sign-up flows."
            );
            console.log("\n");

            execSync(installWithElementsCommand, { stdio: "inherit" });

            const missingElements = requiredElements.filter(
                (file) => !fileExists(`${elementsPath}/${file}`)
            );

            if (missingElements.length > 0) {
                const componentsToInstall = missingElements
                    .map((el) => el.replace(".tsx", ""))
                    .join(" ");

                logger.info("Installing missing shadcn elements...");
                execSync(`${packageManagerX} shadcn add ${componentsToInstall}`, {
                    stdio: "inherit",
                });
            }
        } else {
            execSync(installCommand, { stdio: "inherit" });
            console.log("\n");
        }

        addMiddleware();
        addSignInPage(options);
        addSignUpPage(options);
        updateLayout(options);
        updateEnv();

        logger.log("\n");

        logger.log(
            chalk.blue(`
Remember to configure the appropriate settings in Clerk:\n
1. Navigate to the \x1b]8;;https://dashboard.clerk.com/last-active\x1b\\Clerk Dashboard\x1b]8;;\x1b\\\n
2. In the navigation sidebar, select: \x1b]8;;https://dashboard.clerk.com/last-active?path=user-authentication/social-connections\x1b\\User & Authentication > Social connections\x1b]8;;\x1b\\\n
3. Ensure that ${chalk.bold("Google")} and ${chalk.bold("GitHub")} are enabled.`)
        );
        console.log("\n");
    } catch (error) {
        logger.error("Error installing Clerk", error);
    }
}

export default addClerk;
