// vite.config.ts
import { defineConfig } from "file:///E:/E/VidyaMaxx/node_modules/.pnpm/vite@5.4.21_@types+node@22.20.0_lightningcss@1.27.0_terser@5.48.0/node_modules/vite/dist/node/index.js";
import react from "file:///E:/E/VidyaMaxx/node_modules/.pnpm/@vitejs+plugin-react@4.7.0_vite@5.4.21_@types+node@22.20.0_lightningcss@1.27.0_terser@5.48.0_/node_modules/@vitejs/plugin-react/dist/index.js";
import path from "path";
import { TanStackRouterVite } from "file:///E:/E/VidyaMaxx/node_modules/.pnpm/@tanstack+router-vite-plugin@1.167.19_@tanstack+react-router@1.170.17_react-dom@19.2.7_react@_wigywpyhwmzv573qhak2hwbukm/node_modules/@tanstack/router-vite-plugin/dist/esm/index.js";
var __vite_injected_original_dirname = "E:\\E\\VidyaMaxx\\apps\\web";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    TanStackRouterVite()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src"),
      "@vidyamaxx/api": path.resolve(__vite_injected_original_dirname, "../../packages/api/index.ts"),
      "@vidyamaxx/ui": path.resolve(__vite_injected_original_dirname, "../../packages/ui/index.ts"),
      "@vidyamaxx/types": path.resolve(__vite_injected_original_dirname, "../../packages/types/index.ts"),
      "@vidyamaxx/utils": path.resolve(__vite_injected_original_dirname, "../../packages/utils/index.ts"),
      "@vidyamaxx/constants": path.resolve(__vite_injected_original_dirname, "../../packages/constants/index.ts"),
      "@vidyamaxx/hooks": path.resolve(__vite_injected_original_dirname, "../../packages/hooks/index.ts"),
      "@vidyamaxx/validation": path.resolve(__vite_injected_original_dirname, "../../packages/validation/index.ts")
    }
  },
  server: {
    port: 3e3,
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true
      },
      "/ws": {
        target: "ws://localhost:8000",
        ws: true
      }
    }
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          router: ["@tanstack/react-router"],
          query: ["@tanstack/react-query"]
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxFXFxcXFZpZHlhTWF4eFxcXFxhcHBzXFxcXHdlYlwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcRVxcXFxWaWR5YU1heHhcXFxcYXBwc1xcXFx3ZWJcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L0UvVmlkeWFNYXh4L2FwcHMvd2ViL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XHJcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xyXG5pbXBvcnQgeyBUYW5TdGFja1JvdXRlclZpdGUgfSBmcm9tICdAdGFuc3RhY2svcm91dGVyLXZpdGUtcGx1Z2luJztcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcGx1Z2luczogW1xyXG4gICAgcmVhY3QoKSxcclxuICAgIFRhblN0YWNrUm91dGVyVml0ZSgpLFxyXG4gIF0sXHJcbiAgcmVzb2x2ZToge1xyXG4gICAgYWxpYXM6IHtcclxuICAgICAgJ0AnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMnKSxcclxuICAgICAgJ0B2aWR5YW1heHgvYXBpJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uLy4uL3BhY2thZ2VzL2FwaS9pbmRleC50cycpLFxyXG4gICAgICAnQHZpZHlhbWF4eC91aSc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuLi8uLi9wYWNrYWdlcy91aS9pbmRleC50cycpLFxyXG4gICAgICAnQHZpZHlhbWF4eC90eXBlcyc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuLi8uLi9wYWNrYWdlcy90eXBlcy9pbmRleC50cycpLFxyXG4gICAgICAnQHZpZHlhbWF4eC91dGlscyc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuLi8uLi9wYWNrYWdlcy91dGlscy9pbmRleC50cycpLFxyXG4gICAgICAnQHZpZHlhbWF4eC9jb25zdGFudHMnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vLi4vcGFja2FnZXMvY29uc3RhbnRzL2luZGV4LnRzJyksXHJcbiAgICAgICdAdmlkeWFtYXh4L2hvb2tzJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uLy4uL3BhY2thZ2VzL2hvb2tzL2luZGV4LnRzJyksXHJcbiAgICAgICdAdmlkeWFtYXh4L3ZhbGlkYXRpb24nOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vLi4vcGFja2FnZXMvdmFsaWRhdGlvbi9pbmRleC50cycpLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIHNlcnZlcjoge1xyXG4gICAgcG9ydDogMzAwMCxcclxuICAgIHByb3h5OiB7XHJcbiAgICAgICcvYXBpJzoge1xyXG4gICAgICAgIHRhcmdldDogJ2h0dHA6Ly9sb2NhbGhvc3Q6ODAwMCcsXHJcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxyXG4gICAgICB9LFxyXG4gICAgICAnL3dzJzoge1xyXG4gICAgICAgIHRhcmdldDogJ3dzOi8vbG9jYWxob3N0OjgwMDAnLFxyXG4gICAgICAgIHdzOiB0cnVlLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGJ1aWxkOiB7XHJcbiAgICBzb3VyY2VtYXA6IHRydWUsXHJcbiAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgIG91dHB1dDoge1xyXG4gICAgICAgIG1hbnVhbENodW5rczoge1xyXG4gICAgICAgICAgcmVhY3Q6IFsncmVhY3QnLCAncmVhY3QtZG9tJ10sXHJcbiAgICAgICAgICByb3V0ZXI6IFsnQHRhbnN0YWNrL3JlYWN0LXJvdXRlciddLFxyXG4gICAgICAgICAgcXVlcnk6IFsnQHRhbnN0YWNrL3JlYWN0LXF1ZXJ5J10sXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfSxcclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBaVEsU0FBUyxvQkFBb0I7QUFDOVIsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sVUFBVTtBQUNqQixTQUFTLDBCQUEwQjtBQUhuQyxJQUFNLG1DQUFtQztBQU16QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixtQkFBbUI7QUFBQSxFQUNyQjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLE1BQ3BDLGtCQUFrQixLQUFLLFFBQVEsa0NBQVcsNkJBQTZCO0FBQUEsTUFDdkUsaUJBQWlCLEtBQUssUUFBUSxrQ0FBVyw0QkFBNEI7QUFBQSxNQUNyRSxvQkFBb0IsS0FBSyxRQUFRLGtDQUFXLCtCQUErQjtBQUFBLE1BQzNFLG9CQUFvQixLQUFLLFFBQVEsa0NBQVcsK0JBQStCO0FBQUEsTUFDM0Usd0JBQXdCLEtBQUssUUFBUSxrQ0FBVyxtQ0FBbUM7QUFBQSxNQUNuRixvQkFBb0IsS0FBSyxRQUFRLGtDQUFXLCtCQUErQjtBQUFBLE1BQzNFLHlCQUF5QixLQUFLLFFBQVEsa0NBQVcsb0NBQW9DO0FBQUEsSUFDdkY7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsTUFDTCxRQUFRO0FBQUEsUUFDTixRQUFRO0FBQUEsUUFDUixjQUFjO0FBQUEsTUFDaEI7QUFBQSxNQUNBLE9BQU87QUFBQSxRQUNMLFFBQVE7QUFBQSxRQUNSLElBQUk7QUFBQSxNQUNOO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLFdBQVc7QUFBQSxJQUNYLGVBQWU7QUFBQSxNQUNiLFFBQVE7QUFBQSxRQUNOLGNBQWM7QUFBQSxVQUNaLE9BQU8sQ0FBQyxTQUFTLFdBQVc7QUFBQSxVQUM1QixRQUFRLENBQUMsd0JBQXdCO0FBQUEsVUFDakMsT0FBTyxDQUFDLHVCQUF1QjtBQUFBLFFBQ2pDO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
