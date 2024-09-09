import { readFileSync } from "fs";
import { CLIOptions } from "../../../../types";
import { replaceFile } from "../../../../utils/index.js";
import { logger } from "../../../../utils/index.js";

import chalk from "chalk";
import path from "path";

function updatePackage(options: CLIOptions) {
    const packageJsonPath = path.resolve("package.json");

    let packageJsonContent = readFileSync(packageJsonPath, "utf-8");
    let packageJson = JSON.parse(packageJsonContent);

    const scripts = {
        dev: "prisma generate && next dev",
        build: "prisma generate && next build",
        "db:generate": `prisma generate`,
        "db:migrate": `prisma migrate dev`,
        "db:studio": "prisma studio",
    };

    packageJson.scripts = { ...packageJson.scripts, ...scripts };

    replaceFile(packageJsonPath, JSON.stringify(packageJson, null, 2));

    logger.success(`Updating ${chalk.cyan("package.json")} - with Prisma scripts`);
}

export default updatePackage;
