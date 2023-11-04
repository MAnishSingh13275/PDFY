import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config({path: '.env'});
export default {
  driver: "pg",
  schema: "./src/lib/DB/schema.ts", 
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
} satisfies Config;
