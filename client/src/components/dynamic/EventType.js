import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Import leaflet library react dependencies
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import markerIconPng from "../../../node_modules/leaflet/dist/images/marker-icon.png"
import { Icon } from 'leaflet'
import '../../../node_modules/leaflet/dist/leaflet.css';

export default class EventType extends Component {

    constructor() {
        super();
        this.state = {
            position: [36.88, -92.47]
        }
        this.removeAttendee = this.removeAttendee.bind(this);
        this.addAttendee = this.addAttendee.bind(this);
        this.displayAttendBtnOrForm = this.displayAttendBtnOrForm.bind(this);
    }

    /**
     * removeAttendee() function - Removes attendee's information from database and reloads the component.
     * 
     */
    removeAttendee() {

    }

    /**
     * addAttendee() function - Adds the attendee's info onto the database and reloads the component.
     * 
     * @param {event} e 
     */
    addAttendee(e) {
        if (this.state.isAuthenticated) {
            // Add the attendee's info onto the database and reload the component
        } else {
            // Add the guest attendee's name onto the database and reload the component
        }
    }

    /**
     * displayAttendBtnOrForm() function - Displays either guest form or "attend" button depending on whether a user is 
     * authenticated or not.
     * 
     */
    displayAttendBtnOrForm() {
        if (!this.props.isAuthenticated) { 
            return <form className="guest_form" onSubmit={this.addAttendee}>
                        <label htmlFor="name">First Name: </label><br />
                        <input className="signup_input" type="text" id="name" name="name" /><br />
                        <button type="submit" className="paypal_btn">Click to attend</button>
                    </form>; 
        } else { 
            return <button onClick={this.addAttendee} className="paypal_btn">Click to attend</button>; 
        }
    }

