import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Content from './Content';
import Container from '../Container';

var CryptoJS = require("crypto-js");
require('dotenv').config();

class Header extends Component {

    constructor() {
        super();
        this.state = {
            toggleDisplay: false
        }
        this.toggleDisplayNav = this.toggleDisplayNav.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
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
     *
     */
    toggleDisplayNav() {
        if (this.state.toggleDisplay) {
            const hamburgerIcon = document.getElementsByClassName("hamburger_icon")[0];
            const navDiv = document.getElementsByTagName("div")[1];
            const body = document.getElementsByTagName("body")[0];
            const main = document.getElementsByTagName("main")[0];
            const footer = document.getElementsByTagName("footer")[0];

            // Change hamburgerIcon's display to block; change navDiv margin and transition settings
            hamburgerIcon.style.display = "block";
            navDiv.style.marginTop = "-485.7px";
            navDiv.style.transition = "margin-top 1s";

            // Set body overflow style property to scroll
            body.style.overflow = "scroll";

            // Set page brightness style property back to 100% and remove the style attribute
            main.style.filter = "brightness(100%)";
            main.removeAttribute("style");

            // Set footer brightness style property back to 100% and remove the style attribute
            footer.style.filter = "brightness(100%)";
            footer.removeAttribute("style");

            // Set global boolean variable of toggle state to false
            this.setState({ toggleDisplay: false });
        } else {
            const hamburgerIcon = document.getElementsByClassName("hamburger_icon")[0];
            const navDiv = document.getElementsByTagName("div")[1];
            const headerLinks = document.getElementsByClassName("header_links")[0];
            const body = document.getElementsByTagName("body")[0];
            const main = document.getElementsByTagName("main")[0];
            const footer = document.getElementsByTagName("footer")[0];

            // Change hamburgerIcon's display to none; change headerLinks display to block
            hamburgerIcon.style.display = "none";
            headerLinks.style.display = "block";

            // Change navDiv margin and transition settings
            navDiv.style.marginTop  = "0px";
            navDiv.style.transition = "margin-top 1s";

            // Set body overflow style property to hidden
            body.style.overflow = "hidden";

            // Set page brightness style property to 50% and z-index with position
            main.style.filter = "brightness(50%)";
            main.style.position = "relative";
            main.style.zIndex = "-1";

            // Set footer brightness style property to 50% and z-index with position
            footer.style.filter = "brightness(50%)";
            footer.style.position = "relative";
            footer.style.zIndex = "-1";

            // Iterate through all <li> tags of class "header_links" and set display to block and add padding-bottom of 25px
            for (let childNode = 0; childNode < headerLinks.childNodes.length; childNode += 2) {
                headerLinks.childNodes[childNode].style.display = "block";
                headerLinks.childNodes[childNode].style.paddingBottom = "25px";
            }

            // Set global boolean variable of toggle state to true
            this.setState({ toggleDisplay: true });
        }
    }

    /**
     * onSubmit() function - Grabs the input value of the search query and sends a request to the API and returns
     * relevant results on the search page.
     *
     * @param {object} e
     * @returns {boolean} false
     */
    onSubmit(e) {
        // Use IE5-8 fallback if event object isn't present
        if (!e) {
            e = window.event;
        }

        e.preventDefault();

        let searchQuery = e.target.search.value;

        // Check if search input is less than 500 characters
        if (searchQuery.length < 500) {
            this.props.history.push(`/search?query=${encodeURIComponent(searchQuery)}&page=1`);
        } else {
            return false;
        }
    }

    render() {
        const {
          hbIcon,
          logo,
          magnifyingGlass,
          messageIcon,
          profileImgSmall
        } = this.props;

        return(
            <header>
                <nav>
                    <img className="hamburger_icon" onClick={this.toggleDisplayNav} srcSet={hbIcon} alt="Hamburger menu icon" />
                    <div>
                        <svg className="exit_cross" onClick={this.toggleDisplayNav} viewBox="0 0 40 40">
                            <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
                        </svg>
                        <div>
                          <img className="logo" srcSet={logo} alt="New Haven Native American Church logo" width="221px" height="210px" />
                          <h5>beta</h5>
                        </div>
                        { this.props.isAuthenticated ?
                            <ul className="header_links">
                                <li className="dropdown">
                                    <Link to={`/profile/${CryptoJS.AES.encrypt('1', process.env.PROD_KEY).toString()}?view=user&customize=false`}>Profile</Link>
                                    <div className="dropdown-content">
                                        <Link to={`/account_settings/${CryptoJS.AES.encrypt('1', process.env.PROD_KEY).toString()}?edit_profile_pic=false`}>Account Settings</Link>
                                        <Link to={`/profile/${CryptoJS.AES.encrypt('1', process.env.PROD_KEY).toString()}?view=user&customize=true`}>Customize Page</Link>
                                        <Link to={`/direct_message?senderid=${CryptoJS.AES.encrypt('1', process.env.PROD_KEY).toString()}&receiverid=null`}>Messages</Link>
                                        <Container onSubmit={ () => {} } triggerText="Connections" profileImgSmall={profileImgSmall} messageIcon={messageIcon} />
                                        <Link to={`/id_request/${CryptoJS.AES.encrypt('1', process.env.PROD_KEY).toString()}`}>Request ID</Link>
                                    </div>
                                </li>
                                <li className="vertical_bar">|</li>
                                <li className="dropdown">
                                    <Link to="#">Courses</Link>
                                    <div className="dropdown-content">
                                        <Link to="#">Go To Current Course</Link>
                                        <Link to="#">Courses</Link>
                                        <Link to="#">Certifications</Link>
                                    </div>
                                </li>
                                <li className="vertical_bar">|</li>
                                <li className="dropdown">
                                    <Link to="#">Community</Link>
                                    <div className="dropdown-content">
                                        <Link to="#">My Questions</Link>
                                        <Link to="#">My Answers</Link>
                                        <Link to="#">Archives</Link>
                                    </div>
                                </li>
                                <li className="vertical_bar">|</li>
                                <li className="dropdown">
                                    <Link to="/content/articles" onClick={ () => <Content /> }>Articles</Link>
                                    <div className="dropdown-content">
                                        <Link to="/content/news" onClick={ () => <Content /> }>News</Link>
                                        <Link to="/content/updates" onClick={ () => <Content /> }>Updates</Link>
                                        <Link to="/content/blogs" onClick={ () => <Content /> }>Blogs</Link>
                                        {/* NOTE: Podcasts will be unavailable in beta release. - Zane  */}
                                        {/* <Link to="/content/podcasts" onClick={ () => <Content /> }>Podcast</Link> */}
                                    </div>
                                </li>
                                <li className="vertical_bar">|</li>
                                <li>
                                    <form id="search" onSubmit={this.onSubmit}>
                                        <input type="search" className="login_input search_input" name="search" maxLength="500" placeholder="Search..." />
                                        <input type="image" className="magnifying_glass" src={magnifyingGlass} alt="Submit your search query." />
                                    </form>
                                </li>
                                <li className="vertical_bar">|</li>
                                <li><Link onClick={this.props.deauthenticate} to="/">Log Out</Link></li>
                            </ul>
                            :
                            <ul className="header_links">
                                <li><Link to="/">Home</Link></li>
                                <li className="vertical_bar">|</li>
                                <li className="dropdown">
                                    <Link to="/content/news" onClick={ () => <Content /> }>News</Link>
                                    <div className="dropdown-content">
                                        <Link to="/content/articles" onClick={ () => <Content /> }>Articles</Link>
                                        <Link to="/content/updates" onClick={ () => <Content /> }>Updates</Link>
                                        <Link to="/content/blogs" onClick={ () => <Content /> }>Blogs</Link>
                                        {/* NOTE: Podcasts will be unavailable in beta release. - Zane  */}
                                        {/* <Link to="/content/podcasts" onClick={ () => <Content /> }>Podcast</Link> */}
                                    </div>
                                </li>
                                <li className="vertical_bar">|</li>
                                <li><Link to="/login">N.H.N.A.C. University</Link></li>
                                <li className="vertical_bar">|</li>
                                <li className="dropdown">
                                    <Link to="/about">About</Link>
                                    <div className="dropdown-content">
                                        <Link to="/constitution">Constitution</Link>
                                        <Link to="/about#contactDiv">Contact</Link>
                                    </div>
                                </li>
                                <li className="vertical_bar">|</li>
                                <li><Link to="/faq">F.A.Q.</Link></li>
                                <li className="vertical_bar">|</li>
                                <li><Link to="/donate">Donate</Link></li>
                            </ul>
                        }
                    </div>
                </nav>
            </header>
        );
    }
}

export default withRouter(Header);

// PropTypes for jest testing in App.test.js
Header.propTypes = {
    logo: PropTypes.string.isRequired,
    hbIcon: PropTypes.string.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    deauthenticate: PropTypes.func.isRequired,
    magnifyingGlass: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    profileImgSmall: PropTypes.string,
    messageIcon: PropTypes.string.isRequired
}
