import { useState, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';

const defaultCode = `
import { render } from 'twiggle'
function App() {
  return <h1>Hello, Twiggle!</h1>;
}
render(<App />, document.body);
`.trim();

function Playground() {
    const [code, setCode] = useState(defaultCode);
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const getIframeContent = (transpiledCode: string) => {
        const imports = transpiledCode.match(/import(?:["'\s]*(?:[\w*{}\n\r\t, ]+)from\s*)?["'\s].*$/gm) || [];
        const codeWithoutImports = transpiledCode.replace(/import(?:["'\s]*(?:[\w*{}\n\r\t, ]+)from\s*)?["'\s].*$/gm, '');

        return `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8" />
            <style>
                body {
                    margin: 0;
                    padding: 8px;
                    font-family: sans-serif;
                }
                #root h1 {
                    color: #4a4a4a;
                }
            </style>
            <script type="module" src="/node_modules/twiggle/dist/client/twiggle-es.js"></script>
        </head>
        <body>
            <script type="module">
                ${imports.join('\n')}
                try {
                    ${codeWithoutImports}
                } catch (e) {
                    console.error(e);
                    document.body.innerHTML = '<pre style="color: red;">' + e.message + '</pre>';
                }
            </script>
        </body>
    </html>
  `};

    useEffect(() => {
        const transpileAndRun = async () => {
            if (!iframeRef.current) return;

            try {
                const response = await fetch('/api/transpile', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ code }),
                });

                const transpiledCode = await response.text();

                if (!response.ok) {
                    throw new Error(transpiledCode);
                }

                iframeRef.current.srcdoc = getIframeContent(transpiledCode);

            } catch (error) {
                console.error(error)
                if (iframeRef.current && error instanceof Error) {
                    iframeRef.current.srcdoc = `<pre style="color: red;">${error.message}</pre>`;
                }
            }
        };
        transpileAndRun()
    }, [code]);

    return (
        <div className="flex h-screen w-screen bg-gray-900 text-white">
            <div className="w-1/2 h-full border-r border-gray-700">
                <Editor
                    height="100%"
                    defaultLanguage='javascript'
                    theme="vs-dark"
                    value={code}
                    onChange={(value) => {
                        setCode(value || '')
                    }}
                    options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        wordWrap: 'on',
                        scrollBeyondLastLine: false,
                    }}

                />
            </div>
            <div className="w-1/2 h-full">
                <iframe
                    ref={iframeRef}
                    title="Preview"
                    className="w-full h-full bg-white"
                    sandbox="allow-scripts allow-same-origin"
                    srcDoc=""
                />
            </div>
        </div>
    );
}

export default Playground;
