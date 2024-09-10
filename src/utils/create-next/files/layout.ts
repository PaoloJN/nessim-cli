import { execSync } from "child_process";
import { existsSync, writeFileSync } from "fs";
import { CLIOptions } from "../../../types";
import { logger } from "../../../utils/index.js";

// Template for the layout file
const layoutTemplate = `
import "{globalsCssPath}";

import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

export const metadata: Metadata = {
  title: "Nessim CLI - Build Full-Stack Apps Fast",
  description: "Nessim CLI is a powerful command-line tool to streamline full-stack development with multiple frameworks."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={\`\${GeistSans.variable} \${GeistMono.variable} antialiased\`}>
        {children}
      </body>
    </html>
  );
}
`;

async function updateLayout(options: CLIOptions) {
    const layoutFile = options.src ? "src/app/layout.tsx" : "app/layout.tsx";

    // Determine the correct path for the globals.css import
    const globalsCssPath = options.src ? "@/styles/globals.css" : "../styles/globals.css";

    // Update layout.tsx file with the template
    if (existsSync(layoutFile)) {
        writeFileSync(layoutFile, layoutTemplate.replace("{globalsCssPath}", globalsCssPath));
    }

    // Install geist font using the specified package manager
    const installCommand = {
        npm: "npm install geist",
        yarn: "yarn add geist",
        pnpm: "pnpm add geist",
        bun: "bun add geist",
    }[options.packageManager];

    try {
        console.log("\n");
        logger.info("Installing geist fonts...");
        execSync(installCommand, { stdio: "inherit" });
        console.log("\n");

        logger.success("Geist fonts installed successfully.");
    } catch (error) {
        logger.error(`Failed to install geist fonts: ${error}`);
    }
}

export default updateLayout;
