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
                <p>Please answer your security question below.</p><br />
                <label htmlFor="securityQuestion">{this.state.securityQuestion}</label><br />
                <input type="text" className="security_question" id="securityOuestion" name="security_answer" placeholder=" Type your security answer here" /><br />
                <button className="security_submit" type="submit">Submit</button><br />
                <p className="resend_email_span">Need assistance? <Link to="#">Click here to contact us.</Link></p>
                {/*<span className="resend_email_span">Didn't get an email? <Link to="#">Click here to have it resent.</Link></span>*/}
            </React.Fragment>
         );
    }
}