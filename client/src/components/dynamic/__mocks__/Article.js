import React from 'react';
import PropTypes from 'prop-types';

/**
 * Shows the section the comment belongs to and hides the associated button.
 *
 * @param {string} containerClassName 
 * @param {string} btnClassName
 */
export const displayCommentsMock = () => {
    testState.responseSectionContainer = { display: "block" }
    testState.commentBtn1 = { display: "none" }
    testState.commentBtn2 = { display: "block" }
}

/**
 * Hides the response section for the comment and shows the "See Responses" button. Hides response form.
 *
 */
export const hideResponsesMock = () => {
    testState.responseSectionContainer = { display: "none" }
    testState.commentBtn0 = { display: "block" }
    testState.commentBtn1 = { display: "block" }
    testState.commentBtn2 = { display: "none" }
    testState.responseForm = { display: "none" }
}

export let testState = {
    responseSectionContainer: { display: "none" },
    responseForm: { display: "block" },
    commentBtn0: { display: "none" },
    commentBtn1: { display: "block" },
    commentBtn2: { display: "none" }
}

export const Article = () => {
    return (
        <div>
            <div className="response_section_container" style={testState.responseSectionContainer}>
                <section className="response_container"></section>
                <form className="response_form" style={testState.responseForm}></form>
                <button className="comment_btn" style={testState.commentBtn0} type="button">Add Response</button>
            </div>
            <button className="comment_btn" type="button" style={testState.commentBtn1} onClick={displayCommentsMock}>See Responses</button>
            <button className="comment_btn" type="button" style={testState.commentBtn2} onClick={hideResponsesMock}>Hide Responses</button>
        </div>
    );
}

Article.propTypes = {
    responseSectionContainer: PropTypes.object.isRequired,
    responseForm: PropTypes.object.isRequired,
    commentBtn0: PropTypes.object.isRequired,
    commentBtn1: PropTypes.object.isRequired,
    commentBtn2: PropTypes.object.isRequired,
    mockFunction: PropTypes.func.isRequired
};

export default Article;