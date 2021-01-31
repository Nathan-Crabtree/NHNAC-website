import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Container from '../Container';

export default class Profile extends Component {

    componentDidMount() {
        // When component is rendered, bring user to top of page.
        window.scrollTo(0, 0);
    }

    render() {
        return(
            <React.Fragment>
                <div className="profile_container1">
                    <div>
                        <div>
                            <img className="profile_img_large" srcSet={this.props.profileImgLarge} alt="Portrait of user." />
                            <button type="button">Edit Profile Picture</button>
                        </div>
                        <section>
                            <h2>Harper Young</h2>
                            <p>Tier: </p>
                            <p>Points: </p>
                            <p>Age: </p>
                            <p>Student <img srcSet={this.props.apple} alt="Student account displayed by apple." /></p>
                            <div className="clear"></div>
                            <div>
                                <p>Status: none</p>&nbsp;
                                {/* <form id="comment" className="comment_form_1_0" onSubmit={ this.onSubmit }>
                                    <fieldset>
                                        <div className="comment_form_field">
                                            <label htmlFor="comment">Comment</label>
                                            <svg onClick={ () => { this.hideForm("comment_form_1_0", "comment_content_1_0", true) } } className="_modal-close-icon" viewBox="0 0 40 40">
                                                <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
                                            </svg><br />
                                            <textarea className="login_input" type="text" id="comment" name="comment" readOnly value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                                            sed do eiusmod tempor incididunt ut labore et dolore 
                                            magna aliqua." /><br />
                                        </div>
                                        <button className="submit_btn submit_padding" type="submit">Submit</button>
                                    </fieldset>
                                </form>
                                <button onClick={ () => { this.displayForm("comment_form_1_0", "comment_content_1_0", true) } } className="text_btn" type="button"><b>edit</b></button> */}
                            </div>
                            <Link to="/account_settings?usedid=1">Account Settings</Link><br />
                            <button onClick={ () => { } } className="text_btn" type="button"><b>Customize Page</b></button>
                            <div>
                                <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/"><img srcSet={this.props.instaMini} alt="Author's instagram link." /></a>
                                <a target="_blank" rel="noopener noreferrer" href="https://www.twitter.com/"><img srcSet={this.props.twitterMini} alt="Author's twitter link." /></a>
                                <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/"><img srcSet={this.props.fbMini} alt="Author's facebook link." /></a>
                            </div>
                        </section>
                    </div>
                    <button className="paypal_btn" type="button"><h4>Go to current course: <br />Course Name (50% complete)</h4></button>
                    <section>
                        <Link to="/direct_message?userid=1">Messages (1)</Link><br />
                        <Container onSubmit={ () => {} } triggerText="Connections" /><br />
                        <Link to="/id_request?userid=1">Request new ID card</Link><br />
                        <Link to="/download_archive?userid=1"></Link>
                        <Container onSubmit={ () => {} } triggerText="Feedback" />
                    </section>
                    <section>
                        <h2>Certifications</h2>
                        <ul>
                            <li>12/2/2020, 3:35pm - Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                            <li>1/1/2021, 1:50pm - Tempor incididunt ut labore et dolore magna aliqua.</li>
                            <li>5/4/2020, 2:30pm - Nullam non nisi.</li>
                            <li>6/4/2020, 6:45am - Vulputate eu scelerisque felis.</li>
                        </ul>
                        <Link to="/">Click here to see more</Link>
                    </section>
                    <section>
                        <h2>Updates</h2>
                        <ul>
                            <li>12/2/2020, 3:35pm - Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                            <li>1/1/2021, 1:50pm - Tempor incididunt ut labore et dolore magna aliqua.</li>
                            <li>5/4/2020, 2:30pm - Nullam non nisi.</li>
                            <li>6/4/2020, 6:45am - Vulputate eu scelerisque felis.</li>
                        </ul>
                        <Link to="/">Click here to see more</Link>
                    </section>
                </div>
                <div className="profile_container2">
                    <section>
                        <h2>Recent Activity</h2> 
                        <ul>
                            <li>12/2/2020, 3:35pm - Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                            <li>1/1/2021, 1:50pm - Tempor incididunt ut labore et dolore magna aliqua.</li>
                            <li>5/4/2020, 2:30pm - Nullam non nisi.</li>
                            <li>6/4/2020, 6:45am - Vulputate eu scelerisque felis.</li>
                        </ul>
                        <Link to="/">Click here to see more</Link>
                    </section>
                    <section>
                        <h2>Recent Achievements</h2>
                        <ul>
                            <li>12/2/2020, 3:35pm - Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                            <li>1/1/2021, 1:50pm - Tempor incididunt ut labore et dolore magna aliqua.</li>
                            <li>5/4/2020, 2:30pm - Nullam non nisi.</li>
                            <li>6/4/2020, 6:45am - Vulputate eu scelerisque felis.</li>
                        </ul>
                        <Link to="/">Click here to see more</Link> 
                    </section>
                    <section>
                        <h2>Recent Badges</h2>
                        <ul>
                            <li><img srcSet={this.props.badge} alt="User's Silver badge." /></li>
                        </ul>
                        <Link to="/">Click here to see more</Link> 
                    </section>
                </div>
                <div className="clear"></div>
            </React.Fragment>
        );
    }
} 

Profile.propTypes = {
    apple: PropTypes.string.isRequired,
    book: PropTypes.string.isRequired,
    twitterMini: PropTypes.string.isRequired,
    fbMini: PropTypes.string.isRequired,
    instaMini: PropTypes.string.isRequired,
    profileImgLarge: PropTypes.string,
    badge: PropTypes.string
}