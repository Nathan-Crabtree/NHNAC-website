import React from 'react';
import PropTypes from 'prop-types';

/**
 * Copies shareLink value to clipboard for user to post elsewhere.
 * Src: https://www.w3schools.com/howto/howto_js_copy_clipboard.asp
 *
 */
export const copySharingLinkMock = () => {
    /* Copy the text inside the text field */
    if (document.execCommand) {
        document.execCommand("copy");
    }

    /* Alert with copied text */
    testState.innerText = "Copied";
}

export let testState = {
    innerText: "Copy to clipboard"
}

export const SharePodcast = () => {
    return (
        <div>
            <input type="text" id="shareLink" name="share_link" readOnly value="https://newhavennativeamericanchurch.org/article?type=podcast&id=1" />
            <button className="share_btn" type="button" onClick={copySharingLinkMock}>{innerText}</button>
        </div>
    );
}

SharePodcast.propTypes = {
    copySharingLinkTest: PropTypes.func.isRequired,
    innerText: PropTypes.string.isRequired
};

export default SharePodcast;