/* globals io */

// Not to be used on the server
if (typeof io === 'function') {
  
  module.exports = io();

} else {
  module.exports = {};
}
