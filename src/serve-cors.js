import express from 'express';

const cors = express.Router();

cors.all('*', (req, res, next)=> {
    if (req.method === 'OPTIONS') {
        res.set({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
            'Access-Control-Allow-Headers': 'Keep-Alive,User-Agent,If-Modified-Since,Content-Type',
            'Access-Control-Max-Age': 1728000
        });
        res.status(204).end();
    } else {
        res.set('Access-Control-Allow-Origin', '*');
        next();
    }
});

export default cors;