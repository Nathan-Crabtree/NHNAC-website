import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import RequestIDSubmitted from './RequestIDSubmitted';

export default class RequestID extends Component {

    constructor() {
        super();
        this.state = {
            userFirstName: "Milton",
            userNickName: "Milo",
            userLastName: "Miles",
            userStreet: "1234 Yerling Street",
            userCountry: "United States",
            userState: "Mississippi",
            userCity:  "Orlando",
            userZip: "02345",
            userTier: "Ayahuasca Roadman",
            userEmail: "miltonmiles@gmail.com",
            errorsThatExist: [],
            renderChild: false,
            formActive: false,
        };
        this.displayForm = this.displayForm.bind(this);
        this.hideForm = this.hideForm.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    /**
     * displayForm() function - Shows the section's form that the comment belongs to and hides the associated "edit" button.
     *
     * @param {integer} classNameIndex
     */
     displayForm(classNameIndex) {
        if (!this.state.formActive) {
            // Array of form input IDs
            const formInputIds = ["firstName", "lastName", "userEmail", "streetId", "countryId", "stateId", "cityId", "zipId"];

            // Change border color of all input and select tags back to normal
            for (let id = 0; id < formInputIds.length; id++) {
                const element = document.getElementById(formInputIds[id]);
                element.style.borderColor = "#100B00";
            }

            // Clear error text if it currently exists on the DOM
            let errorsThatExist = this.state.errorsThatExist;
            for (let errorNo = 0; errorNo < errorsThatExist.length; errorNo++) {
                if (errorsThatExist[errorNo]) {
                    const element = document.getElementsByClassName(`error_${errorNo}`)[0];
                    element.parentElement.removeChild(element);
                    errorsThatExist[errorNo] = false;
                }
            }

            document.getElementsByClassName("signup_fields")[classNameIndex].firstChild.style.display = "none";
            document.getElementsByClassName("status_form")[classNameIndex].style.display = "block";
            document.getElementsByClassName("edit_status_btn")[classNameIndex].style.display = "none";
            document.getElementsByClassName("signup_fields")[classNameIndex].firstChild.nextSibling.style.display = "none";

            if (window.addEventListener) { // If event lister supported
                // Add pop-up warning of unsaved data if user attempts to leave page
                window.addEventListener("beforeunload", this.props.displayUnloadMessage, false);
            } else {
                window.attachEvent("beforeunload", this.props.displayUnloadMessage);
            }

            this.setState({ formActive: true });
        }
    }

    /**
     * hideForm() function - Hides the section's form that the comment belongs to and shows the associated "edit" button.
     *
     * @param {integer} classNameIndex
     */
    hideForm(classNameIndex) {
        if (this.state.formActive) {
            document.getElementsByClassName("signup_fields")[classNameIndex].children[0].style.display = "block";
            document.getElementsByClassName("status_form")[classNameIndex].style.display = "none";
            document.getElementsByClassName("edit_status_btn")[classNameIndex].style.display = "block";
            document.getElementsByClassName("signup_fields")[classNameIndex].firstChild.nextSibling.style.display = "block";

            if (window.removeEventListener) { // If event listener supported
                // Remove pop-up warning of unsaved data if user attempts to leave page
                window.removeEventListener("beforeunload", this.props.displayUnloadMessage, false);
            } else {
                window.detachEvent("beforeunload", this.props.displayUnloadMessage);
            }

            this.setState({ formActive: false })
        }
    }

    /**
     * onSubmit() function - Checks form for validation then takes content submitted from user and sends an email containing a pdf file or card mailed
     * depending on user preference.
     *
     * @param {object} e, @param {string} form
     * @returns {boolean} false
     */
    onSubmit(e, form) {
        // Use IE5-8 fallback if event object not present
        if (!e) {
            e = window.event;
        }

        e.preventDefault();

        let errorsThatExist = this.state.errorsThatExist;

        // Create error array
        let error = [];
        for (let input = 0; input < 3; input++) {
            error[input] = document.createElement('p');
        }

        if (form === "name") {
            let firstName = e.target.firstName.value;
            let nickName = e.target.nickName.value;
            let lastName = e.target.lastName.value;
            firstName = this.props.sanitizeInput(firstName);
            nickName = this.props.sanitizeInput(nickName);
            lastName = this.props.sanitizeInput(lastName);

            // Check if first name, nick name and last name exist
            if (firstName.length === 0 || lastName.length === 0) {
                if (!errorsThatExist[0]) {
                    // Render error text and change boolean
                    const formField = document.getElementsByClassName("status_form_field")[0];
                    const inputFirstName = document.getElementById("firstName");
                    const inputLastName = document.getElementById("lastName");
                    error[0].innerText = '*Please enter both your first and last name.';
                    error[0].className = "error_0";
                    error[0].style.fontSize = '.9rem';
                    error[0].style.color = '#C31F01';
                    formField.appendChild(error[0]);
                    if (firstName.length === 0) {
                        inputFirstName.style.borderColor = '#C31F01';
                    }
                    if (lastName.length === 0) {
                        inputLastName.style.borderColor = '#C31F01';
                    }
                    errorsThatExist[0] = true;
                }
            } else {
                // Capitalize the first letter of any names if haven't been done so by user
                if (firstName.length > 0) {
                    firstName = this.props.reviseName(firstName, revisedFirstName, "firstName", true);
                }
                if (nickName.length > 0) {
                    nickName = this.props.reviseName(nickName, revisedNickName, "nickName", true);
                }
                if (lastName.length > 0) {
                    lastName = this.props.reviseName(lastName, revisedLastName, "lastName", true);
                }

                this.hideForm(0);

                this.setState({
                    userFirstName: firstName,
                    userNickName: nickName,
                    userLastName: lastName
                });
            }
        }

        if (form === "email") {
            let email = e.target.userEmail.value;

            //Check for valid email input
            if (!(this.props.emailIsValid(email))) {
                if (!errorsThatExist[1]) {
                    // Render error text and change boolean
                    const formField = document.getElementsByClassName("status_form_field")[1];
                    const input = document.getElementById("userEmail");
                    error[1].innerText = '*Please enter a valid email address.';
                    error[1].className = "error_1";
                    error[1].style.fontSize = '.9rem';
                    error[1].style.color = '#C31F01';
                    formField.appendChild(error[1]);
                    input.style.borderColor = '#C31F01';
                    errorsThatExist[1] = true;
                }
            } else {
                this.hideForm(1);

                this.setState({
                    userEmail: email,
                });
            }
        }

        if (form === "address") {
            let street = e.target.street.value;
            const country = e.target.country.value;
            const state = e.target.state.value;
            const city = e.target.city.value;
            let zip = e.target.zip.value.toString();
            street = this.props.sanitizeInput(street);
            zip = this.props.sanitizeInput(zip);

            // Check and validate address input if the address form is being submitted
            if (street === "" || country === "" || state === "" || city === "" || zip === "") {
                if (!errorsThatExist[2]) {
                    // Render error text and change boolean
                    const formField = document.getElementsByClassName("status_form_field")[2];
                    const inputStreet = document.getElementById("streetId");
                    const inputCountry = document.getElementById("countryId");
                    const inputState = document.getElementById("stateId");
                    const inputCity = document.getElementById("cityId");
                    const inputZip = document.getElementById("zipId");
                    error[2].innerText = '*Please enter or select a value in all address-related fields.';
                    error[2].className = "error_2";
                    error[2].style.fontSize = '.9rem';
                    error[2].style.color = '#C31F01';
                    formField.appendChild(error[2]);
                    inputStreet.style.borderColor = '#C31F01';
                    inputCountry.style.borderColor = '#C31F01';
                    inputState.style.borderColor = '#C31F01';
                    inputCity.style.borderColor = '#C31F01';
                    inputZip.style.borderColor = '#C31F01';
                    errorsThatExist[2] = true;
                }
            } else if (street.length > 150) {
                if (!errorsThatExist[7]) {
                    // Render error text and change boolean
                    error[7].innerText = '*Please enter a value in the "street" field less than 150 characters.';
                    error[7].className = "error_7";
                    error[7].style.fontSize = '.9rem';
                    error[7].style.color = '#C31F01';
                    formField.appendChild(error[4]);
                    inputStreet.style.borderColor = '#C31F01';
                    inputCountry.style.borderColor = '#C31F01';
                    inputState.style.borderColor = '#C31F01';
                    inputCity.style.borderColor = '#C31F01';
                    inputZip.style.borderColor = '#C31F01';
                    tempErrorsThatExist[7] = true;
                }
            } else {
                this.hideForm(2);

                this.setState({
                    userStreet: street,
                    userCountry: country,
                    userState: state,
                    userCity: city,
                    userZip: zip,
                });
            }
        }

        if (form === "request_id") {
            let userData = [this.state.userFirstName, this.state.userLastName, this.state.userStreet, this.state.userCountry,
            this.state.userState, this.state.userCity, this.state.userZip, this.state.userTier, this.state.userEmail];

            // Create an email with pdf draft and send to user and admin for mail-in if either or both are selected

            if (window.removeEventListener) { // If event listener supported
                // Remove pop-up warning of unsaved data if user attempts to leave page
                window.removeEventListener("beforeunload", this.props.displayUnloadMessage, false);
            } else {
                window.detachEvent("beforeunload", this.props.displayUnloadMessage);
            }

            // Redirect to form submitted page
            for (let data = 0; data < userData.length; data++) {
                if (data == null) {
                    return false;
                } else {
                    this.setState({ renderChild: true });
                }
            }
        }
    }

    componentDidMount() {
        // When component is rendered, bring user to top of page
        window.scrollTo(0, 0);

        // This script tag is important for sign-up form to work properly.
        // Provides country data for users to help insert exact address location.
        // Source: https://geodata.solutions - Zane
        if (!this.props.geoDataExists) {
            const script = document.createElement("script");

            script.src = "//geodata.solutions/includes/countrystatecity.js";
            script.async = true;

            document.body.appendChild(script);

            this.props.setGeoDataExists();
        }
    }

    componentWillUnmount() {
        if (this.state.formActive) {
            if (window.removeEventListener) { // If event listener supported
                // Remove pop-up warning of unsaved data if user attempts to leave page
                window.removeEventListener("beforeunload", this.props.displayUnloadMessage, false);
            } else {
                window.detachEvent("beforeunload", this.props.displayUnloadMessage);
            }
        }
    }

    render() {
        return( this.state.renderChild ?
            <RequestIDSubmitted userFirstName={this.state.userFirstName} userLastName={this.state.userLastName} userStreet={this.state.userStreet}
            userCountry={this.state.userCountry} userState={this.state.userState} userCity={this.state.userCity} userZip={this.state.userZip}
            userTier={this.state.userTier} userEmail={this.state.userEmail} />
            :
            <div className="request_id_form">
                <div>
                    <div className="center_text">
                        <h2>Request New ID Card</h2>
                        <p>Please review your information below and make sure is correct before submitting a request</p>
                    </div>
                    <div className="signup_fields">
                        <h4>Name</h4>
                        <p>{this.state.userFirstName} {this.state.userLastName}</p>
                        <form id="name" className="status_form" onSubmit={ (e) => { this.onSubmit(e, "name") } }>
                            <fieldset>
                                <div className="status_form_field">
                                    <label htmlFor="name">Name</label>
                                    <svg onClick={ () => { this.hideForm(0) } } className="_modal-close-icon" viewBox="0 0 40 40">
                                        <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
                                    </svg><br />
                                    <br />
                                    <div>
                                        <label htmlFor="firstName">First Name</label><br />
                                        <input className="signup_input" type="text" id="firstName" name="first_name" maxLength="50" placeholder={`${this.state.userFirstName}`} /><br />
                                        <label htmlFor="nickName">Nick Name</label><br />
                                        <input className="signup_input" type="text" id="nickName" name="nick_name" maxLength="50" placeholder={`${this.state.userNickName}`} /><br />
                                        <label htmlFor="lastName">Last Name</label><br />
                                        <input className="signup_input" type="text" id="lastName" name="last_name" maxLength="50" placeholder={`${this.state.userLastName}`} /><br />
                                    </div>
                                </div>
                                <button className="submit_btn submit_padding" type="submit">Submit</button>
                            </fieldset>
                        </form>
                        <button onClick={ () => { this.displayForm(0) } } className="edit_status_btn text_btn" type="button"><b>edit</b></button>
                    </div>
                    <div className="signup_fields">
                        <h4>Email</h4>
                        <p>{this.state.userEmail}</p>
                        <form id="email" className="status_form" onSubmit={ (e) => { this.onSubmit(e, "email") } }>
                            <fieldset>
                                <div className="status_form_field">
                                    <label htmlFor="email">Email</label>
                                    <svg onClick={ () => { this.hideForm(1) } } className="_modal-close-icon" viewBox="0 0 40 40">
                                        <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
                                    </svg><br />
                                    <br />
                                    <div>
                                        <input className="signup_input" type="text" id="userEmail" name="user_email" maxLength="320" placeholder={`${this.state.userEmail}`} /><br />
                                    </div>
                                </div>
                                <button className="submit_btn submit_padding" type="submit">Submit</button>
                            </fieldset>
                        </form>
                        <button onClick={ () => { this.displayForm(1) } } className="edit_status_btn text_btn" type="button"><b>edit</b></button>
                    </div>
                    <div className="signup_fields">
                        <h4>Address</h4>
                        <p>{this.state.userStreet} {this.state.userCity}, {this.state.userState}, {this.state.userCountry} {this.state.userZip}</p>
                        <form id="address" className="status_form" onSubmit={ (e) => { this.onSubmit(e, "address") }}>
                            <fieldset>
                                <div className="status_form_field">
                                    <label htmlFor="address">Address</label><br />
                                    <svg onClick={ () => { this.hideForm(2) } } className="_modal-close-icon" viewBox="0 0 40 40">
                                        <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
                                    </svg><br />
                                    <div>
                                        <input className="signup_input" type="text" name="street" id="streetId" maxLength="150" placeholder="Building number, Street name, Apartment ID" />
                                        <div className="geo_location">
                                            <select name="country" className="countries" id="countryId">
                                                <option value="">Select Country</option>
                                            </select>
                                        </div>
                                        <div className="geo_location">
                                                <select name="state" className="states" id="stateId">
                                                    <option value="">Select State</option>
                                                </select>
                                        </div>
                                        <div className="geo_location">
                                            <select name="city" className="cities" id="cityId">
                                                <option value="">Select City</option>
                                            </select>
                                        </div><br />
                                        <input type="text" name="zip" id="zipId" maxLength="10" placeholder="Zip" /><br />
                                    </div>
                                </div>
                                <button className="submit_btn submit_padding" type="submit">Submit</button>
                            </fieldset>
                        </form>
                        <button onClick={ () => { this.displayForm(2) } } className="edit_status_btn text_btn" type="button"><b>edit</b></button>
                    </div>
                    <div className="signup_fields">
                        <h4>Tier</h4>
                        <p>{this.state.userTier}</p>
                    </div>
                    <div className="signup_fields request_id_checkboxes">
                        <div className="newsletter_div center_text">
                            <input type="checkbox" id="by_email" name="by_email" />
                            <label className="center_text" htmlFor="by_email">By email</label><br />
                        </div>
                        <div className="newsletter_div center_text">
                            <input type="checkbox" id="by_mail" name="by_mail" />
                            <label className="center_text" htmlFor="by_mail">By mail</label><br />
                        </div>
                    </div>
                    <div className="signup_fields">
                        <div className="pay_with_div center_text">
                            <button className="paypal_btn" onClick={ (e) => { this.onSubmit(e, "request_id") } }>Request New ID Card</button>
                        </div>
                    </div>
                </div>
                <span>Experiencing any problems? <Link to="/about#contact">Click here for contact support information</Link>.</span>
            </div>
        );
    }
}

// PropTypes for jest testing in App.test.js
RequestID.propTypes = {
    geoDataExists: PropTypes.bool.isRequired,
    setGeoDataExists: PropTypes.func.isRequired,
    emailIsValid: PropTypes.func.isRequired,
    sanitizeInput: PropTypes.func.isRequired,
    displayUnloadMessage: PropTypes.func.isRequired
}
