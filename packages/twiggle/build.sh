npm run build:client

npm run build:server 

echo "export * from './client/twiggle-es.js'\nexport * from './server/twiggle-es.js'" >> dist/index.js

echo "Build successfully"