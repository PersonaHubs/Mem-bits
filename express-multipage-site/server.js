const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (CSS, JS, images) from "public"
app.use(express.static(path.join(__dirname, 'public')));

// Serve HTML pages from "views"
const viewsPath = path.join(__dirname, 'views');

app.get('/', (req, res) => {
    res.sendFile(path.join(viewsPath, 'index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(viewsPath, 'about.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(viewsPath, 'contact.html'));
});

app.get('/blog', (req, res) => {
    res.sendFile(path.join(viewsPath, 'blog.html'));
});

// API route to get posts
app.get('/api/posts', (req, res) => {
    const postsPath = path.join(__dirname, 'data', 'posts.json');
    fs.readFile(postsPath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Unable to read posts' });
        }
        const posts = JSON.parse(data);
        res.json(posts);
    });
});

// Catch-all 404 for undefined routes
app.use((req, res) => {
    res.status(404).send('Page not found');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
