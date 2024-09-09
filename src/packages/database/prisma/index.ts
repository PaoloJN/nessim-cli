import { execSync } from "child_process";
import { CLIOptions } from "../../../types";
import { createFolder } from "../../../utils/index.js";

import updatePackage from "./files/package.js";
import addPrismaIndex from "./files/prisma.js";

type PrismaCommands = {
    [key: string]: {
        install: string;
        init: string;
    };
};

const PrismaCommands: PrismaCommands = {
    npm: {
        install: `npm install prisma -save-dev`,
        init: `npx prisma init`,
    },
    yarn: {
        install: `yarn add prisma --dev`,
        init: `yarn prisma init`,
    },
    pnpm: {
        install: `pnpm add prisma --save-dev`,
        init: `pnpm dlx prisma init`,
    },
    bun: {
        install: `bun add prisma`,
        init: `bunx prisma init`,
    },
};

async function addPrisma(options: CLIOptions) {
    const databaseType = options.database.type || "";
    const databasePath = options.src ? "src/database" : "./database";

    try {
        const installCommand = `${PrismaCommands[options.packageManager].install}`;
        console.log("\n");
        console.log("Installing Prisma...");
        console.log("\n");
        execSync(installCommand, {
            stdio: "inherit",
        });
        console.log("\n");

        const initCommand = `${
            PrismaCommands[options.packageManager].init
        } --datasource-provider ${databaseType} --with-model`;

        createFolder(databasePath);

        updatePackage(options);
        addPrismaIndex(options);

        console.log("\n");
        execSync(initCommand, {
            stdio: "inherit",
        });

        console.log("\n");
    } catch (error) {
        console.log("Error installing Prisma");
        console.log(error);
    }
}

export default addPrisma;
