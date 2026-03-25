# 📚 Book Notes Application

A web application to track books you've read, rate them, and store your personal notes.
Inspired by Derek Sivers' [https://sive.rs/book](https://sive.rs/book)

## Features

✅ **Add Books** - Record new books with title, author, ISBN, rating, and notes
✅ **Edit Entries** - Update your book information anytime
✅ **Delete Books** - Remove entries you no longer need
✅ **Sort & Filter** - Sort books by rating, date read, or title
✅ **Book Covers** - Display book covers from Open Library API
✅ **Persistent Storage** - All data saved in PostgreSQL database

## Tech Stack

- **Backend**: Node.js + Express.js
- **Frontend**: EJS (Embedded JavaScript templating) + HTML/CSS
- **Database**: PostgreSQL
- **API**: Open Library Covers API
- **HTTP Client**: Axios

## Project Setup

### Prerequisites
- Node.js and npm installed
- PostgreSQL installed and running
- pgAdmin (optional, for database management)

### Installation Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Create PostgreSQL Database**
   Open pgAdmin or psql and run:
   ```sql
   CREATE DATABASE book_notes_db;
   ```

3. **Create Table**
   Connect to the database and run:
   ```sql
   CREATE TABLE books (
       id SERIAL PRIMARY KEY,
       title VARCHAR(255) NOT NULL,
       author VARCHAR(255) NOT NULL,
       isbn VARCHAR(20),
       rating INTEGER CHECK (rating >= 1 AND rating <= 5),
       date_read DATE,
       review TEXT,
       cover_url VARCHAR(500),
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

4. **Configure Database Connection**
   Edit `database.js` with your PostgreSQL credentials:
   - user: your PostgreSQL username
   - password: your PostgreSQL password
   - database: book_notes_db

5. **Start the Application**
   ```bash
   npm start
   ```
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

6. **Open in Browser**
   Navigate to `http://localhost:3000`

## Project Structure

```
book-notes-app/
├── public/
│   ├── styles/
│   │   └── style.css         (Main styles)
│   └── scripts/
│       └── script.js         (Client-side JavaScript)
├── views/
│   ├── index.ejs             (Home page - display all books)
│   ├── new.ejs               (Form to add new book)
│   ├── edit.ejs              (Form to edit book)
│   └── header.ejs            (Header template)
├── routes/                   (For future route organization)
├── database.js               (PostgreSQL connection setup)
├── index.js                  (Main Express server)
├── package.json              (Project dependencies)
└── README.md                 (This file)
```

## How to Use

1. **View Books**: Home page displays all your books
2. **Add Book**: Click "Add New Book" and fill out the form
3. **Edit Book**: Click the "Edit" button on any book entry
4. **Delete Book**: Click the "Delete" button to remove an entry
5. **Sort Books**: Use the sort dropdown to organize by rating, date, or title

## API Integration

The app uses the **Open Library Covers API** to fetch book covers:
- Endpoint: `https://covers.openlibrary.org/b/isbn/{isbn}-M.jpg`
- Replace `{isbn}` with the book's ISBN number

## Database Schema

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Unique book identifier |
| title | VARCHAR(255) | Book title |
| author | VARCHAR(255) | Author name |
| isbn | VARCHAR(20) | ISBN number for fetching covers |
| rating | INTEGER | Rating 1-5 |
| date_read | DATE | When you finished reading |
| review | TEXT | Your notes and thoughts |
| cover_url | VARCHAR(500) | URL to book cover image |
| created_at | TIMESTAMP | Record creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

## Next Steps & Improvements

- [ ] Add authentication/login system
- [ ] Display book covers from API
- [ ] Add search functionality
- [ ] Export data to CSV
- [ ] Mobile-responsive design
- [ ] Statistics dashboard (books read per month, average rating)

## Troubleshooting

**Database Connection Error?**
- Ensure PostgreSQL is running
- Check your username/password in `database.js`
- Verify database name is 'book_notes_db'

**Port 3000 Already in Use?**
- Change PORT in `index.js` or kill the process using port 3000

**nodemon not found?**
- Run: `npm install` again
- Or use: `npm start` instead of `npm run dev`

## Author

Created as a Udemy Web Development Course Capstone Project

---

Happy reading! 📖✨
