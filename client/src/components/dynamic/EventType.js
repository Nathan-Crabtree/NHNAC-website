import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Import leaflet library react dependencies
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import markerIconPng from "../../../node_modules/leaflet/dist/images/marker-icon.png"
import { Icon } from 'leaflet'
import '../../../node_modules/leaflet/dist/leaflet.css';

var CryptoJS = require("crypto-js");
require('dotenv').config();

export default class EventType extends Component {

    constructor() {
        super();
        this.state = {
            position: [36.88, -92.47],
            attending: false,
            maxPeopleAllowed: 10,
            currentPeopleGoing: 5,
            errorExists: false
        }
        this.removeAttendee = this.removeAttendee.bind(this);
        this.addAttendee = this.addAttendee.bind(this);
        this.displayAttendBtnOrForm = this.displayAttendBtnOrForm.bind(this);
        this.displayAttendees = this.displayAttendees.bind(this);
    }

    /**
     * Removes attendee's information from database and reloads the component.
     *
     */
    removeAttendee = () => this.setState({ attending: false });


    /**
     * Adds the attendee's info onto the database and reloads the component.
     *
     * @param {event} e
     */
    addAttendee(e) {
        const authenticatedAndIsAvailable = this.props.isAuthenticated && this.state.currentPeopleGoing < this.state.maxPeopleAllowed;
        const target = e.target || e.srcElement;
        let submit = document.getElementsByClassName("paypal_btn")[0];
        let errorExists = false;

        // Use IE5-8 fallback if event object isn't present
        if (!e) {
            e = window.event;
        }

        e.preventDefault();

        if (authenticatedAndIsAvailable) {
            // Add the attendee's info onto the database and reload the component
            this.setState({ attending: true });
        }

        // This form is vulnerable for ddos attack. - Zane
        if (!authenticatedAndIsAvailable) {
            // Clear error text if it currently exists on the DOM
            if (this.state.errorExists) {
                const element = document.getElementsByClassName("error")[0];
                element.parentElement.removeChild(element);
                this.setState({ errorExists: false });
            }

            // Validate for guest name
            let name = target.name.value;
            name = this.props.sanitizeInput(name);
            const guestNameIsntFormal = name.length > 0 && name[0] !== name[0].toUpperCase();

            if (name.length === 0) {
                if (!errorExists) {
                    // Render error text and change boolean
                    const formField = document.getElementsByClassName("guest_form")[0].firstChild;
                    const inputName = document.getElementById("name");
                    let error = document.createElement("p");
                    error.innerText = '*Please enter your name.';
                    error.className = "error";
                    error.style.fontSize = '.9rem';
                    error.style.color = '#C31F01';
                    formField.appendChild(error);
                    inputName.style.borderColor = '#C31F01';
                    errorExists = true;
                }
            }

            if (guestNameIsntFormal) {
                if (!errorExists) {
                    // Render error text and change boolean
                    const formField = document.getElementsByClassName("guest_form")[0].firstChild;
                    const inputName = document.getElementById("name");
                    let error = document.createElement("p");
                    error.innerText = '*Please capitalize the first letter in your name.';
                    error.className = "error";
                    error.style.fontSize = '.9rem';
                    error.style.color = '#C31F01';
                    formField.appendChild(error);
                    inputName.style.borderColor = '#C31F01';
                    errorExists = true;
                }
            }

            if (!errorExists) {
                // Add the guest attendee's name onto the database and reload the component
                // Disable submit button
                submit.disabled = true;
                submit.setAttribute("class", "disabled_btn");

                this.setState({ attending: true });
            } else {
                this.setState({ errorExists: true });
            }
        }
    }

