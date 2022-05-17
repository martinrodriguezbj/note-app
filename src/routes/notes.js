const express = require('express');
const res = require('express/lib/response');
const router = express.Router();

const Note = require('../models/Note');

router.get('/notes/add', (req, res) => {
    res.render('notes/new-notes')
});

router.post('/notes/new-notes', async (req, res) => {
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
       await newNote.save();
       req.flash('succes_msg', 'Nota agregada correctamente');
       res.redirect('/notes');
    }
});


router.get('/notes', async (req, res) => {
    const notes = await Note.find().lean();
    res.render('notes/all-notes', { notes });
});

router.get('/notes/edit/:id', async (req, res) => {
    const note = await Note.findById(req.params.id).lean();
    res.render('notes/edit-note', {note});
})

router.put('/notes/edit-note/:id', async (req, res) => {
    const { title, description }= req.body;
    await Note.findByIdAndUpdate(req.params.id, {title, description});
    req.flash('succes_msg', 'Nota actualizada correctamente');
    res.redirect('/notes');
})

router.delete('/notes/delete/:id', async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    req.flash('succes_msg', 'Nota eliminada correctamente');
    res.redirect('/notes');
});

module.exports = router;