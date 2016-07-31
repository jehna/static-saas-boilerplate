var React = require('react');
var ReactDOM = require('react-dom');
var Rx = require('rx');
var LoginView = require('../views/login-view.js');
var firebaseAuth = require('firebase/auth');

module.exports = ($container) => {
    
    let props = {
        errorMessage: '',
        email: '',
        password: ''
    };
    
    let onSubmitSubject = new Rx.Subject();
    let onEmailChangeSubject = new Rx.Subject();
    let onPasswordChangeSubject = new Rx.Subject();
    let onRenderSubject = new Rx.Subject();

    const ForgotPasswordViewController = () => (
        <LoginView
            onSubmit={ (e) => onSubmitSubject.onNext(e) }
            error={ props.errorMessage }
            onEmailChange={ (e) => onEmailChangeSubject.onNext(e) }
            onPasswordChange={ (e) => onPasswordChangeSubject.onNext(e) }
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
                .tapOnNext(() => {
                    props.errorMessage = '';
                    onRenderSubject.onNext();
                })
                .flatMap(() => {
                    return Rx.Observable.fromPromise(
                        firebaseAuth().signInWithEmailAndPassword(props.email, props.password)
                    );
                })
                .subscribe(
                    () => {
                        document.location.hash = '#/login/';
                    },
                    (error) => {
                        props.errorMessage = error.message;
                        onRenderSubject.onNext();
                    }
                );
        });
};
