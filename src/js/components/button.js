var React = require('react');

var Button = React.createClass({
    render: function() {
        return (
            <button className={"button " + this.props.color} type={this.props.type || "button"} disabled={ this.props.disabled }>{ this.props.children }</button>
        );
    }
});

module.exports = Button;
