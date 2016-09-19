import express from 'express';

const staticServe = express.Router();

const options = {
    lastModified: false,
    maxAge: 0
};

export default (argv)=> {
    staticServe.use(express.static(argv.workingdir, options));
    return staticServe;
};