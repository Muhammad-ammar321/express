const express = require('express');
const app = express();

app.use(express.json());

let users = [];
let nextId = 1;

app.post('/users', (req, res) => {
    const { name, age, email } = req.body;
    if (!name || !email || age == null) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const newUser = { id: nextId++, name, age, email };
    users.push(newUser);
    res.status(201).json(newUser);
});

app.get('/users', (req, res) => {
    res.json(users);
});

app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
});

app.put('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ error: 'User not found' });

    const { name, age, email } = req.body;
    if (name) user.name = name;
    if (age != null) user.age = age;
    if (email) user.email = email;

    res.json(user);
});

app.delete('/users/:id', (req, res) => {
    const index = users.findIndex(u => u.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: 'User not found' });

    users.splice(index, 1);
    res.json({ message: 'User deleted' });
});

app.listen(3000, () => {
    console.log("Server is running on port:", 3000);
});
