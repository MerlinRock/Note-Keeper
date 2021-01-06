const fs = require('fs');
const path = require('path');

//updates json file when notes are added or deleted
function updateJson(notes) {
    fs.writeFile("db/db.json", JSON.stringify(notes), err => {
        if (err) throw err;
        return true;
    });
}

module.exports = app => {
    fs.readFile("db/db.json", "utf8", (err, data) => {
        if (err) throw err;
        var notes = JSON.parse(data);

        // api notes can travel through here
        app.get("/api/notes", (req, res) => {
            res.json(notes);
        });

        app.post("/api/notes", (req, res) =>{
            let newNote = req.body;
            notes.push(newNote);
            updateJson(notes);
            res.json(notes)
        });

        // Finds note with id
        app.get("/api/notes/:id", (req, res) => {
            res.json(notes[req.params.id]);
        });

        // Deletes note with id
        app.delete("/api/notes/:id", (req, res) => {
            notes.splice(req.params.id, 1);
            updateJson(notes);
        });

        //Displays notes.html to the client
        app.get('/notes', (req, res) => {
            res.sendFile(path.join(__dirname, "../public/notes.html"));
        });

        //This will always send the client to the index page
        app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, "../public/index.html"));
        });
    });

}