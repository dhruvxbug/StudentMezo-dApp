import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import inject from '@rollup/plugin-inject'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic',
    }),
    nodePolyfills(),
    inject({
      process: 'process/browser'
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      'react/jsx-runtime': path.resolve(__dirname, 'node_modules/react/jsx-runtime.js'),
      'react/jsx-dev-runtime': path.resolve(__dirname, 'node_modules/react/jsx-dev-runtime.js'),
    },
  },
  define:{
    global: "globalThis",
    "process.env": {},
  },
  optimizeDeps: {
    include: ["buffer", "process", "react", "react-dom", "react/jsx-runtime"],
    esbuildOptions: {
      jsx: 'automatic',
    },
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true,
    },
  },
})
