var React = require('react');
var ReactDOM = require('react-dom');
var Rx = require('rx');
var CreateAccountView = require('../views/create-account-view.js');
var firebaseAuth = require('firebase/auth');

module.exports = ($container) => {
    
    let props = {
        errorMessage: '',
        email: '',
        password: '',
        retypePassword: ''
    }
    
    let onSubmitSubject = new Rx.Subject();
    let onEmailChangeSubject = new Rx.Subject();
    let onPasswordChangeSubject = new Rx.Subject();
    let onRetypePasswordChangeSubject = new Rx.Subject();
    let onRenderSubject = new Rx.Subject();

    const ForgotPasswordViewController = () => (
        <CreateAccountView
            onSubmit={ (e) => onSubmitSubject.onNext(e) }
            error={ props.errorMessage }
            onEmailChange={ (e) => onEmailChangeSubject.onNext(e) }
            onPasswordChange={ (e) => onPasswordChangeSubject.onNext(e) }
            onRetypePasswordChange={ (e) => onRetypePasswordChangeSubject.onNext(e) }
            />
    );
    
    Rx.Observable.just('Render')
        .flatMap(() => 
            Rx.Observable.merge([
                Rx.Observable.just('Initial load'),
                onRenderSubject
            ])
        )
        .tapOnNext(() => {
            ReactDOM.render(
                (<ForgotPasswordViewController {...props} />),
                $container
            );
        })
        .subscribe();
    
    Rx.Observable.just('Email changed')
        .flatMap(() => onEmailChangeSubject)
        .tapOnNext((e) => {
            props.email = e.target.value.trim();
        })
        .subscribe();
    
    Rx.Observable.just('Password changed')
        .flatMap(() => onPasswordChangeSubject)
        .tapOnNext((e) => {
            props.password = e.target.value;
        })
        .subscribe();
    
    Rx.Observable.just('Retype password changed')
        .flatMap(() => onRetypePasswordChangeSubject)
        .tapOnNext((e) => {
            props.retypePassword = e.target.value;
        })
        .subscribe();
    
    Rx.Observable.just('Login form send')
        .flatMap(() => onSubmitSubject)
        .tapOnNext((event) => {
            event.preventDefault();
        })
        .subscribe((values) => {
            Rx.Observable.just('Validate form and login')
                .flatMap(function() {
                    return props.email && props.password ?
                            Rx.Observable.just('Valid email and password') :
                            Rx.Observable.throw(new Error('Email or password missing'));
                })
                .flatMap(function() {
                    return props.password === props.retypePassword ?
                            Rx.Observable.just('Passwords do match') :
                            Rx.Observable.throw(new Error('Passwords do not match'));
                })
                .tapOnNext(() => {
                    props.errorMessage = '';
                    onRenderSubject.onNext();
                })
                .flatMap(() => {
                    return Rx.Observable.fromPromise(
                        firebaseAuth().createUserWithEmailAndPassword(props.email, props.password)
                    );
                })
                .subscribe(
                    () => {
                        document.location.hash = '#/';
                    },
                    (error) => {
                        props.errorMessage = error.message;
                        onRenderSubject.onNext();
                    }
                );
        });
}
