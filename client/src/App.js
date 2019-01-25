import React, { Component } from "react";
import "./App.css";
import { Link, Route } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import HomeScreen from "./components/home";
import RegistrationForm from "./components/registrationForm";
import LoginUser from "./components/loginUser";
import Jokes from "./components/jokes";

// styled components
const NavBar = styled.nav`
    background-color: #222222;
    color: #ffffff;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 60px;
    margin-bottom: 30px;
`;

const NavLinks = styled.div`
    display: ${props => props.defaultValue};

    &:hover {
        text-decoration: underline;
        cursor: pointer;
    }
`;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            logged: false,
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
                            alert("Registered and Logged in successful!");
                            localStorage.setItem("token", token.data);
                            window.location.replace("/jokes");
                        })
                        .catch(err => {
                            alert(err, "Login failed");
                        });
                })
                .catch(err => {
                    this.setState({
                        username: "",
                        password: "",
                    });
                    alert(err, "registration failed");
                });
        } else {
            alert("Provide username and password");
        }
    };

    loginUser = e => {
        e.preventDefault();
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
                    alert("Login successful!");
                    window.location.replace("/jokes");
                })
                .catch(err => {
                    this.setState({
                        username: "",
                        password: "",
                    });
                    alert(err, "Login failed");
                });
        } else {
            alert("Provide correct username and password");
        }
    };

    logoutUser = e => {
        e.preventDefault();
        localStorage.removeItem("token");
        alert("Logout seccessful!");
        window.location.replace("/");
        this.setState({
            logged: false,
        });
    };

    render() {
        return (
            <div className="App">
                <NavBar>
                    <NavLinks>
                        <Link to="/jokes">Jokes</Link>
                    </NavLinks>
                    <NavLinks
                        defaultValue={
                            !localStorage.getItem("token") ? "block" : "none"
                        }
                        type="text"
                    >
                        <Link to="/login">Login</Link>
                    </NavLinks>
                    <NavLinks
                        defaultValue={
                            localStorage.getItem("token") ? "block" : "none"
                        }
                        type="text"
                    >
                        <Link to="" onClick={this.logoutUser}>
                            Logout
                        </Link>
                    </NavLinks>
                    <NavLinks>
                        <Link to="/register">Register</Link>
                    </NavLinks>
                </NavBar>

                <main>
                    <Route
                        exact
                        path="/"
                        render={props => <HomeScreen {...props} />}
                    />
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
