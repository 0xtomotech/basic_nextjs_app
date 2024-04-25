import { TodoItem } from "@/components/TodoItem";
import { prisma } from "@/db";
import Link from "next/link";

function getTodos() {
  return prisma.todo.findMany();
}

async function toggleTodo(id: string, complete: boolean) {
  // server-side rendering
  "use server"
  // logging the arguments we passed to the function
  console.log(id, complete)

  // only thing we cannot do in a function we pass as argument: redirect

  await prisma.todo.update({ where: { id }, data: { complete } })
}

export default async function Home() {
  // no need to use fetch here due to the server-side rendering
  const todos = await getTodos();
  // create a new todo
  // await prisma.todo.create({ data: { title: "Learn Next.js", complete: false } })

  return <>
    <header className=" flex justify-between items-center mb-4">
      <h1 className=" text-2xl">Todo App with Next.JS</h1>
      <Link
        className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
        href="/new"
        >
          New
        </Link>
    </header>
    <ul className="pl-4">
      {todos.map((todo) => (
        <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo}/>
      ))}
    </ul>
  </>
}