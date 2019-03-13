const express = require('express');
const anemoi = require('./index');

const app = express();
const port = 8080;

const retrieveActualLocation = (token) => {
  const anemoiClient = new anemoi.anemoi.Anemoi();
  return anemoiClient.get(token);
};

app.get('/download', (req, res) => {
  const downloadToken = req.query.token.toString();
  const realDownload = retrieveActualLocation(downloadToken);
  realDownload.then((val) => {
    const realPath = `/home/${val}.txt`;
    res.download(realPath);
  });
});

app.listen(port);
