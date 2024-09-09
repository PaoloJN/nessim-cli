import { CLIOptions } from "../../../../types";
import { addToEnv } from "../../../../utils/index.js";

const databaseEnv = {
    items: {
        neon: `
# Database: Neon Database Learn more at https://orm.drizzle.team/docs/get-started-postgresql#neon-postgres

DATABASE_URL=xxxx
    `,
        postgresjs: `
# Database: Postgres.js Learn more at https://orm.drizzle.team/docs/get-started-postgresql#postgres-js

DATABASE_URL=xxxx
    `,
        aws: `
# Database: AWS Learn more at https://orm.drizzle.team/docs/get-started-postgresql#aws-data-api

PROFILE=xxxx
DATABASE=xxxx
SECRET_ARN=xxxx
RESOURCE_ARN=xxxx
    `,
        planetscale: `
# Database: Planetscale Learn more at https://orm.drizzle.team/docs/
get-started-postgresql#planetscale-serverless

DATABASE_HOST=xxxx
DATABASE_USERNAME=xxxx
DATABASE_PASSWORD=xxxx
    `,
        turso: `
# Database: Turso Learn more at https://orm.drizzle.team/docs/get-started-postgresql#libsql

DATABASE_URL=xxxx
DATABASE_AUTH_TOKEN=xxxx
    `,
        supabase: `
# Database: Supabase Learn more at https://orm.drizzle.team/docs/
get-started-postgresql#supabase

DATABASE_URL=xxxx
    `,
        "node-postgres": `
# Database: Node-Postgres Learn more at https://orm.drizzle.team/docs/get-started-postgresql#node-postgres

DATABASE_URL=xxxx
    `,
        "vercel-pg": `
# Database: Vercel-PG Learn more at https://orm.drizzle.team/docs/get-started-postgresql#vercel-pg

POSTGRES_URL=xxxx
POSTGRES_URL_NON_POOLING=xxxx
POSTGRES_USER=xxxx
POSTGRES_HOST=xxxx
POSTGRES_PASSWORD=xxxx
POSTGRES_DATABASE=xxxx
    `,
        "mysql-2": `
# Database: MySQL-2 Learn more at https://orm.drizzle.team/docs/get-started-postgresql#mysql-2

DATABASE_URL=xxxx
    `,
        "better-sqlite3": ``,
        none: "",
    },
};

function updateEnv(options: CLIOptions) {
    const provider = options.database.provider;

    addToEnv(databaseEnv.items[provider], "database");
}

export default updateEnv;
