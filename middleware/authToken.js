const jwt = require("jsonwebtoken");

const userAuthentication = async (req, res, next) => {
    const authHeader = req.headers.Authorization || req.headers.authorization;
    console.log("authHeader :", authHeader);
    if (authHeader && authHeader.startsWith("Bearer")) {
        let token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.secret_Key, (err, decoded) => {
            if (err) {
                res.status(401).json({
                    success: false,
                    message: "User is not authorize",
                })
            } else {
                req.user = decoded.userData;
                console.log(decoded.userData);
                next();
            }
        })
    } else {
        res.status(409).json({
            success: false,
            message: "Token Not Found"
        })
    }
}

module.exports = {
    userAuthentication
}

