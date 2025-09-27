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
        render(routes[to], document.body)
    }
}

window.addEventListener('popstate', () => {
    renderRoute(window.location.pathname as `/${string}`)
})