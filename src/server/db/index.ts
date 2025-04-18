// import { createClient, type Client } from "@libsql/client";
// import { drizzle } from "drizzle-orm/libsql";

// import { env } from "@/env";
// import * as schema from "./schema";

// /**
//  * Cache the database connection in development. This avoids creating a new connection on every HMR
//  * update.
//  */
// const globalForDb = globalThis as unknown as {
//   client: Client | undefined;
// };

// export const client =
//   globalForDb.client ?? createClient({ url: env.DATABASE_URL });
// if (env.NODE_ENV !== "production") globalForDb.client = client;

// export const db = drizzle(client, { schema });

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "@/env";
import * as schema from "./schema";

// Cache the database connection in development to avoid creating a new connection on every HMR update
const globalForDb = globalThis as unknown as {
  client: ReturnType<typeof postgres> | undefined;
};

// Ensure we use the same client during development
export const client =
  globalForDb.client ?? postgres(env.DATABASE_URL, { prepare: false });

if (env.NODE_ENV !== "production") globalForDb.client = client;

// Initialize drizzle with postgres client and schema
export const db = drizzle(client, { schema, logger:true });

