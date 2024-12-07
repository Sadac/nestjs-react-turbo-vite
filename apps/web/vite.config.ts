import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      proxy: {
        "/api": {
          target: env.VITE_BASE_URL,
          changeOrigin: true,
          ws: true, // Enable web sockets proxy
          configure: (proxy, _options) => {
            proxy.on("error", (err, _req, _res) => {
              console.log("proxy error", err);
            });
          },
        },
      },
    },
  };
});
