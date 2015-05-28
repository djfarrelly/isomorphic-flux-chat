var AppDispatcher = require('../dispatchers/appDispatcher.js');
var ActionTypes = require('../actions/actionTypes.js');


var AppStore = module.exports = function(data) {
  this._data = data || {};
  if (!this._data.conversation)
    this._data.conversation = [];
  this.registerEvents();
};

AppStore.prototype = {

  _data: {},
  _callbacks: [],

  getData: function() {
    return this._data;
  },

  onChange: function(callback) {
    this._callbacks.push(callback);
  },

  triggerChange: function() {
    this._callbacks.forEach(function(callback){
      callback();
    });
  },

  registerEvents: function() {
    this._dispatchToken = AppDispatcher.register(function(payload) {

      // Do not handle actions meant for the server
      if (payload.source === 'CLIENT') return;

      var actionType = payload.action.actionType;
      var value = payload.action.value;
      var change = false;

      switch (actionType) {
        case ActionTypes.LOGIN:
          this.loginUser(value);
          change = true;
          break;
        case ActionTypes.RECEIVE_MESSAGE:
          this.saveMessage(value);
          change = true;
          break;
      }

      if (change) this.triggerChange();

    }.bind(this));
  },

  getDispatchToken: function() {
    return this._dispatchToken;
  },


  // Action methods
  loginUser: function(username) {
    this._data.username = username;
  },

  sendMessage: function(text) {
    var message = {
      username: this._data.username,
      text: text,
      timestamp: (new Date()).valueOf()
    };
  },

  saveMessage: function(message) {
    this._data.conversation.push(message);
  },


};