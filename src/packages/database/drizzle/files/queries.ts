import chalk from "chalk";
import { CLIOptions } from "../../../../types";
import { createFile } from "../../../../utils/index.js";
import { logger } from "../../../../utils/index.js";

function addQueries(options: CLIOptions) {
    const databasePath = options.src ? "src/database" : "database";
    createFile(`${databasePath}/queries.ts`, "");

    logger.success(`Writing ${chalk.cyan("queries.ts")} - database`);
}

export default addQueries;
