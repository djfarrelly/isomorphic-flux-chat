var React  = require('react');
var App = require('./views/app.jsx');
var AppStore = require('./stores/appStore.js');
var AppDispatcher = require('./dispatchers/appDispatcher.js');
var socket = require('./interfaces/socket.js');
var actionCreators = require('./actions/actionCreators.js');

var dataStore = new AppStore(data);
var targetNode = document.querySelector('#app');

function render() {
  React.render(
    React.createElement(App, dataStore.getData()),
    targetNode
  );
}

// Render when the data store has changed
dataStore.onChange(render);

// Listen to events from the server
socket.on('newMessage', actionCreators.receiveMessage);

// Initial render
render();

