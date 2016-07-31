var React = require('react');
var LoggedOutFormView = require('./logged-out-form-view.js');
var FormPasswordInput = require('../components/form-password-input.js');

const ResetPasswordView = props => (
    <LoggedOutFormView
        submitButtonTitle="Reset password"
        title="Password reset"
        onSubmit={ props.onSubmit }
        error={ props.error }
        success={ props.success &&
            <span>
                Password changed succesfully!<br />
                <a href='#/'>Log in with the new password</a>
            </span> }
        >
        <FormPasswordInput
            label="New password"
            onChange={ props.onPasswordChange }
            />
        <FormPasswordInput
            label="Retype password"
            id="retype_password"
            onChange={ props.onRetypePasswordChange }
            />
    </LoggedOutFormView>
);

module.exports = ResetPasswordView;
