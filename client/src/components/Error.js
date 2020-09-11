import React, { Component } from 'react';

export default class Error extends Component {

    constructor() {
        super();
        this.state = {
            errorStatus: null,
            errorDescription: null
        }
    }

    render() {
        return(
            <div>
                <p>Oops. There seems to be a problem with finding this page.</p>
                &nbsp;
                <p>Status: <b>{this.state.errorStatus}</b></p>
                &nbsp;
                <p className="error-description">Description: {this.state.errorDescription}</p>
            </div>
        );
    }
}