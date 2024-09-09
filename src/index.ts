#!/usr/bin/env node

import { Command } from "commander";
import init from "./commands/init.js";

const program = new Command();

program.name("multi-forge-cli").description("Multi Forge CLI").version("0.0.1");

program
    .argument("[project-name]", "Name of the project")
    .description("Create a new Next.js project")
    .option("--package-manager <pm>", "Specify the package manager to use (npm, pnpm, yarn, bun)")

    // // Valid Create Next App Options
    // .option("--no-eslint", "Negate default options. E.g. --no-eslint")
    //   .option("--ts, --typescript", "Initialize as a TypeScript project (default)")
    //   .option("--js, --javascript", "Initialize as a JavaScript project")
    //   .option("--tailwind", "Initialize with Tailwind CSS config (default)")
    //   // .option("--eslint", "Initialize with ESLint config")
    //   .option("--app", "Initialize as an App Router project")
    //   .option("--src-dir", "Initialize inside a src/ directory")
    //   .option("--turbo", "Enable Turbopack by default for development")
    //   .option("--import-alias <alias>", 'Specify import alias to use (default "@/*")')
    //   .option("--empty", "Initialize an empty project")
    //   .option("--skip-install", "Explicitly tell the CLI to skip installing packages")

    // //  Packages Options
    //   .option("--ui-library <library>", "Specify the UI library to use (shadcn-ui, radix-ui, chakra-ui)")
    //   .option("--database <database>", "Specify the database to use (postgresql, mysql, sqlite)")
    //   .option("--auth <auth>", "Specify the auth to use (next-auth, clerk, lucia, kinde)")
    //   .option("--email <email>", "Specify the email service to use (sendgrid, mailgun, postmark)")
    //   .option("--payment <payment>", "Specify the payment service to use (stripe, lemon-squeezy)")
    //   .option("--analytics <analytics>", "Specify the analytics service to use (vercel-analytics, google-analytics, posthog)")

    .action(async (projectName, options) => {
        await init({ ...options, projectName });
    });

program.parse(process.argv);
