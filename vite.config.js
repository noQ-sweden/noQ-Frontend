import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({ fastRefresh: false })],
  envPrefix: "NOQ",
  define: {
    // eslint-disable-next-line no-undef
    "process.env.NOQ_IS_MOCK_API": JSON.stringify(process.env.NOQ_IS_MOCK_API),
  },

  // Local proxy config, do not commit to production
  // This is used to proxy requests to the Django backend during development
  // and should not be used in production.
  server: {
    host: "127.0.0.1",
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8000", // Proxy all /api calls to Django backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
