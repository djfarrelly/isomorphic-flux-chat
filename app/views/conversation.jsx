var React = require('react');

module.exports = React.createClass({
  renderConversation: function() {
    return this.props.conversation.map(function(message, i) {
      return (
        <p className="message"
           key={i}
           title={message.timestamp}>
          <strong>{message.username}</strong> - {message.text}
        </p>
      );
    });
  },
  render: function() {
    return (
      <div className="conversation">
        {
          this.props.conversation ?
            this.renderConversation() :
            <p className="message"><em>Start the conversation!</em></p>
        }
      </div>
    );
  }
});