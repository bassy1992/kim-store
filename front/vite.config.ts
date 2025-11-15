import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { createServer } from "./server";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    fs: {
      allow: [".", "./client", "./shared"],
      deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**", "server/**"],
    },
  },
  build: {
    outDir: "dist/spa",
  },
  plugins: [react(), expressPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
}));

function expressPlugin(): Plugin {
  return {
    name: "express-plugin",
    apply: "serve", // Only apply during development (serve mode)
    configureServer(server) {
      console.log('🚀 Configuring Express server...');
      createServer().then(app => {
        console.log('✅ Express server created, adding middleware...');
        // Add Express app as middleware to Vite dev server
        // Use return false to prevent Vite from handling the request
        server.middlewares.use('/api', (req, res, next) => {
          console.log(`📡 API Request: ${req.method} ${req.url}`);
          app(req, res, next);
        });
        console.log('✅ Express middleware added for /api routes');
      }).catch(err => {
        console.error('❌ Failed to create Express server:', err);
      });
    },
  };
}
