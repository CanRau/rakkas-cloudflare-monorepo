import { NodePlatformInfo } from "@hattip/adapter-node";
import {} from "rakkasjs";

declare module "@hattip/adapter-node/native-fetch" {
  // declare module "@hattip/adapter-node" {
  interface NodePlatformInfo {
    env: {
      // CLOUDFLARE_DB: D1Database;
    };
  }
}

declare module "rakkasjs" {
  // interface ServerSideLocals {
  //   // postStore: KVNamespace;
  //   // user?: GitHubUser;
  // }

  interface RequestContext {
    platform: NodePlatformInfo;
  }
}
