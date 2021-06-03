import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import RequestIDSubmitted from './RequestIDSubmitted';

export default class RequestID extends Component { 

    constructor() {
        super();
        this.state = {
            userFirstName: "Milton",
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
        };
        this.displayForm = this.displayForm.bind(this);
        this.hideForm = this.hideForm.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    /**
     * displayForm() function - Shows the section's form that the comment belongs to and hides the associated "edit" button.
     * 
     * @param {integer} classNameIndex 
     * 
     */
     displayForm(classNameIndex) {
        document.getElementsByClassName("signup_fields")[classNameIndex].children[0].style.display = "none";
        document.getElementsByClassName("status_form")[classNameIndex].style.display = "block";
        document.getElementsByClassName("edit_status_btn")[classNameIndex].style.display = "none";
        document.getElementsByClassName("signup_fields")[classNameIndex].children[1].style.display = "none";
    }

    /**
     * hideForm() function - Hides the section's form that the comment belongs to and shows the associated "edit" button.
     * 
     * @param {integer} classNameIndex 
     * 
     */
    hideForm(classNameIndex) {
        document.getElementsByClassName("signup_fields")[classNameIndex].children[0].style.display = "block";
        document.getElementsByClassName("status_form")[classNameIndex].style.display = "none";
        document.getElementsByClassName("edit_status_btn")[classNameIndex].style.display = "block";
        document.getElementsByClassName("signup_fields")[classNameIndex].children[1].style.display = "block";
    }

    /**
     * onSubmit() function - Checks form for validation then takes content submitted from user and sends an email containing a pdf file or card mailed
     * depending on user preference. 
     * 
     * @param {object} e, @param {string} form  
     * 
     */
    onSubmit(e, form) {
        e.preventDefault();

        // Create error array
        let error = [];
        for (let input = 0; input < 2; input++) {
            error[input] = document.createElement('p');
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

        if (form === "name") {
            const firstName = e.target.firstName.value;
            const lastName = e.target.lastName.value;

            this.hideForm(0);

            this.setState({
                userFirstName: firstName,
                userLastName: lastName
            });
        }

        if (form === "email") {
            const email = e.target.userEmail.value;

            //Check for valid email input
            if (!(this.props.emailIsValid(email))) {
                if (!errorsThatExist[0]) {
                    // Render error text and change boolean
                    const formField = document.getElementsByClassName("status_form_field")[1];
                    const input = document.getElementById("userEmail");
                    error[0].innerHTML = '*Please enter a valid email address.';
                    error[0].className = "error_0";
                    error[0].style.fontSize = '.9rem';
                    error[0].style.color = '#C31F01';
                    formField.appendChild(error[0]);
                    input.style.borderColor = '#C31F01';
                    errorsThatExist[0] = true;
                }
            } else {
                this.hideForm(1);

                this.setState({
                    userEmail: email,
                });
            }
        }
       
        if (form === "address") {
            const street = e.target.street.value;
            const country = e.target.country.value;
            const state = e.target.state.value;
            const city = e.target.city.value;
            const zip = e.target.zip.value.toString();

            // Check and validate address input if the address form is being submitted
            if (street === "" || country === "" || state === "" || city === "" || zip === "") {
                if (!errorsThatExist[1]) {
                    // Render error text and change boolean
                    const formField = document.getElementsByClassName("status_form_field")[2];
                    const inputStreet = document.getElementById("streetId");
                    const inputCountry = document.getElementById("countryId");
                    const inputState = document.getElementById("stateId");
                    const inputCity = document.getElementById("cityId");
                    const inputZip = document.getElementById("zipId");
                    error[1].innerHTML = '*Please enter or select a value in all address-related fields.';
                    error[1].className = "error_1";
                    error[1].style.fontSize = '.9rem';
                    error[1].style.color = '#C31F01';
                    formField.appendChild(error[1]);
                    inputStreet.style.borderColor = '#C31F01';
                    inputCountry.style.borderColor = '#C31F01';
                    inputState.style.borderColor = '#C31F01';
                    inputCity.style.borderColor = '#C31F01';
                    inputZip.style.borderColor = '#C31F01';
                    errorsThatExist[1] = true;
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

            // Redirect to form submitted page
            for (let data = 0; data < userData.length; data++) {
                if (data == null) {
                    return;
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
                                        <input className="signup_input" type="text" id="firstName" name="first_name" placeholder={`${this.state.userFirstName}`} /><br />
                                        <label htmlFor="lastName">Last Name</label><br />
                                        <input className="signup_input" type="text" id="lastName" name="last_name" placeholder={`${this.state.userLastName}`} /><br />
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
                                        <input className="signup_input" type="text" id="userEmail" name="user_email" placeholder={`${this.state.userEmail}`} /><br />
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
                                        <input className="signup_input" type="text" name="street" id="streetId" placeholder="Building number, Street name, Apartment ID" />
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
                                        <input type="text" name="zip" id="zipId" placeholder="Zip" /><br />
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
    emailIsValid: PropTypes.func.isRequired
}