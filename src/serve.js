import express from 'express';
import serverlog from './serve-serverlog';
import cordova from './serve-cordova';
import cors from './serve-cors';
import serveStatic from './serve-static';

const serve = express();
import {event} from './iserve';

serve.set('x-powered-by', false);
serve.set('etag', false);

export default (argv)=> {

    serve.use(serverlog);
    serve.use(cors);
    serve.use(cordova);

    event.emitServeStatic();
    serve.use(serveStatic(argv));

    serve.listen(argv.port, argv.host, ()=> {
        console.log(`server running at http://${argv.host}:${argv.port}`);
    });
}