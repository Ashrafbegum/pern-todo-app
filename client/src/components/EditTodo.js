import React, {Fragment, useState} from "react";

const EditTodo = ({todo}) => {
    const [task, setTask] = useState(todo.task)

    //delete todo
    const editTask = async e => {
        e.preventDefault()
        try{
            const body = {task}
            const response = await fetch(`http://localhost:8000/todos/${todo.todo_id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })
            console.log(response)
            window.location = "/"
        } catch (err) {
            console.error(err.message)
        }
    }

    return (
        <Fragment>
            <button type="button" className="btn btn-warning" data-toggle = "modal" data-target = {`#id${todo.todo_id}`}>Edit</button>
            <div className="modal" id={`id${todo.todo_id}`} onClick={ () => setTask(todo.task)}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title"> Edit Todo</h4>
                        <button type="button" className="close" data-dismiss="modal" onClick={ () => setTask(todo.task)}>
                            &times;
                        </button>
                    </div>
                    <div className="modal-body">
                        <input type="text" className="form-control" value={task} onChange={ e => setTask(e.target.value)} />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-warning" data-dismiss="modal" onClick={e => editTask(e)}>Edit</button>
                        <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={e => setTask(todo.task)}>Close</button>
                    </div>
                </div>
            </div>
        </Fragment>
     )
}
export default EditTodo