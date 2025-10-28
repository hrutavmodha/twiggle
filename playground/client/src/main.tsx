import './monaco-env'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const div = document.getElementById('root') as HTMLDivElement
const root = createRoot(div)
const component = (
    <StrictMode>
        <App />
    </StrictMode>
)
root.render(component)
