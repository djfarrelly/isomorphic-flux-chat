var React = require('react');
var Conversation = require('./conversation.jsx');
var Composer = require('./composer.jsx');
var Login = require('./login.jsx');

module.exports = React.createClass({
  render: function() {
    return (
      <div className="container">
        <Conversation {...this.props} />
        {
          this.props.username ?
            <Composer username={this.props.username} /> :
            <Login />
        }
      </div>
    );
  }
});