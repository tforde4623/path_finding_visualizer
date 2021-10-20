const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// tmp simple server for implementing functionality
app.use(express.static(path.join(__dirname, 'assets')));


app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});
