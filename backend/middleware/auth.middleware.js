import jwt from "jsonwebtoken";

export const authUser = async (req, res, next) => {
    try {
        const token = req.cookies?.token || req.headers.authorization.split(" ")[1];

        if (!token || token.trim() === "") {
            return res.status(401).send({ error: "Unauthorized User" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error);
        return res.status(401).send({ error: "Unauthorized User" });
    }
};
