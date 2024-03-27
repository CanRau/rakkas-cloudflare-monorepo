import { defineConfig } from "vite";
import rakkas from "rakkasjs/vite-plugin";
import tsconfigPaths from "vite-tsconfig-paths";
import { rakkasTanstackQuery } from "../../packages/rakkas-plugin-react-query/vite-plugin";

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    rakkas({ adapter: "cloudflare-workers-node-compat" }),
    rakkasTanstackQuery(),
  ],
});
