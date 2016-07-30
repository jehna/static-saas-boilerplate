var React = require('react');
var ReactDOM = require('react-dom');
var Rx = require('rx');
var URL = require('url-parse')
var ResetPasswordView = require('../views/reset-password-view.js');
var firebaseAuth = require('firebase/auth');

module.exports = ($container) => {
    
    var url = new URL(window.location.hash.substr(1), true);
    
    let props = {
        oobCode: url.query.oobCode,
        errorMessage: '',
        showSuccessMessage: false,
        password: '',
        retypePassword: '',
    }
    
    let onSubmitSubject = new Rx.Subject();
    let onPasswordChangeSubject = new Rx.Subject();
    let onRetypePasswordChangeSubject = new Rx.Subject();
    let onRenderSubject = new Rx.Subject();

    const ResetPasswordViewController = () => (
        <ResetPasswordView
            onSubmit={ (e) => onSubmitSubject.onNext(e) }
            error={ props.errorMessage }
            success={ props.showSuccessMessage }
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
                (<ResetPasswordViewController {...props} />),
                $container
            );
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
            Rx.Observable.just('Validate form and reset')
                .flatMap(function() {
                    return props.password === props.retypePassword ?
                            Rx.Observable.just('Passwords match') :
                            Rx.Observable.throw(new Error('Passwords do not match'));
                })
                .tapOnNext(() => {
                    props.errorMessage = '';
                    onRenderSubject.onNext();
                })
                .flatMap(() => {
                    return Rx.Observable.fromPromise(
                        firebaseAuth().confirmPasswordReset(props.oobCode, props.password)
                    );
                })
                .subscribe(
                    () => {
                        props.showSuccessMessage = true;
                        onRenderSubject.onNext();
                    },
                    (error) => {
                        props.errorMessage = error.message;
                        onRenderSubject.onNext();
                    }
                );
        });
}
