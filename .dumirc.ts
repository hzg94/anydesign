import { defineConfig } from 'dumi';
import path from 'path';

export default defineConfig({
  srcTranspiler: 'esbuild',
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'anydesign',
  },
});
