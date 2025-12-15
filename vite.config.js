import base44 from "@base44/vite-plugin"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import path from "path"

export default defineConfig(({ mode }) => ({
  base: "/",
  logLevel: "error",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  plugins: [
    // optional: keep Base44 only in dev if you want
    mode === "development"
      ? base44({
          legacySDKImports: process.env.BASE44_LEGACY_SDK_IMPORTS === "true",
        })
      : false,
    react(),
  ],
}))
