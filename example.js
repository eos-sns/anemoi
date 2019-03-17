const express = require('express');
const anemoi = require('./index');

const app = express();
const port = 10001;
const downloadUrlParam = 'token'; // param in URL

const retrieveActualLocation = (token) => {
  const anemoiClient = new anemoi.anemoi.Anemoi();
  return anemoiClient.get(token);
};

app.get('/download', (req, res) => {
  const downloadToken = req.query[downloadUrlParam].toString();
  const realDownload = retrieveActualLocation(downloadToken); // it's a promise
  realDownload.then((val) => {
    if (val) {
      res.download(val);
    }
    else {
      res.sendStatus(403); // token is not valid
    }
  });
});

app.listen(port);
