const express = require('express');
const router = express.Router();

const Note = require('../models/Note');

router.get('/notes/add', (req, res) => {
    res.render('notes/new-notes')
});

router.post('/notes/new-notes', (req, res) => {
    const { title, description }= req.body  ;
    const errors = [];
    if(!title){
        errors.push({text: 'Por favor escriba un titulo'});
    }
    if(!description){
        errors.push({text: 'Por favor escriba una descripcion'});
    }
    if(errors.length>0){
        res.render('notes/new-notes', {
            errors,
            title,
            description
        });
    } else {
       const newNote = new Note({ title, description});
       console.log(newNote)
       res.send('ok')
    }
});


router.get('/notes', (req, res) => {
    res.render('Notes from database')
});

module.exports = router;