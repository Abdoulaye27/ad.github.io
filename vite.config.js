import base44 from "@base44/vite-plugin"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import path from "path"

export default defineConfig(({ mode }) => {
  const isDev = mode === "development"

  return {
    base: "/",
    logLevel: "error",
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    plugins: [
      // 🚫 Base44 DEV tooling ONLY in dev
      isDev &&
        base44({
          legacySDKImports:
            process.env.BASE44_LEGACY_SDK_IMPORTS === "true",
          disableHolder: true, // 🔥 THIS is what stops socket.io
        }),
      react(),
    ],
  }
})
