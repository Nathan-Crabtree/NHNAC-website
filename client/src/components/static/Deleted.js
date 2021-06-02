import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Deleted extends Component {

    componentDidMount() {
        // When component is rendered, bring user to top of page
        window.scrollTo(0, 0);
    }

    render() {
        return(
            <React.Fragment>
                <div className="MsoNormal"><strong><span>Your account has been deleted.</span></strong></div><br />
                <p>We’re sorry to see you go. Please take a few moments to complete our feedback form to let us know how we can improve!</p><br />
                <form onSubmit={this.props.onSubmit}>
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
                            <textarea className="login_input" type="text" id="message" name="message" /><br />
                        </div>
                        <button className="submit_btn submit_padding" type="submit">Submit</button>
                    </fieldset>
                </form>                
            </React.Fragment>
        );
    }
}

// PropTypes for jest testing in App.test.js
Deleted.propTypes = {
    onSubmit: PropTypes.func.isRequired
}