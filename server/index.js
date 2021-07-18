require('dotenv').config();
const express = require("express")
const app = express()
const cors = require("cors")
const pool = require("./database")

//Middleware
app.use(cors())
app.use(express.json())

//Create routes
//Create a todo
app.post("/todos", async (req, res) => {
    try{
        console.log(req.body)
        const {task} = req.body
        const newTodo = await pool.query("INSERT INTO todo (task) VALUES ($1) RETURNING *", [task])
        res.json(newTodo.rows[0]) //req.body return json data which is defined in rows
    } catch(err) {
        console.error(err.message)
    }
})


// get all todos
app.get("/todos", async (req, res) => {
    try{
        const allTodos = await pool.query("SELECT * FROM todo")
        res.json(allTodos.rows) //data is inside rows array
    } catch(err) {
        console.log(err.message)
    }
})

// get a todo
app.get("/todos/:id", async (req, res) => {
    try{
        console.log(req.params)
        const {id} = req.params
        const todo = await pool.query("SELECT* FROM todo WHERE  todo_id = $1", [id])
        res.json(todo.rows[0])
    } catch(err) {
        console.error(err.message)
    }
})

//Update a todo
app.put("/todos/:id", async (req, res) => {
    try{
        const {id} = req.params
        const {task} = req.body
        const updateTodo = await pool.query("UPDATE todo SET task = $1 WHERE todo_id = $2", [task, id])
        res.json("Todo updated")
    }  catch(err) {
        console.error(err.message)
    }
})

//Delete a todo
app.delete("/todos/:id", async (req, res) => {
    try{
        const {id} = req.params
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id])
        res.json("Todo deleted")
    } catch(err) {
        console.error(err.message)
    }
})

app.listen(8000, () => {
    console.log("Server has started on port 8000. Go to http://localhost:8000")
})