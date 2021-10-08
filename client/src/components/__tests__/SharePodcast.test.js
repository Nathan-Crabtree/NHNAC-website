// SharePodcast.test.js
import React from 'react';
import { shallow } from 'enzyme';
jest.mock("../SharePodcast");

// Import functions
import SharePodcast from '../SharePodcast';

// SharePodcast render testing
xit('renders without crashing', () => {
    shallow(<SharePodcast />);
});

// copySharingLink testing
it('should equal value of input', () => {
    /* const Foo = ({ innerText, copySharingLinkTest }) => (
        <div>
            <input type="text" id="shareLink" name="share_link" readOnly value="https://newhavennativeamericanchurch.org/article?type=podcast&id=1" />
            <button className="share_btn" type="button" onClick={copySharingLinkTest}>{innerText}</button>
        </div>
    ); */
    const testState = require("../SharePodcast").testState;

    require('../SharePodcast').copySharingLinkMock();

    expect(testState.innerText).toEqual("Copied");

    // Will only be called if document.execCommand is supported
    if (document.execCommand) {
        expect(document.execCommand).toHaveBeenCalledWith("copy");
    }
});