const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// tmp simple server for implementing functionality
app.use('/', express.static('assets'));

app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});
