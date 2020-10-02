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
     * body {
     *  overflow: hidden;
     * }
     * 
     * footer {
     *  filter: brightness(50%);
     *  position: relative;
     *  z-index: -1;
     * }
     * 
     * .page
     *  filter: brightness(50%);
     *  position: relative;
     *  z-index: -1;
     */
    toggleDisplayNav() {
        if (this.state.toggleDisplay) {
            const hamburgerIcon = document.getElementsByClassName("hamburger_icon")[0];
            const navDiv = document.getElementsByTagName("div")[1];
            const body = document.getElementsByTagName("body")[0];
            const main = document.getElementsByTagName("main")[0];
            const footer = document.getElementsByTagName("footer")[0];

            // Change hamburgerIcon's display to block; change navDiv margin and transition settings.
            hamburgerIcon.style.display = "block";
            navDiv.style.marginTop = "-485.72px";
            navDiv.style.transition = "margin-top 1s";

            // Set body overflow style property to scroll
            body.style.overflow = "scroll";

            // Set page brightness style property back to 100% and remove the style attribute.
            main.style.filter = "brightness(100%)";
            main.removeAttribute("style");
            
            // Set footer brightness style property back to 100% and remove the style attribute.
            footer.style.filter = "brightness(100%)";
            footer.removeAttribute("style");

            // Set global boolean variable of toggle state to false.
            this.setState({ toggleDisplay: false });   
        } else {
            const hamburgerIcon = document.getElementsByClassName("hamburger_icon")[0];
            const navDiv = document.getElementsByTagName("div")[1];
            const headerLinks = document.getElementsByClassName("header_links")[0];
            const body = document.getElementsByTagName("body")[0];
            const main = document.getElementsByTagName("main")[0];
            const footer = document.getElementsByTagName("footer")[0];

            // Change hamburgerIcon's display to none; change headerLinks display to block.
            hamburgerIcon.style.display = "none";
            headerLinks.style.display = "block";

            // Change navDiv margin and transition settings.
            navDiv.style.marginTop  = "0px";
            navDiv.style.transition = "margin-top 1s";

            // Set body overflow style property to hidden
            body.style.overflow = "hidden";
            
            // Set page brightness style property to 50% and z-index with position.
            main.style.filter = "brightness(50%)";
            main.style.position = "relative";
            main.style.zIndex = "-1";

            // Set footer brightness style property to 50% and z-index with position.
            footer.style.filter = "brightness(50%)";
            footer.style.position = "relative";
            footer.style.zIndex = "-1";
            
            // Iterate through all <li> tags of class "header_links" and set display to block and add padding-bottom of 25px.
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
                    <img className="hamburger_icon" onClick={this.toggleDisplayNav} srcSet={this.props.hbIcon} alt="Hamburger menu icon" /> 
                    <div>
                        <img className="cross" onClick={this.toggleDisplayNav} srcSet={this.props.cross} alt="Exit icon" />
                        <Link to="/" onClick={this.resetToggleDisplay}><img className="logo" srcSet={this.props.logo} alt="New Haven Native American Church logo" width="221px" height="210px" /></Link>
                        <ul className="header_links">
                            <li><Link to="/">Home</Link></li> 
                            <li className="vertical_bar">|</li>
                            <li><Link to="#">News</Link></li>
                            <li className="vertical_bar">|</li>
                            <li><Link to="/login">NHNAC University</Link></li>
                            <li className="vertical_bar">|</li>
                            <li><Link to="#">About</Link></li>
                            <li className="vertical_bar">|</li>
                            <li><Link to="/donate">Donate</Link></li>
                        </ul>
                    </div>
                </nav>
            </header>
        );
    }
}

// PropTypes for jest testing in App.test.js
Header.propTypes = {
    logo: PropTypes.string.isRequired,
    hbIcon: PropTypes.string.isRequired,
    cross: PropTypes.string.isRequired,
}