import path from 'path';
import bodyParser from 'body-parser';
import sassMiddleware from 'node-sass-middleware';

// Setting Up Global Middleware
module.exports = function(server){

  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));

  /*  This should look something like this
      __dirname + '/sass'
      which will look for that sass folder in the current directory and then
      the folder sass. Same would go with destination. */
  server.use(sassMiddleware({
    src: path.join(__dirname, 'sass'),
    dest: path.join(__dirname, 'public')
  }));

};
