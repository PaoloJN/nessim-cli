import { select, Separator } from "@inquirer/prompts";
import { box } from "../../utils/index.js";
import { AuthPackage, CLIOptions } from "../../types";

import chalk from "chalk";
import addClerk from "./clerk/index.js";

type AuthLibraryOption = {
    name: string;
    value: AuthPackage;
    disabled?: boolean;
};

const nullOption = { name: "None", value: null };

async function addAuth(options: CLIOptions) {
    options.auth = options.auth || { package: "", provider: [] };

    const { auth, database } = options;

    const availableAuthLibraries: AuthLibraryOption[] = database?.type
        ? [
              { name: "Clerk", value: "clerk" },
              { name: "Auth Js (Coming Soon)", value: "next-auth", disabled: true },
              { name: "Lucia (Coming Soon)", value: "lucia", disabled: true },
              { name: "Kinde (Coming Soon)", value: "kinde", disabled: true },
          ]
        : [
              { name: "Clerk", value: "clerk" },
              { name: "Auth Js (Coming Soon)", value: "next-auth", disabled: true },
          ];

    if (!auth.package) {
        box(`${chalk.bold("🔐 Would you like to add Authentication?")}`);

        // if (!database?.type) {
        //   console.log(
        //     chalk.yellow(
        //       "Note: Since you haven't selected a database, you can only use Auth Js or Clerk"
        //     )
        //   );
        //   console.log("\n");

        //   const addDatabaseNow = await select({
        //     message: "Would you like to add a database now to use auth?",
        //     choices: [
        //       { name: "Yes", value: true },
        //       { name: "No", value: false },
        //     ],
        //   });

        //   if (addDatabaseNow) {
        //     await addDatabase(options);
        //     // Re-run addAuth
        //     await addAuth(options);
        //     return;
        //   }
        // }

        try {
            auth.package = await select({
                message: "Select an Auth library to use:",
                choices: [...availableAuthLibraries, new Separator(), nullOption],
            });
        } catch (error) {
            console.log("\nThank you for using Nessim CLI!"); // Graceful exit
            process.exit(0); // Ensure process exits cleanly
        }
    }

    // if (!auth.providers && auth.package !== "clerk") {
    //   auth.providers = await checkbox({
    //     message: "Select an Auth provider to use:",
    //     choices: [
    //       new Separator(),
    //       { name: "Google", value: "google" },
    //       { name: "GitHub", value: "github" },
    //       { name: "Apple", value: "apple" },
    //       { name: "Email", value: "email" },
    //       { name: "Username", value: "username" },
    //       new Separator(),
    //     ],
    //   });
    // }

    if (auth.package === "clerk") await addClerk(options);
    // if (authPackage === "next-auth") await addNextAuth(options);
    // if (authPackage === "lucia") await addLucia(options);
    // if (authPackage === "kinde") await addKinde(options);

    console.log(
        `\n\nAuthentication added: ${chalk.yellow(
            auth.package
        )}. If done, press ${chalk.yellow.bold("Ctrl + C")} to end the process.`
    );

    return auth;
}

export default addAuth;
