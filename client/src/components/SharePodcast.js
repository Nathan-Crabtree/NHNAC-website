// NOTE: Majority of this code is starter code.
// Src: https://blog.bitsrc.io/build-a-full-featured-modal-dialog-form-with-react-651dcef6c571

import React, { useEffect } from 'react';

export const SharePodcast = ({ copySharingLink }) => {

/**
 * Copies shareLink value to clipboard for user to post elsewhere.
 * Src: https://www.w3schools.com/howto/howto_js_copy_clipboard.asp
 *
 */
copySharingLink = () => {
  const shareLink = document.getElementById("shareLink");
  const shareButton = document.getElementsByClassName("share_btn")[0];

  /* Select the text field */
  shareLink.select();
  shareLink.setSelectionRange(0, 99999); /* For mobile devices */

  /* Copy the text inside the text field */
  document.execCommand("copy");

  /* Alert with copied text */
  shareButton.innerText = "Copied";
}

useEffect(() => {
    // Create twitter share button
    // For more info on createShareButton() object parameters: https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/guides/parameter-reference1
    twttr.widgets.createShareButton(
        '/',
        document.getElementById('container'),
        {
            text: 'Hello World',
            url: 'https://www.your-domain.com/your-page.html'
        } 
        )
}, []);

return (
    <div>
        {/* Import Facebook SDK for JavaScript */}
        <div id="fb-root"></div>
        {(function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0";
        fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'))}

        <form className="modal_form">
            <h2 className="newsletter_h2">Share this podcast</h2>
            <fieldset>
                <div className="feedback_form_fields">
                    <div className="social_media_field">
                        {/* Facebook share button */}
                        <div className="fb-share-button" 
                        data-href="https://www.your-domain.com/your-page.html" 
                        data-layout="button">
                        </div>
                        {/* Twitter share button */}
                        <div id="container"></div>
                        {/* Email share button */}
                        {/* Src: https://stackoverflow.com/questions/5045918/adding-a-share-by-email-link-to-website */}
                        <a rel="noopener noreferrer" href="mailto:?subject=I wanted you to see this site&amp;body=Check out this site https://www.your-domain.com/your-page.html." title="Share by Email">
                            <img src="http://png-2.findicons.com/files/icons/573/must_have/48/mail.png" width="35px" height="35px" />
                        </a>
                        <br />
                    </div>
                    <div className="share_link_field">
                        <div className="share_link_text">
                            <input type="text" id="shareLink" name="share_link" readOnly value="https://newhavennativeamericanchurch.org/article?type=podcast&id=1" />
                            <button className="share_btn" type="button" onClick={copySharingLink}>Copy to clipboard</button>
                        </div>
                    </div>
                </div>
            </fieldset>
        </form>
    </div>
  );

};
export default SharePodcast;