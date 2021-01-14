import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ContentNav from './static/ContentNav';
import queryString from 'query-string';
import PropTypes from 'prop-types';
//import { __RouterContext } from 'react-router';

export default class Content extends Component {

    constructor(){
        super();
        this.state = {
            header: null,
            top_aside: null,
            bottom_aside: null
        }
        this.setStateHandler = this.setStateHandler.bind(this);
    }

  /**
   * setStateHandler() function - takes query string variables from URL and parses them into object properties
   * for proper page rendering.
   * NOTE: The callback function used as the second argument for this.setState() allows page to be rendered 
   * with only one click.
   */
  setStateHandler() { 
    const parsedQString = queryString.parse(this.props.location.search);

    // Change state values of query properties to that of query strings in URL
    this.setState({ header: parsedQString.header, 
        top_aside: parsedQString.top_aside,
        bottom_aside: parsedQString.bottom_aside });

        // Capialize the first letter of header string for page rendering 
        if (this.state.header != null) {
            this.props.reviseName(this.state.header,[],'headerContent', false);
        }

        // Capialize the first letter of top_aside string for page rendering 
        if (this.state.top_aside != null) {
            this.props.reviseName(this.state.top_aside,[],'topAsideContent', false);
        }

        // Render proper text for bottom_aside span tag according to string value
        switch(this.state.bottom_aside) {
            case "events":
              document.getElementById("bottomAsideContent").innerHTML = "Events";
              break;
            case "most_viewed":
              document.getElementById("bottomAsideContent").innerHTML = "Most Viewed";
              break;
            case "popular":
              document.getElementById("bottomAsideContent").innerHTML = "Popular";
              break;
            default:
              break;
        }
   }

   componentDidMount() {
        this.setStateHandler();
   }

    render() {
        return(
            <React.Fragment>
                <ContentNav setStateHandler={this.setStateHandler} />
                <div className="MsoNormal header_content"><strong><span id="headerContent"></span></strong></div>
                <div className="grid-container">
                    <div className="main_content">
                        <section>
                            <img className="article_img_med" srcSet={this.props.articleImgLink} alt="Downtown New York at dusk." />
                            <h3>Lorem ipsum dolor sit amet, consectetur adipiscing?</h3>
                            <div className="sub_article_container">
                                <div className="author_content">
                                    <p>by Milton Miles</p>
                                    <Link to="/profile?userid=1&view=viewer"><img className="profile_img_small" srcSet={this.props.profileImgSmall} alt="Stock profile for development purposes." /></Link>
                                </div>
                                <div className="sub_article_content">
                                    <p>Posted on 2-2-20</p>
                                    <Link to="/article?id=1">Click here to read {'>>'}</Link>
                                </div>
                                <div className="clear"></div>
                            </div>
                        </section>
                        <section>
                            <img className="article_img_med" srcSet={this.props.articleImgLink} alt="Downtown New York at dusk." />
                            <h3>Lorem ipsum dolor sit amet, consectetur adipiscing?</h3>
                            <div className="sub_article_container">
                                <div className="author_content">
                                    <p>by Milton Miles</p>
                                    <Link to="/profile?userid=1&view=viewer"><img className="profile_img_small" srcSet={this.props.profileImgSmall} alt="Stock profile for development purposes." /></Link>
                                </div>
                                <div className="sub_article_content">
                                    <p>Posted on 2-2-20</p>
                                    <Link to="/article?id=1">Click here to read {'>>'}</Link>
                                </div>
                                <div className="clear"></div>
                            </div>
                        </section>
                        <section>
                            <img className="article_img_med" srcSet={this.props.articleImgLink} alt="Downtown New York at dusk." />
                            <h3>Lorem ipsum dolor sit amet, consectetur adipiscing?</h3>
                            <div className="sub_article_container">
                                <div className="author_content">
                                    <p>by Milton Miles</p>
                                    <Link to="/profile?userid=1&view=viewer"><img className="profile_img_small" srcSet={this.props.profileImgSmall} alt="Stock profile for development purposes." /></Link>
                                </div>
                                <div className="sub_article_content">
                                    <p>Posted on 2-2-20</p>
                                    <Link to="/article?id=1">Click here to read {'>>'}</Link>
                                </div>
                                <div className="clear"></div>
                            </div>
                        </section>
                        <Link className="more_articles_link" to="/">Click here to see more</Link>
                    </div>
                    <div className="aside_content">
                        <aside className="top_aside">
                            <div className="MsoNormal"><strong><span id="topAsideContent"></span></strong></div>
                            <ul>
                                <li>June 2020</li>
                                <li>May 2020</li>
                                <li>April 2020</li>
                                <li>March 2020</li>
                            </ul>
                            <Link to="/">Click here to see more</Link>
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
                            <Link to="/">Click here to see more</Link>
                            <div className="clear"></div>
                        </aside>
                        <aside>
                            <Link to="/content?header=podcasts&top_aside=archive&bottom_aside=popular">
                                <img className="podcast_img" srcSet={this.props.podcast} alt="Tune in to our podcast! New episodes every Friday." onClick={ () => {this.setStateHandler()}} />
                            </Link>
                        </aside>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

Content.propTypes = {
    podcast: PropTypes.string.isRequired,
    profileImgSmall: PropTypes.string.isRequired,
    articleImgLink: PropTypes.string.isRequired,
    reviseName: PropTypes.func.isRequired
}