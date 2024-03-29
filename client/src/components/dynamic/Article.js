import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Import sub-components for dynamic rendering of article page according to article type
import ArticleType from './ArticleType';
//import PodcastType from './PodcastType';
import UpdateType from './UpdateType';
import EventType from './EventType';
import BlogType from './BlogType';

var CryptoJS = require("crypto-js");
require('dotenv').config();

/**
 * Hides the response section for the comment and shows the "See Responses" button. Hides response form.
 *
 */
export const hideResponses = () => {
    document.getElementsByClassName("response_section_container")[0].style.display = "none";
    document.getElementsByClassName("comment_btn")[0].style.display = "block";
    document.getElementsByClassName("comment_btn")[1].style.display = "block";
    document.getElementsByClassName("comment_btn")[2].style.display = "none";
    document.getElementsByClassName("response_form")[0].style.display = "none";
}

/**
 * Shows the section the comment belongs to and hides the associated button.
 *
 * @param {string} containerClassName
 * @param {string} btnClassName
 */
export const displayComments = (containerClassName, btnClassName) => {
    document.getElementsByClassName(containerClassName)[0].style.display = "block";
    document.getElementsByClassName(btnClassName)[1].style.display = "none";
    document.getElementsByClassName(btnClassName)[2].style.display = "block";
}

export default class Article extends Component {

    constructor() {
        super();
        this.state = {
            type: null,
            errorExists: false,
            formActive: false
        }
        this.hideComments = this.hideComments.bind(this);
        this.displayForm = this.displayForm.bind(this);
        this.hideForm = this.hideForm.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.displayTypeComponent = this.displayTypeComponent.bind(this);
        this.setTypeHeader = this.setTypeHeader.bind(this);
        this.setTypeBackLink = this.setTypeBackLink.bind(this);
        this.displayProperContent = this.displayProperContent.bind(this);
    }

    /**
     * Hides the comment section and shows the "See Comments" button. Hides all forms.
     *
     */
    hideComments() {
        // Hide all forms
        this.hideForm("1", true);
        this.hideForm("1", true, true);

        document.getElementsByClassName("comment_section_container")[0].style.display = "none";
        document.getElementsByClassName("see_comments_btn")[0].style.display = "block";
        document.getElementsByClassName("see_comments_btn")[1].style.display = "block";
        document.getElementsByClassName("see_comments_btn")[2].style.display = "none";
        document.getElementsByClassName("comment_form")[0].style.display = "none";
        hideResponses();
    }

    /**
     * Shows the section's form that the comment belongs to and hides the associated button(s).
     *
     * @param {string} indexValue
     * @param {boolean} editMode
     * @param {boolean} responseComment
     */
    displayForm(indexValue, editMode = false, responseComment = false) {
        if (!this.state.formActive) {
            if (responseComment) {
                const elements = document.querySelectorAll("[data-response-index='" + indexValue + "']");
                elements[1].style.display = "block";
                elements[0].style.display = "none";
                if (editMode) {
                    elements[1].parentElement.parentElement.getElementsByTagName("ul")[1].style.display = "none";
                }
            } else {
                const elements = document.querySelectorAll("[data-comment-index='" + indexValue + "']");
                elements[1].style.display = "block";
                elements[0].style.display = "none";
                if (editMode) {
                    elements[1].parentElement.getElementsByTagName("ul")[0].style.display = "none";
                }
            }

            if (window.addEventListener) { // If event listener supported
                // Add pop-up warning of unsaved data if user attempts to leave page
                window.addEventListener("beforeunload", this.props.displayUnloadMessage, false);
            } else {
                window.attachEvent("beforeunload", this.props.displayUnloadMessage);
            }

            this.setState({ formActive: true });
        }
    }

    /**
     * Hides the section's form that the comment belongs to and shows the associated button(s).
     *
     * @param {string} indexValue
     * @param {boolean} editMode
     * @param {boolean} responseComment
     */
    hideForm(indexValue, editMode = false, responseComment = false) {
        if (this.state.formActive) {
            if (responseComment) {
                const elements = document.querySelectorAll("[data-response-index='" + indexValue + "']");
                elements[1].style.display = "none";
                elements[0].style.display = "block";
                if (editMode) {
                    elements[1].parentElement.parentElement.getElementsByTagName("ul")[1].style.display = "block";
                }
            } else {
                const elements = document.querySelectorAll("[data-comment-index='" + indexValue + "']");
                elements[1].style.display = "none";
                elements[0].style.display = "block";

                if (editMode) {
                    elements[1].parentElement.getElementsByTagName("ul")[0].style.display = "block";
                }
            }

            // Remove pop-up warning of unsaved data if user attempts to leave page
            window.removeEventListener("beforeunload", this.props.displayUnloadMessage, false);

            this.setState({ formActive: false });
        }
    }

