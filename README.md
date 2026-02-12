# Portfolio Website with Contact Form

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Build Tailwind CSS (in a separate terminal)
```bash
npm run build:css
```
This will watch for changes and rebuild your CSS automatically.

### 3. Start the Server (in another terminal)
```bash
npm start
```

The server will run on `http://localhost:3000`

### 4. Open the Website
Open `index.html` in your browser or navigate to `http://localhost:3000/index.html`

## Features

- **Contact Form** with validation:
  - Name (minimum 2 characters)
  - Email (valid email format)
  - Message (minimum 10 characters)

- **Database Storage**: All submissions are stored in SQLite database (`contacts.db`)

- **API Endpoints**:
  - `POST /api/contact` - Submit contact form
  - `GET /api/contacts` - View all submissions (admin)

## Database

The SQLite database (`contacts.db`) will be created automatically with the following schema:

```sql
CREATE TABLE contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

## View Submissions

To view all contact form submissions, visit:
`http://localhost:3000/api/contacts`
