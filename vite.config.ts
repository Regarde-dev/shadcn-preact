import preact from "@preact/preset-vite";
import fs from "fs";
import path, { resolve } from "path";
import { defineConfig } from "vite";

const package_json_file = fs.readFileSync(path.join(process.cwd(), "package.json"), { encoding: "utf-8" });
const version = JSON.parse(package_json_file)?.version;

if (!version) throw new Error("version value is missing in the package.json");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()],
  server: {
    host: true,
  },
  resolve: {
    alias: {
      "@ui": resolve(resolve(__dirname), "./src/components/ui/"),
      "@": resolve(resolve(__dirname), "./src/"),
    },
  },
  define: {
    "process.env.IS_PREACT": JSON.stringify("true"),
    "process.env.VITE_PACKAGE_VERSION": JSON.stringify(version),
  },
});
