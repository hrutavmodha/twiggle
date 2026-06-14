import { cleanupElement } from '../optimizations/cleanups'

export default function unmount(container: HTMLElement): void {
    cleanupElement(container)
    container.innerHTML = ''
}
