const express = require('express');
const anemoi = require('./lib/anemoi');

const app = express();
const port = 10001;
const downloadUrlParam = 'token'; // param in URL

const retrieveActualLocation = (token) => {
  const anemoiClient = new anemoi.anemoi.Anemoi();
  return anemoiClient.get(token);
};

app.get('/download', (req, res) => {
  const now = new Date();
  
  try{
    const downloadToken = req.query[downloadUrlParam].toString();
    const realDownload = retrieveActualLocation(downloadToken); // it's a promise
    
    realDownload.then((val) => {
      if (val) {
        console.log(now, 'serving', downloadToken, '->', val)
        res.download(val);
      }
      else {
        console.log(now, 'tried', downloadToken)
        res.sendStatus(403); // token is not valid
      }
    });
  } catch (e) {
    console.log(now, 'failed request...', e)
    res.sendStatus(500);
  }
});

app.listen(port);
