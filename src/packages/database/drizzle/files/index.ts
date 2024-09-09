import chalk from "chalk";
import { CLIOptions } from "../../../../types";
import { createFile } from "../../../../utils/index.js";
import { logger } from "../../../../utils/index.js";

const drizzleIndex = {
    fileName: "index.ts",
    path: "database/index.ts",
    pathSrc: "src/database/index.ts",
    code: {
        neon: `
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

export const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql);
    `,
        postgresjs: `
import { sql } from '@vercel/postgres';
import { drizzle } from 'drizzle-orm/vercel-postgres';

export const client = postgres(env.DATABASE_URL!);
export const db = drizzle(sql)
    `,
        aws: `
import { drizzle } from 'drizzle-orm/aws-data-api/pg';
import { RDSDataClient } from '@aws-sdk/client-rds-data';
import { fromIni } from '@aws-sdk/credential-providers';

export const rdsClient = new RDSDataClient({
    credentials: fromIni({ profile: process.env['PROFILE'] }),
    region: 'us-east-1',
});

export const db = drizzle(rdsClient, {
  database: process.env['DATABASE']!,
  secretArn: process.env['SECRET_ARN']!,
  resourceArn: process.env['RESOURCE_ARN']!,
});    
    `,
        planetscale: `
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { Client } from "@planetscale/database";

export const client = new Client({
  host: process.env["DATABASE_HOST"],
  username: process.env["DATABASE_USERNAME"],
  password: process.env["DATABASE_PASSWORD"],
});

export const db = drizzle(client);
    `,
        turso: `
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

export const client = createClient({ url: 'DATABASE_URL', authToken: 'DATABASE_AUTH_TOKEN' });
export const db = drizzle(client);
    `,
        supabase: `
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

const client = postgres(env.DATABASE_URL)
export const db = drizzle(client);
    `,

        "node-postgres": `
import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool);
    `,
        "vercel-pg": `
import { sql } from '@vercel/postgres';
import { drizzle } from 'drizzle-orm/vercel-postgres';

export const db = drizzle(sql)
    `,
        "mysql-2": `
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

export const poolConnection = mysql.createPool(env.DATABASE_URL);
export const db = drizzle(poolConnection);
    `,
        "better-sqlite3": `
import { drizzle, BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';

export const sqlite = new Database('sqlite.db');
export const db: BetterSQLite3Database = drizzle(sqlite);
    `,
        none: "",
    },
};

function addDrizzleIndex(options: CLIOptions) {
    const code = drizzleIndex.code[options.database.provider];

    createFile(options.src ? drizzleIndex.pathSrc : drizzleIndex.path, code);

    logger.success(`Writing ${chalk.cyan("index.ts")} - database`);
}

export default addDrizzleIndex;
