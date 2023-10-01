const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;

// Обработка API маршрутов (если нужно)
app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from Express.js!' });
});

// Раздача статических файлов React приложения
app.use(express.static(path.join(__dirname, 'build')));

// Обработка всех остальных маршрутов, отправляя index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
