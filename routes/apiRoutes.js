const router = require("express").Router();  
const fs = require("fs");

router.get("/notes", function(req,res){
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
    //.then ((notes) => res.json(notes))
    //.catch((err) => res.status(500).json(err));
})

router.post("/notes", function(req,res){
    console.log(req.body)
    var newId = Math.floor(Math.random() * 1000)
    const {title, text} = req.body
    const newNote= {title, text, id:newId}

    fs.readFile("db/db.json", "utf8", function (err, data) {
        let notes; 
        if (err) {
            console.log(err)
            notes = [];
        } else {
            notes = [].concat(JSON.parse(data))

        }
        return new Promise(notes);
    })
    .then ((notes) => [...notes, newNote])
    .then (updatedNotes => {
        fs.writeFile()
    })
    .catch((err) => res.status(500).json(err));
})

router.delete("/notes/:id", function(req,res){
    
})

module.exports = router