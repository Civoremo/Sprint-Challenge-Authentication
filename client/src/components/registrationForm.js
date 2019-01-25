import React from "react";
import styled from "styled-components";

// styled components
const FormContainer = styled.div`
    background-color: lightgray;
    width: 300px;
    padding: 20px 10px;
    border-radius: 10px;
    border: 1px solid gray;
    display: flex;
    justify-content: center;
    margin: 0 auto;
`;

const FormStyled = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const InputStyled = styled.input`
    margin-bottom: 15px;
    padding: 5px 10px;
    width: 150px;
    text-align: center;
`;

const SubmitButton = styled.button`
    width: 80px;
    height: 30px;
    font-weight: bold;

    &:hover {
        cursor: pointer;
    }
`;

class RegistrationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <FormContainer>
                <FormStyled onSubmit={this.props.registerUser}>
                    <InputStyled
                        type="text"
                        placeholder="username"
                        name="username"
                        onChange={this.props.handleChange}
                        value={this.props.username}
                        required={true}
                        autoComplete="false"
                    />
                    <InputStyled
                        type="password"
                        placeholder="password"
                        name="password"
                        onChange={this.props.handleChange}
                        value={this.props.password}
                        required={true}
                        autoComplete="false"
                    />
                    <SubmitButton onClick={this.props.registerUser}>
                        Register
                    </SubmitButton>
                </FormStyled>
            </FormContainer>
        );
    }
}

export default RegistrationForm;
