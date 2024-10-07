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
});
