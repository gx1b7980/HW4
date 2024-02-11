import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Secret } from 'jsonwebtoken';

interface CustomRequest extends Request {
        user: any;
}

export const authenticateToken = (req: CustomRequest, res: Response, next: NextFunction) => {
        const token = req.cookies.token;
        if (token == null) return res.sendStatus(401);

        const jwtSecret: Secret = process.env.JWT_SECRET || "your_jwt_secret"; // Provide a default value for JWT_SECRET if it is undefined

        jwt.verify(token, jwtSecret, (err: any, user: any) => {
                if (err) return res.sendStatus(403);
                req.user = user;
                next();
        });
};
