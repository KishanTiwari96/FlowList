const zod = require("zod");

const createTodo = zod.object({
    title:zod.string().min(1),
    description:zod.string().min(1),
})

const updateTodo = zod.object({
    title:zod.string().min(1)
})

const deleteTodo = zod.object({
    title : zod.string().min(1)
})

module.exports = {
    createTodo:createTodo,
    updateTodo:updateTodo,
    deleteTodo:deleteTodo
}