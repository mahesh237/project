//  The username will display with a greeting if they are logged in.

import React, { Component } from 'react';

class Home extends Component {

    constructor() {
        super()
    }

    render() {
        const imageStyle = {
            width: 400
        }
        return (
            <div>
                <p>Hi you are logged in</p>
                
            </div>
        )
    }
}

export default Home;