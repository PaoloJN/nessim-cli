import { Framework } from "../types";

type TemplateType = "local" | "remote";

interface Template {
    name: string;
    shortDescription: string;
    longDescription: string;
    author: string;
    tags: string[];
    language: string;
    framework: Framework;
    type: TemplateType;
    pathOrURL: string;
}

// Add all template from https://boilerplatelist.com/collections/top-next-js-saas-boilerplates/
export const templates: Template[] = [
    {
        name: "Next.js Boilerplate",
        shortDescription: "Next.js, Tailwind CSS, TypeScript with App Router, and more.",
        longDescription: `A boilerplate for Next.js that supports Tailwind CSS, TypeScript, and App Router. Prioritizes developer experience with tools like ESLint, Prettier, Husky, Vitest, Commitlint, Clerk for authentication, DrizzleORM, Storybook, Sentry, Better Stack, i18n support, and more. Ready for Next.js 15 and supports PostgreSQL, SQLite, and MySQL databases.`,
        author: "CreativeDesignsGuru",
        tags: [
            "Next.js",
            "Tailwind CSS",
            "TypeScript",
            "Clerk",
            "DrizzleORM",
            "Jest",
            "Vitest",
            "Storybook",
            "i18n",
            "Pino",
            "Sentry",
            "PostCSS",
            "Lint-Staged",
            "ESLint",
            "Prettier",
        ],
        language: "TypeScript",
        framework: "nextjs",
        type: "remote",
        pathOrURL: "https://github.com/ixartz/Next-js-Boilerplate",
    },
    {
        name: "Next.js Enterprise Boilerplate",
        shortDescription:
            "A Next.js boilerplate loaded with enterprise-grade features for high-performance apps.",
        longDescription: `Welcome to the Next.js Enterprise Boilerplate, an open-source template for enterprise projects! This boilerplate is packed with features to help you build a high-performance, maintainable, and enjoyable app. Includes Tailwind CSS, ESLint, Prettier, TypeScript, GitHub Actions, Jest, React Testing Library, Playwright, Storybook, and more.`,
        author: "Blazity",
        tags: [
            "Next.js",
            "Tailwind CSS",
            "TypeScript",
            "ESLint",
            "Prettier",
            "GitHub Actions",
            "Jest",
            "React Testing Library",
            "Playwright",
            "Storybook",
            "CVA",
            "Conventional Commits",
            "OpenTelemetry",
            "Renovate BOT",
            "Semantic Release",
            "T3 Env",
        ],
        language: "TypeScript",
        framework: "nextjs",
        type: "remote",
        pathOrURL: "https://github.com/Blazity/next-enterprise",
    },
    {
        name: "ChadNext",
        shortDescription:
            "Quick starter template for Next.js projects with essential features for rapid development.",
        longDescription: `ChadNext is a quick starter template for Next.js projects, designed to streamline development by providing essential features such as a UI library, simple authentication, database integration, and easy deployment. Ideal for prototyping and testing ideas quickly.`,
        author: "Moinul Moin",
        tags: ["Next.js", "Prisma", "Authentication", "UI Library", "Vercel", "Database", "PNPM"],
        language: "TypeScript",
        framework: "nextjs",
        type: "remote",
        pathOrURL: "https://github.com/moinulmoin/chadnext",
    },
    {
        name: "Nextacular",
        shortDescription:
            "Quickly launch full-stack multi-tenant SaaS applications with Next.js, Tailwind, and Prisma.",
        longDescription: `Nextacular is an open-source starter kit designed to help you efficiently build full-stack multi-tenant SaaS platforms with modern technologies like Next.js, Tailwind, and Prisma. It includes features such as authentication, billing, database integration, email handling, custom domains, multi-tenancy, and teams/workspaces.`,
        author: "Nextacular Team",
        tags: [
            "Next.js",
            "Tailwind CSS",
            "Prisma",
            "SaaS",
            "Authentication",
            "Billing",
            "Database",
            "Multi-tenancy",
            "Teams",
            "Vercel",
            "SEO",
            "Email",
        ],
        language: "TypeScript",
        framework: "nextjs",
        type: "remote",
        pathOrURL: "https://github.com/nextacular/nextacular",
    },
];
