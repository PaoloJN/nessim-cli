import chalk from "chalk";
import { createFile } from "../../../../utils/index.js";
import { logger } from "../../../../utils/index.js";

const clerkMiddleware = `
import { clerkMiddleware } from '@clerk/nextjs/server'

export default clerkMiddleware()

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
`;

function addMiddleware() {
    createFile(`middleware.ts`, clerkMiddleware);
    logger.success(`Writing ${chalk.cyan("middleware.ts")} - Clerk Auth`);
}

export default addMiddleware;
