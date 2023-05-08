// Import
const express = require('express');
const app = express();
const PORT = 3001;
const path = require('path');
const api = require('./routes/index.js');

// const { clog } = require('./middleware/clog');
// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);


// Serve static files from the public directory
app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// DELETE NOTES
// DELETE /api/notes/:id
app.delete('/api/notes/:id', (req, res) => {
  const id = req.params.id;
  // Call the database or storage system to delete the note with the specified ID
  db.deleteNote(id, function(err, result) {
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

// Start the server
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
