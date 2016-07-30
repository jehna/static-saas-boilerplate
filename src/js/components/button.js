const React = require('react');

const Button = props => (
    <button
        className={ "button " + props.color }
        type={ props.type || "button" }
        disabled={ props.disabled }>
            { props.children }
    </button>
);

module.exports = Button;
