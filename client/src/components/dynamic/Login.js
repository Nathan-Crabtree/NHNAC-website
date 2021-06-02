import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Login extends Component {

    componentDidMount() {
        // When component is rendered, bring user to top of page
        window.scrollTo(0, 0);
    }

    render() { 
        return ( 
            <div className="login_display">
                <h1>Welcome to N.H.N.A.C. University</h1>
                <form className="login_form">
                    <fieldset>
                        <div className="form_fields">
                            <label htmlFor="email">Email:</label><br />
                            <input className="login_input" type="text" id="email" name="email" /><br />
                            <label htmlFor="password">Password:</label><br />
                            <input className="login_input" type="password" id="password" name="password" /><br />
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