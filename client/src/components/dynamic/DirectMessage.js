import React, { Component } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';

export default class DirectMessage extends Component {

    constructor() {
        super();
        this.displayConnections = this.displayConnections.bind(this);
    }

    /**
     * displayConnections() function - Renders auth. user's connections that have status approved on DM UI.
     * 
     */
    displayConnections() {

    }

    componentDidMount() {
        // Make sure to pass ...props
        const parsedQString = queryString.parse(this.props.location.search);

        // Change state value of query property to that of query string in URL
        //this.setState({ view: parsedQString.view, customize: parsedQString.customize });

        // When component is rendered, bring user to top of page
        window.scrollTo(0, 0);
    }

    render() {
        return(
            <React.Fragment>
                <p>This is some text.</p>
            </React.Fragment>
        );
    }
} 

// PropTypes for jest testing in App.test.js
DirectMessage.propTypes = {
}