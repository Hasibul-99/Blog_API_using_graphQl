const jwt = require('jsonwebtoken');

const authenticate = async (req, res, next) => {
    const token = req?.headers?.authorization?.split(" ")[1] || undefined;

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        // const decode = jwr.decode(token, process.env.JWT_SECRET);
        req.verifiedUser = verified;
        console.log("verified success!", verified);
        next(); 
    } catch (error) {
        console.log("verification faield",);
        next()
    }
}

module.exports = {authenticate};