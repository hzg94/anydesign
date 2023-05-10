import { defineConfig } from 'dumi';
import path from 'path';

export default defineConfig({
  codeSplitting: {
    jsStrategy: 'granularChunks'
  },
  srcTranspiler: 'esbuild',
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'anydesign',
  },
});
