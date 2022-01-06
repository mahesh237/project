import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

class Signup extends Component {
	constructor() {
		super()
		this.state = {
			first_name: '',
			last_name: '',
			email: '',
			password:'',
			redirectTo: null

		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}
	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit(event) {
		console.log('sign-up handleSubmit, username: ')
		console.log(this.state.first_name)
		event.preventDefault()

		//request to server to add a new username/password
		axios.post('http://3.140.210.76:8000/api/user/', {
			first_name: this.state.firstname,
			last_name: this.state.last_name,
			email:this.state.email,
			password: this.state.password
			
		})
			.then(response => {
				console.log(response)
				if (!response.data.errmsg && (this.state.password == this.state.confirmPassword)) {
					console.log('successful signup')
					this.setState({ //redirect to login page
						redirectTo: '/login'
					})
				} else {
					console.log('username already taken')
				}
			}).catch(error => {
				console.log('signup error: ')
				console.log(error)

			})
	}


render() {
	if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
			return (
				<div className="SignupForm">
					<h4>Sign up</h4>
					<form className="form-horizontal">
						<div className="form-group">
							<div className="col-1 col-ml-auto">
								<label className="form-label" htmlFor="firstname">firstname</label>
							</div>
							<div className="col-3 col-mr-auto">
								<input className="form-input"
									type="text"
									id="firstname"
									name="firstname"
									placeholder="Firstname"
									value={this.state.firstname}
									onChange={this.handleChange}
								/>
							</div>
						</div>

						<div className="form-group">
							<div className="col-1 col-ml-auto">
								<label className="form-label" htmlFor="password">Last Name: </label>
							</div>
							<div className="col-3 col-mr-auto">
								<input className="form-input"
									placeholder="last_name"
									type="last_name"
									name="last_name"
									value={this.state.last_name}
									onChange={this.handleChange}
								/>
							</div>
						</div>

						

						<div className="form-group">
							<div className="col-1 col-ml-auto">
								<label className="form-label" htmlFor="password">Email: </label>
							</div>
							<div className="col-3 col-mr-auto">
								<input className="form-input"
									placeholder="email"
									type="email"
									name="email"
									value={this.state.email}
									onChange={this.handleChange}
								/>
							</div>
						</div>
						
						<div className="form-group">
							<div className="col-1 col-ml-auto">
								<label className="form-label" htmlFor="password">Password: </label>
							</div>
							<div className="col-3 col-mr-auto">
								<input className="form-input"
									placeholder="password"
									type="password"
									name="password"
									value={this.state.password}
									onChange={this.handleChange}
								/>
							</div>
						</div>
						
						<div className="form-group ">
							<div className="col-7"></div>
							<button
								className="btn btn-primary col-1 col-mr-auto"
								onClick={this.handleSubmit}
								type="submit"
							>Sign up</button>
						</div>
					</form>
				</div>

			)
		}
	}
}

export default Signup