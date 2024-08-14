
require('dotenv').config();

const express = require('express');
const { createTodo, updateTodo } = require('./types.js');
const { todo } = require('./db.js');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Utility function for error handling
const handleError = (res, status, message) => {
    res.status(status).json({ msg: message });
};

// Routes
app.get('/', (req, res) => {
    res.send("Welcome home");
});

app.post('/todo', async (req, res) => {
    try {
        const createPayLoad = req.body;
        const parsedPayLoad = createTodo.safeParse(createPayLoad);
        console.log(JSON.stringify(parsedPayLoad));
        if (!parsedPayLoad.success) {
            return handleError(res, 400, "Invalid inputs");
        }

       const newtodo =  await todo.create({
            title: createPayLoad.title,
            description: createPayLoad.description,
            completed: false,
            uname: createPayLoad.uname,
        });

        res.status(201).json({ "newtodo":newtodo});

    } catch (error) {
        console.error('Error adding todo:', error);
        handleError(res, 500, 'Internal Server Error');
    }
});

app.post('/login', (req, res) => {
    const { uname, password } = req.body;
    // Consider using a more secure authentication method in production
    // if ((uname === "test" && password === "1234") || uname === "rajesh") {
        return res.status(200).json({ msg: "Login successful" });
    // }

    // handleError(res, 401, "Invalid login credentials");
});

app.get('/todos', async (req, res) => {
    try {
        const { username } = req.query;

        if (!username) {
            return handleError(res, 400, "Username is required");
        }

        const todos = await todo.find({ uname: username });

        res.status(200).json({ todos });

    } catch (error) {
        console.error('Error fetching todos:', error);
        handleError(res, 500, 'Internal Server Error');
    }
});

app.put('/completed', async (req, res) => {
    try {
        const { id } = req.body;
        const safeId = updateTodo.safeParse({ id });

        if (!safeId.success) {
            return handleError(res, 400, "Invalid input");
        }

        const result = await todo.updateOne(
            { _id: id },
            { $set: { completed: true } }
        );

        if (result.matchedCount === 0) {
            return handleError(res, 404, "Todo not found");
        }

        res.status(200).json({ msg: "Marked completed" });

    } catch (error) {
        console.error('Error updating todo:', error);
        handleError(res, 500, 'Internal Server Error');
    }
});
app.delete('/clear', async (req, res) => {
    const { id } = req.body;

    todo.deleteOne({ _id: id })
        .then(result => {
            res.status(200).json();
        })
        .catch(error => {
            res.status(401).json();
        });

})
// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
