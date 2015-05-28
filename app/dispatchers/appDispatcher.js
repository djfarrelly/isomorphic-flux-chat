var Dispatcher = require('flux').Dispatcher;

var AppDispatcher = new Dispatcher();
module.exports = AppDispatcher;

// Actions created in the views, handled by stores
AppDispatcher.handleViewAction = function(action) {
  this.dispatch({
    source: 'VIEW',
    action: action
  });
};

// Actions created on the server, handled by stores
AppDispatcher.handleServerAction = function(action) {
  this.dispatch({
    source: 'SERVER',
    action: action
  });
};

// Actions created on the client, handled by requesters 
AppDispatcher.handleClientAction = function(action) {
  this.dispatch({
    source: 'CLIENT',
    action: action
  });
};
