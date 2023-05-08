const notes = require('express').Router();
const { readFromFile, readAndAppend, deleteNote } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

// GET Route for retrieving all the notes
notes.get('/', (req, res) => {
  readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new Note
notes.post('/', (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };

    readAndAppend(newNote, './db/notes.json');
    res.json(`Note added successfully 🚀`);
  } else {
    res.error('Error in adding note');
  }
});

// DELETE :id
notes.delete(':id', (req, res) => {
  const id = req.params.id;
  // Call the database or storage system to delete the note with the specified ID
  deleteNote(id, './db/notes.json', function(err, result) {
    if (err) {
      // If there's an error, send a 500 Internal Server Error response
      res.status(500).json({error: 'Internal Server Error'});
    } else if (result.deletedCount === 0) {
      // If the note is not found, send a 404 Not Found response
      res.status(404).json({error: 'Note not found'});
    } else {
      // If the note is successfully deleted, send a 204 No Content response
      res.status(204).send();
    }
  });
});

module.exports = notes;