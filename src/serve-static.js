import express from 'express';
import iserve from './iserve';

const staticServe = new express.Router();

export default (argv) => {
  staticServe.use(express.static(
    argv.workingdir,
    iserve.staticServeOptions
  ));
  return staticServe;
};
