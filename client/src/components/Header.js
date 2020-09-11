import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class Header extends Component {

    constructor() {
        super();
        this.state = {
            toggleDisplay: false
        }
        this.toggleDisplayNav = this.toggleDisplayNav.bind(this);
    }

    /**
     * 
     * toggleDisplayNav() funcion - An event handler for hamburger-icon to toggle display the mobile nav.
     * Changes being made to CSS during toggleDisplayNav:
     * 
     * nav > div > ul {
     *  display: block;
     *  > li {
     *      display: block;
     *      padding-bottom: 25px;
     * }
     * 
     */
    toggleDisplayNav() {
        if (this.state.toggleDisplay) {
            const hamburgerIcon = document.getElementsByClassName("hamburger-icon")[0];
            const navDiv = document.getElementsByTagName("div")[1];

            // Change hamburgerIcon's display to block; change navDiv margin and transition settings.
            hamburgerIcon.style.display = "block";
            navDiv.style.marginTop = "-485.72px";
            navDiv.style.transition = "margin-top 2s";

            // Set global boolean variable of toggle state to false.
            this.setState({ toggleDisplay: false });   
        } else {
            const hamburgerIcon = document.getElementsByClassName("hamburger-icon")[0];
            const navDiv = document.getElementsByTagName("div")[1];
            const headerLinks = document.getElementsByClassName("header-links")[0];

            // Change hamburgerIcon's display to none; change navDiv and headerLinks display to block.
            hamburgerIcon.style.display = "none";
            headerLinks.style.display = "block";

            // Change navDiv margin and transition settings.
            navDiv.style.marginTop  = "0px";
            navDiv.style.transition = "margin-top 2s";
            
            // Iterate through all <li> tags of class "header-links" and set display to block and add padding-bottom of 25px.
            for (let childNode = 0; childNode < headerLinks.childNodes.length; childNode += 2) {
                headerLinks.childNodes[childNode].style.display = "block";
                headerLinks.childNodes[childNode].style.paddingBottom = "25px";
            }
            
            // Set global boolean variable of toggle state to true.
            this.setState({ toggleDisplay: true });
        }
    }

    render() {
        return(
            <header> 
                <nav>
                    <img className="hamburger-icon" onClick={this.toggleDisplayNav} srcSet={this.props.hbIcon} alt="Hamburger menu icon" /> 
                    <div>
                        <img className="cross" onClick={this.toggleDisplayNav} srcSet={this.props.cross} alt="Exit icon" />
                        <Link to="/" onClick={this.resetToggleDisplay}><img className="logo" srcSet={this.props.logo} alt="New Haven Native American Church logo" width="221px" height="210px" /></Link>
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
                    </div>
                </nav>
            </header>);
    }
}

// PropTypes for jest testing in App.test.js
Header.propTypes = {
    logo: PropTypes.string.isRequired,
    hbIcon: PropTypes.string.isRequired,
    cross: PropTypes.string.isRequired,
}