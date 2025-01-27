import jwt from 'jsonwebtoken';
const excludeRoutes = ['/userData/login', '/userData/signup',];

export default async function authorizationUser(req, res, next) {
    const token = req.headers.authorization;
    // Exclude routes from authentication
    if (excludeRoutes?.includes(req.path)) {
        return next(); // Ensure to return after calling next()
    }
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        return next(); // Ensure to return after calling next()
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}