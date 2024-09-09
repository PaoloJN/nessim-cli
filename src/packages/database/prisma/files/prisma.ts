import chalk from "chalk";
import { CLIOptions } from "../../../../types";
import { createFile } from "../../../../utils/index.js";
import { logger } from "../../../../utils/index.js";

const prismaIndex = {
    fileName: "prisma.ts",
    path: "database/prisma.ts",
    pathSrc: "src/database/prisma.ts",
    code: `
import { PrismaClient } from "@prisma/client";

declare global {
  // allow global \`var\` declarations
  // eslint-disable-next-line no-var
  var db: PrismaClient | undefined;
}

export const db =
  global.db ||
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") global.db = db;
`,
};

function addPrismaIndex(options: CLIOptions) {
    const code = prismaIndex.code;

    createFile(options.src ? prismaIndex.pathSrc : prismaIndex.path, code);

    logger.success(`Writing ${chalk.cyan("index.ts")} - database`);
}

export default addPrismaIndex;
