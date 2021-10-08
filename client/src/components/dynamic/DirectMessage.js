import React, { Component } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';

// Use Regex validator when search query is submitted to check if input isn't code for XXE attack

export default class DirectMessage extends Component {

    constructor() {
        super();
        this.getConnections = this.getConnections.bind(this);
    }

    /**
     * Renders auth. user's connections that have status approved on DM UI.
     * 
     */
    getConnections() {

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
        return (
            <React.Fragment>
                <p>This is some text.</p>
            </React.Fragment>
        );
    }
}

// PropTypes for jest testing
DirectMessage.propTypes = {
}