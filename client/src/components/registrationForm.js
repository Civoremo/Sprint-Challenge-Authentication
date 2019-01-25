import React from "react";

class RegistrationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <form onSubmit={this.props.registerUser}>
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
                        type="password"
                        placeholder="password"
                        name="password"
                        onChange={this.props.handleChange}
                        value={this.props.password}
                        required={true}
                        autoComplete="false"
                    />
                    <button onClick={this.props.registerUser}>Register</button>
                </form>
            </div>
        );
    }
}

export default RegistrationForm;