    /**
     * Displays either guest form or "attend" button depending on whether a user is
     * authenticated or not.
     *
     * @returns {class} Component - A React Component.
     */
    displayAttendBtnOrForm() {
        // Query the database to see if authenticated user is already attending, fill maxPeopleAllowed and location

        // Render proper component according to state variables
        if (!this.props.isAuthenticated) {
            if (this.state.attending) {
                return <button onClick={() => { }} className="paypal_btn">Fund this event</button>;
            } else {
                return <form className="guest_form" onSubmit={this.addAttendee}>
                    <fieldset>
                        <label htmlFor="name">First Name: </label><br />
                        <input className="signup_input" type="text" id="name" name="name" maxLength="50" /><br />
                    </fieldset>
                    <button id="submit" type="submit" className="paypal_btn">Click to attend</button>
                </form>;
            }
        } else {
            if (this.state.attending) {
                return <button onClick={() => { }} className="paypal_btn">Fund this event</button>;
            } else {
                return <button onClick={this.addAttendee} className="paypal_btn">Click to attend</button>;
            }
        }
    }

    /**
     * Queries for users that return true for attending the specific event and renders their profile page links 
     * and photos within the returned component.
     * 
     * NOTE: In rough stage. - Zane
     * 
     * @returns {class} Component - A React Component.
     */
    displayAttendees() {
        if (this.props.isAuthenticated) {
            return <section>
                <h2>Going to event (3)</h2>
                <ul>
                    <li>
                        <button className="_modal-close" onClick={this.removeAttendee} ><svg className="_modal-close-icon" viewBox="0 0 40 40">
                            <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
                        </svg></button>
                        <p><img className="profile_img_small" srcSet={this.props.profileImgSmall} alt="Portrait of user." /></p>
                        <h4><Link to={`/profile/${CryptoJS.AES.encrypt('1', process.env.REACT_APP_KEY).toString()}}?view=viewer`}>Milton Miles</Link></h4>
                    </li>
                    <li><hr /></li>
                    <li>
                        <p><img className="profile_img_small" srcSet={this.props.profileImgSmall} alt="Portrait of user." /></p>
                        <h4><Link to={`/profile/${CryptoJS.AES.encrypt('1', process.env.REACT_APP_KEY).toString()}}?view=viewer`}>Milton Miles</Link></h4>
                    </li>
                    <li><hr /></li>
                    <li>
                        <p><img className="profile_img_small" srcSet={this.props.profileImgSmall} alt="Portrait of user." /></p>
                        <h4><Link to={`/profile/${CryptoJS.AES.encrypt('1', process.env.REACT_APP_KEY).toString()}}?view=viewer`}>Milton Miles</Link></h4>
                    </li>
                    <li><hr /></li>
                </ul>
                <Link to="/">Click here to see more</Link>
            </section>
        } else {
            return <section>
                <h2>Going to event (3)</h2>
                <ul>
                    <li>
                        <button className="_modal-close" onClick={this.removeAttendee} ><svg className="_modal-close-icon" viewBox="0 0 40 40">
                            <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
                        </svg></button>
                        <p><img className="profile_img_small" srcSet={this.props.profileImgSmall} alt="Portrait of user." /></p>
                        <h4><Link to="/login">Milton Miles</Link></h4>
                    </li>
                    <li><hr /></li>
                    <li>
                        <p><img className="profile_img_small" srcSet={this.props.profileImgSmall} alt="Portrait of user." /></p>
                        <h4><Link to="/login">Milton Miles</Link></h4>
                    </li>
                    <li><hr /></li>
                    <li>
                        <p><img className="profile_img_small" srcSet={this.props.profileImgSmall} alt="Portrait of user." /></p>
                        <h4><Link to="/login">Milton Miles</Link></h4>
                    </li>
                    <li><hr /></li>
                </ul>
                <Link to="/">Click here to see more</Link>
            </section>
        }
    }

