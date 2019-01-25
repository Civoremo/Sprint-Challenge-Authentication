import React from "react";

class LoginUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <form onSubmit={this.props.loginUser}>
                    <input
                        type="text"
                        placeholder="username"
                        name="username"
                        onChange={this.props.handleChange}
                        value={this.props.username}
                        required={true}
                        autoComplete="false"
                    />
                    <input
                        type="text"
                        placeholder="password"
                        name="password"
                        onChange={this.props.handleChange}
                        value={this.props.password}
                        required={true}
                        autoComplete="false"
                    />
                    <button onClick={this.props.loginUser}>Login</button>
                </form>
            </div>
        );
    }
}

export default LoginUser;
