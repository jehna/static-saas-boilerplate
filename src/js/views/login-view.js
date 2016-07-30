var React = require('react');
var LoggedOutFormView = require('./logged-out-form-view.js');
var FormEmailInput = require('../components/form-email-input.js');
var FormPasswordInput = require('../components/form-password-input.js');

const LoginView = props => (
    <LoggedOutFormView
        title="Log in"
        submitButtonTitle="Log in!"
        onSubmit={ props.onSubmit }
        error={ props.error }
        links={[
            <a href="#/forgot-password/">Forgot password?</a>,
            <a href="#/create-account/">Create an account</a>]}
        >
        
        <FormEmailInput
            onChange={ props.onEmailChange }
            />
        
        <FormPasswordInput
            onChange={ props.onPasswordChange }
            />
            
    </LoggedOutFormView>
);

module.exports = LoginView;
