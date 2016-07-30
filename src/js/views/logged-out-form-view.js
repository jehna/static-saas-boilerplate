const React = require('react');
var Button = require('../components/button.js');

const LoggedOutFormView = props => (
    <form onSubmit={ props.onSubmit }>
        { props.title &&
            <h2>{ props.title }</h2> }
        { props.children }
        { props.error &&
            <p className="error">{ props.error }</p>
        }
        { props.success &&
            <p className="success">{ props.success }</p>
        }
        <p>
            <Button color={ props.buttonColor || 'yellow' } type="submit">
                { props.submitButtonTitle }
            </Button>
        </p>
    </form>
);

module.exports = LoggedOutFormView;
