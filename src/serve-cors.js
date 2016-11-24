import express from 'express';

const cors = new express.Router();

cors.all('*', (req, res, next) => {
  if (req.method === 'OPTIONS') {
    const headerACRH = req.header('Access-Control-Request-Headers') || '*';

    res.set({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': headerACRH,
      'Access-Control-Max-Age': 1728000,
    });
    res.status(204).end();
  } else {
    res.set('Access-Control-Allow-Origin', '*');
    next();
  }
});

export default cors;
