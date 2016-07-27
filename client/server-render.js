
import fs from 'fs';


/* eslint-disable no-sync */
const template = fs.readFileSync(__dirname + '/../index.html', 'utf8');
/* eslint-enable no-sync */

function renderApp(path, callback) {


  callback(null, template);
}

module.exports = renderApp;
