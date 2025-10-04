import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import vitePluginMonacoEditor from 'vite-plugin-monaco-editor';
import tailwindcss from '@tailwindcss/vite';
import { transpileApi } from './transpile';

// @ts-ignore
const monacoEditorPlugin = vitePluginMonacoEditor.default;

export default defineConfig({
  plugins: [
    react(),
    monacoEditorPlugin({}),
    tailwindcss(),
    transpileApi(),
  ],
  define: {
    'process.env.NODE_ENV': JSON.stringify('development'),
  },
});
