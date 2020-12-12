import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class SignUp extends Component {

    constructor() {
        super();
        this.state = { 
            errorsThatExist: [],
            hasReedemableCode: false
        }
        this.onSubmit = this.onSubmit.bind(this);
    }

    /**
    * onSubmit() function - An event handler that prevents default action (page refresh), checks to see if all values from are fit for submission. 
    * Submits and renders HTML or transfer to PayPal website according to condition.
    * NOTE: Could be further refactored to reduce runtime. - Zane
    * 
    * @param {object} event 
    */
    onSubmit(event) {
        event.preventDefault(event);

        let firstName = event.target.first_name.value;
        let revisedFirstName = [];
        let lastName = event.target.last_name.value;
        let revisedLastName = [];
        const email = event.target.email.value;
        const birthday = event.target.birthday.value;
        const gender = event.target.gender.value; 
        const street = event.target.street.value;
        const country = event.target.country.value;
        const state = event.target.state.value;
        const city = event.target.city.value;
        const zip = event.target.zip.value;
        const chapter = event.target.chapter.value;
        const securityQuestion = event.target.security_question.value;
        const securityAnswer = event.target.security_answer.value;
        const password = event.target.password.value;
        const confirmPassword = event.target.confirm_password.value;
        const redeemableCode = event.target.redeemable_code.value;
        const payment = parseInt(event.target.payment.value.split("").filter(string => string !== "$").join(""));


        // Create error array
        let error = [];
        for (let input = 0; input < 11; input++) {
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

        // Check if first name and last name exist
        if (firstName.length === 0 || lastName.length === 0) {
            if (!errorsThatExist[0]) {
                // Render error text and change boolean
                const formField = document.getElementsByClassName("signup_fields")[0];
                const inputFirstName = document.getElementById("firstName");
                const inputLastName = document.getElementById("lastName");
                error[0].innerHTML = '*Please enter both your first and last name.';
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
        }

        // Capitalize the first letter of any names if haven't been done so by user
        if (firstName.length > 0) {
            this.props.reviseName(firstName, revisedFirstName);
        } 
        if (lastName.length > 0) {
            this.props.reviseName(lastName, revisedLastName);
        } 

        // Check for valid email input
        if (!(this.props.emailIsValid(email))) {
            if (!errorsThatExist[1]) {
                // Render error text and change boolean
                const formField = document.getElementsByClassName("signup_fields")[1];
                const input = document.getElementById("email");
                error[1].innerHTML = '*Please enter a valid email address.';
                error[1].className = "error_1";
                error[1].style.fontSize = '.9rem';
                error[1].style.color = '#C31F01';
                formField.appendChild(error[1]);
                input.style.borderColor = '#C31F01';
                errorsThatExist[1] = true;
            }
        }

        // Check for birthday input
        if (birthday === "") {
            if (!errorsThatExist[2]) {
                // Render error text and change boolean
                const formField = document.getElementsByClassName("signup_fields")[2];
                const input = document.getElementById("birthday");
                error[2].innerHTML = '*Please select a birthday.';
                error[2].className = "error_2";
                error[2].style.fontSize = '.9rem';
                error[2].style.color = '#C31F01';
                formField.appendChild(error[2]);
                input.style.borderColor = '#C31F01';
                errorsThatExist[2] = true;
            }
        }

        // Check for gender selection
        if (gender === "Gender") {
            if (!errorsThatExist[3]) {
                // Render error text and change boolean
                const formField = document.getElementsByClassName("signup_fields")[3];
                const input = document.getElementById("gender");
                error[3].innerHTML = '*Please select a gender.';
                error[3].className = "error_3";
                error[3].style.fontSize = '.9rem';
                error[3].style.color = '#C31F01';
                formField.appendChild(error[3]);
                input.style.borderColor = '#C31F01';
                errorsThatExist[3] = true;
            }
        }

        // Check for address input
        if (street === "" || country === "" || state === "" || city === "" || zip === "") {
            if (!errorsThatExist[4]) {
                // Render error text and change boolean
                const formField = document.getElementsByClassName("signup_fields")[4];
                const inputStreet = document.getElementById("streetId");
                const inputCountry = document.getElementById("countryId");
                const inputState = document.getElementById("stateId");
                const inputCity = document.getElementById("cityId");
                const inputZip = document.getElementById("zipId");
                error[4].innerHTML = '*Please enter or select a value in all address-related fields.';
                error[4].className = "error_4";
                error[4].style.fontSize = '.9rem';
                error[4].style.color = '#C31F01';
                formField.appendChild(error[4]);
                inputStreet.style.borderColor = '#C31F01';
                inputCountry.style.borderColor = '#C31F01';
                inputState.style.borderColor = '#C31F01';
                inputCity.style.borderColor = '#C31F01';
                inputZip.style.borderColor = '#C31F01';
                errorsThatExist[4] = true;
            }
        }

        // Check for chapter selection
        if (chapter === "Chapter") {
            if (!errorsThatExist[5]) {
                // Render error text and change boolean
                const formField = document.getElementsByClassName("signup_fields")[5];
                const input = document.getElementById("chapter");
                error[5].innerHTML = '*Please select a chapter.';
                error[5].className = "error_5";
                error[5].style.fontSize = '.9rem';
                error[5].style.color = '#C31F01';
                formField.appendChild(error[5]);
                input.style.borderColor = '#C31F01';
                errorsThatExist[5] = true;
            }
        }

        // Check for security question selection
        if (securityQuestion === "Choose a security question") {
            if (!errorsThatExist[6]) {
                // Render error text and change boolean
                const formField = document.getElementsByClassName("signup_fields")[6];
                const input = document.getElementById("securityQuestion");
                error[6].innerHTML = '*Please select a security question.';
                error[6].className = "error_6";
                error[6].style.fontSize = '.9rem';
                error[6].style.color = '#C31F01';
                formField.appendChild(error[6]);
                input.style.borderColor = '#C31F01';
                errorsThatExist[6] = true;
            }
        }

        // Check for security answer input
        if (securityAnswer === "") {
            if (!errorsThatExist[7]) {
                // Render error text and change boolean
                const formField = document.getElementsByClassName("signup_fields")[7];
                const input = document.getElementById("securityAnswer");
                error[7].innerHTML = '*Please enter a security answer.';
                error[7].className = "error_7";
                error[7].style.fontSize = '.9rem';
                error[7].style.color = '#C31F01';
                formField.appendChild(error[7]);
                input.style.borderColor = '#C31F01';
                errorsThatExist[7] = true;
            }
        }

        // Check if password fields match
        if (password !== confirmPassword || password === "") {
            if (!errorsThatExist[8]) {
                // Render error text and change boolean
                const formField = document.getElementsByClassName("signup_fields")[8];
                const inputPassword = document.getElementById("password");
                const inputConfirmPassword = document.getElementById("confirmPassword");
                if (password === "") {
                    error[8].innerHTML = '*Please enter a password.';
                }
                if (password !== confirmPassword) {
                    error[8].innerHTML = '*Your password inputs do not match.';
                }
                error[8].className = "error_8";
                error[8].style.fontSize = '.9rem';
                error[8].style.color = '#C31F01';
                formField.appendChild(error[8]);
                inputPassword.style.borderColor = '#C31F01';
                inputConfirmPassword.style.borderColor = '#C31F01';
                errorsThatExist[8] = true;
            }
        }

        // Check for valid reedemable code input
        if (redeemableCode === "XGDV9DJZ") {
            this.setState({
                hasReedemableCode: true
            });
        }

        // Check if pay field is greater than 0
        if (payment === 0) {
            if (!errorsThatExist[9]) {
                // Render error text and change boolean
                const formField = document.getElementsByClassName("signup_fields")[10];
                const input = document.getElementById("payment");
                error[9].innerHTML = '*Please enter a value greater than 0.';
                error[9].className = "error_9";
                error[9].style.fontSize = '.9rem';
                error[9].style.color = '#C31F01';
                formField.appendChild(error[9]);
                input.style.borderColor = '#C31F01';
                errorsThatExist[9] = true;
            }
        }

        // Check if any errors exists before sending data to API
        for (let errorNo = 0; errorNo < errorsThatExist.length; errorNo++) {
            if (errorsThatExist[errorNo]) {
                return;
            }
        }
        
        // Take the data and send it to API 
        console.log(revisedFirstName.join(""));
        console.log(revisedLastName.join(""));
        console.log(email);
        console.log(birthday);
        console.log(gender);
        console.log(street);
        console.log(country);
        console.log(state);
        console.log(city);
        console.log(zip);
        console.log(chapter);
        console.log(securityQuestion);
        console.log(securityAnswer);
        console.log(password);
        console.log(confirmPassword);
        console.log(redeemableCode);
        console.log(payment);

        // Write after-submit code here 
    }

    componentDidMount() {
        // When component is rendered, bring user to top of page.
        window.scrollTo(0, 0);

        // This script tag is important htmlFor sign-up form to work properly. 
        // Provides country data htmlFor users to help insert exact address location. - Zane
        // Source: https://geodata.solutions
        if (!this.props.geoDataExists) {
            const script = document.createElement("script");

            script.src = "//geodata.solutions/includes/countrystatecity.js";
            script.async = true;
    
            document.body.appendChild(script);

            this.props.setGeoDataExists();
        }
    }

    render() { 
        return ( 
            <React.Fragment>
                    <form className="signup_form" onSubmit={this.onSubmit}>
                        <div className="top_div">
                            <h2>Adoption form</h2>
                            <p>Pay what you'd like. Join our church today!</p>
                        </div>
                        <fieldset className="signup_fieldset">
                            <div className="signup_fields">
                                <label htmlFor="firstName">First Name</label><br />
                                <input className="signup_input" type="text" id="firstName" name="first_name" placeholder="First Name" /><br />
                                <label htmlFor="lastName">Last Name</label><br />
                                <input className="signup_input" type="text" id="lastName" name="last_name" placeholder="Last Name" /><br />
                            </div>
                            <div className="signup_fields">
                                <label htmlFor="email">Email</label><br />
                                <input className="signup_input" type="text" id="email" name="email" placeholder="Email" /><br />       
                            </div>
                            <div className="signup_fields">
                                <label htmlFor="birthday">Birthday</label><br />
                                <input className="signup_input" type="date" id="birthday" name="birthday" /><br /> 
                            </div>
                            <div className="signup_fields">
                                <label htmlFor="gender">Gender</label><br />
                                <select id="gender" name="gender">
                                <option>Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select><br />
                            </div>
                            <div className="signup_fields">
                                <label htmlFor="address">Mailing Address</label><br />
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
                            <div className="signup_fields">
                                <label htmlFor="chapter">Chapter</label><br />
                                <select id="chapter" name="chapter">
                                <option>Chapter</option>
                                    <option value="new_haven">New Haven</option>
                                    <option value="red_road">Red Road</option>
                                    <option value="butterfly_medicine_lodge">Butterfly Medicine Lodge</option>
                                </select><br />
                            </div>
                            <div className="signup_fields">
                                <label htmlFor="securityQuestion">Type your security question here</label><br />
                                <select id="securityQuestion" name="security_question">
                                <option>Choose a security question</option>
                                    <option value="question_1">What is your favorite car?</option>
                                    <option value="question_2">What city were you born in?</option>
                                    <option value="question_3">What is your favorite color?</option>
                                </select><br />  
                            </div>
                            <div className="signup_fields">
                                <label htmlFor="securityAnswer">Type your security answer here</label><br />
                                <input className="signup_input" type="text" id="securityAnswer" name="security_answer" placeholder="Type your security answer here" /><br />       
                            </div>
                            <div className="signup_fields">
                                <label htmlFor="password">Password</label><br />
                                <input className="signup_input" type="password" id="password" name="password" placeholder="Password" /><br />                   
                                <label htmlFor="confirm_password">Confirm Password</label><br />
                                <input className="signup_input" type="password" id="confirmPassword" name="confirm_password" placeholder="Confirm Password" /><br />    
                            </div>
                            {/* Code snippet for newsletter checkbox, which is currently an unavailable feature in the beta release. - Zane */}
                            {/*<div className="signup_fields">
                                <div className="newsletter_div">
                                    <input type="checkbox" id="newsletter" name="newsletter" />
                                    <label htmlFor="newsletter">Check this box to sign up for our newsletter</label><br />
                                </div>
                            </div>*/}
                            {/* Insert e-signature widget here */}
                            <div className="signup_fields">
                                <label htmlFor="redeemableCode">Redeemable Code</label><br />
                                <input className="signup_input" type="text" id="redeemableCode" name="redeemable_code" placeholder="Redeemable Code" /><br />          
                            </div>
                            <div className="signup_fields">
                                <label htmlFor="payment">Pay Us What You'd Like</label><br />
                                <input className="signup_input" type="string" id="payment" name="payment" placeholder="0" defaultValue="$0.00"/><br />
                                <div className="pay_buttons_div">
                                    <button className="pay_button" type="button" value="1" onClick={() => { document.getElementById("payment").value = "$1.00"} }>$1</button>
                                    <button className="pay_button" type="button" value="5" onClick={() => { document.getElementById("payment").value = "$5.00"} }>$5</button>
                                    <button className="pay_button" type="button" value="10" onClick={() => { document.getElementById("payment").value = "$10.00"} }>$10</button>
                                    <button className="pay_button" type="button" value="20" onClick={() => { document.getElementById("payment").value = "$20.00"} }>$20</button>
                                </div>
                            </div>
                            <div className="signup_fields">
                                <div className="pay_with_div">
                                    <button className="paypal_btn" type="submit">Pay with PayPal</button>
                                    {/* Code snippet for bitcoin payment option, which is currently an unavailable feature in the beta release. - Zane */}
                                    {/*<p>Or</p>
                                    <button className="bitcoin_btn" type="submit">Pay with Bitcoin</button>*/}
                                </div>
                            </div>
                        </fieldset>
                        <p className="agreement_p">By signing up, you automatically agree to our <Link to="/adoption_agreement" target="_blank">Adoption Agreement</Link> and <Link to="/terms_of_service" target="_blank">Terms Of Service</Link>.</p>
                    </form>
            </React.Fragment> 
        );
    }
}

// PropTypes for jest testing in App.test.js
SignUp.propTypes = {
    geoDataExists: PropTypes.bool.isRequired,
    setGeoDataExists: PropTypes.func.isRequired,
    emailIsValid: PropTypes.func.isRequired,
    reviseName: PropTypes.func.isRequired
}