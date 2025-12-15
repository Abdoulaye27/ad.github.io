import base44 from "@base44/vite-plugin"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig(({ mode }) => ({
  // Netlify should use "/"
  base: "/",
  logLevel: "error",
  plugins: [
    // ✅ Only enable Base44 dev tooling locally
    mode === "development"
      ? base44({
          legacySDKImports: process.env.BASE44_LEGACY_SDK_IMPORTS === "true",
        })
      : false,
    react(),
  ],
}))
