import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
//import Container from '../Container';

var CryptoJS = require("crypto-js");
require('dotenv').config();

export default class ArticleType extends Component {

    render() {
        const {
            thumbsUp,
            instaMini,
            twitterMini,
            fbMini,
            profileImgSmall
        } = this.props;
        const { REACT_APP_KEY } = process.env;

        return (
            <React.Fragment>
                <article>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                        aliqua. Faucibus nisl tincidunt eget nullam. Amet justo donec enim diam vulputate ut. Sed viverra ipsum nunc aliquet
                        bibendum. Suspendisse sed nisi lacus sed viverra. Bibendum est ultricies integer quis. Sed faucibus turpis in eu mi.</p>

                    <p>Adipiscing bibendum est ultricies integer quis auctor elit sed. Ipsum dolor sit amet consectetur adipiscing elit.
                        Et ultrices neque ornare aenean euismod elementum nisi quis. Neque vitae tempus quam pellentesque nec nam
                        aliquam.</p>

                    <p>Ullamcorper velit sed ullamcorper morbi tincidunt. Enim sed faucibus turpis in eu mi. Consequat ac felis donec et odio.
                        Egestas pretium aenean pharetra magna ac placerat vestibule lectus mauris. Cursus in hac habitasse platea dictumst.
                        Porttitor eget dolor morbi non arcu risus.</p>

                    <p>Volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque in. Non curabitur gravida arcu ac tortor
                        dignissim convallis. Cursus in hac abitasse platea dictumst. Ultricies mi eget mauris pharetra. Accumsan sit amet nulla
                        facilisi morbi tempus iaculis urna id. Maecenas sed enim ut sem.</p>

                    <p>Urna neque viverra justo nec ultrices dui. Scelerisque fermentum dui faucibus in ornare quam. At in tellus integer
                        feugiat scelerisque varius morbi enim. Vel facilisis volutpat est velit egestas dui id.</p>

                    <p>Sed lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi. Consectetur a erat nam at lectus urna duis
                        convallis. Tincidunt vitae semper quis lectus nulla at volutpat diam. Sem fringilla ut morbi tincidunt augue interdum
                        velit euismod. Viverra aliquet eget sit amet tellus. Et odio pellentesque diam volutpat. Sed sed risus pretium quam. In
                        aliquam sem fringilla ut morbi tincidunt augue interdum. Leo duis ut diam quam.</p>

                    <p>Pulvinar pellentesque habitant morbi tristique senectus et. Ornare suspendisse sed nisi lacus sed viverra tellus in hac. </p>
                </article>
                <aside className="bottom_aside_container">
                    <div>
                        <Link to={`/search?query=${encodeURIComponent("#tag1")}&page=1`}>#tag1</Link>
                        <Link to={`/search?query=${encodeURIComponent("#tag2")}&page=1`}>#tag2</Link>
                        <Link to={`/search?query=${encodeURIComponent("#tag3")}&page=1`}>#tag3</Link>
                    </div>
                    <div>
                        <ul>
                            <li><img srcSet={thumbsUp} alt="Like this button." /></li>
                            <li><b>3.5 likes</b></li>
                        </ul>
                        <p>Like this article</p>
                        <div className="clear"></div>
                    </div>
                    <div>
                        <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/"><img srcSet={instaMini} alt="Author's instagram link." /></a>
                        <a target="_blank" rel="noopener noreferrer" href="https://www.twitter.com/"><img srcSet={twitterMini} alt="Author's twitter link." /></a>
                        <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/"><img srcSet={fbMini} alt="Author's facebook link." /></a>
                    </div>
                    <div className="clear"></div>
                </aside>
                <div className="comment_section_container">
                    <section className="comment_container">
                        <hr />
                        <div>
                            <img className="profile_img_small" srcSet={profileImgSmall} alt="Portrait of user." />
                            <div>
                                <h4><Link to={`/profile/${CryptoJS.AES.encrypt("1", REACT_APP_KEY).toString()}}?view=viewer`}>Milton Miles</Link></h4>
                                <div>
                                    <p>Tier</p>
                                    <p>Last Online: 35 min ago</p>
                                </div>
                            </div>
                        </div>
                        <div className="clear"></div>
                        <div>
                            <div>
                                <p>Posted 35 min ago</p>
                            </div>
                            <ul>
                                <li><img srcSet={thumbsUp} alt="Like this button." /></li>
                                <li><p><b>3.5 likes</b></p></li>
                            </ul>
                            <div className="clear"></div>
                            <div>
                                <p className="comment_content" data-comment-index="1">Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                    sed do eiusmod tempor incididunt ut labore et dolore
                                    magna aliqua.</p>
                                <form id="comment" className="comment_form" data-comment-index="1" onSubmit={this.props.onSubmit}>
                                    <fieldset>
                                        <div className="comment_form_field">
                                            <label htmlFor="comment">Comment</label>
                                            <svg onClick={() => { this.props.hideForm("1", true) }} className="_modal-close-icon" viewBox="0 0 40 40">
                                                <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
                                            </svg><br />
                                            <textarea className="login_input" type="text" id="comment_textarea" name="comment" data-comment-index="1" readOnly maxLength="500" value="Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                            sed do eiusmod tempor incididunt ut labore et dolore
                                            magna aliqua." /><br />
                                        </div>
                                        <button className="submit_btn submit_padding" type="submit">Submit</button>
                                    </fieldset>
                                </form>
                                <ul>
                                    <li><button onClick={() => { this.props.displayForm("1", true) }} className="text_btn" type="button"><b>Edit</b></button></li>
                                    <li><button onClick={() => { }} className="text_btn" type="button"><b>Delete</b></button></li>
                                    {/* Report feature is currently disabled. - Zane */}
                                    {/*<li><Container triggerText="Report" /></li>*/}
                                </ul>
                                <div className="response_section_container">
                                    <section className="response_container">
                                        <div>
                                            <div>
                                                <img className="profile_img_small" srcSet={profileImgSmall} alt="Portrait of user." />
                                                <div>
                                                    <h4><Link to={`/profile/${CryptoJS.AES.encrypt("1", REACT_APP_KEY).toString()}}?view=viewer`}>Milton Miles</Link></h4>
                                                    <div>
                                                        <p>Tier</p>
                                                        <p>Last Online: 35 min ago</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <p>Posted 35 min ago</p>
                                            </div>
                                            <ul>
                                                <li><img srcSet={thumbsUp} alt="Like this button." /></li>
                                                <li><p><b>3.5k likes</b></p></li>
                                            </ul>
                                            <div className="clear"></div>
                                            <div>
                                                <p className="comment_content" data-response-index="1">Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                                    sed do eiusmod tempor incididunt ut labore et dolore
                                                    magna aliqua.</p>
                                                <form id="comment" className="comment_form" data-response-index="1" onSubmit={this.props.onSubmit}>
                                                    <fieldset>
                                                        <div className="comment_form_field">
                                                            <label htmlFor="comment">Comment</label>
                                                            <svg onClick={() => { this.props.hideForm("1", true, true) }} className="_modal-close-icon" viewBox="0 0 40 40">
                                                                <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
                                                            </svg><br />
                                                            <textarea className="login_input" type="text" id="comment_textarea" name="comment" data-response-index="1" readOnly maxLength="500" value="Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                                            sed do eiusmod tempor incididunt ut labore et dolore
                                                            magna aliqua." /><br />
                                                        </div>
                                                        <button className="submit_btn submit_padding" type="submit">Submit</button>
                                                    </fieldset>
                                                </form>
                                            </div>
                                            <ul>
                                                <li><button onClick={() => { this.props.displayForm("1", true, true) }} className="text_btn" type="button"><b>Edit</b></button></li>
                                                <li><button onClick={() => { }} className="text_btn" type="button"><b>Delete</b></button></li>
                                                {/* Report feature is currently disabled. - Zane */}
                                                {/*<li><Container triggerText="Report" /></li>*/}
                                            </ul>
                                            <hr />
                                        </div>
                                    </section>
                                    { /* Classes "response_form" and "comment_form" exist because they're to represent the creation of a new comment or response. - Zane */}
                                    <form id="response" className="response_form" data-response-index="0" onSubmit={this.props.onSubmit}>
                                        <fieldset>
                                            <div className="comment_form_field">
                                                <label htmlFor="comment">Response</label>
                                                <svg onClick={() => { this.props.hideForm("0") }} className="_modal-close-icon" viewBox="0 0 40 40">
                                                    <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
                                                </svg><br />
                                                <textarea className="login_input" type="text" id="response_textarea" name="comment" maxLength="500" /><br />
                                            </div>
                                            <button className="submit_btn submit_padding" type="submit">Submit</button>
                                        </fieldset>
                                    </form>
                                    <button className="paypal_btn comment_btn" type="button" onClick={() => { this.props.displayForm("0") }}><b>Add Response</b></button>
                                </div>
                            </div>
                            <button className="paypal_btn comment_btn" type="button" onClick={() => { this.props.displayComments("response_section_container", "comment_btn") }}><b>See Responses</b></button>
                            <button className="bitcoin_btn comment_btn" type="button" onClick={this.props.hideResponses}><b>Hide Responses</b></button>
                        </div>
                        <div className="clear"></div>
                    </section>
                    <form id="comment" className="comment_form" data-comment-index="0" onSubmit={this.props.onSubmit}>
                        <fieldset>
                            <div className="comment_form_field">
                                <label htmlFor="comment">Comment</label>
                                <svg onClick={() => { this.props.hideForm("0") }} className="_modal-close-icon" viewBox="0 0 40 40">
                                    <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
                                </svg><br />
                                <textarea className="login_input" type="text" id="comment_textarea" name="comment" maxLength="500" /><br />
                            </div>
                            <button className="submit_btn submit_padding" type="submit">Submit</button>
                        </fieldset>
                    </form>
                    <button className="paypal_btn see_comments_btn" type="button" onClick={() => { this.props.displayForm("0") }}><b>Add Comment</b></button>
                </div>
                <button className="paypal_btn see_comments_btn" type="button" onClick={() => { this.props.displayComments("comment_section_container", "see_comments_btn") }}><b>See Comments</b></button>
                <button className="bitcoin_btn see_comments_btn" type="button" onClick={this.props.hideComments}><b>Hide Comments</b></button>
            </React.Fragment>
        );
    }
}

// PropTypes for jest testing
ArticleType.propTypes = {
    thumbsUp: PropTypes.string.isRequired,
    instaMini: PropTypes.string.isRequired,
    twitterMini: PropTypes.string.isRequired,
    fbMini: PropTypes.string.isRequired,
    profileImgSmall: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    hideForm: PropTypes.func.isRequired,
    displayForm: PropTypes.func.isRequired,
    hideResponses: PropTypes.func.isRequired,
    displayComments: PropTypes.func.isRequired,
    hideComments: PropTypes.func.isRequired,
}
