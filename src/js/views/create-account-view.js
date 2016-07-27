var React = require('react');
var Button = require('../components/button.js');
var Rx = require('rx');
var firebaseAuth = require('firebase/auth');
var firebaseApp = require('../firebase-app.js');

var CreateAccountView = React.createClass({
    getInitialState: function() {
        return {
            email: '',
            password: '',
            retypePassword: '',
            isSending: false,
            showError: false
        };
    },
    handleEmailChange: function(e) {
        this.setState({ email: e.target.value });
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
        
        var email = this.state.email.trim();
        var password = this.state.password;
        var retypePassword = this.state.retypePassword;
        if (!email || !password) {
            return;
        }
        
        if (password !== retypePassword) {
            this.setState({ showError: `Passwords don't match` });
            return;
        }
        
        Rx.Observable.just('Create an account')
            .tapOnNext(() => {
                this.setState({ isSending: true, showError: false });
            })
            .flatMap(() => {
                return Rx.Observable.fromPromise(
                    firebaseAuth().createUserWithEmailAndPassword(email, password)
                );
            })
            .subscribe(
                (x) => {
                    document.location = '#/';
                },
                (err) => {
                    this.setState({ isSending: false, showError: err.message });
                }
            );
        
        
    },
    render: function() {
        return (
            <form onSubmit={ this.handleSubmit }>
                <h2>Create an account</h2>
                <p>
                    <label htmlFor="email">Email address</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="john.doe@mailinator.com"
                        value={ this.state.email }
                        onChange={ this.handleEmailChange }
                    />
                </p>
                <p>
                    <label htmlFor="password">Password</label>
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
                <p>
                    <Button color="yellow" type="submit" disabled={ this.state.isSending }>Create account</Button>
                </p>
            </form>
        );
    }
});

module.exports = CreateAccountView;
