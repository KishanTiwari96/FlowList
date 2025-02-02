import axios from "axios";
import { useEffect, useState } from "react"

export function Todos() {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("");
    const token = sessionStorage.getItem("token");

    useEffect(() => {
        axios.get("https://to-do-project-lovat.vercel.app/todos", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            setTodos(res.data.todos);
        }).catch(err => {
            console.log("Failure in fetching", err)
        })
    }, []);

    function addTodo() {
        if (!title || !description) {
            console.log("Title or Description cannot be empty");
            return;
        }

        axios.post("https://to-do-project-lovat.vercel.app/addTodo", {
            title: title,
            description: description
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            setTodos([...todos, res.data.todo]);
            setTitle("");
            setDescription("");
        }).catch(err => {
            console.log("Failure in adding", err)
        })
    }

    function updateTodo(todo) {
        axios.put("https://to-do-project-lovat.vercel.app/updateTodo", {
            title: todo.title
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            setTodos((prevTodo) => {
                return prevTodo.map((t) => {
                    return t.title == todo.title ? { ...t, completed: true } : t
                })
            })
        }).catch(err => {
            console.log("Fail to update", err);
        })
    }

    function deleteTodo(todo) {
        axios.delete("https://to-do-project-lovat.vercel.app/deleteTodo", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: { title: todo.title }
        }).then((res) => {
            setTodos((prevTodo) =>
                prevTodo.filter((t) => t.title != todo.title)
            )
        }).catch(err => {
            console.log("Fail to delete", err)
        })
    }
    return (
        <div className="flex justify-center">
            <div className="flex flex-col items-center">
                <h1 className="text-6xl pt-6 font-bold">To-Do App</h1>
                <div className="flex flex-col items-center">
                    <input className="w-full border border-gray-500 rounded-sm py-1 mt-8 p-1" type="text" placeholder="Enter Title" onChange={(e) => {
                        setTitle(e.target.value)
                    }} />
                    <input className="w-full border border-gray-500 rounded-sm py-1 mt-4 p-1" type="text" placeholder="Enter Description" onChange={(e) => {
                        setDescription(e.target.value)
                    }} />
                    <button className="border border-black-500 mt-6 text-2xl p-2  bg-gray-500 hover:bg-blue-500 rounded-md" onClick={addTodo} >Add todo</button>
                </div>
                <h2 className="text-xl font-bold mt-4">Your current todos</h2>
                {todos.length == 0 ? (<p>No todo now</p>) : (
                    todos.map((todo, index) => {
                        return <div key={index} className="bg-slate-300 w-full flex justify-between border border-black rounded-sm items-center">
                            <div className="flex flex-col font-semibold p-3">
                                <h3 className="text-2xl">{todo.title}</h3>
                                <h4 className="text-sm">{todo.description}</h4>
                            </div>
                            <div className="flex">
                                <div className="flex items-center mr-2 hover:text-red-500">
                                   <i class="fa-solid fa-trash-can" onClick={() => {
                                        deleteTodo(todo);
                                    }}></i> 
                                </div>
                                
                                <button className="border border-gray-500 rounded-sm mr-1 hover:bg-blue-400" onClick={() => {
                                    updateTodo(todo)
                                }}>{todo.completed ? "Completed" : "Mark as done"}
                                </button>
                            </div>
                        </div>
                    })
                )}
            </div>
        </div>

    )
}
