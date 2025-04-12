import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        login: resolve(__dirname, "src/account/login.html"), 
        register: resolve(__dirname, "src/account/register.html"),
	application_details: resolve(__dirname, "src/job_process/application_details.html"),
	application_grid: resolve(__dirname, "src/job_process/application_grid.html"),
	
      },
    },
  },
});
