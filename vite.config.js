import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  console.log(`Current mode: ${mode}`);

  return {
    plugins: [react()],
    envPrefix: "NOQ_",
    define: {
      "process.env.NOQ_IS_MOCK_API": JSON.stringify(
        process.env.NOQ_IS_MOCK_API
      ),
    },
    server: {
      host: "0.0.0.0",
    },
  };
});
