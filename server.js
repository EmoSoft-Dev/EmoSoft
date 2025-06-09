const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Tentukan direktori statis (tempat file HTML, CSS, JS, assets berada)
const publicPath = path.join(__dirname, './'); // Ini akan melayani root folder sebagai statis

app.use(express.static(publicPath));

// Middleware untuk fallback ke index.html jika halaman tidak ditemukan (SPA-friendly)
app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server EmoSoft berjalan di port ${port}`);
});