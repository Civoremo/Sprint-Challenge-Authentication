import React, { Component } from "react";
import "./App.css";
import { Link, Route } from "react-router-dom";
import axios from "axios";

import RegistrationForm from "./components/registrationForm";
import LoginUser from "./components/loginUser";
import Jokes from "./components/jokes";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
        };
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    registerUser = e => {
        e.preventDefault();
        if (this.state.username && this.state.password.length >= 4) {
            axios({
                method: "post",
                url: "http://localhost:3300/api/register",
                data: {
                    username: this.state.username,
                    password: this.state.password,
                },
            })
                .then(id => {
                    this.loginUser();

                    // axios({
                    //     method: "post",
                    //     url: "http://localhost:3300/api/login",
                    //     data: {
                    //         username: this.state.username,
                    //         password: this.state.password,
                    //     },
                    // })
                    //     .then(token => {
                    //         console.log(token.data);
                    //         localStorage.setItem("token", token.data);
                    //         window.location.replace("/jokes");
                    //     })
                    //     .catch(err => {
                    //         alert(err, "login failed");
                    //     });
                })
                .catch(err => {
                    alert(err, "registration failed");
                });
        } else {
            alert("Provide username and password");
        }
    };

    loginUser = e => {
        if (this.state.username && this.state.password) {
            axios({
                method: "post",
                url: "http://localhost:3300/api/login",
                data: {
                    username: this.state.username,
                    password: this.state.password,
                },
            })
                .then(token => {
                    console.log(token.data);
                    localStorage.setItem("token", token.data);
                    window.location.replace("/jokes");
                })
                .catch(err => {
                    alert(err, "Login failed");
                });
        } else {
            alert("Provide correct username and password");
        }
    };

    render() {
        return (
            <div className="App">
                <nav>
                    <div>
                        <Link to="/jokes">Jokes</Link>
                    </div>
                    <div>
                        <Link to="/login">Login</Link>
                    </div>
                    <div>
                        <Link to="/register">Register</Link>
                    </div>
                </nav>

                <main>
                    <Route
                        path="/register"
                        render={props => (
                            <RegistrationForm
                                {...props}
                                handleChange={this.handleChange}
                                username={this.state.username}
                                password={this.state.password}
                                registerUser={this.registerUser}
                            />
                        )}
                    />
                    <Route
                        path="/login"
                        render={props => (
                            <LoginUser
                                {...props}
                                handleChange={this.handleChange}
                                username={this.state.username}
                                password={this.state.password}
                                loginUser={this.loginUser}
                            />
                        )}
                    />
                    <Route
                        path="/jokes"
                        render={props => <Jokes {...props} />}
                    />
                </main>
            </div>
        );
    }
}

export default App;
