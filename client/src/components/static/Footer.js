import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Container from '../Container';

export default class Footer extends Component {

    render() {
        return (
            <footer>
                <div>
                    <ul>
                        <li><h4><u>Legal</u></h4></li>
                        <li><Link to="/privacy_policy">Privacy Policy</Link></li>
                        <li><Link to="/terms_of_service">Terms Of Service</Link></li>
                    </ul>
                    <ul>
                        <li><h4><u>Connect</u></h4></li>
                        <li><Link to="/about#contactDiv">Contact</Link></li>
                        <li><Link to="/donate">Donate</Link></li>
                        <li><Container sanitizeInput={this.props.sanitizeInput} displayUnloadMessage={this.props.displayUnloadMessage} triggerText="Feedback" /></li>
                    </ul>
                    <ul>
                        <li><h4><u>Information</u></h4></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/FAQ">F.A.Q.</Link></li>
                        {/* <li><Container emailIsValid={this.props.emailIsValid} setNewsletterEmailAddress={this.props.setNewsletterEmailAddress} triggerText="Newsletter" /></li> */}
                    </ul>
                </div>
                <div className="social_links">
                    <ul>
                        <li><a href="https://www.facebook.com/groups/NewHavenNativeAmericanChurch/" target="_blank" rel="noopener noreferrer" className="nav-footer-link" onClick={this.resetToggleDisplay}><img srcSet={this.props.fbLogo} alt="Facebook" width="16px" height="16px" /></a></li>
                        <li className="vertical_bar">|</li>
                        <li>©2020 All rights reserved.</li>
                    </ul>
                </div>
            </footer>
        );
    }
}

// PropTypes for jest testing
Footer.propTypes = {
    fbLogo: PropTypes.string.isRequired,
    emailIsValid: PropTypes.func.isRequired,
    setNewsletterEmailAddress: PropTypes.func.isRequired,
    sanitizeInput: PropTypes.func.isRequired,
    displayUnloadMessage: PropTypes.func.isRequired
}