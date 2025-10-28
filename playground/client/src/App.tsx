import { useState } from 'react'

export default function App() {
    const [code, setCode] = useState('// Start coding here!')
    const [output, setOutput] = useState('Output will appear here after you run the code.')
    const [isLoading, setIsLoading] = useState(false)
    const handleEditorChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCode(event.target.value)
    }
    const executeCode = async () => {
        setIsLoading(true)
        setOutput('Executing code...')
        try {
            const response = await fetch('/execute-code', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code }),
            })
            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || 'Failed to execute code.')
            }
            const data = await response.json()
            setOutput(data.output || 'No output received.')
        } catch (error: any) {
            setOutput(`Error: ${error.message}`)
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <div className="flex h-screen bg-gray-900 text-gray-100">
            <div className="flex-1 p-4 flex flex-col">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Code Editor</h2>
                    <button
                        onClick={executeCode}
                        disabled={isLoading}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                    >
                        {isLoading ? 'Running...' : 'Run Code'}
                    </button>
                </div>
                <div className="flex-1 border border-gray-700 rounded-lg overflow-hidden">
                    <textarea
                        className="w-full h-full bg-gray-800 p-4 font-mono text-sm resize-none focus:outline-none"
                        value={code}
                        onChange={handleEditorChange}
                        spellCheck="false"
                    />
                </div>
            </div>
            <div className="flex-1 p-4 border-l border-gray-700 flex flex-col">
                <h2 className="text-xl font-bold mb-4">Output / Preview</h2>
                <div className="flex-1 bg-gray-800 p-4 rounded-lg overflow-auto font-mono text-sm">
                    <pre>{output}</pre>
                </div>
            </div>
        </div>
    )
}
