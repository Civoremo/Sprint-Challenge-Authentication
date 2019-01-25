1. What is the purpose of using _sessions_?

    - They are used to verify/authentication a user when they log in; sessions can contain user information that would make the experience better. A module like express-session stores only a session identifier on the client within a cookie and stores the session data on the server.

1. What does bcrypt do to help us store passwords in a secure manner.

    - It will hash the password into a a human unrecognizable form.

1. What does bcrypt do to slow down attackers?

    - Hashes information to the Nth power and makes the original data unrecogizable.

1. What are the three parts of the JSON Web Token?

    - We have the "header", "payload", and "verify signature"
