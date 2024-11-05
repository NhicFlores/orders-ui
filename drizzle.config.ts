import "@/drizzle/envConfig";
import { defineConfig } from "drizzle-kit";

// export default defineConfig({
//   dialect: "postgresql",
//   schema: process.env.SCHEMA_PATH!,
//   out:
//     process.env.NODE_ENV === "production"
//       ? process.env.PROD_MIGRATIONS_OUT!
//       : process.env.MIGRATIONS_OUT!,
//   dbCredentials: {
//     url:
//       process.env.NODE_ENV === "production"
//         ? process.env.POSTGRES_URL!
//         : process.env.DOCKER_POSTGRES_URL!,
//   },
//   migrations: {
//     table: process.env.MIGRATIONS_TABLE!,
//     schema:
//       process.env.NODE_ENV === "production"
//         ? process.env.PROD_SCHEMA!
//         : process.env.DEV_SCHEMA!,
//   },
//   //schemaFilter: ["order-handling"],
//   verbose: true,
//   strict: true,
// });

// dev config
// export default defineConfig({
//   dialect: "postgresql",
//   schema: process.env.SCHEMA_PATH!,
//   out: process.env.MIGRATIONS_OUT!,
//   dbCredentials: {
//     url: process.env.POSTGRES_URL!,
//   },
//   migrations: {
//     table: process.env.MIGRATIONS_TABLE!,
//     schema: process.env.DEV_SCHEMA!,
//   },
//   //schemaFilter: ["order-handling"],
//   verbose: true,
//   strict: true,
// });

// prod config
export default defineConfig({
  dialect: "postgresql",
  schema: process.env.SCHEMA_PATH!,
  out: process.env.PROD_MIGRATIONS_OUT!,
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
  migrations: {
    table: process.env.MIGRATIONS_TABLE!,
    schema: process.env.PROD_SCHEMA!,
  },
  //schemaFilter: ["order-handling"],
  verbose: true,
  strict: true,
});
