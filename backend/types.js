const zod = require('zod');


const createTodo = zod.object({
    title:zod.string().min(1),
    description:zod.string().min(1),
    uname:zod.string(),
})

const updateTodo = zod.object({
    id:zod.string(),
})

const login = zod.object({
    uname:zod.string(),
    password:zod.string()
})
module.exports ={
    createTodo:createTodo,
    updateTodo:updateTodo
}