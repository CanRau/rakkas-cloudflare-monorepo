import { createMiddleware } from "rakkasjs/node-adapter";
import hattipHandler from "./entry-hattip";
// import { D1Database, D1DatabaseAPI } from "@miniflare/d1";
// import { createSQLiteDB } from "@miniflare/shared";
import fs from "node:fs";

fs.mkdirSync("./data", { recursive: true });

// declare module "@hattip/adapter-node/native-fetch" {
//   interface NodePlatformInfo {
//     env: {
//       // CLOUDFLARE_DB: D1Database;
//     };
//   }
// }

// const dbPromise = Promise.resolve()
//   .then(() => createSQLiteDB("./data/data.db"))
//   .then((sqliteDb) => new D1Database(new D1DatabaseAPI(sqliteDb)));

export default createMiddleware(async (ctx) => {
  // const db = await dbPromise;

  ctx.platform.env = ctx.platform.env ?? {};
  // ctx.platform.env.CLOUDFLARE_DB = db;

  return hattipHandler(ctx);
});
