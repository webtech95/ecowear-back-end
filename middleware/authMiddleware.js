import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const cleanToken = token.startsWith("Bearer ") ? token.slice(7) : token;

        const decoded = jwt.verify(cleanToken, process.env.JWT_SECRET); 
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(400).json({ message: 'Invalid token' });
    }
};
