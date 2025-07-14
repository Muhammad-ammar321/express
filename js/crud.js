const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());


let students = [];
let nextId = 1;

//  CREATE Student 
app.post('/students', (req, res) => {
    const { name, age, email, course } = req.body;
    if (!name || !email || !course || age == null) {
    return res.status(400).json({ error: 'All fields are required' });
    }

    const newStudent = { id: nextId++, name, age, email, course };
    students.push(newStudent);
    res.status(201).json(newStudent);
});

//  READ All Students 
app.get('/students', (req, res) => {
    res.json(students);
});

//  READ One Student 
app.get('/students/:id', (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));
    if (!student) return res.status(404).json({ error: 'Student not found' });
    res.json(student);
});

//  UPDATE Student 
app.put('/students/:id', (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));
    if (!student) return res.status(404).json({ error: 'Student not found' });

    const { name, age, email, course } = req.body;
    if (name) student.name = name;
    if (age != null) student.age = age;
    if (email) student.email = email;
    if (course) student.course = course;

    res.json(student);
});

// DELETE Student 
app.delete('/students/:id', (req, res) => {
    const index = students.findIndex(s => s.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: 'Student not found' });

    students.splice(index, 1);
    res.json({ message: 'Student deleted' });
});

// Start the server
app.listen(port, () => {
    console.log(`🎓 Student Dashboard API running at http://localhost:${port}`);
});
