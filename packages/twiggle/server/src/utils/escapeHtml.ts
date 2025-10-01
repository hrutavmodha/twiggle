export default function escapeHtml(unsafe: string): string {
    if (typeof unsafe !== 'string') {
        return ''
    }
    else {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;")
    }
}