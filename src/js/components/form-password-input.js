var React = require('react');
var FormInput = require('./form-input.js');

const FormPasswordInput = props => (
    <FormInput
        label={ props.label || "Password" }
        id={ props.id || "password" }
        type="password"
        onChange={ props.onChange }
        />
);

module.exports = FormPasswordInput;
