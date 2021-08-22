const express = require('express');
const path = require('path');
const fs = require('fs');
const db = require('./db/db.json')
const {
    v4: uuidv4
} = require('uuid');

const PORT = process.env.port || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static('public'));


app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})

// GET Route for notes page
app.get('/api/notes', (req, res) => {
    res.json(db);
});


app.post('/api/notes', (req, res) => {

    const noteEl = createNote(req.body, db);
    res.json(noteEl);
})

function createNote(body, event) {
    const noteEl = {
        id: uuidv4(),
        title: body.title,
        text: body.text

    };
    let noteArr = event || [];
    noteArr.push(noteEl);


    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(noteArr)
    );
    console.log(noteEl)
    return noteEl;
};

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);