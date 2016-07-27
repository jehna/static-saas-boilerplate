var React = require('react');
var Button = require('../components/button.js');
var Rx = require('rx');
var firebaseAuth = require('firebase/auth');
var firebaseApp = require('../firebase-app.js');

module.exports = React.createClass({
    getInitialState: function() {
        return { email: '', password: '', isSending: false, showError: false };
    },
    handleEmailChange: function(e) {
        this.setState({ email: e.target.value });
    },
    handlePasswordChange: function(e) {
        this.setState({ password: e.target.value });
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var email = this.state.email.trim();
        var password = this.state.password;
        if (!email || !password) {
            // TODO: Error handling?
            return;
        }
        
        Rx.Observable.just('Try signing in')
            .tapOnNext(() => {
                this.setState({ isSending: true, showError: false });
            })
            .flatMap(() => {
                return Rx.Observable.fromPromise(
                    firebaseAuth().signInWithEmailAndPassword(email, password)
                );
            })
            .subscribe(
                (x) => {
                    document.location.hash = '#/login/';
                },
                (err) => {
                    this.setState({ isSending: false, showError: true });
                }
            );
        
        
    },
    render: function() {
        return (
            <form onSubmit={ this.handleSubmit }>
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
                { this.state.showError &&
                    <p className="error">{ `Email and password didn't match` }</p>
                }
                <p>
                    <Button color="yellow" type="submit" disabled={ this.state.isSending }>Log in!</Button>
                </p>
                <a href="/app/#/create-account/">Create an account</a>
            </form>
        )
    }
});
