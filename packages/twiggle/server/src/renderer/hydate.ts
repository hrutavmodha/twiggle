import type { SSRContext } from 'types/server'

export default function generateHydrationScript(context: SSRContext): string {
    if (context.events.size === 0) {
        return ''
    }

    let script = '\n<script id="twiggle-hydration">\n'
    script += '(function() {\n'
    script += '  "use strict";\n'
    script += '  const handlers = {\n'
    // eslint-disable-next-line
    for (const [eventId, { eventName, handler }] of context.events) {
        script += `    "${eventId}": ${handler},\n`
    }

    script += '  };\n\n'

    script += '  function hydrate() {\n'
    script += '    for (const eventId in handlers) {\n'
    script += '      const el = document.querySelector(`[data-twiggle-event="${eventId}"]`);\n'
    script += '      if (el) {\n'
    script += '        const eventName = el.getAttribute("data-twiggle-event-type");\n'
    script += '        el.addEventListener(eventName, handlers[eventId]);\n'
    script += '      }\n'
    script += '    }\n'
    script += '  }\n\n'

    script += '  if (document.readyState === "loading") {\n'
    script += '    document.addEventListener("DOMContentLoaded", hydrate);\n'
    script += '  } else {\n'
    script += '    hydrate();\n'
    script += '  }\n'
    script += '})();\n'
    script += '</script>\n'

    return script
}
