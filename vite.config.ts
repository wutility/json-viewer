// vite.config.ts
import { defineConfig, UserConfig } from 'vite';
import dts from 'vite-plugin-dts';
import path from 'path';

import pkg from './package.json' assert { type: 'json' };

const banner = `/*!
 * ${pkg.name} - v${pkg.version}
 * Copyright (c) 2022-${new Date().getFullYear()} Haikel Fazzani
 * Licensed under MIT
 */`;

const config: UserConfig = {
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'jsnview',
      formats: ['es', 'umd'],
      fileName: (format) => {
        return format === 'umd' ? 'index.js' : 'index.esm.js';
      },
    },
    rollupOptions: {
      external: [
        ...Object.keys(pkg.dependencies || {}),
        ...Object.keys(pkg.peerDependencies || {}),
      ],
      output: {
        globals: {},
        banner,
      },
    },
    sourcemap: true,
    emptyOutDir: true,
    outDir: 'dist',
  },
  plugins: [
    dts({
      insertTypesEntry: true,
      outDir: 'dist/types',
      include: ['src/**/*.ts'],
      exclude: ['**/*.test.ts', '**/test/**'],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
};

export default defineConfig(config);
