const router = require("express").Router();
const fs = require("fs");

router.get("/notes", function (req, res) {
    fs.readFile("db/db.json", "utf8", function (err, data) {
        let notes;
        if (err) {
            console.log(err)
            notes = [];
        } else {
            notes = [].concat(JSON.parse(data))

        }
        return res.json(notes);
    })

})

router.post("/notes", function (req, res) {
    console.log(req.body)
    var newId = (Math.floor(Math.random() * 1000))
    var actualId= newId.toString()
    const { title, text } = req.body
    const newNote = { title, text, id: actualId }

    fs.readFile("db/db.json", "utf8", function (err, data) {
        let notes;
        if (err) {
            console.log(err)
            notes = [];
        } else {
            notes = [].concat(JSON.parse(data))
            updatedNotes = [...notes, newNote]
            fs.writeFile("db/db.json", JSON.stringify(updatedNotes, undefined, 2), (err) => {
                if (err) {
                    console.log(err)
                    return console.log(err);
                }
                console.log("successfully written to db");
                return res.json(data);
            })
        }
        return;
    });
});

router.delete("/notes/:id", function (req, res) {
    const deleteThis = req.params.id
    fs.readFile("db/db.json", "utf8", function (err, data) {
        let notes;
        if (err) {
            console.log(err)
            notes = [];
        } else {
            notes = [].concat(JSON.parse(data))
            
            notes = notes.filter(notes => notes.id !== deleteThis);
            fs.writeFile("db/db.json", JSON.stringify(notes, undefined, 2), (err) => {
                if (err) {
                    console.log(err)
                    return console.log(err);
                }
                console.log("successfully DELETED");
                return res.json(data);
            })
        }
    })
});


module.exports = router


