import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Container from '../Container';
import queryString from 'query-string';

// Work on styling. Create profile pic form. Page needs validation function. Create ResetPassword page. - Zane
function AccountSettings(props, { hideForm, displayForm, onSubmit, unsubscribe, displaySubscription }) {
  // eslint-disable-next-line 
  const [userId, setUserId] = useState(null);
  const [editProfilePic, setEditProfilePic] = useState(null);

  /**
  * onSubmit() function - Takes any content submitted from user and sends to API and then gets added to database; 
  * the page is then refreshed to include the new content.
  * 
  * @param {object} e, @param {string} tagClassName  
  * 
  */
  onSubmit = (e, tagClassName) => {
      e.preventDefault();
      console.log(e.target.status.value);
  }

  /**
  * hideForm() function - Hides the section's form that the comment belongs to and shows the associated "edit" button.
  * 
  * @param {string} tagClassName
  */
  hideForm = (tagClassName) => {
    document.getElementsByClassName(`${tagClassName}_form`)[0].style.display = "none";
    document.getElementsByClassName(`edit_${tagClassName}_btn`)[0].style.display = "block";
    document.getElementsByClassName(`${tagClassName}_tag`)[0].style.display = "block"; 
  }

  /**
  * displayForm() function - Shows the section's form that the comment belongs to and hides the associated "edit" button.
  * 
  * @param {string} tagClassName
  */
  displayForm = (tagClassName) => {
    document.getElementsByClassName(`${tagClassName}_form`)[0].style.display = "block";
    document.getElementsByClassName(`edit_${tagClassName}_btn`)[0].style.display = "none";
    document.getElementsByClassName(`${tagClassName}_tag`)[0].style.display = "none"; 
  }

  /**
   * unsubscribe() function - Unsubscribes the user from selected subscription topic by changing the boolean value
   * of user's subscription value column in the database table to false.
   * 
   * @param {string} subscription
   */
  unsubscribe = (subscription) => {
    if (subscription === "newsletter") {
      // Turn boolean value of user's subscription value column in database table to false

      // Refresh the page

    } else if (subscription === "podcast") {
      // Turn boolean value of user's subscription value column in database table to false

      // Refresh the page

    }
  }

  /**
   * displaySubscription() function - Checks boolean value of user's subscription value column in database table via parameter 
   * to render within DOM the proper markup content.
   * 
   * @param {string} subscription
   */
  displaySubscription = (subscription) => {
    let subscribed = true;

    if (subscription === "newsletter") {
      // Check and set boolean value of user's subscription value column in database table within "subscribed" 
      
      // If true then return markup
      if (subscribed) {
        return <React.Fragment><p>Newsletter</p>&nbsp;<button className="unsubscribe_btn text_btn" onClick={ unsubscribe("newsletter") }><b>unsubscribe</b></button></React.Fragment>;
      }
    } else if (subscription === "podcast") {
      // Check and set boolean value of user's subscription value column in database table within "subscribed" 
      
      // If true then return markup
      if (subscribed) {
        return <React.Fragment><p>Podcast</p>&nbsp;<button className="unsubscribe_btn text_btn" onClick={ unsubscribe("podcast") }><b>unsubscribe</b></button></React.Fragment>
      }
    }
  }

  useEffect(() => {
    const parsedQString = queryString.parse(props.location.search);

    // Change value of query variable to that of query string in URL.
    setUserId(parsedQString.userid);
    setEditProfilePic(parsedQString.editProfilePic);

    // Display "Edit Profile Picture" form if editProfilePic is true
    if (editProfilePic) {
      displayForm("profile_pic");
    }

    // When component is rendered, bring user to top of page.
    window.scrollTo(0, 0);

    // This script tag is important htmlFor sign-up form to work properly. 
    // Provides country data htmlFor users to help insert exact address location. 
    // Source: https://geodata.solutions. - Zane
    if (!props.geoDataExists) {
      const script = document.createElement("script");

      script.src = "//geodata.solutions/includes/countrystatecity.js";
      script.async = true;
  
      document.body.appendChild(script);

      props.setGeoDataExists();
    }
  }, [props, displayForm, editProfilePic]);

  return (
    <div className="account_settings_container">
      {/* Profile Pic Section */}
      <div>
        <img className="profile_img_large profile_pic_tag" srcSet={props.profileImgLarge} alt="Portrait of user." />
        <form id="profilePic" className="profile_pic_form" onSubmit={ (e) => { onSubmit(e, "profile_pic") } }>
          <fieldset>
            <div className="profile_pic_form_field">
              <label htmlFor="profilePic">Upload Picture</label>
              <svg onClick={ () => { hideForm("profile_pic") } } className="_modal-close-icon" viewBox="0 0 40 40">
                <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
              </svg><br />
              <br />
              <div>
                <label htmlFor="profilePicLink">Select a file:</label><br />
                <input type="file" id="profilePicLink" name="profile_pic_link"></input><br />
              </div>
              <button className="submit_btn submit_padding" type="submit">Upload</button>
            </div>
          </fieldset>
        </form>
        <button onClick={ () => { displayForm("profile_pic") } } className="edit_profile_pic_btn" type="button">Edit Profile Picture</button>
      </div>

      <div>
        {/* Name Section */}
        <div>
          <h2 className="name_tag">Harper "Kiss" Young</h2>
          <form id="name" className="name_form" onSubmit={ (e) => { onSubmit(e, "name") } }>
              <fieldset>
                  <div className="name_form_field">
                      <label htmlFor="name">Name</label>
                      <svg onClick={ () => { hideForm("name") } } className="_modal-close-icon" viewBox="0 0 40 40">
                          <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
                      </svg><br />
                      <br />
                      <div>
                          <label htmlFor="firstName">First Name</label><br />
                          <input className="signup_input" type="text" id="firstName" name="first_name" placeholder="Harper" /><br />
                          <label htmlFor="nickName">Nick Name</label><br />
                          <input className="signup_input" type="text" id="nickName" name="nick_name" placeholder="Kiss" /><br />
                          <label htmlFor="lastName">Last Name</label><br />
                          <input className="signup_input" type="text" id="lastName" name="last_name" placeholder="Young" /><br />
                      </div>
                  </div>
                  <button className="submit_btn submit_padding" type="submit">Submit</button>
              </fieldset>
          </form>
          <button onClick={ () => { displayForm("name") } } className="edit_name_btn text_btn" type="button"><b>edit</b></button>
        </div>
        {/* Status Section */}
        <div>
          <p className="status_tag">Status: none</p>
          <form id="status" className="status_form" onSubmit={ (e) => { onSubmit(e, "status") } }>
            <fieldset>
              <div className="status_form_field">
                <label htmlFor="status">Status</label>
                <svg onClick={ () => { hideForm("status") } } className="_modal-close-icon" viewBox="0 0 40 40">
                  <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
                </svg><br />
                <textarea className="login_input" type="text" id="status_textarea" name="status" readOnly maxLength="32" value="Lorem ipsum dolor sit amet, cons" /><br />
              </div>
              <button className="submit_btn submit_padding" type="submit">Submit</button>
            </fieldset>
          </form>
          <button onClick={ () => { displayForm("status") } } className="edit_status_btn text_btn" type="button"><b>edit</b></button>
        </div>
        <Link to="/id_request?userid=1">Request new ID card</Link><br />
        <Container onSubmit={props.onSubmit} triggerText="Delete Account" /><br />
        {/* Social Media Links */}
        <div>
          {/* Facebook URL */}
          <div>
            <div>
              <img srcSet={props.fbMini} alt="User's facebook link." />
              <Link target="_blank" to="https://www.facebook.com" className="fb_tag">https://www.facebook.com</Link>
            </div>
            <form id="fb" className="fb_form" onSubmit={ (e) => { onSubmit(e, "fb") } }>
              <fieldset>
                <div className="fb_form_field">
                  <label htmlFor="fb">Facebook Link</label>
                  <svg onClick={ () => { hideForm("fb") } } className="_modal-close-icon" viewBox="0 0 40 40">
                    <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
                  </svg><br />
                  <textarea className="login_input" type="text" id="fb_textarea" name="fb" readOnly value="https://wwww.facebook.com" /><br />
                </div>
                <button className="submit_btn submit_padding" type="submit">Submit</button>
              </fieldset>
            </form>
            <button onClick={ () => { displayForm("fb") } } className="edit_fb_btn text_btn" type="button"><b>edit</b></button>
          </div>
          {/* Twitter URL */}
          <div>
            <div>
              <img srcSet={props.twitterMini} alt="User's twitter link." />
              <Link target="_blank" to="https://www.twitter.com" className="twitter_tag">https://www.twitter.com</Link>
            </div>
            <form id="twitter" className="twitter_form" onSubmit={ (e) => { onSubmit(e, "twitter") } }>
              <fieldset>
                <div className="twitter_form_field">
                  <label htmlFor="twitter">Twitter Link</label>
                  <svg onClick={ () => { hideForm("twitter") } } className="_modal-close-icon" viewBox="0 0 40 40">
                    <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
                  </svg><br />
                  <textarea className="login_input" type="text" id="twitter_textarea" name="twitter" readOnly value="https://twitter.com" /><br />
                </div>
                <button className="submit_btn submit_padding" type="submit">Submit</button>
              </fieldset>
            </form>
            <button onClick={ () => { displayForm("twitter") } } className="edit_twitter_btn text_btn" type="button"><b>edit</b></button>
          </div>
          {/* Instagram URL */}
          <div>
            <div>
              <img srcSet={props.instaMini} alt="User's instagram link." />
              <Link target="_blank" to="https://www.instagram.com" className="insta_tag">https://www.instagram.com</Link>
            </div>
            <form id="insta" className="insta_form" onSubmit={ (e) => { onSubmit(e, "insta") } }>
              <fieldset>
                <div className="insta_form_field">
                  <label htmlFor="insta">Instagram Link</label>
                  <svg onClick={ () => { hideForm("insta") } } className="_modal-close-icon" viewBox="0 0 40 40">
                    <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
                  </svg><br />
                  <textarea className="login_input" type="text" id="insta_textarea" name="insta" readOnly value="https://www.instagram.com" /><br />
                </div>
                <button className="submit_btn submit_padding" type="submit">Submit</button>
              </fieldset>
            </form>
            <button onClick={ () => { displayForm("insta") } } className="edit_insta_btn text_btn" type="button"><b>edit</b></button>
          </div>
        </div>
      </div>

      <div className="clear"></div>

      <div>
        {/* Email Section */}
        <div>
          <p className="email_tag">Email: none</p>
          <form id="email" className="email_form" onSubmit={ (e) => { onSubmit(e, "email") } }>
              <fieldset>
                  <div className="email_form_field">
                    <label htmlFor="email">Email</label>
                    <svg onClick={ () => { hideForm("email") } } className="_modal-close-icon" viewBox="0 0 40 40">
                        <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
                    </svg><br />
                    <input className="signup_input" type="text" id="email" name="email" placeholder="example@example.com" /><br />
                  </div>
                  <button className="submit_btn submit_padding" type="submit">Submit</button>
              </fieldset>
          </form>
          <button onClick={ () => { displayForm("email") } } className="edit_email_btn text_btn" type="button"><b>edit</b></button>
        </div>
        {/* Birthday Section */}
        <div>
            <p className="birthday_tag">Birthday: DD-MM-YYYY</p>
            <form id="birthday" className="birthday_form" onSubmit={ (e) => { onSubmit(e, "birthday") } }>
              <fieldset>
                  <div className="birthday_form_field">
                      <label htmlFor="birthday">Birthday</label><br />
                      <svg onClick={ () => { hideForm("birthday") } } className="_modal-close-icon" viewBox="0 0 40 40">
                          <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
                      </svg><br />
                      <input className="signup_input" type="date" id="birthday" name="birthday" /><br /> 
                  </div>
                  <button className="submit_btn submit_padding" type="submit">Submit</button>
              </fieldset>
            </form>
            <button onClick={ () => { displayForm("birthday") } } className="edit_birthday_btn text_btn" type="button"><b>edit</b></button>
        </div>
        {/* Address Section */}
        <div>
            <p className="address_tag">Address: none</p>
            <form id="address" className="address_form" onSubmit={ (e) => { this.onSubmit(e, "address") }}>
                <fieldset>
                    <div className="address_form_field">
                        <label htmlFor="address">Address</label><br />
                        <svg onClick={ () => { hideForm("address") } } className="_modal-close-icon" viewBox="0 0 40 40">
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
            <button onClick={ () => { displayForm("address") } } className="edit_address_btn text_btn" type="button"><b>edit</b></button>
        </div>
        {/* Change Password Section */}
        <div>
          <form id="password" className="password_form" onSubmit={ (e) => { onSubmit(e, "password") } }>
              <fieldset>
                  <div className="password_form_field">
                      <label htmlFor="password">Change Password</label>
                      <svg onClick={ () => { hideForm("password") } } className="_modal-close-icon" viewBox="0 0 40 40">
                          <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
                      </svg><br />
                      <br />
                      <div>
                          <label htmlFor="oldPassword">Old Password</label><br />
                          <input className="signup_input" type="password" id="oldPassword" name="old_password" /><br />
                          <label htmlFor="newPassword">New Password</label><br />
                          <input className="signup_input" type="password" id="newPassword" name="new_password" /><br />
                          <label htmlFor="confirmPassword">Confirm Password</label><br />
                          <input className="signup_input" type="password" id="confirmPassword" name="confirm_password" /><br />
                      </div>
                  </div>
                  <button className="submit_btn submit_padding" type="submit">Submit</button>
              </fieldset>
          </form>
          <button onClick={ () => { displayForm("password") } } className="edit_password_btn password_tag text_btn" type="button"><b>Change Password</b></button>
        </div>
        {/* Subscription Section */}
        <section>
          <h5 className="subscriptions_h5">Subscriptions</h5>
          { displaySubscription("newsletter") }<br />
          { displaySubscription("podcast") }<br />
        </section>
      </div>

    </div>
  );
}

export default AccountSettings;

AccountSettings.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    profileImgLarge: PropTypes.string,
    fbMini: PropTypes.string.isRequired, 
    instaMini: PropTypes.string.isRequired,
    twitterMini: PropTypes.string.isRequired,
    emailIsValid: PropTypes.func.isRequired,
    geoDataExists: PropTypes.bool.isRequired,
    setGeoDataExists: PropTypes.func.isRequired,
    reviseName: PropTypes.func.isRequired
}