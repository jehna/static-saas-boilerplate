var React = require('react');
var FormInput = require('./form-input.js');

const FormEmailInput = props => (
    <FormInput
        label={ props.label || "Email address" }
        id={ props.id || "email" }
        type="email"
        placeholder={ props.placeholder || "john.doe@mailinator.com" }
        onChange={ props.onChange }
        />
);

module.exports = FormEmailInput;
