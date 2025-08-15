import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0",
    allowedHosts: [
      "e99a6b90-5d8a-4d84-b29a-e4844f364ecb-00-1aoedpum1eosx.sisko.replit.dev"
    ]
  },
});