import { setRoutes } from './router'

export default function Routes(props: {
    children: any[]
}): any {
    const routes: { [key: string]: any } = {}
    props.children.forEach((child: any) => {
        if (child.element && child.to) {
            routes[child.to] = child.element
        }
    })
    setRoutes(routes)
    return null
}