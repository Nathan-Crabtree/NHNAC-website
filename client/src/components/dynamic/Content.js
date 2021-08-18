import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ContentNav from '../static/ContentNav';
import PropTypes from 'prop-types';

var CryptoJS = require("crypto-js");

export default class Content extends Component {

    constructor() {
        super();
        this.state = {
            header: null
        }
        this.setStateHandler = this.setStateHandler.bind(this);
    }

    /**
     * setStateHandler() function - Takes query string variable from URL and parses it into an object property
     * for proper page rendering.
     *
     * NOTE: The callback function used as the second argument for this.setState() allows page to be rendered
     * with only one click. - Zane
     *
     */
    setStateHandler() {
        // Change state value of query property to that of query string in URL
        this.setState({ header: this.props.match.params.header }, () => {         
            // Render proper text for bottom_aside and top_aside span tag according to string value
            switch(this.state.header) {
                case "news":
                    document.getElementById("headerContent").innerText = "News";
                    document.getElementById("topAsideContent").innerText = "Calendar";
                    document.getElementById("bottomAsideContent").innerText = "Events";
                    break;
                case "articles":
                    document.getElementById("headerContent").innerText = "Articles";
                    document.getElementById("topAsideContent").innerText = "Archive";
                    document.getElementById("bottomAsideContent").innerText = "Most Viewed";
                    break;
                case "blogs":
                    document.getElementById("headerContent").innerText = "Blogs";
                    document.getElementById("topAsideContent").innerText = "Archive";
                    document.getElementById("bottomAsideContent").innerText = "Most Viewed";
                    break;
                case "updates":
                    document.getElementById("headerContent").innerText = "Updates";
                    document.getElementById("topAsideContent").innerText = "Archive";
                    document.getElementById("bottomAsideContent").innerText = "Popular";
                break;
                    // NOTE: Podcasts will be unavailable in beta release. - Zane
                    case "podcasts":
                      document.getElementById("headerContent").innerText = "Podcasts";
                      document.getElementById("topAsideContent").innerText = "Archive";
                      document.getElementById("bottomAsideContent").innerText = "Popular";
                     break;
                default:
                    break;
            }
        });
   }

   componentDidMount() {
        this.setStateHandler();

        // When component is rendered, bring user to top of page
        window.scrollTo(0, 0);
   }

    render() {
        const {
          profileImgSmall,
          articleImgLink,
          podcast
        } = this.props;

        return(
            <React.Fragment>
                <ContentNav setStateHandler={this.setStateHandler} />
                <div className="MsoNormal header_content"><strong><span id="headerContent"></span></strong></div>
                <div className="grid-container">
                    <div className="content_container1">
                        <section>
                            <img className="article_img_med" srcSet={articleImgLink} alt="Stock for development purposes." />
                            <h3>Lorem ipsum dolor sit amet, consectetur adipiscing?</h3>
                            <div className="sub_article_container">
                                <div className="author_content">
                                    <p>by <Link to={`/profile/${CryptoJS.AES.encrypt('1', 'doGeAtCaT12107;/\)').toString()}}?view=viewer`}>Milton Miles</Link></p>
                                    <img className="profile_img_small" srcSet={profileImgSmall} alt="Portrait of user." />
                                </div>
                                <div className="sub_article_content">
                                    <p>Posted on 2-2-20</p>
                                    <Link to="/article/article?id=1">Click here to read {'>>'}</Link>
                                </div>
                                <div className="clear"></div>
                            </div>
                        </section>
                        <section>
                            <img className="article_img_med" srcSet={articleImgLink} alt="Stock for development purposes." />
                            <h3>EVENT: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h3>
                            <div className="sub_article_container">
                                <div className="author_content">
                                    <p className="event_info">Date/Time: 12-20-2020 Tue 12:30pm, Location: Main church</p>
                                </div>
                                <div className="sub_article_content">
                                    <p>Posted on 2-2-20</p>
                                    <Link to="/article/event?id=1">Click here to read {'>>'}</Link>
                                </div>
                                <div className="clear"></div>
                            </div>
                        </section>
                        {/* NOTE: Podcasts will be unavailable in beta release. - Zane */}
                        {/* <section>
                            <img className="article_img_med" srcSet={articleImgLink} alt="Stock for development purposes." />
                            <h3>PODCAST: Excepteur sint occaecat.</h3>
                            <div className="sub_article_container">
                                <div className="sub_article_content">
                                    <p>Posted on 2-2-20</p>
                                    <Link to="/article/podcast?id=1">Click here to listen {'>>'}</Link>
                                </div>
                                <div className="clear"></div>
                            </div>
                        </section> */}
                        <button onClick={ () => { } } className="text_btn" type="button"><b>Click here to load more</b></button>
                    </div>
                    <div className="content_container2">
                        <aside className="top_aside">
                            <div className="MsoNormal"><strong><span id="topAsideContent"></span></strong></div>
                            <ul>
                                <li>June 2020</li>
                                <li>May 2020</li>
                                <li>April 2020</li>
                                <li>March 2020</li>
                            </ul>
                            <button onClick={ () => { } } className="text_btn" type="button"><b>Click here to load more</b></button>
                            <div className="clear"></div>
                        </aside>
                        <aside className="bottom_aside">
                            <div className="MsoNormal"><strong><span id="bottomAsideContent"></span></strong></div>
                            <ul>
                                <li>12/2/2020 - Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                                <li>1/1/2020 - Tempor incididunt ut labore et dolore magna aliqua.</li>
                                <li>5/4/2020 - Nullam non nisi.</li>
                                <li>6/4/2020 - Vulputate eu scelerisque felis.</li>
                            </ul>
                            <button onClick={ () => { } } className="text_btn" type="button"><b>Click here to load more</b></button>
                            <div className="clear"></div>
                        </aside>
                        {/* Podcast promotion is commented out for beta release. - Zane */}
                        {/* <aside>
                            <Link to="/content/podcasts">
                                <img className="podcast_img" srcSet={podcast} alt="Tune in to our podcast! New episodes every Friday." onClick={ () => { this.setStateHandler() } } />
                            </Link>
                        </aside> */}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

// PropTypes for jest testing in App.test.js
Content.propTypes = {
    podcast: PropTypes.string.isRequired,
    profileImgSmall: PropTypes.string,
    articleImgLink: PropTypes.string
}
