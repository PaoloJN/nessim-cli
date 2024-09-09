import { existsSync, writeFileSync } from "fs";
import { CLIOptions } from "../../../types";

const pageTemplate = `"use client";

import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);

    navigator.clipboard.writeText("npx multi-forge");
  }

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center relative overflow-hidden">
      <h1 className="font-departure text-[40px] md:text-[84px] relative z-10 text-center h-[120px] md:h-auto leading-tight">
        Multi Forge CLI
      </h1>

      <p className="relative z-10 text-center max-w-[80%] mt-0 md:mt-9">
        MultiForge is a CLI for rapid full-stack app development.
      </p>

      <span className="relative z-10 text-center text-[#878787] text-xs mt-3">
        Created by{" "}
        <Link href={"https://www.paolonessim.com/"} className="underline">
          Paolo Nessim
        </Link>
      </span>

      <div className="mt-10 mb-8">
        <button
          onClick={handleCopy}
          type="button"
          className="font-mono text-xs md:text-sm p-2 px-5 rounded-md border border-gray transition-colors flex items-center gap-4 bg-white text-black"
        >
          <span>npm install -g multi-forge</span>
          {copied ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-check size-3.5"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-copy size-3.5"
            >
              <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
`;

async function updatePage(options: CLIOptions) {
    const pageFile = options.src ? "src/app/page.tsx" : "app/page.tsx";

    // Update page.tsx file with the template
    if (existsSync(pageFile)) {
        writeFileSync(pageFile, pageTemplate);
    }
}

export default updatePage;
