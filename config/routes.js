const axios = require("axios");
const bcrypt = require("bcryptjs");
const knex = require("knex");
const knexConfig = require("../knexfile.js");
const jwt = require("jsonwebtoken");

db = knex(knexConfig.development);

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

    db("users")
        .insert(creds)
        .then(id => {
            res.status(201).json(id);
        })
        .catch(err => {
            res.status(500).json({
                message: "Error registering user",
                error: err,
            });
        });
}

function generateToken(user) {
    const payload = {
        id: user.id,
        username: user.username,
    };

    const secret = process.env.JWT_SECRET;

    const options = {
        expiresIn: "1h",
    };

    return jwt.sign(payload, secret, options);
}

function login(req, res) {
    // implement user login
    const creds = req.body;
    db("users")
        .where({ username: creds.username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(creds.password, user.password)) {
                const token = generateToken(user);
                res.status(200).json(token);
            }
        })
        .catch(err => {
            res.status(500).json({
                message: "Error login in user",
                error: err,
            });
        });
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