    render() {
        return(
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
                        <section>
                            <h2>Going to event (3)</h2>
                            <ul>
                                <li>
                                    <button className="_modal-close" onClick={this.removeAttendee} ><svg className="_modal-close-icon" viewBox="0 0 40 40">
                                        <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
                                    </svg></button>
                                    <p><img className="profile_img_small" srcSet={this.props.profileImgSmall} alt="Portrait of user." /></p>
                                    <p><b>Milton Miles</b></p>
                                </li>
                                <li><hr /></li>
                                <li>
                                    <p><img className="profile_img_small" srcSet={this.props.profileImgSmall} alt="Portrait of user." /></p>
                                    <p><b>Milton Miles</b></p>
                                </li>
                                <li><hr /></li>
                                <li>
                                    <p><img className="profile_img_small" srcSet={this.props.profileImgSmall} alt="Portrait of user." /></p>
                                    <p><b>Milton Miles</b></p>
                                </li>
                                <li><hr /></li>
                            </ul>
                            <Link to="/">Click here to see more</Link>
                        </section>
                        {this.displayAttendBtnOrForm()}
                    </div>
                    <section className="location_time_section">
                        <h2>Time and location</h2>
                        <p>Time: 12/2/2021, 11:00AM CST</p>
                        <p>Chapter: Main</p>
                        <p>Location: 28310 East, State Hwy 14, Ava, MO 65608</p>
                        <hr />
                        {/* Src: https://react-leaflet.js.org/docs/start-setup - Zane */}
                        <MapContainer style={{ height: "200px", width: "100%" }} center={this.state.position} zoom={13} scrollWheelZoom={false}>
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker icon={new Icon({iconUrl: markerIconPng})} position={this.state.position}>
                            <Popup>
                            28310 East, State Hwy 14, Ava, MO 65608
                            </Popup>
                        </Marker>
                        </MapContainer>
                    </section>
                </div>
                <aside className="bottom_aside_container">
                    <div>
                        <Link to="/search?query=tag1">Tag 1</Link>
                        <Link to="/search?query=tag2">Tag 2</Link>
                        <Link to="/search?query=tag3">Tag 3</Link>
                    </div>
                    <div>
                        <ul>
                            <li><img srcSet={this.props.thumbsUp} alt="Like this button." /></li>
                            <li><b>3.5 likes</b></li>
                        </ul>
                        <p>Like this article</p>
                        <div className="clear"></div>
                    </div>
                    <div>
                        <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/"><img srcSet={this.props.instaMini} alt="Author's instagram link." /></a>
                        <a target="_blank" rel="noopener noreferrer" href="https://www.twitter.com/"><img srcSet={this.props.twitterMini} alt="Author's twitter link." /></a>
                        <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/"><img srcSet={this.props.fbMini} alt="Author's facebook link." /></a>
                    </div>
                    <div className="clear"></div>
                </aside>
                <div className="comment_section_container">
                    <section className="comment_container">
                        <hr />
                        <div>
                            <img className="profile_img_small" srcSet={this.props.profileImgSmall} alt="Portrait of user." />
                            <div>
                                <h4><Link to="/profile?userid=1&view=viewer">Milton Miles</Link></h4>
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
                                <li><img srcSet={this.props.thumbsUp} alt="Like this button." /></li>
                                <li><p><b>3.5k likes</b></p></li>
                            </ul>
                            <div className="clear"></div>
                            <div>
                                <p className="comment_content_1_0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                                sed do eiusmod tempor incididunt ut labore et dolore 
                                magna aliqua.</p>
                                <form id="comment_1_0" className="comment_form_1_0" onSubmit={ this.props.onSubmit }>
                                    <fieldset>
                                        <div className="comment_form_field">
                                            <label htmlFor="comment">Comment</label>
                                            <svg onClick={ () => { this.props.hideForm("comment_form_1_0", "comment_content_1_0", true) } } className="_modal-close-icon" viewBox="0 0 40 40">
                                                <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
                                            </svg><br />
                                            <textarea className="login_input" type="text" id="comment_1_0_textarea" name="comment" readOnly value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                                            sed do eiusmod tempor incididunt ut labore et dolore 
                                            magna aliqua." /><br />
                                        </div>
                                        <button className="submit_btn submit_padding" type="submit">Submit</button>
                                    </fieldset>
                                </form>
                                <ul>
                                    <li><button onClick={ () => { this.props.displayForm("comment_form_1_0", "comment_content_1_0", true) } } className="text_btn" type="button"><b>Edit</b></button></li>
                                    <li><button onClick={ () => {} } className="text_btn" type="button"><b>Delete</b></button></li>
                                    {/*<li><Container onSubmit={this.props.onSubmitApp} triggerText="Report" /></li>*/}
                                </ul>
                                <div className="response_section_container">
                                    <section className="response_container">
                                        <div>
                                            <div>
                                                <img className="profile_img_small" srcSet={this.props.profileImgSmall} alt="Portrait of user." />
                                                <div>
                                                    <h4><Link to="/profile?userid=1&view=viewer">Milton Miles</Link></h4>
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
                                                <li><img srcSet={this.props.thumbsUp} alt="Like this button." /></li>
                                                <li><p><b>3.5 likes</b></p></li>
                                            </ul>
                                            <div className="clear"></div>
                                            <div>
                                                <p className="comment_content_1_1">Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                                                sed do eiusmod tempor incididunt ut labore et dolore 
                                                magna aliqua.</p>
                                                <form id="comment_1_1" className="comment_form_1_1" onSubmit={ this.props.onSubmit }>
                                                    <fieldset>
                                                        <div className="comment_form_field">
                                                            <label htmlFor="comment">Comment</label>
                                                            <svg onClick={ () => { this.props.hideForm("comment_form_1_1", "comment_content_1_1", true, true) } } className="_modal-close-icon" viewBox="0 0 40 40">
                                                                <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
                                                            </svg><br />
                                                            <textarea className="login_input" type="text" id="comment_1_1_textarea" name="comment" readOnly value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                                                            sed do eiusmod tempor incididunt ut labore et dolore 
                                                            magna aliqua." /><br />
                                                        </div>
                                                        <button className="submit_btn submit_padding" type="submit">Submit</button>
                                                    </fieldset>
                                                </form>
                                            </div>
                                            <ul>
                                                <li><button onClick={ () => { this.props.displayForm("comment_form_1_1", "comment_content_1_1", true, true) } } className="text_btn" type="button"><b>Edit</b></button></li>
                                                <li><button onClick={ () => {} } className="text_btn" type="button"><b>Delete</b></button></li>
                                                {/*<li><Container onSubmit={this.props.onSubmitApp} triggerText="Report" /></li>*/}
                                            </ul>
                                            <hr />
                                        </div>
                                    </section> 
                                    { /* classes "response_form" and "comment_form" exist because they're to represent the creation of a new comment or response. - Zane */}
                                    <form id="response" className="response_form" onSubmit={ this.props.onSubmit }>
                                        <fieldset>
                                            <div className="comment_form_field">
                                                <label htmlFor="comment">Response</label>
                                                <svg onClick={ () => { this.props.hideForm("response_form", "comment_btn")} } className="_modal-close-icon" viewBox="0 0 40 40">
                                                    <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
                                                </svg><br />
                                                <textarea className="login_input" type="text" id="response_textarea" name="comment" /><br />
                                            </div>
                                            <button className="submit_btn submit_padding" type="submit">Submit</button>
                                        </fieldset>
                                    </form>
                                    <button className="paypal_btn comment_btn" type="button" onClick={ () => { this.props.displayForm("response_form","comment_btn")} }><b>Add Response</b></button>
                                </div>
                            </div>
                            <button className="paypal_btn comment_btn" type="button" onClick={ () => { this.props.displayComments("response_section_container", "comment_btn") }}><b>See Responses</b></button>
                            <button className="bitcoin_btn comment_btn" type="button" onClick={this.props.hideResponses}><b>Hide Responses</b></button>
                        </div>
                        <div className="clear"></div>
                    </section>
                    <form id="comment" className="comment_form" onSubmit={ this.props.onSubmit }>
                        <fieldset>
                            <div className="comment_form_field">
                                <label htmlFor="comment">Comment</label>
                                <svg onClick={ () => { this.props.hideForm("comment_form", "see_comments_btn") }} className="_modal-close-icon" viewBox="0 0 40 40">
                                    <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
                                </svg><br />
                                <textarea className="login_input" type="text" id="comment_textarea" name="comment" /><br />
                            </div>
                            <button className="submit_btn submit_padding" type="submit">Submit</button>
                        </fieldset>
                    </form>
                    <button className="paypal_btn see_comments_btn" type="button" onClick={ () => { this.props.displayForm("comment_form", "see_comments_btn")} }><b>Add Comment</b></button>
                </div>
                <button className="paypal_btn see_comments_btn" type="button" onClick={ () => { this.props.displayComments("comment_section_container", "see_comments_btn")} }><b>See Comments</b></button>
                <button className="bitcoin_btn see_comments_btn" type="button" onClick={this.props.hideComments}><b>Hide Comments</b></button>                
            </React.Fragment>
        );
    }
}

EventType.propTypes = {
    thumbsUp: PropTypes.string.isRequired,
    instaMini: PropTypes.string.isRequired,
    twitterMini: PropTypes.string.isRequired,
    fbMini: PropTypes.string.isRequired,
    profileImgSmall: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onSubmitApp: PropTypes.func,
    hideForm: PropTypes.func.isRequired,
    displayForm: PropTypes.func.isRequired,
    hideResponses: PropTypes.func.isRequired,
    displayComments: PropTypes.func.isRequired,
    hideComments: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
}