import navigate  from './router'

export default function Link(props: {
    to: `/${string}`,
    children: any
}) {
    return (
        <a
            href={props.to}
            onClick={(e: Event) => {
                e.preventDefault()
                navigate(props.to)
            }}
        >
            {props.children}
        </a>
    )
}