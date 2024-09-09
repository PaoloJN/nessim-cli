import { logger } from "../../../../utils/index.js";
import { addToEnv } from "../../../../utils/index.js";

import chalk from "chalk";

const clerkEnv = `
# Clerk: Learn more at https://clerk.com/
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=xxxx
CLERK_SECRET_KEY=xxxx
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
`;

function updateEnv() {
    addToEnv(clerkEnv);

    logger.success(`Writing ${chalk.cyan(".env")} - Clerk Auth`);
}

export default updateEnv;
