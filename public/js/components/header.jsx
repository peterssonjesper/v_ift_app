/** @jsx React.DOM */

var React = require('react');

module.exports = React.createClass({

  render: function () {
    return (
      <header className="main-nav">
        <h1 className="main-nav__title">{this.props.title}</h1>
      </header>
    );
  },
  
  getDefaultProps: function() {
    return {
      title: ''
    };
  }

});
