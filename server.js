const express = require('express');
const path = require('path');
const fs = require('fs');
const db = require('./db/db.json')

const PORT = process.env.port || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.get('/notes',(req,res) =>{
    res.sendFile(path.join(__dirname, './public/notes.html'))
})

app.get('*',(req,res) =>{
    res.sendFile(path.join(__dirname, './public/index.html'))
})

// GET Route for notes page
app.get('/api/notes', (req, res) =>{
    res.json(db);}
  );

  
app.post('./api/notes', (req,res) =>{

})

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
