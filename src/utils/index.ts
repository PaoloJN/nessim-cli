import boxen from "boxen";
import chalk from "chalk";
import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import figlet from "figlet";
import { createConsola } from "consola";

export const logger = createConsola({
    formatOptions: {
        date: false, // Disables the timestamp
    },
});

export function box(message: string): void {
    console.log("\n");
    console.log(
        boxen(message, {
            textAlignment: "center",
            borderStyle: "double",
            borderColor: "white",
            padding: 2,
            fullscreen: (width) => [width, 3],
        })
    );
    console.log("\n");
}
export function initMessage() {
    console.clear();
    console.log(chalk(figlet.textSync("Multi Forge", { font: "ANSI Shadow" })));

    logger.info(
        chalk.white("Multi Forge CLI is still a WIP. Read more about what's coming here: ") +
            chalk.cyan(
                "\x1b]8;;https://github.com/PaoloJN/multi-forge-cli\x1b\\Multi Forge CLI GitHub\x1b]8;;\x1b\\"
            )
    );

    logger.info(
        chalk.white("If you encounter any issues, please report them here: ") +
            chalk.cyan(
                "\x1b]8;;https://github.com/PaoloJN/multi-forge-cli/issues\x1b\\Multi Forge CLI Issues\x1b]8;;\x1b\\"
            )
    );

    console.log("\n");
}

export function fileExists(filePath: string): boolean {
    return fs.existsSync(path.resolve(filePath));
}

export function createFile(filePath: string, content: string) {
    const resolvedPath = path.resolve(filePath);
    const dirName = path.dirname(resolvedPath);
    if (!fs.existsSync(dirName)) {
        fs.mkdirSync(dirName, { recursive: true });
    }

    fs.writeFileSync(resolvedPath, content);
}

export function replaceFile(filePath: string, content: string, log = true) {
    const resolvedPath = path.resolve(filePath);
    const dirName = path.dirname(resolvedPath);

    if (!fs.existsSync(dirName)) {
        fs.mkdirSync(dirName, { recursive: true });
    }

    fs.writeFileSync(resolvedPath, content);
}

export function createFolder(relativePath: string, log = false) {
    const fullPath = path.join(process.cwd(), relativePath);
    fs.mkdirSync(fullPath, { recursive: true });
}

export function isPackageInstalled(packageName: string): boolean {
    // Resolve the path to the package.json file
    const packageJsonPath = path.resolve("package.json");

    // Check if package.json exists
    if (!fs.existsSync(packageJsonPath)) {
        console.error("package.json not found.");
        return false;
    }

    // Read and parse the package.json file
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));

    // Check dependencies and devDependencies for the package
    const isInDependencies = packageJson.dependencies?.[packageName] !== undefined;
    const isInDevDependencies = packageJson.devDependencies?.[packageName] !== undefined;

    // Return true if the package is found in either dependencies or devDependencies
    return isInDependencies || isInDevDependencies;
}

export function installShadcnComponent(component: string, packageManagerX: string) {
    try {
        console.log(`Installing ${component}...`);
        execSync(`${packageManagerX} shadcn add ${component}`, {
            stdio: "inherit",
        });
        console.log(`${component} installed successfully.`);
    } catch (error) {
        console.error(`Failed to install ${component}:`, error);
    }
}

export function addToEnv(items: string, message?: string) {
    const envFilePath = path.resolve(".env");

    // Check if .env file exists
    if (fs.existsSync(envFilePath)) {
        // Append the items to the .env file
        fs.appendFileSync(envFilePath, `\n${items}`);

        if (message) {
            logger.success(`Writing ${chalk.cyan(".env")} - ${message}`);
        }
    } else {
        createFile(envFilePath, items);

        if (message) {
            logger.success(`Creating ${chalk.cyan(".env")} - ${message}`);
        }
    }
}
