const axios = require("axios");
const bcrypt = require("bcryptjs");

const { authenticate } = require("../auth/authenticate");

module.exports = server => {
    server.post("/api/register", register);
    server.post("/api/login", login);
    server.get("/api/jokes", authenticate, getJokes);
};

function register(req, res) {
    // implement user registration
    const creds = req.body;
    const hashedPassword = bcrypt.hashSync(creds.password, 14);
    creds.password = hashedPassword;

    axios
        .post("http://localhost:3300", creds)
        .then(id => {
            res.status(201).json(id);
        })
        .catch(err => {
            res.status(500).json({
                message: "Error registering User",
                error: err,
            });
        });
}

function login(req, res) {
    // implement user login
    const creds = req.body;

    // axios.get
}

function getJokes(req, res) {
    const requestOptions = {
        headers: { accept: "application/json" },
    };

    axios
        .get("https://icanhazdadjoke.com/search", requestOptions)
        .then(response => {
            res.status(200).json(response.data.results);
        })
        .catch(err => {
            res.status(500).json({
                message: "Error Fetching Jokes",
                error: err,
            });
        });
}
