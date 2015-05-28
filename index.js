var express = require('express');
var app = express();
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var logger = require('morgan');
var stylus = require('stylus');
var autoprefixer  = require('autoprefixer-stylus');
var React = require('react');
var fs = require('fs');
require('node-jsx').install({extension: '.jsx'});

var App = require('./app/views/app.jsx');
var AppStore = require('./app/stores/appStore.js');


var appStore = new AppStore();


/**
 * Server
 */

var render = function(data, done) {

  var body = React.renderToString(
    React.createElement(App, data)
  );

  fs.readFile('./app/views/layout.hbs', 'utf8', function (err, layout) {
    if (err) done(err);
    done(null, layout
                .replace('{{{body}}}', body)
                .replace('{{{data}}}', JSON.stringify(data)));
  });
};

app.use(logger('common'));

// Stylus
app.use(
  stylus.middleware({
    src:     __dirname + '/assets',
    dest:    __dirname + '/public',
    compile: function (str, path, fn) {
      return stylus(str)
        .use(autoprefixer())
        .set('filename', path)
        .set('compress', true);
    }
  })
);

// Static files
app.use(express.static(__dirname + '/public'));

app.get('/', function(err, res) {

  var data = appStore.getData();

  render(data, function(err, html){
    if (err) throw err;
    res.send(html);
  });

});

/**
 * WebSockets
 */

var clients = {};

var broadcastEvent = function(name, data, sourceId) {
  Object.keys(clients).forEach(function(id) {
    clients[id].socket.emit(name, data);
  });
};

var addClientCallback = function(socket) {
  clients[socket.id] = {
    username: null,
    socket: socket
  };
};

var removeClientCallback = function(socket) {
  delete clients[socket.id];
};


io.on('connection', function(socket) {

  addClientCallback(socket);

  // May want to break up these two actions
  socket.on('sendMessage', function(text) {
    var message = {
      username: clients[socket.id].username,
      text: text,
      timestamp: (new Date()).valueOf()
    };
    appStore.saveMessage(message);
    broadcastEvent('newMessage', message);
  });

  socket.on('loginUser', function(username) {
    clients[socket.id].username = username;
  });

  socket.on('disconnect', function() {
    removeClientCallback(socket);
  }); 

});

server.listen(3000);
