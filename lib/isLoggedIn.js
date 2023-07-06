// module.exports = function(req, res, next) {
//     if (!req.user) {
//         res.redirect('/auth/signin')
//     } else {
//         next()
//     }
// }

const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
    var token = ""
    var authToken = req.header("Authorization");
    console.log('authtoken', authToken);
    if (authToken) {
        authToken = authToken.replace("Bearer ", "");
        console.log(authToken);
        token = authToken;
    }
    if (!authToken) {
        return res.json({ "message": "Ahaaaan !!! You are not allowed to view this as this is hidden behind the wall of authentication" });
    }
    try {
        const decoded = jwt.verify(token, "SUPERSECRET");
        req.user = decoded.user;
        console.log("Test01 ", req.user)
        next();
    } catch (error) {
        console.log(error.message)
        return res.status(401).json({ "message": "Your token is invalid" })
    }
}