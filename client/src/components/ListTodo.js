import React, {Fragment, useState, useEffect} from "react";

const ListTodos = () => {
    const [todos, setTodos] = useState([])
    const getTodos = async () => {
        try{
            const response = await fetch("http://localhost:8000/todos")
            const jsonData = await response.json()
            setTodos(jsonData)
            console.log(jsonData)
        } catch (err) {
            console.error(err.message)
        }
    }

    useEffect(() => {
        getTodos()
    }, [])
    console.log(todos)

    return (
        <Fragment>
            {" "}
            <table class="table mt-5 text-center">
                <thead>
                <tr>
                    <th>Task</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                    {todos.map(todo => (
                        <tr key={todo.todo_id}>
                            <td>{todo.task}</td>
                            <td>Edit</td>
                            <td>Delete</td>
                        </tr>
                    ))}
                        
                </tbody>
            </table>
        </Fragment>
    )
}

export default ListTodos