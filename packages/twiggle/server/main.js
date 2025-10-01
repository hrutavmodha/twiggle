import { jsx } from './src/jsx/jsx-runtime'
const htmlStr = jsx('h1', { 
    children: 'Hello World'
})
console.log(htmlStr)