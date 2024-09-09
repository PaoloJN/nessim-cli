import { select, Separator } from "@inquirer/prompts";
import { CLIOptions, Database, DatabaseProviderChoices } from "../../types";
import { box } from "../../utils/index.js";

import chalk from "chalk";

import addDrizzle from "./drizzle/index.js";
import addPrisma from "./prisma/index.js";

const nullOption = { name: "None", value: null };

async function addDatabase(options: CLIOptions) {
    options.database = {} as Database;

    await askDatabaseType(options);
    await askDatabaseORM(options);
    await askDatabaseProvider(options);

    if (options.database.orm === "drizzle") await addDrizzle(options);
    if (options.database.orm === "prisma") await addPrisma(options);

    console.log(
        `\n\nDatabase added: ${chalk.yellow(
            options.database.provider
        )}. If done, press ${chalk.yellow.bold("Ctrl + C")} to end the process.`
    );
}

async function askDatabaseType(options: CLIOptions) {
    if (!options.database?.type) {
        box(`${chalk.bold("🗄️ Would you like to add a Database")}`);

        options.database.type = await select({
            message: "Select a database to use:",
            choices: [
                new Separator(),
                {
                    name: "Postgres (Postgres JS, Vercel PG, Node PG, Neon, AWS)",
                    value: "postgresql",
                },
                { name: "MySQL (MySQL 2, Planetscale)", value: "mysql" },
                { name: "SQLite (Better SQLite3, Turso)", value: "sqlite" },
                new Separator(),
                nullOption,
            ],
        });
    }
}

// function to add ORM
async function askDatabaseORM(options: CLIOptions) {
    if (!options.database?.orm && options.database?.type) {
        options.database.orm = await select({
            message: "Select an ORM to use:",
            choices: [
                {
                    name: "Drizzle (Lightweight ORM) - Recommended",
                    value: "drizzle",
                },
                {
                    name: "Prisma (Feature-rich ORM with type safety)",
                    value: "prisma",
                },
            ],
        });
    }
}

// function to add database provider
async function askDatabaseProvider(options: CLIOptions) {
    if (options.database?.orm === "drizzle") {
        let databaseProviderChoices: DatabaseProviderChoices[] = [];

        switch (options.database.type) {
            case "postgresql":
                databaseProviderChoices = [
                    { name: "Postgres JS", value: "postgresjs" },
                    { name: "Vercel Postgres", value: "vercel-pg" },
                    { name: "Node Postgres", value: "node-postgres" },
                    { name: "Neon Postgres", value: "neon" },
                    { name: "AWS", value: "aws" },
                ];
                break;
            case "mysql":
                databaseProviderChoices = [
                    { name: "MySQL 2", value: "mysql-2" },
                    { name: "Planetscale", value: "planetscale" },
                ];
                break;
            case "sqlite":
                databaseProviderChoices = [
                    { name: "Better SQLite3", value: "better-sqlite3" },
                    { name: "Turso", value: "turso" },
                ];
                break;
        }

        options.database.provider = await select({
            message: "Select a database provider to use:",
            choices: [new Separator(), ...databaseProviderChoices],
        });
    }

    options.database.provider = "none";

    return options.database;
}

export default addDatabase;
