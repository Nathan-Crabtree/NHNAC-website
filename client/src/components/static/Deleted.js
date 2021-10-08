import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Deleted extends Component {

    constructor() {
        super();
        this.state = {
            errorExists: false,
            formActive: false
        }
        this.onSubmit = this.onSubmit.bind(this);
    }

    /**
    * An event handler that prevents default action (page refresh), checks to see if message
    * content is > 3 and < 500 characters, submits and renders HTML according to condition.
    *
    * @param {object} event
    */
    onSubmit(event) {
        const target = event.target || event.srcElement;
        let submit = document.querySelector(".feedback_form #submit");

        // Use IE5-8 fallback if event object not present
        if (!event) {
            event = window.event;
        }

        event.preventDefault();

        let messageContent = target.message.value;
        messageContent = this.props.sanitizeInput(messageContent);

        if (messageContent.length > 3 && messageContent.length <= 500) {
            // Disable submit button
            submit.disabled = true;
            submit.setAttribute("class", "disabled_btn");

            if (window.removeEventListener) { // If event listener supported
                // Remove pop-up warning of unsaved data if user attempts to leave page
                window.removeEventListener("beforeunload", this.props.displayUnloadMessage, false);
            } else {
                window.detachEvent("beforeunload", this.props.displayUnloadMessage);
            }

            this.setState({ formActive: false });

            // Take the data and send it to API
            console.log(messageContent);

            // Render on the modal thank you text
            const modalForm = document.getElementsByClassName("modal_form")[0];
            const thankYouBlock = document.createElement("h3");
            thankYouBlock.innerText = "Thank you for your feedback!";
            thankYouBlock.style.textAlign = "center";
            modalForm.parentElement.replaceChild(thankYouBlock, modalForm);
        } else {
            // Render error text and colors
            if (!this.state.errorExists) {
                const formField = target.children[1].firstChild;
                const input = target.children[1].firstChild.children[6];
                const error = document.createElement('p');
                error.innerText = '*Please type in more than 3 characters.';
                error.style.fontSize = '.9rem';
                error.style.color = '#C31F01';
                formField.appendChild(error);
                input.style.borderColor = '#C31F01';
                this.setState({ errorExists: true });
            }
        }
    }

    componentDidMount() {
        // When component is rendered, bring user to top of page
        window.scrollTo(0, 0);

        if (!this.state.formActive) {
            if (window.addEventListener) { // If event listener supported
                // Add pop-up warning of unsaved data if user attempts to leave page
                window.addEventListener("beforeunload", this.props.displayUnloadMessage, false);
            } else {
                window.attachEvent("beforeunload", this.props.displayUnloadMessage);
            }

            this.setState({ formActive: true });
        }
    }

    componentWillUnmount() {
        if (this.state.formActive) {
            if (window.removeEventListener) { // If event listener supported
                // Remove pop-up warning of unsaved data if user attempts to leave page
                window.removeEventListener("beforeunload", this.props.displayUnloadMessage, false);
            } else {
                window.detachEvent("beforeunload", this.props.displayUnloadMessage);
            }
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="MsoNormal"><strong><span>Your account has been deleted.</span></strong></div><br />
                <p>We’re sorry to see you go. Please take a few moments to complete our feedback form to let us know how we can improve!</p><br />
                <form className="feedback_form" onSubmit={this.onSubmit}>
                    <h2 className="newsletter_h2">Feedback</h2>
                    <fieldset>
                        <div className="feedback_form_fields">
                            <label htmlFor="type">Choose your feedback type</label><br />
                            <select id="type" name="type">
                                <option value="compliment">Compliment</option>
                                <option value="complaint">Complaint</option>
                                <option value="suggestion">Suggestion</option>
                            </select><br />
                            <label htmlFor="message">Comment</label><br />
                            <textarea className="login_input" type="text" id="message" name="message" maxLength="500" /><br />
                        </div>
                        <button id="submit" className="submit_btn submit_padding" type="submit">Submit</button>
                    </fieldset>
                </form>
            </React.Fragment>
        );
    }
}

// PropTypes for jest testing
Deleted.propTypes = {
    sanitizeInput: PropTypes.func.isRequired,
    displayUnloadMessage: PropTypes.func.isRequired
}
