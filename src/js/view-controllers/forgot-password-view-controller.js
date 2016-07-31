var React = require('react');
var ReactDOM = require('react-dom');
var Rx = require('rx');
var ForgotPasswordView = require('../views/forgot-password-view.js');
var firebaseAuth = require('firebase/auth');

module.exports = ($container) => {
    
    let props = {
        errorMessage: '',
        showSuccessMessage: false,
        email: ''
    };
    
    let onSubmitSubject = new Rx.Subject();
    let onEmailChangeSubject = new Rx.Subject();
    let onRenderSubject = new Rx.Subject();

    const ForgotPasswordViewController = () => (
        <ForgotPasswordView
            onSubmit={ (e) => onSubmitSubject.onNext(e) }
            error={ props.errorMessage }
            success={ props.showSuccessMessage }
            onEmailChange={ (e) => onEmailChangeSubject.onNext(e) }
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
            props.email = e.target.value;
        })
        .subscribe();
    
    Rx.Observable.just('Forgot Password form send')
        .flatMap(() => onSubmitSubject)
        .tapOnNext((event) => {
            event.preventDefault();
            props.showSuccessMessage = false;
        })
        .subscribe((values) => {
            Rx.Observable.just('Validate form and send email')
                .flatMap(function() {
                    return props.email ?
                            Rx.Observable.just('Valid email') :
                            Rx.Observable.throw(new Error('No email'));
                })
                .tapOnNext(() => {
                    props.errorMessage = '';
                    onRenderSubject.onNext();
                })
                .flatMap(() => {
                    return Rx.Observable.fromPromise(
                        firebaseAuth().sendPasswordResetEmail(props.email)
                    );
                })
                .subscribe(
                    () => {
                        props.showSuccessMessage = true;
                        onRenderSubject.onNext();
                    },
                    (e) => {
                        props.errorMessage = "There is no user with this email";
                        onRenderSubject.onNext();
                    }
                );
        });
};
