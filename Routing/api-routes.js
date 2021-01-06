var notes = require("../db/db.json");
console.log(notes)

module.exports = function(app) {
    app.get("/api/notes", function(req, res) {
        res.json(notes);
    });
}