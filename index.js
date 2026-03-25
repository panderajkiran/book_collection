// Import required libraries
const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./database');

// Initialize Express application
const app = express();
const PORT = 3000;

// ===== MIDDLEWARE SETUP =====
// Set EJS as the view engine (for rendering HTML templates)
app.set('view engine', 'ejs');

// Serve static files (CSS, JS, Images) from the "public" folder
app.use(express.static('public'));

// Parse form data from POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ===== ROUTES =====

// HOME PAGE - Display all books
app.get('/', async (req, res) => {
  try {
    // Get sort parameter from query string (default: 'date_read')
    const sortBy = req.query.sort || 'date_read';
    
    // Query to fetch all books, sorted by selected parameter
    let query = 'SELECT * FROM books';
    
    if (sortBy === 'rating') {
      query += ' ORDER BY rating DESC';
    } else if (sortBy === 'title') {
      query += ' ORDER BY title ASC';
    } else {
      query += ' ORDER BY date_read DESC';
    }
    
    const result = await pool.query(query);
    
    // Render the main page with books data
    res.render('index.ejs', { 
      books: result.rows,
      currentSort: sortBy
    });
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).send('Error loading books');
  }
});

// ADD NEW BOOK PAGE - Show form to add a new book
app.get('/new', (req, res) => {
  res.render('new.ejs');
});

// SAVE NEW BOOK - Handle form submission
app.post('/add', async (req, res) => {
  try {
    const { title, author, isbn, rating, dateRead, review } = req.body;
    
    // Query to insert new book into database
    const query = `
      INSERT INTO books (title, author, isbn, rating, date_read, review)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    
    await pool.query(query, [title, author, isbn, rating, dateRead, review]);
    
    // Redirect back to home page after saving
    res.redirect('/');
  } catch (error) {
    console.error('Error adding book:', error);
    res.status(500).send('Error adding book');
  }
});

// EDIT BOOK PAGE - Show form to edit a book
app.get('/edit/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Fetch the specific book from database
    const result = await pool.query('SELECT * FROM books WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).send('Book not found');
    }
    
    res.render('edit.ejs', { book: result.rows[0] });
  } catch (error) {
    console.error('Error fetching book:', error);
    res.status(500).send('Error loading book');
  }
});

// UPDATE BOOK - Handle edit form submission
app.post('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, isbn, rating, dateRead, review } = req.body;
    
    // Query to update book in database
    const query = `
      UPDATE books 
      SET title = $1, author = $2, isbn = $3, rating = $4, date_read = $5, review = $6, updated_at = NOW()
      WHERE id = $7
    `;
    
    await pool.query(query, [title, author, isbn, rating, dateRead, review, id]);
    
    res.redirect('/');
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).send('Error updating book');
  }
});

// DELETE BOOK - Remove a book from database
app.post('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Query to delete book from database
    await pool.query('DELETE FROM books WHERE id = $1', [id]);
    
    res.redirect('/');
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).send('Error deleting book');
  }
});

// ===== ERROR HANDLING =====
// 404 - Page not found
app.use((req, res) => {
  res.status(404).send('Page not found');
});

// ===== START SERVER =====
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📖 Book Notes App is ready!`);
});
