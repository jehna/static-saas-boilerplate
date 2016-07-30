var React = require('react');
var Rx = require('rx');

const FormInput = props => (
    <p>
        <label htmlFor={ props.id }>{ props.label }</label>
        <input
            type={ props.type }
            name={ props.id }
            id={ props.id }
            placeholder={ props.placeholder }
            onChange={ props.onChange }
        />
    </p>
);

module.exports = FormInput;
