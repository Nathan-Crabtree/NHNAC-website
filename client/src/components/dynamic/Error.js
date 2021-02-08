import React, { Component } from 'react';

export default class Error extends Component {

    constructor() {
        super();
        this.state = {
            errorStatus: null,
            errorDescription: null
        }
    }

    componentDidMount() {
        // When component is rendered, bring user to top of page.
        window.scrollTo(0, 0);
    }

    render() {
        return(
            <div>
                <p>Oops. There seems to be a problem with finding this page.</p>
                &nbsp;
                <p>Status: <b>{this.state.errorStatus}</b></p>
                &nbsp;
                <p className="error_description">Description: {this.state.errorDescription}</p>
            </div>
        );
    }
}