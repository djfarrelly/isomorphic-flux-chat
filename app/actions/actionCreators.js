var AppDispatcher = require('../dispatchers/appDispatcher.js');
var ActionTypes = require('./actionTypes.js');
var socket = require('../interfaces/socket.js');

module.exports = {

  receiveMessage: function(message) {
    AppDispatcher.handleServerAction({
      actionType: ActionTypes.RECEIVE_MESSAGE,
      value: message
    });
  },

  sendMessage: function(text) {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.SEND_MESSAGE,
      value: text
    });
    socket.emit('sendMessage', text);
  },

  loginUser: function(username) {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.LOGIN,
      value: username
    });
    socket.emit('loginUser', username);
  }

};