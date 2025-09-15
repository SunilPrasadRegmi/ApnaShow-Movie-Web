import jwt from 'jsonwebtoken';

export const userAuth = async(req, res, next) => {
    
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if(!token) {
        return res.status(401).json({
            success: false,
            message: 'Access denied. No token provided.'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded) {
            return res.status(401).json({
                success: false,
                message: 'Token is not valid.'
            });
        }

        req.user = { _id: decoded._id, email: decoded.email };
        
        // console.log(req.user);

        next();

    } catch(error) {
        console.log(error);
        return res.status(401).json({
            success: false,
            message: 'Token is not valid error in authentication middleware.'
        });
    }
}