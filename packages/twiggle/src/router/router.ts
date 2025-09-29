import render from '../renderer/render'

let routes: { [key: string]: any } = {}

export default function navigate(to: `/${string}`): void {
    window.history.pushState({}, '', to)
    renderRoute(to)
}

export function setRoutes(newRoutes: { [key: `/${string}`]: Function }): void {
    routes = newRoutes
}

function renderRoute(to: `/${string}`): void {
    if (routes[to]) {
        const rootElement = document.getElementById('root');
        if (rootElement) {
            render(routes[to](), rootElement); // <--- Changed here
        } else {
            console.error('Root element with ID "root" not found.');
        }
    }
}

window.addEventListener('popstate', () => {
    renderRoute(window.location.pathname as `/${string}`)
})