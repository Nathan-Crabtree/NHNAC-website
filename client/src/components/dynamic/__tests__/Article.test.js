// Article.test.js
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { shallow } from 'enzyme';
jest.mock("../Article");

// Import functions
import Article from "../Article";

// Article render testing
xit('renders without crashing', () => {
    shallow(<BrowserRouter><Article /></BrowserRouter>);
});

// displayComments testing
it("changes styling of page when called", () => {
    const Article = require("../Article").Article();
    const testState = require("../Article").testState;

    // responseSectionContainer
    console.log(Article.props.children[0].props.style.display);
    expect(Article.props.children[0].props.style).toHaveProperty('display', 'none');

    // commentBtn1
    expect(Article.props.children[1].props.style).toHaveProperty('display', 'block');

    // commentBtn2
    expect(Article.props.children[2].props.style).toHaveProperty('display', 'none');

    require('../Article').displayCommentsMock();

    // styling should change once event is trigged
    expect(testState.responseSectionContainer.display).toEqual("block");
    expect(testState.commentBtn1.display).toEqual("none");
    expect(testState.commentBtn2.display).toEqual("block");
});

// hideResponses testing
it("changes styling of page when called", () => {
    const Article = require("../Article").Article();
    const testState = require("../Article").testState;

    // responseSectionContainer
    expect(Article.props.children[0].props.style).toHaveProperty('display', 'block');

    // commentBtn0
    expect(Article.props.children[0].props.children[2].props.style).toHaveProperty('display', 'none');

    // commentBtn1
    expect(Article.props.children[1].props.style).toHaveProperty('display', 'none');

    // commentBtn2
    expect(Article.props.children[2].props.style).toHaveProperty('display', 'block');

    // responseForm
    expect(Article.props.children[0].props.children[1].props.style).toHaveProperty('display', 'block');

    require('../Article').hideResponsesMock();

    // styling should change once event is trigged
    expect(testState.responseSectionContainer.display).toEqual("none");
    expect(testState.commentBtn0.display).toEqual("block");
    expect(testState.commentBtn1.display).toEqual("block");
    expect(testState.commentBtn2.display).toEqual("none");
    expect(testState.responseForm.display).toEqual("none");
});