import React from "react";
import axios from "axios";
import styled from "styled-components";

// styled components
const JokeContainer = styled.div`
    border: 1px solid lightgray;
    border-radius: 5px;
    padding: 10px 10px;
    width: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    margin-bottom: 20px;
`;

class Jokes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jokes: [],
        };
    }

    componentDidMount() {
        if (localStorage.getItem("token")) {
            axios({
                method: "get",
                url: "http://localhost:3300/api/jokes",
                headers: {
                    authorization: localStorage.getItem("token"),
                },
            })
                .then(jokes => {
                    console.log(jokes.data);
                    this.setState({
                        jokes: jokes.data,
                    });
                })
                .catch(err => {
                    console.log("error retrieving jokes");
                });
        } else {
            alert("Unauthorized!");
            window.location.replace("/login");
        }
    }

    render() {
        return (
            <div>
                {this.state.jokes.map((joke, index) => {
                    return (
                        <div key={joke.id}>
                            <JokeContainer>
                                <div>{index}</div> {joke.joke}
                            </JokeContainer>
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default Jokes;
