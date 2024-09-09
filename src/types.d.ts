interface NextJSOptions {
  noEslint?: boolean;
  typescript?: boolean;
  javascript?: boolean;
  tailwind?: boolean;
  eslint?: boolean;
  app?: boolean;
  srcDir?: boolean;
  turbo?: boolean;
  importAlias?: string;
  empty?: boolean;
  skipInstall?: boolean;
}

export type PackageManager = "npm" | "pnpm" | "yarn" | "bun";
export type PackageManagerX = "npx" | "pnpx" | "yarn" | "bunx";

export type UILibrary =
  | "shadcn-ui"
  | "radix-ui"
  | "chakra-ui"
  | null
  | undefined;
export type ORM = "prisma" | "drizzle" | null | undefined;

export type DatabaseType = "postgresql" | "mysql" | "sqlite" | null | undefined;

export type DatabaseProvider =
  | "postgresjs"
  | "node-postgres"
  | "neon"
  | "vercel-pg"
  | "supabase"
  | "aws"
  | "planetscale"
  | "mysql-2"
  | "better-sqlite3"
  | "turso"
  | "none";

export type Database = {
  type: DatabaseType;
  orm: ORM;
  provider: DatabaseProvider;
};

type DatabaseProviderChoices = {
  name: string;
  value: DatabaseProvider;
};

export type AuthPackage =
  | "next-auth"
  | "clerk"
  | "lucia"
  | "kinde"
  | null
  | undefined;

export type AuthProviders =
  | "google"
  | "github"
  | "apple"
  | "email"
  | "username";

export type Auth = {
  package: AuthPackage;
  providers: AuthProvider[];
};

export type Email = "sendgrid" | "mailgun" | "postmark" | null | undefined;
export type Payment = "stripe" | "lemon-squeezy" | null | undefined;
export type Analytics = "vercel-analytics" | "google-analytics" | null;

// Additional Packages Options
interface PackagesOptions {
  uiLibrary: UILibrary;
  database: Database;
  auth: Auth;
  email: Email;
  payment: Payment;
  analytics: Analytics;
}

export type Framework = "nextjs" | "remix" | "laravel";

interface CLIOptions extends NextJSOptions, PackagesOptions {
  projectName: string;
  packageManager: PackageManager;
  packageManagerX: PackageManageX;
  src: boolean;
  alias: string;
  framework: Framework;
  template?: any;
}

export type Config = {
  projectName: string;
  packageManager: PackageManager;
  packageManagerX: PackageManageX;
  supabase: boolean;
  alias: string;
  src: boolean;
  supabase: boolean;
  uiLibrary: UILibrary;
  orm: ORM;
  database: Database;
  auth: Auth;
  email: Email;
  payment: Payment;
  analytics: Analytics;
};
