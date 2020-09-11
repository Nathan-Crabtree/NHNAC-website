import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class Footer extends Component {

    render() {
        return(        
            <footer>
                <div className="footer-links"> 
                    <ul className="footer-section">
                        <li><h4><u>Legal</u></h4></li>
                        <li><Link className="nav-footer-link" to="/privacy-policy">Privacy Policy</Link></li>
                        <li><Link className="nav-footer-link" to="#">Terms Of Service</Link></li>
                    </ul>
                    <ul className="footer-section">
                        <li><h4><u>Connect</u></h4></li>
                        <li><Link className="nav-footer-link" to="#">Contact</Link></li>
                        <li><Link className="nav-footer-link" to="#">Donate</Link></li>
                        <li><Link className="nav-footer-link" to="#">Feedback</Link></li>
                    </ul>
                    <ul className="footer-section">
                        <li><h4><u>Information</u></h4></li>
                        <li><Link className="nav-footer-link" to="#">About</Link></li>
                        <li><Link className="nav-footer-link" to="#">FAQ</Link></li>
                        <li><Link className="nav-footer-link" to="#">Newsletter</Link></li>
                    </ul>
                </div>
                <div className="social-links">
                    <ul>
                        <li><a href="https://www.facebook.com/groups/NewHavenNativeAmericanChurch/" target="_blank" rel="noopener noreferrer" className="nav-footer-link" onClick={this.resetToggleDisplay}><img srcSet={this.props.fbLogo} alt="Facebook" width="16px" height="16px" /></a></li>
                        <li className="nav-footer-link">©2020 All rights reserved.</li>
                    </ul>
                </div>
            </footer>
        );
    }
}

// PropTypes for jest testing in App.test.js
Footer.propTypes = {
    fbLogo: PropTypes.string.isRequired
}