import chalk from "chalk";
import { readFileSync } from "fs";
import path from "path";
import { CLIOptions } from "../../../../types";
import { replaceFile } from "../../../../utils/index.js";
import { logger } from "../../../../utils/index.js";

function updatePackage(options: CLIOptions) {
    const databasePath = options.src ? "src/database" : "database";
    const packageJsonPath = path.resolve("package.json");

    let packageJsonContent = readFileSync(packageJsonPath, "utf-8");
    let packageJson = JSON.parse(packageJsonContent);

    const scripts = {
        "db:generate": `drizzle-kit generate`,
        "db:migrate": `tsx ${databasePath}/db/migrate.ts`,
        "db:drop": "drizzle-kit drop",
        "db:pull": `drizzle-kit introspect`,
        "db:push": `drizzle-kit push`,
        "db:studio": "drizzle-kit studio",
        "db:check": `drizzle-kit check`,
    };

    packageJson.scripts = { ...packageJson.scripts, ...scripts };

    replaceFile(packageJsonPath, JSON.stringify(packageJson, null, 2));

    logger.success(`Updating ${chalk.cyan("package.json")} - with Drizzle scripts`);
}

export default updatePackage;