    /**
     * Takes comment content submitted from user and sends to API and then gets added to database;
     * the page is then refreshed to include the new comment.
     *
     * @param {object} e
     * @returns {boolean} false
     */
    onSubmit(e) {
        const target = e.target || e.srcElement;

        // Use IE5-8 fallback if event object isn't present
        if (!e) {
            e = window.event;
        }

        e.preventDefault();

        let comment = target.comment.value;
        comment = this.props.sanitizeInput(comment);
        let error = document.createElement("p");

        // Check if comment length is not greater than 500 characters
        if (comment.length > 500) {
            if (!this.state.errorExists) {
                // Render error text and change boolean
                const formField = target.firstChild.firstChild;
                const input = target.comment;
                error.innerText = '*Comments can not be larger than 500 characters.';
                error.className = "error";
                error.style.fontSize = '.9rem';
                error.style.color = '#C31F01';
                formField.appendChild(error);
                input.style.borderColor = '#C31F01';
                this.setState({ errorExists: true });
            }
            return false;
        } else {
            console.log("Passed :D");

            // Upload comment to database through API

            if (window.removeEventListener) { // If event listener supported
                // Remove pop-up warning of unsaved data if user attempts to leave page
                window.removeEventListener("beforeunload", this.props.displayUnloadMessage, false);
            } else {
                window.detachEvent("beforeunload", this.props.displayUnloadMessage);
            }

            this.setState({ formActive: false });

            // Refresh page
        }

    }

    /**
     * Sets the header for the proper component that's being rendered via query string.
     *
     * @returns {string} header
     */
    setTypeHeader() {
        // Render proper header according to "type" string value
        switch (this.state.type) {
            // NOTE: Podcasts will be unavailable in beta release. - Zane
            // case "podcast":
            //     return "PODCAST: ";
            case "blog":
                return "BLOG: ";
            case "event":
                return "EVENT: ";
            case "update":
                return "UPDATE: ";
            default:
                break;
        }
    }

    /**
     * Grabs the "type" query string value and renders the proper component according to the type of article.
     *
     * @returns {class} Component - A React Component.
     */
    displayTypeComponent() {
        // Render proper component according to "type" string value
        switch (this.state.type) {
            case "article":
                return <ArticleType thumbsUp={this.props.thumbsUp} instaMini={this.props.instaMini} twitterMini={this.props.twitterMini}
                    fbMini={this.props.fbMini} profileImgSmall={this.props.profileImgSmall} onSubmit={this.onSubmit}
                    hideForm={this.hideForm} displayForm={this.displayForm} hideResponses={hideResponses} displayComments={displayComments}
                    hideComments={this.hideComments} />
            // NOTE: Podcasts will be unavailable in beta release. - Zane
            // case "podcast":
            //     return <PodcastType thumbsUp={this.props.thumbsUp} instaMini={this.props.instaMini} twitterMini={this.props.twitterMini}
            //     fbMini={this.props.fbMini} profileImgSmall={this.props.profileImgSmall} onSubmit={this.onSubmit}
            //     hideForm={this.hideForm} displayForm={this.displayForm} hideResponses={hideResponses} displayComments={displayComments}
            //     hideComments={this.hideComments} />
            case "blog":
                return <BlogType thumbsUp={this.props.thumbsUp} instaMini={this.props.instaMini} twitterMini={this.props.twitterMini}
                    fbMini={this.props.fbMini} profileImgSmall={this.props.profileImgSmall} onSubmit={this.onSubmit}
                    hideForm={this.hideForm} displayForm={this.displayForm} hideResponses={hideResponses} displayComments={displayComments}
                    hideComments={this.hideComments} />
            case "event":
                return <EventType thumbsUp={this.props.thumbsUp} instaMini={this.props.instaMini} twitterMini={this.props.twitterMini}
                    fbMini={this.props.fbMini} profileImgSmall={this.props.profileImgSmall} onSubmit={this.onSubmit}
                    hideForm={this.hideForm} displayForm={this.displayForm} hideResponses={hideResponses} displayComments={displayComments}
                    hideComments={this.hideComments} isAuthenticated={this.props.isAuthenticated} sanitizeInput={this.props.sanitizeInput} />
            case "update":
                return <UpdateType thumbsUp={this.props.thumbsUp} instaMini={this.props.instaMini} twitterMini={this.props.twitterMini}
                    fbMini={this.props.fbMini} profileImgSmall={this.props.profileImgSmall} onSubmit={this.onSubmit}
                    hideForm={this.hideForm} displayForm={this.displayForm} hideResponses={hideResponses} displayComments={displayComments}
                    hideComments={this.hideComments} />
            default:
                break;
        }
    }

