import React from "react";
import axios from "axios";

class Jokes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jokes: [],
        };
    }

    componentDidMount() {
        axios({
            method: "get",
            url: "https://icanhazdadjoke.com/search",
            headers: {
                authorization: localStorage.getItem("token"),
            },
        })
            .then(jokes => {
                console.log(jokes.data);
            })
            .catch(err => {
                console.log("error retrieving jokes");
            });
    }

    render() {
        return <div>jokes</div>;
    }
}

export default Jokes;
