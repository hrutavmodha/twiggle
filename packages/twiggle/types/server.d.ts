export interface SSRContext {
    events: Map<string, EventHandler>
    eventIdCounter: number
    suspenseIdCounter?: number
}

export interface EventHandler {
    eventName: string
    handler: string
}
