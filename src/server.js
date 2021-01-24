const express = require('express');

const PORT = 3001;

const app = express();

app.use(express.static(__dirname + '/static'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/static/login.html');
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
