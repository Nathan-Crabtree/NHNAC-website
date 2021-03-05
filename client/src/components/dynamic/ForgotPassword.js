import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ForgotPassword extends Component {
    
    constructor() {
        super();
        this.state = {
            securityQuestion: "What is your favorite hobby?"
        }
    }

    componentDidMount() {
        // When component is rendered, bring user to top of page.
        window.scrollTo(0, 0);
    }

    render() { 
        return ( 
            <React.Fragment>
                <div className="MsoNormal"><strong><span>Password Recovery</span></strong></div><br />
                <p>Please answer your security question below.</p><br />
                <label htmlFor="securityQuestion">{this.state.securityQuestion}</label><br />
                <input type="text" className="security_question" id="securityOuestion" name="security_answer" placeholder=" Type your security answer here" /><br />
                <button className="security_submit" type="submit">Submit</button><br />
                <span className="resend_email_span">Need assistance? <Link to="/about#contact">Click here to contact us.</Link></span>
            </React.Fragment>
         );
    }
}