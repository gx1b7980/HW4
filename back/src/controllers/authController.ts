import { Request, Response } from 'express';
import argon2 from 'argon2'; 
import { User } from '../models/User.js'; 
import jwt from 'jsonwebtoken'; 
import { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';

export const register = async (req: Request, res: Response) => {
    const { username, password, name, email } = req.body;
    console.log(req.body);
    
    // Check for existing user
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
        return res.status(409).json({ message: 'Username is already taken.' });
    }

    // Hash the password
    const passwordHash = await argon2.hash(password);

    // Create the user
    await User.create({
        username,
        passwordHash: passwordHash,
        name, 
        email, 
      });
    
    res.status(201).json({ message: 'User created successfully.' });
};

export const login = async (req: Request, res: Response) => {
    console.log("S"+req.body);
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const passwordValid = await argon2.verify(user.passwordHash, password);
    if (!passwordValid) return res.status(401).json({ message: 'Invalid password' });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || "your_jwt_secret", { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict' });
    res.json({ message: 'Logged in successfully' });
};

export const logout = (req: Request, res: Response) => {
    res.cookie('token', '', { expires: new Date(0) });
    res.clearCookie('token');
    res.json({ message: 'Logged out' });
}

