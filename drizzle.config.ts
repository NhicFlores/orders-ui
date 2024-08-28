import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./drizzle/schema.ts",
  out: "./drizzle/migrations",
  dbCredentials: {
    url:
      process.env.NODE_ENV === "development"
        ? process.env.DOCKER_POSTGRES_URL!
        : process.env.POSTGRES_URL!,
  },
  migrations: {
    table: "__drizzle_migrations",
    schema:
      process.env.NODE_ENV === "development"
        ? process.env.DEV_SCHEMA
        : process.env.PROD_SCHEMA,
  },
  schemaFilter: ["order-handling"],
  verbose: true,
  strict: true,
});