    /**
     * Sets the return link for the proper component that's being rendered via query string.
     *
     * @returns {string} header
     */
    setTypeBackLink() {
        // Render proper header according to "type" string value
        switch (this.state.type) {
            // NOTE: Podcasts will be unavailable in beta release. - Zane
            // case "podcast":
            //     return "/content/podcasts";
            case "blog":
                return "/content/blogs";
            case "event":
                return "/content/news";
            case "update":
                return "/content/updates";
            case "article":
                return "/content/articles";
            default:
                break;
        }
    }

    /**
     * Returns proper JSX code according to whether the article is an event or update and the user isn't authenticated.
     *
     * @returns {class} Component - A React Component.
     */
    displayProperContent() {
        const isTypeEventAndAuthenticated = this.props.isAuthenticated && this.state.type === "event";
        const isTypeUpdateAndAuthenticated = this.props.isAuthenticated && this.state.type === "update";

        if (!isTypeEventAndAuthenticated || !isTypeUpdateAndAuthenticated) {
            return <div>
                {this.displayTypeComponent()}
            </div>;
        } else if (this.props.isAuthenticated) {
            return <div>
                {this.displayTypeComponent()}
            </div>;
        } else {
            return <div>
                <div className="blur_container">
                    {this.displayTypeComponent()}
                </div>
                <div className="blur_text_container">
                    <p>Become adopted to the New Haven Native American Church community today to unlock this article.</p>
                    <Link to="/signup"><h5><b>Pay what you’d like by clicking here.</b></h5></Link>
                </div>
            </div>;
        }
    }

    componentDidMount() {
        // Change state value of type to that of URL parameter
        this.setState({ type: this.props.match.params.type });

        // When component is rendered, bring user to top of page
        window.scrollTo(0, 0);
    }

    componentWillUnmount() {
        if (this.state.formActive && window.removeEventListener) {
            // Remove pop-up warning of unsaved data if user attempts to leave page
            window.removeEventListener("beforeunload", this.props.displayUnloadMessage, false);
        }
    }

    render() {
        const {
            articleImg,
            profileImgSmall,
            instaMini,
            twitterMini,
            fbMini
        } = this.props;
        const { REACT_APP_KEY } = process.env;

        return (
            <React.Fragment>
                <div className="MsoNormal center_text"><strong><span>{this.setTypeHeader()}Lorem ipsum dolor sit amet, consectetur adipiscing elit?</span></strong></div>
                <div className="image_display">
                    <img className="article_image" srcSet={articleImg} alt="Stock for development purposes." />
                    <p className="article_image_desc image_desc">&emsp;Photo description: {"Stock for development purposes."}</p>
                </div>
                <aside className="top_aside_container">
                    <div>
                        <p>Posted on 2-2-20</p>
                        <img className="profile_img_small" srcSet={profileImgSmall} alt="Portrait of user." />
                        <h4>by <Link to={`/profile/${CryptoJS.AES.encrypt("1", REACT_APP_KEY).toString()}}?view=viewer`}>Milton Miles</Link></h4>
                    </div>
                    <div>
                        <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/"><img srcSet={instaMini} alt="Author's instagram link." /></a>
                        <a target="_blank" rel="noopener noreferrer" href="https://www.twitter.com/"><img srcSet={twitterMini} alt="Author's twitter link." /></a>
                        <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/"><img srcSet={fbMini} alt="Author's facebook link." /></a>
                    </div>
                    <div className="clear"></div>
                </aside>
                {this.displayProperContent()}
                <div className="back_to_articles_link center_text">
                    <button className="text_btn" type="button" onClick={() => { this.props.history.push(this.setTypeBackLink()) }}><b>Back to content</b></button>
                </div>
            </React.Fragment>
        );
    }
}

// PropTypes for jest testing
Article.propTypes = {
    articleImg: PropTypes.string,
    fbMini: PropTypes.string.isRequired,
    instaMini: PropTypes.string.isRequired,
    twitterMini: PropTypes.string.isRequired,
    thumbsUp: PropTypes.string.isRequired,
    profileImgSmall: PropTypes.string,
    isAuthenticated: PropTypes.bool.isRequired,
    sanitizeInput: PropTypes.func.isRequired,
    displayUnloadMessage: PropTypes.func.isRequired,
}
