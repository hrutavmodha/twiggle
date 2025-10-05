import { type Plugin } from 'vite';
import { transformAsync } from '@babel/core';
// @ts-ignore
import reactPreset from '@babel/preset-react';
// @ts-ignore
import { twiggleJsx } from 'vite-plugin-twiggle';

export function transpileApi(): Plugin {
  return {
    name: 'twiggle-transpile-api',
    configureServer(server) {
      server.middlewares.use('/api/transpile', async (req, res, next) => {
        if (req.method !== 'POST') {
          return next();
        }

        let body = '';
        req.on('data', chunk => {
          body += chunk.toString();
        });

        req.on('end', async () => {
          try {
            const { code } = JSON.parse(body);
            console.log('Server: Received code for transpilation:', code);
            const result = await transformAsync(code, {
              presets: [[reactPreset, {
                runtime: 'automatic',
                importSource: 'twiggle/client'
              }]],
              plugins: [twiggleJsx],
            });

            if (result && result.code) {
              console.log('Server: Transpilation successful. Result code length:', result.code.length);
              console.log('Transpiled code is:', result.code)
              res.setHeader('Content-Type', 'application/javascript');
              res.end(result.code);
            } else {
              console.error('Server: Transpilation failed, no result code.');
              res.statusCode = 500;
              res.end('Transpilation failed');
            }
          } catch (e: any) {
            console.error('Server: Error during transpilation:', e);
            res.statusCode = 500;
            res.end(e.message);
          }
        });
      });
    },
  };
}
