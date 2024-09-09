import { CLIOptions, PackageManager, PackageManagerX } from "../types";

import { input, select, confirm, Separator } from "@inquirer/prompts";
import { initMessage } from "../utils/index.js";
import { templates } from "../templates/index.js";
import { createNextJS, createNextJSTemplate } from "../utils/create-next/index.js";

import chalk from "chalk";

import addUILibrary from "../packages/ui-libraries/index.js";
import addDatabase from "../packages/database/index.js";
import addAuth from "../packages/auth/index.js";
import addAnalytics from "../packages/analytics/index.js";
import { logger } from "../utils/index.js";

const packageManagerXMap: Record<PackageManager, PackageManagerX> = {
    yarn: "yarn",
    npm: "npx",
    pnpm: "pnpx",
    bun: "bunx",
};

async function init(options: CLIOptions) {
    initMessage();

    if (!options.projectName) {
        options.projectName = await input({
            message: "What is your project named? ›",
            default: "multi-forge-app",
            validate: (name: string) => {
                if (name && name.trim()) return true;
                return "Project name cannot be empty!";
            },
        });
    }

    if (!options.framework) {
        options.framework = await select({
            message: "Please pick a framework",
            choices: [
                { name: "Next.js - React framework", value: "nextjs" },
                {
                    name: "Remix - React framework (Coming Soon)",
                    value: "remix",
                    disabled: true,
                },
                {
                    name: "Laravel - PHP framework (Coming Soon)",
                    value: "laravel",
                    disabled: true,
                },
            ],
        });
    }

    // TODO - If laravel see how to handle this..

    if (!options.packageManager) {
        options.packageManager = await select({
            message: "Please pick your preferred package manager",
            choices: [
                { name: "npm - Node.js default", value: "npm" },
                { name: "yarn - Fast & reliable", value: "yarn" },
                { name: "pnpm - Disk efficient", value: "pnpm" },
                { name: "bun - Blazing fast", value: "bun" },
            ],
        });
    }

    if (!options.packageManagerX) {
        options.packageManagerX = packageManagerXMap[options.packageManager];
    }

    if (!options.template) {
        const useTemplate = await confirm({
            message: "Would you like to use a template / boilerplate? (default is No)",
            default: false, // Default to "No"
        });

        if (useTemplate) {
            const wrapTags = (tags: string[], maxTagsPerLine: number = 5) => {
                let wrapped = "";
                for (let i = 0; i < tags.length; i += maxTagsPerLine) {
                    wrapped += tags.slice(i, i + maxTagsPerLine).join(", ") + "\n        ";
                }
                return wrapped.trim();
            };

            function wrapText(text: string, width: number): string {
                return text
                    .split(" ")
                    .reduce(
                        (acc, word) => {
                            const currentLine = acc[acc.length - 1];
                            if ((currentLine + word).length > width) {
                                acc.push(word + " ");
                            } else {
                                acc[acc.length - 1] += word + " ";
                            }
                            return acc;
                        },
                        [""]
                    )
                    .join("\n ")
                    .trim();
            }

            const groupedTemplates = templates.reduce((acc, template) => {
                acc[template.framework] = acc[template.framework] || [];
                acc[template.framework].push(
                    new Separator(), // Add separator between templates
                    {
                        // Formatting for display to match the requested output
                        name: `${chalk.bold.blue(template.name)}
            \n ${chalk.magenta(wrapText(template.longDescription, 80))}\n\n ${chalk.gray(
                            "Path:"
                        )} ${chalk.underline.gray(template.pathOrURL)}\n ${chalk.gray(
                            "Author:"
                        )} ${chalk.gray(template.author)}\n ${chalk.gray("Language:")} ${chalk.gray(
                            template.language
                        )}\n ${chalk.gray("Type:")} ${chalk.gray(template.type)}\n ${chalk.gray(
                            "Tags:"
                        )} ${chalk.gray(wrapTags(template.tags, 4))}`,

                        value: template, // Store the whole template object
                    }
                );
                return acc;
            }, {} as any);

            const availableTemplates = groupedTemplates[options.framework];
            if (options.framework && availableTemplates && availableTemplates.length > 0) {
                options.template = await select({
                    loop: false,
                    pageSize: 40,
                    message: `Please pick a template for ${options.framework}`,
                    choices: [...availableTemplates],
                });
            } else {
                console.log("No templates available for the selected framework.");
            }
        }
    }

    if (options.framework === "nextjs") {
        if (options.template) {
            await createNextJSTemplate(options);
        } else {
            await createNextJS(options);
        }
    }
    // if (options.framework === "remix") await createRemix(options);
    // if (options.framework === "laravel") await createLaravel(options);

    if (!options.template) {
        const uiLibrary = await addUILibrary(options);
        const database = await addDatabase(options);
        const auth = await addAuth(options);
        const analytics = await addAnalytics(options);
        //   const email = addEmail(options);
        //   const payment = addPayment(options);

        console.log("\n");
        logger.success("Project setup complete! Thanks for using Multi-Forge!");
        console.log("\n");

        logger.info("Next steps:");
        logger.info(`1. Navigate to the project directory: ${options.projectName}`);
        logger.info("2. Run the following command to start your project:");
        logger.info(chalk.bold(`${options.packageManager} run dev`));
        logger.info("3. Visit http://localhost:3000 in your browser to see your app.");
        console.log("\n");
        logger.info("Happy coding!");
    }
}

export default init;
