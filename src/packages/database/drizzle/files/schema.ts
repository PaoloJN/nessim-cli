import chalk from "chalk";
import { CLIOptions } from "../../../../types";
import { createFile } from "../../../../utils/index.js";
import { logger } from "../../../../utils/index.js";

// TODO: use openai api to generate dummy schema with ai

function addSchema(options: CLIOptions) {
    const databasePath = options.src ? "src/database" : "database";
    createFile(`${databasePath}/schema.ts`, "");

    logger.success(`Writing ${chalk.cyan("schema.ts")} - database`);
}

export default addSchema;
