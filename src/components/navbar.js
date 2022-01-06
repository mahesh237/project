import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Route, Link } from 'react-router-dom'
import logo from '../logo.svg';
import '../App.css';
import axios from 'axios'

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this)
    }

    logout(event) {
        event.preventDefault()
        console.log('logging out')
        axios.post('/user/logout').then(response => {
            console.log(response.data); // Only for debugging
            if (response.status === 200) {
                this.props.updateUser({
                    loggedIn: false,
                    username: null
                })
            }
        }).catch(error => {
            console.log('Error in Logging out');
        })
    }



    render() {
        const loggedIn = this.props.loggedIn;

        return (
            <div>
                <header className="navbar App-header" id="nav-container">
                    {/*  home login signup */}
                    <div className="col-4">
                        {loggedIn ? (
                            <section className="navbar-section">
                                <Link to="#" className="btn btn-link text-secondary" onClick={this.logout}>
                                    <span className="text-secondary">Logout</span>
                                </Link>

                            </section>
                        ) : (
                            <section className="navbar-section">
                                
                                <Link to="/login" className="btn btn-link text-secondary" >
                                    <span className="text-secondary">Login</span>
                                    </Link>
                                <Link to="/Signup" className="btn btn-link text-secondary" >
                                    <span className="text-secondary">Signup</span>
                                    </Link>
                            </section>
                        )}
                    </div>
                    <div className="col-4 col-mr-auto">
                            <div id="top-filler"></div>
                                <img src={logo} className="App-logo" alt="logo"/>
                                <h1 className="App-title">MERN Passport bcrypt express-session Auth</h1>
                        </div>
                </header>
            </div>
        );
    }
}


export default Navbar;

