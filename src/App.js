import React, { Component } from 'react';
import axios from 'axios'

import { Route, Link } from 'react-router-dom'
import Home from './components/Home'
import Signup from './components/Signup'
import LoginForm from './components/login-form'
import Navbar from './components/navbar'

import './App.css';


class App extends Component {
    constructor() {
        super()
        this.state = {
          loggedIn: false,
          email: null
        }
    
        this.getUser = this.getUser.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
        this.updateUser = this.updateUser.bind(this)
      }
    
      componentDidMount() {
        this.getUser()
      }
    
      updateUser (userObject) {
        this.setState(userObject)
      }

    getUser() {
        axios.get('http://3.140.210.76:8000/api/user/').then(response => {
          console.log('Get user response: ')
          console.log(response.data)
          if (response.data.user) {
            console.log('Get User: There is a user saved in the server session: ')

            this.setState({
              loggedIn: true,
              email: response.data.user.email
            })
          } else {
            console.log('Get user: no user');
            this.setState({
              loggedIn: false,
              email: null
            })
          }
        })
      }


  render() {
    return (
      <div className="App">
      <Navbar updateUser={this.updateUser} loggedIn={this.state.loggedIn} />

      {/* Greet the user if he/she is logged-in (i.e. loggedIn is true) */}
      {this.state.loggedIn && <p> {this.state.username}</p>}
        <Route
        exact path="/"
        component={Home} />

        <Route
        path="/login"
        render={() =>
            <LoginForm
            updateUser={this.updateUser}
            />}
        />

        <Route
        path="/signup"
        render={() =>
            <Signup/>}
        />
      </div>
    );
  }
}

export default App;

