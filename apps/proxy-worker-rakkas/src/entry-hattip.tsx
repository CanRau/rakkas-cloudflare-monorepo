import type { NodePlatformInfo } from "@hattip/adapter-node";
import type {} from "rakkasjs";
import { createRequestHandler } from "rakkasjs/server";

declare module "rakkasjs" {
  interface ServerSideLocals {
  }

  interface RequestContext {
    platform: NodePlatformInfo;
  }
}

export interface Env {
  ENVIRONMENT: string;
}

export default createRequestHandler({
  middleware: {
    beforeAll: [
      async (ctx) => {
        const response = await ctx.next();
        console.log("beforeAll response.status", response.status);
        // if (response.status >= 400) {
        //   return fetch(ctx.platform.request);
        // }
      },
    ],
  },

  createPageHooks(requestContext) {
    return {
      extendPageContext(pageContext) {},
    };
  },
});