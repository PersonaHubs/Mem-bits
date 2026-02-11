const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (css, js)
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/blog', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'blog.html'));
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

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

