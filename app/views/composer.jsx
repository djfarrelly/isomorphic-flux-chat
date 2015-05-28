var React = require('react');
var actionCreators = require('../actions/actionCreators.js');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      message: ''
    };
  },
  onChange: function(value) {
    this.setState({ message: value });
  },
  onKeyUp: function(e) {
    if (e.keyCode === 13) {
      actionCreators.sendMessage(e.target.value);
      this.setState({ message: '' });
    }
  },
  componentDidMount: function() {
    this.getDOMNode().querySelector('input[name="message"]').focus();
  },
  render: function() {
    
    var valueLink = {
      value: this.state.message,
      requestChange: this.onChange
    };

    return (
      <div className="composer">
        <div className="composer-username">
          {this.props.username}:
        </div>
        <input type="text"
               name="message"
               valueLink={valueLink}
               placeholder="Send your message"
               onKeyUp={this.onKeyUp} />
      </div>
    );
  }
});