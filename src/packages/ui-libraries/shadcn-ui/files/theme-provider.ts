import { CLIOptions } from "../../../../types";
import { createFile } from "../../../../utils/index.js";

const ThemeProvider = {
    fileName: "theme-provider.tsx",
    path: "components/theme-provider.tsx",
    pathSrc: "src/components/theme-provider.tsx",
    code: `"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
`,
};

function addThemeProvider(options: CLIOptions) {
    createFile(options.src ? ThemeProvider.pathSrc : ThemeProvider.path, ThemeProvider.code);
}

export default addThemeProvider;
