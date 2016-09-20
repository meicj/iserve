import express from 'express';
import iserve from './iserve';

const log = new express.Router();

function getFullURL(req) {
  return `${req.protocol}://${req.get('host')}${req.originalUrl}`;
}

log.all('*', (req, res, next) => {
  if (iserve.argv.serverlog) {
    console.log(getFullURL(req));
  }

  next();
});

export default log;
