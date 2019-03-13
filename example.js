const express = require('express');

const app = express();
const port = 8080;
const downloadMap = {
  38291: '/home/stefano/_tmp/tok/index.js',
}; // token -> real location

app.get('/download', (req, res) => {
  const downloadToken = req.query.token.toString();
  const realDownload = downloadMap[downloadToken];
  res.download(realDownload);
});

app.listen(port, () => console.log(`App listening on port ${port}!`));