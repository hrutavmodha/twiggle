import { createState } from 'twiggle/client'

const { get: getTodos, set: setTodos } = createState<Array<string>>([])
const { get: getNewTodo, set: setNewTodo } = createState('')

function addTodo() {
    if (getNewTodo().trim() === '') return
    setTodos([...getTodos(), getNewTodo()])
    setNewTodo('')
}

function removeTodo(index: number) {
    const newTodos = [...getTodos()]
    newTodos.splice(index, 1)
    setTodos(newTodos)
}

export default function App() {
    return (
        <div>
            <h1>Twiggle To-Do List</h1>
            <input
                type="text"
                value={getNewTodo()}
                oninput={(event: Event) => {
                    setNewTodo((event.target as HTMLInputElement).value)
                }}
            />
            <button onclick={addTodo}>Add</button>
            {console.log(getTodos())}
            <ul>
                {getTodos().map((todo: string, index: number) => (
                    <li>
                        {todo}
                        <button onclick={() => removeTodo(index)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
