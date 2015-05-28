var React = require('react');
var actionCreators = require('../actions/actionCreators.js');

module.exports = React.createClass({
  onKeyUp: function(e) {
    var value = e.target.value.trim();
    if (e.keyCode === 13 && value.length) {
      actionCreators.loginUser(value);
    }
  },
  render: function() {
    return (
      <div className="login">
        <input type="text"
               name="username"
               placeholder="Enter your handle"
               onKeyUp={this.onKeyUp} />
      </div>
    );
  }
});