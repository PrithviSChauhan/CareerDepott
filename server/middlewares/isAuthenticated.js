import jwt from "jsonwebtoken";

const isUthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if(!token){
            return res.status(401).json({
                message: "user not authenticate",
                success: false
            })
        }

        const decode = jwt.verify(token, process.env.SECRET_KEY);

        if(!decode){
            return res.status(401).json({
                message: "invalid token!",
                success: false
            })
        }

        req.id = decode.userID;
        next();
    } catch (error) {
        console.log(error);
    }
}

export default isUthenticated;