const router = require('express').Router()
const db = require('../db')

router.get('/notes', (req,res) => {
    db.readNotes().then((notes)=>{
        return res.json(notes)
    }).catch((err)=> res.status(500).json(err))
})

router.post('/notes', (req,res) => {
    db.writeNotes(req.body).then((notes)=>{
        return res.json(notes)
    }).catch((err)=> res.status(500).json(err))
})

router.delete('/notes/:id', (req,res) => {
    db.deleteNote(req.params.id).then((notes)=>{
        return res.json(notes)
    }).catch((err)=> res.status(500).json(err))
})


module.exports = router