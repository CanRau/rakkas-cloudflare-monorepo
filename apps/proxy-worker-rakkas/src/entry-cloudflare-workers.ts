import cloudflareWorkersAdapter from "@hattip/adapter-cloudflare-workers";
import type {
  Request,
  ExecutionContext,
  DurableObjectNamespace,
  DurableObjectState,
  DurableObjectStorage,
} from "@cloudflare/workers-types";

export interface Env {
  DO_BROWSER: DurableObjectNamespace;
}

let handler;

export default {
  async fetch(req: Request, env: Env, ctx: ExecutionContext) {
    console.log("Rakkas-Proxy", req.url);

    if (!globalThis.process?.env) {
      globalThis.process = globalThis.process || {};
      globalThis.process.env = new Proxy(
        {},
        {
          get(_, key) {
            if (typeof env[key] === "string") {
              return env[key];
            }
            return undefined;
          },
        }
      );
    }

    if (!handler) {
      const hattipHandler = await import("./entry-hattip");
      console.log("hattipHandler.default", hattipHandler.default);
      handler = cloudflareWorkersAdapter(hattipHandler.default);
      console.log("handler", handler);
    }

    return handler(req, env, ctx);
  },
};

export class DoBrowser {
  state: DurableObjectState;
  env: Env;
  keptAliveInSeconds: number;
  storage: DurableObjectStorage;

  constructor(state: DurableObjectState, env: Env) {
    this.state = state;
    this.env = env;
    this.keptAliveInSeconds = 0;
    this.storage = this.state.storage;
  }

  async fetch(request: Request): Promise<Response> {
    return new Response("Very Durable");
  }
}
