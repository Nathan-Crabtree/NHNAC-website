import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class Footer extends Component {

    render() {
        return(        
            <footer>
                <div className="footer_links"> 
                    <ul className="footer_ul">
                        <li><h4><u>Legal</u></h4></li>
                        <li><Link className="nav_footer_links" to="/privacy_policy">Privacy Policy</Link></li>
                        <li><Link className="nav_footer_links" to="/terms_of_service">Terms Of Service</Link></li>
                    </ul>
                    <ul className="footer_ul">
                        <li><h4><u>Connect</u></h4></li>
                        <li><Link className="nav_footer_links" to="#">Contact</Link></li>
                        <li><Link className="nav_footer_links" to="/donate">Donate</Link></li>
                        <li><Link className="nav_footer_links" to="#">Feedback</Link></li>
                    </ul>
                    <ul className="footer_ul">
                        <li><h4><u>Information</u></h4></li>
                        <li><Link className="nav_footer_links" to="#">About</Link></li>
                        <li><Link className="nav_footer_links" to="/FAQ">FAQ</Link></li>
                        <li><Link className="nav_footer_links" to="#">Newsletter</Link></li>
                    </ul>
                </div>
                <div className="social_links">
                    <ul>
                        <li><a href="https://www.facebook.com/groups/NewHavenNativeAmericanChurch/" target="_blank" rel="noopener noreferrer" className="nav-footer-link" onClick={this.resetToggleDisplay}><img srcSet={this.props.fbLogo} alt="Facebook" width="16px" height="16px" /></a></li>
                        <li className="nav_footer_links">©2020 All rights reserved.</li>
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