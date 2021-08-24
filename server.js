// list of imported modules
const express = require('express');
const path = require('path');
const fs = require('fs');
const db = require('./db/db.json')
const {
    v4: uuidv4
} = require('uuid');
//port number
const PORT = process.env.PORT || 3001;
//creating express as a variable.
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


// GET Route for notes page
app.get('/api/notes', (req, res) => {
    res.json(db);
});

// POST route to show to call createNote function 
app.post('/api/notes', (req, res) => {

    const noteEl = createNote(req.body, db);
    res.json(noteEl);
})
//function that pushes input into an array, stringifys and adds it to db
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

//DELETE route, to remove notes
app.delete('/api/notes/:id', (req, res) => {
    deleteNote(req.params.id, db)
    res.json(true);
});
//function to splice clicked trashcan, and update in db 
function deleteNote(id, event) {
    for (let i = 0; i < event.length; i++) {
        let trash = event[i];

        if (trash.id == id) {
            event.splice(i, 1);
            fs.writeFileSync(
                path.join(__dirname, './db/db.json'),
                JSON.stringify(event)
            );
        }
    }
}
// GET Route for homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})
// GET Route for homepage
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})


app.listen(PORT, () =>
    console.log(`Note Taker listening at http://localhost:${PORT} 🚀`)
)