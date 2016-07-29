var React = require('react');
var Button = require('../components/button.js');
var Rx = require('rx');
var firebaseAuth = require('firebase/auth');
var firebaseApp = require('../firebase-app.js');
var URL = require('url-parse');

module.exports = React.createClass({
    getInitialState: function() {
        var url = new URL(window.location.hash.substr(1), true);
        return {
            oobCode: url.query.oobCode,
            password: '',
            retypePassword: '',
            isSending: false,
            showError: false
        };
    },
    handlePasswordChange: function(e) {
        this.setState({ password: e.target.value });
    },
    handleRetypePasswordChange: function(e) {
        this.setState({ retypePassword: e.target.value });
    },
    handleSubmit: function(e) {
        e.preventDefault();
        this.setState({ showError: false });
        
        var password = this.state.password;
        var retypePassword = this.state.retypePassword;
        var oobCode = this.state.oobCode;
        if (password !== retypePassword) {
            this.setState({ showError: `Passwords don't match` });
            return;
        }
        
        Rx.Observable.just('Try reset the password')
            .tapOnNext(() => {
                this.setState({ isSending: true, showError: false });
            })
            .flatMap(() => {
                return Rx.Observable.fromPromise(
                    firebaseAuth().confirmPasswordReset(oobCode, password)
                );
            })
            .subscribe(
                (x) => {
                    this.setState({ isSending: false, showSuccess: true });
                },
                (err) => {
                    this.setState({ isSending: false, showError: err.message });
                }
            );
        
        
    },
    render: function() {
        
        if (!this.state.oobCode) {
            document.location.hash = '#/';
        }
        
        return (
            <form onSubmit={ this.handleSubmit }>
                <h2>Password reset</h2>
                <p>
                    <label htmlFor="password">New password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={ this.state.password }
                        onChange={ this.handlePasswordChange }
                    />
                </p>
                <p>
                    <label htmlFor="retype_password">Retype password</label>
                    <input
                        type="password"
                        name="retype_password"
                        id="retype_password"
                        value={ this.state.retypePassword }
                        onChange={ this.handleRetypePasswordChange }
                    />
                </p>
                { this.state.showError &&
                    <p className="error">{ this.state.showError }</p>
                }
                { this.state.showSuccess &&
                    <p className="success">
                        Password changed succesfully!<br />
                        <a href='#/'>Log in with the new password</a>
                    </p>
                }
                <p>
                    <Button color="yellow" type="submit" disabled={ this.state.isSending }>Reset password</Button>
                </p>
            </form>
        )
    }
});
