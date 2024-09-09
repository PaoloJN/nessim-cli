// https://nextjs.org/docs/app/building-your-application/optimizing/third-party-libraries
// https://medium.com/readytowork-org/google-analytics-in-next-js-a26cc2b28db5

import { readFileSync } from "fs";
import { CLIOptions } from "../../../types";
import { createFile, replaceFile } from "../../../utils/index.js";
import { logger } from "../../../utils/index.js";

const googleAnalytics = `
"use client" 

import React from 'react';
import Script from 'next/script';

const GoogleAnalytics = () => {
  return (
    <>
      <Script
        strategy='lazyOnload'
        src={\`https://www.googletagmanager.com/gtag/js?id=\${process.env.NEXT_PUBLIC_MEASUREMENT_ID}\`}
      />

      <Script id='' strategy='lazyOnload'>
        {\`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '\${process.env.NEXT_PUBLIC_MEASUREMENT_ID}\', {
              page_path: window.location.pathname,
              });
          \`}
      </Script>
    </>
  );
};

export default GoogleAnalytics;
`;

async function addGoogleAnalytics(options: CLIOptions) {
    const { src, alias } = options;
    const layoutPath = src ? "src/app/layout.tsx" : "app/layout.tsx";
    const components = src ? "src/components" : "components";

    createFile(`${components}/GoogleAnalytics.tsx`, googleAnalytics);

    let layout = readFileSync(layoutPath, "utf-8");

    layout = `import { GoogleAnalytics } from "${alias}components/google-analytics";\n${layout}`;

    layout = layout.replace(/<body([^>]*)>/, `<body$1>\n<GoogleAnalytics />`);
    replaceFile(layoutPath, layout);

    logger.success("Google Analytics added successfully");
}

export default addGoogleAnalytics;
