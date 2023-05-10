import { defineConfig } from 'dumi';
import path from 'path';

export default defineConfig({
  codeSplitting: {
    jsStrategy: 'depPerChunk'
  },
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'anydesign',
  },
});
