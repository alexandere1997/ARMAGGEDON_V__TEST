import React, { Component } from 'react';
import "./spiner.css"
export default class Spinner extends Component {
    render() {
        return(
            <div className="lds-dual-ring"></div>
        )
    }
}