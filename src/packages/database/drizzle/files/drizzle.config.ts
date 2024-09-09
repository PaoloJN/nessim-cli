import chalk from "chalk";
import { CLIOptions } from "../../../../types";
import { createFile } from "../../../../utils/index.js";
import { logger } from "../../../../utils/index.js";

const DrizzleConfig = {
    fileName: "drizzle.config.ts",
    path: "drizzle.config.ts",
    pathSrc: "drizzle.config.ts",
    code: `
import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env.local" });

export default defineConfig({
    schema: "./{databasePath}/schema.ts",
    out: {out},
    dialect: "{type}",
    dbCredentials: {credentials}
});
`,
};

function addDrizzleConfig(options: CLIOptions) {
    const databasePath = options.src ? "src/database" : "database";
    const provider = options.database.provider;
    const type = provider === "turso" ? "turso" : options?.database?.type;

    let credentials = `{ url: env.DATABASE_URL }`;
    let outDir = `"./${databasePath}/db/migrations"`;

    if (provider === "turso") {
        outDir += `,\n  driver: "turso"`;
    }

    if (provider === "turso") {
        credentials = `{ url: process.env.DATABASE_URL, authToken: process.env.DATABASE_AUTH_TOKEN }`;
    }

    if (provider === "vercel-pg") {
        credentials = `{ url: process.env.POSTGRES_URL }`;
    }

    createFile(
        options.src ? DrizzleConfig.pathSrc : DrizzleConfig.path,
        DrizzleConfig.code
            .replace(/{databasePath}/g, String(databasePath))
            .replace(/{type}/g, String(type))
            .replace(/{credentials}/g, String(credentials))
            .replace(/{out}/g, String(outDir))
    );

    logger.success(`Writing ${chalk.cyan("drizzle.config.ts")} - database`);
}

export default addDrizzleConfig;
