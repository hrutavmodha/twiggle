import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

const div = document.getElementById('root') as HTMLDivElement
const root = createRoot(div)
const component = (
    <StrictMode>
        <App />
    </StrictMode>
)
root.render(component)