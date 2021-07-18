import React, {Fragment, useState} from "react";

const InputTodo = () => {
    const [task, setTask] = useState("")
    const onSubmitForm = async e => {
        e.preventDefault()
        try{
            const body = {task}
            // const response = await fetch("http://localhost:8000/todos", {
            await fetch("http://localhost:8000/todos", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })
            //console.log(response)
            window.location = "/"
        } catch (err) {
            console.error(err.message)
        }
    }
    return (
        <Fragment>
            <h1 className="text-center mt-5">Todo List</h1>
            <form className="d-flex mt-5" onSubmit={onSubmitForm}>
                <input type="text" className="form-control" value={task} onChange={e => setTask(e.target.value)} />
                <button className="btn btn-success">Add</button>
            </form>
        </Fragment>
    )
}

export default InputTodo