import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from './prisma';

// validate token and the user and then only call the handlers
// higher order func that wraps our handler, basically a custom handler
// decode jwt, find the user, and if all works out, call origin handler
export const validateRoute = (handler) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        const token = req.cookies.TRAX_ACCESS_TOKEN;
        if (token) {
            let user;
            try {
                const { id } = jwt.verify(token, process.env.JWT_SECRET);
                user = await prisma.user.findUnique({
                    where: { id },
                });

                if (!user) {
                    throw new Error('User not valid')
                }
            } catch (error) {
                res.status(401);
                res.json({ erro: "User not authorized" });
                return;
            }
            return handler(req, res, user);
        }
        res.status(401);
        res.json({ error: "User not authorized" });
    }
}

export const validateToken = token => {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    return user;
}