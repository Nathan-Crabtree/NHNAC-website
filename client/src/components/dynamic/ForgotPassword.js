import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class ForgotPassword extends Component {

    constructor() {
        super();
        this.state = {
            securityQuestion: "What is your favorite hobby?",
            correctAnswer: "",
            errorExists: false
        }
        this.onSubmit = this.onSubmit.bind(this);
    }

    /**
     * Takes content submitted from user and gets checked with user's security answer on
     * database and then checks if answers match. If successful, user will be sent an email address containing their
     * password be notified.
     *
     * @param {object} e
     * @returns {boolean} false
     */
    onSubmit = (e) => {
        const target = e.target || e.srcElement;

        // Use IE5-8 fallback if event object isn't present
        if (!e) {
            e = window.event;
        }

        e.preventDefault();

        let securityAnswer = target[1].value;
        securityAnswer = this.props.sanitizeInput(securityAnswer);
        let error = document.createElement("p");

        // Check if security answer input is less than 150 characters and greater than 0 
        if (securityAnswer.length > 0 && securityAnswer.length < 150 && securityAnswer.length !== 0) {
            if (securityAnswer !== this.state.correctAnswer) {
                if (!this.state.errorExists) {
                    // Render error text and change boolean
                    const formField = target.firstChild.firstChild;
                    const input = target[1];
                    error.innerText = '*Your security answer is incorrect.';
                    error.className = "error";
                    error.style.fontSize = '.9rem';
                    error.style.color = '#C31F01';
                    formField.appendChild(error);
                    input.style.borderColor = '#C31F01';
                    this.setState({ errorExists: true });
                }
                return false;
            } 
        } else {
            // Do code here 
            // Disable submit button
            submit.disabled = true;
            submit.setAttribute("class", "disabled_btn");  
        }
    }

    componentDidMount() {
        // Pull security question and answer from database

        // When component is rendered, bring user to top of page
        window.scrollTo(0, 0);
    }

    render() {
        const { securityQuestion } = this.state;

        return (
            <React.Fragment>
                <div className="MsoNormal"><strong><span>Password Recovery</span></strong></div><br />
                <p>Please answer your security question below.</p><br />
                <form onSubmit={this.onSubmit}>
                    <fieldset>
                        <div>
                            <label htmlFor="securityQuestion">{securityQuestion}</label><br />
                            <input type="text" className="security_question" id="securityOuestion" maxLength="150" name="security_answer" placeholder=" Type your security answer here" /><br />
                        </div>
                        <button id="submit" className="security_submit" type="submit">Submit</button><br />
                    </fieldset>
                    <span className="resend_email_span">Need assistance? <Link to="/about#contact">Click here to contact us.</Link></span>
                </form>
            </React.Fragment>
         );
    }
}

// PropTypes for jest testing in App.test.js
ForgotPassword.propTypes = {
    sanitizeInput: PropTypes.func.isRequired
}
