//this is a client side rendering component and this is required due to OnChange event handler that needs to be handles on the client side
"use client"

type TodoItemProps = {
    id: string
    title: string
    complete: boolean
    toggleTodo: (id: string, complete: boolean) => void
}

export function TodoItem({ id, title, complete, toggleTodo}: TodoItemProps) {
    return <li className="flex gap-1 items-center">
        <input
            id={id}
            type="checkbox"
            className="cursor-pointer peer"
            defaultChecked={complete}
            onChange={e => toggleTodo(id, e.target.checked)} // e.target.checked is used to get the value of the checkbox
        />
        <label
            htmlFor={id}
            className=" peer-checked:line-through cursor-pointer peer-checked:text-slate-500"
        >
            {title}
        </label>
    </li>
}