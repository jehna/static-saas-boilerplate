var React = require('react');
var LoggedOutFormView = require('./logged-out-form-view.js');
var FormEmailInput = require('../components/form-email-input.js');
var FormPasswordInput = require('../components/form-password-input.js');

const CreateAccountView = props => (
    <LoggedOutFormView
        title="Create an account"
        submitButtonTitle="Sign up for Free!"
        buttonColor="green"
        onSubmit={ props.onSubmit }
        error={ props.error }
        >
        
        <FormEmailInput
            onChange={ props.onEmailChange }
            />
        
        <FormPasswordInput
            onChange={ props.onPasswordChange }
            />
        
        <FormPasswordInput
            label="Retype password"
            id="retype_password"
            onChange={ props.onRetypePasswordChange }
            />
            
    </LoggedOutFormView>
);

module.exports = CreateAccountView;
