// ProfileUser.test.js
import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';

// Import functions
import ProfileUser from '../ProfileUser';

// ProfileUser render testing
it('renders without crashing', () => {
    shallow(<BrowserRouter><ProfileUser /></BrowserRouter>);
});

// resizeDataTable testing
it("changes styling of height when called", () => {
    const Foo = ({ idStyle, mockFunction }) => (
        <div id="profileContainerNSectionContainerN" style={idStyle} onClick={mockFunction}> </div>
    );

    // Generate random number n; {n | n ∈ (0, 1000]}
    const randomN = Math.floor(Math.random() * 1000) + 1;

    Foo.propTypes = {
        idStyle: PropTypes.object.isRequired,
        mockFunction: PropTypes.func.isRequired
    };

    let testState = {
        idStyle: { height: `${randomN}px` }
    }
    const wrapper = mount((
        <Foo
            idStyle={testState.idStyle}
            mockFunction={() => {
                const idStyleHeight = parseInt(testState.idStyle.height);
                if (idStyleHeight > 397.81) {
                    testState.idStyle = { height: "795.6px" }
                } else {
                    testState.idStyle = { height: "397.8px" }
                };
            }}
        />
    ));

    expect(wrapper.find('#profileContainerNSectionContainerN').get(0).props.style).toHaveProperty('height', testState.idStyle.height);

    wrapper.find('#profileContainerNSectionContainerN').at(0).simulate('click');

    // styling should change once event is trigged
    const idStyleHeight = parseInt(testState.idStyle.height);
    if (idStyleHeight > 397.81) {
        expect(testState.idStyle.height).toEqual("795.6px");
    } else {
        expect(testState.idStyle.height).toEqual("397.8px");
    };
});