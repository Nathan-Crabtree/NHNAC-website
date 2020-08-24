import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class Header extends Component {
    render() {
        return(        
            <header>
                <nav>
                    <Link to="/"><img className="logo" srcSet={this.props.logo} alt="New Haven Native American Church logo" width="221px" height="210px" /></Link>
                    <ul className="header-links">
                        <li><Link className="nav-footer-link" to="/">Home</Link></li> 
                        <li className="vertical-bar">|</li>
                        <li><Link className="nav-footer-link" to="#">News</Link></li>
                        <li className="vertical-bar">|</li>
                        <li><Link className="nav-footer-link" to="#">NHNAC University</Link></li>
                        <li className="vertical-bar">|</li>
                        <li><Link className="nav-footer-link" to="#">About</Link></li>
                        <li className="vertical-bar">|</li>
                        <li><Link className="nav-footer-link" to="#">Donate</Link></li>
                    </ul>
                </nav>
            </header>);
    }
}

// PropTypes
Header.propTypes = {
    logo: PropTypes.string.isRequired
}