    render() {
        const {
            thumbsUp,
            instaMini,
            twitterMini,
            fbMini,
            profileImgSmall
        } = this.props;
        const { position } = this.state;
        const { REACT_APP_KEY } = process.env

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
                <div className="event_info_container">
                    <div className="event_attendees_div">
                        {this.displayAttendees()}
                        {this.displayAttendBtnOrForm()}
                    </div>
                    <section className="location_time_section">
                        <h2>Time and location</h2>
                        <p>Time: 12/2/2021, 11:00AM CST</p>
                        <p>Chapter: Main</p>
                        <p>Location: 28310 East, State Hwy 14, Ava, MO 65608</p>
                        <hr />
                        {/* Src: https://react-leaflet.js.org/docs/start-setup */}
                        <MapContainer style={{ height: "200px", width: "100%" }} center={position} zoom={13} scrollWheelZoom={true}>
                            <TileLayer
                                attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker icon={new Icon({ iconUrl: markerIconPng })} position={position}>
                                <Popup>
                                    28310 East, State Hwy 14, Ava, MO 65608
                                </Popup>
                            </Marker>
                        </MapContainer>
                    </section>
                </div>
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
                                            <svg onClick={() => { this.props.hideForm(1, true) }} className="_modal-close-icon" viewBox="0 0 40 40">
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
                                    <li><button onClick={() => { this.props.displayForm(1, true) }} className="text_btn" type="button"><b>Edit</b></button></li>
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
                                                            <svg onClick={() => { this.props.hideForm(1, true, true) }} className="_modal-close-icon" viewBox="0 0 40 40">
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
                                                <li><button onClick={() => { this.props.displayForm(1, true, true) }} className="text_btn" type="button"><b>Edit</b></button></li>
                                                <li><button onClick={() => { }} className="text_btn" type="button"><b>Delete</b></button></li>
                                                {/* Report feature is currently disabled. - Zane */}
                                                {/*<li><Container triggerText="Report" /></li>*/}
                                            </ul>
                                            <hr />
                                        </div>
                                    </section>
                                    { /* Classes "response_form" and "comment_form" exist because they're to represent the creation of a new comment or response. - Zane */}
                                    <form id="response" className="response_form" onSubmit={this.props.onSubmit}>
                                        <fieldset>
                                            <div className="comment_form_field">
                                                <label htmlFor="comment">Response</label>
                                                <svg onClick={() => { this.props.hideForm("response_form", "comment_btn") }} className="_modal-close-icon" viewBox="0 0 40 40">
                                                    <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
                                                </svg><br />
                                                <textarea className="login_input" type="text" id="response_textarea" name="comment" maxLength="500" /><br />
                                            </div>
                                            <button className="submit_btn submit_padding" type="submit">Submit</button>
                                        </fieldset>
                                    </form>
                                    <button className="paypal_btn comment_btn" type="button" onClick={() => { this.props.displayForm("response_form", "comment_btn") }}><b>Add Response</b></button>
                                </div>
                            </div>
                            <button className="paypal_btn comment_btn" type="button" onClick={() => { this.props.displayComments("response_section_container", "comment_btn") }}><b>See Responses</b></button>
                            <button className="bitcoin_btn comment_btn" type="button" onClick={this.props.hideResponses}><b>Hide Responses</b></button>
                        </div>
                        <div className="clear"></div>
                    </section>
                    <form id="comment" className="comment_form" onSubmit={this.props.onSubmit}>
                        <fieldset>
                            <div className="comment_form_field">
                                <label htmlFor="comment">Comment</label>
                                <svg onClick={() => { this.props.hideForm("comment_form", "see_comments_btn") }} className="_modal-close-icon" viewBox="0 0 40 40">
                                    <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
                                </svg><br />
                                <textarea className="login_input" type="text" id="comment_textarea" name="comment" maxLength="500" /><br />
                            </div>
                            <button className="submit_btn submit_padding" type="submit">Submit</button>
                        </fieldset>
                    </form>
                    <button className="paypal_btn see_comments_btn" type="button" onClick={() => { this.props.displayForm("comment_form", "see_comments_btn") }}><b>Add Comment</b></button>
                </div>
                <button className="paypal_btn see_comments_btn" type="button" onClick={() => { this.props.displayComments("comment_section_container", "see_comments_btn") }}><b>See Comments</b></button>
                <button className="bitcoin_btn see_comments_btn" type="button" onClick={this.props.hideComments}><b>Hide Comments</b></button>
            </React.Fragment>
        );
    }
}

// PropTypes for jest testing
EventType.propTypes = {
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
    isAuthenticated: PropTypes.bool.isRequired,
    sanitizeInput: PropTypes.func.isRequired
}
