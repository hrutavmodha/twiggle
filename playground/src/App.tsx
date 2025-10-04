import { useState, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';

const defaultCode = `
// Welcome to your Twiggle Playground!
// Type your JSX code here and see it render on the right.

function App() {
  return <h1>Hello, Twiggle!</h1>;
}

// The render function is provided by the playground environment.
render(<App />);
`.trim();

function Playground() {
  const [code, setCode] = useState(defaultCode);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // This function creates the HTML content for the iframe.
  const getIframeContent = (transpiledCode: string) => `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <style>
          body { margin: 0; padding: 8px; font-family: sans-serif; }
          #root h1 { color: #4a4a4a; }
        </style>
      </head>
      <body>
        <div id="root"></div>
        <script>
          // This is a simple shim for your framework's render function.
          const render = (el) => {
            if (typeof el === 'function') { el = el(); }
            document.getElementById('root').innerHTML = '';
            document.getElementById('root').appendChild(el);
          };
        </script>
        <script type="module">
          try {
            ${transpiledCode}
          } catch (e) {
            console.error(e);
            document.body.innerHTML = '<pre style="color: red;">' + e.message + '</pre>';
          }
        </script>
      </body>
    </html>
  `;

  useEffect(() => {
    const transpileAndRun = async () => {
      if (!iframeRef.current) return;

      try {
        console.log('Client: Sending code to API:', code);
        const response = await fetch('/api/transpile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code }),
        });

        const transpiledCode = await response.text();
        console.log('Client: API Response OK:', response.ok);
        console.log('Client: Received transpiled code:', transpiledCode);

        if (!response.ok) {
          throw new Error(transpiledCode);
        }

        iframeRef.current.srcdoc = getIframeContent(transpiledCode);

      } catch (error) {
        console.error('Client: Error during transpilation or fetch:', error);
        if (iframeRef.current && error instanceof Error) {
          iframeRef.current.srcdoc = `<pre style="color: red;">${error.message}</pre>`;
        }
      }
    };

    // Debounce the transpilation to avoid running on every keystroke
    const timerId = setTimeout(() => {
      transpileAndRun();
    }, 300);

    return () => clearTimeout(timerId);
  }, [code]);

  return (
    <div className="flex h-screen w-screen bg-gray-900 text-white">
      <div className="w-1/2 h-full border-r border-gray-700">
        <Editor
          height="100%"
          defaultLanguage="javascript"
          theme="vs-dark"
          value={code}
          onChange={(value) => setCode(value || '')}
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
        />
      </div>
    </div>
  );
}

export default Playground;
