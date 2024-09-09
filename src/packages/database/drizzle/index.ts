import { CLIOptions } from "../../../types";
import { execSync } from "child_process";
import { createFolder } from "../../../utils/index.js";

import { logger } from "../../../utils/index.js";

import addDrizzleConfig from "./files/drizzle.config.js";
import updateEnv from "./files/env.js";
import addDrizzleIndex from "./files/index.js";
import updatePackage from "./files/package.js";
import addQueries from "./files/queries.js";
import addSchema from "./files/schema.js";

type DrizzleCommands = {
    [key: string]: {
        install: string;
        dev: string;
    };
};

type DatabaseProviderCommands = {
    [key: string]: string;
};

const DrizzleCommands: DrizzleCommands = {
    npm: {
        install: `npm i drizzle-orm`,
        dev: `npm i dotenv drizzle-kit --save-dev`,
    },
    yarn: {
        install: `yarn add drizzle-orm`,
        dev: `yarn add dotenv drizzle-kit --dev`,
    },
    pnpm: {
        install: `pnpm add drizzle-orm`,
        dev: `pnpm add drizzle-kit --save-dev`,
    },
    bun: {
        install: `bun add drizzle-orm`,
        dev: `bun add drizzle-kit`,
    },
};

const databaseProviderCommands: DatabaseProviderCommands = {
    neon: `@neondatabase/serverless`,
    postgresjs: `postgres`,
    aws: `aws-sdk/client-rds-data @aws-sdk/credential-providers`,
    planetscale: `@planetscale/database`,
    turso: `@libsql/client`,
    "node-postgres": `pg @types/pg`,
    "vercel-pg": `@vercel/postgres`,
    "mysql-2": `mysql2`,
    "better-sqlite3": `better-sqlite3`,
};

async function addDrizzle(options: CLIOptions) {
    const databaseProvider = options.database.provider || "";

    const databasePath = options.src ? "src/database" : "./database";

    try {
        const installCommand = `${DrizzleCommands[options.packageManager].install} ${
            databaseProviderCommands[databaseProvider]
        }`;

        console.log("\n");
        execSync(installCommand, {
            stdio: "inherit",
        });
        console.log("\n");

        logger.info("Installing Drizzle Kit and dotenv...");

        const installKitCommand = DrizzleCommands[options.packageManager].dev;

        console.log("\n");
        execSync(installKitCommand, {
            stdio: "inherit",
        });
        console.log("\n");

        createFolder(databasePath);

        addDrizzleConfig(options);
        addDrizzleIndex(options);
        addQueries(options);
        addSchema(options);
        updatePackage(options);
        updateEnv(options);
    } catch (error) {
        console.error("Failed to install Drizzle");
        logger.error(error);
        process.exit(1);
    }
}

export default addDrizzle;
