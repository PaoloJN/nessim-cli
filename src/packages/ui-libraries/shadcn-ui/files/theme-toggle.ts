import { execSync } from "child_process";
import { existsSync } from "fs";
import { CLIOptions } from "../../../../types";
import { createFile } from "../../../../utils/index.js";

const ThemeToggle = {
    fileName: "theme-toggle",
    path: "components/theme-toggle.tsx",
    pathSrc: "src/components/theme-toggle.tsx",
    code: `"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "{alias}/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "{alias}/components/ui/dropdown-menu";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
  `,
};

function addThemeToggle(options: CLIOptions) {
    const alias = options.alias || "@";

    const buttonPath = options.src
        ? "src/components/ui/button.tsx"
        : "app/components/ui/button.tsx";

    const dropdownMenuPath = options.src
        ? "src/components/ui/dropdown-menu.tsx"
        : "app/components/ui/dropdown-menu.tsx";

    if (!existsSync(buttonPath)) {
        execSync(`${options.packageManagerX} shadcn@latest add button`, {
            stdio: "ignore",
        });
    }

    if (!existsSync(dropdownMenuPath)) {
        execSync(`${options.packageManagerX} shadcn@latest add dropdown-menu`, {
            stdio: "ignore",
        });
    }

    createFile(
        options.src ? ThemeToggle.pathSrc : ThemeToggle.path,
        ThemeToggle.code.replaceAll("{alias}", alias)
    );
}

export default addThemeToggle;
