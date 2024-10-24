import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

//npm install dotenv 需要执行这个命令安装dotenv
export default defineConfig(({ mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [vue()],
    base: env.VITE_APP_BASE_URL || '/',
    server: {
      port: 3000,
      open: true,
      proxy: {
        '/api': {
          target: env.VITE_APP_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    build: {
      outDir: 'dist',
      rollupOptions: {
        input: 'index.html',
      },
    },
    define: {
      'process.env': env,
    },
  };
});

function loadEnv(mode, envDir) {
  const envFiles = [`.env`, `.env.${mode}`];
  const env = {};
  envFiles.forEach((file) => {
    const filePath = path.resolve(envDir, file);
    if (fs.existsSync(filePath)) {
      const result = dotenv.parse(fs.readFileSync(filePath));
      Object.assign(env, result);
    }
  });
  return env;
}



