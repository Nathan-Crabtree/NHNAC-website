import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Login extends Component {

    constructor() {
        super();
        this.state = {
            errorExists: false
        }
        this.onSubmit = this.onSubmit.bind(this);
    }

    /**
     * onSubmit() function - Checks login credentials before submitting and authenticating user.
     * Renders error stating incorrect email or password else if credentials don't match those on database.
     *
     * @param {object} e
     */
    onSubmit = (e) => {
        // Use IE5-8 fallback if event object isn't present
        if (!e) {
            e = window.event;
        }

        e.preventDefault(e);

        let email = e.target.email.value;
        let password = e.target.password.value;

        // NOTE: Password isn't being sanitized because it's being checked against hashed/encoded data. - Zane

        // Do a query search in database to check if email entered in is unique. If it isn't, change value of boolean
        let emailAlreadyExists = false;

        // Do query search here

        if (emailAlreadyExists) {
            // Check if password matches that what already exists on database for user
        } else {
            if (!this.state.errorExists) {
                // Render error text and change boolean
                const formField = document.getElementsByClassName("form_fields")[0];
                console.log(formField);
                const email = document.getElementById("email");
                const password = document.getElementById("password");
                console.log(email);
                console.log(password);
                let error = document.createElement("p");
                error.innerText = '*Incorrect email or password.';
                error.style.fontSize = '.9rem';
                error.style.color = '#C31F01';
                formField.appendChild(error);
                email.style.borderColor = '#C31F01';
                password.style.borderColor = '#C31F01';
                this.setState({ errorExists: true });
            }
        }
    }

    componentDidMount() {
        // When component is rendered, bring user to top of page
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <div className="login_display">
                <h1>Welcome to N.H.N.A.C. University</h1>
                <form className="login_form" onSubmit={this.onSubmit}>
                    <fieldset>
                        <div className="form_fields">
                            <label htmlFor="email">Email:</label><br />
                            <input className="login_input" type="text" id="email" name="email" maxLength="320" /><br />
                            <label htmlFor="password">Password:</label><br />
                            <input className="login_input" type="password" id="password" name="password" minLength="3" maxLength="30" /><br />
                            <input type="checkbox" id="rememberMe" name="remember_me" />
                            <label htmlFor="rememberMe">Remember me</label><br />
                        </div>
                        <div className="form_links center_text">
                            <span><Link to="/forgot_password">Click here if you forgot your password.</Link></span>
                        </div>
                        <button className="login_submit" type="submit">Sign In</button>
                    </fieldset>
                    <div className="form_links center_text">
                        <span>New member? <Link to="/signup">Click here to become adopted.</Link></span>
                    </div>
                </form>
            </div>
         );
    }
}
