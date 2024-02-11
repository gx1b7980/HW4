import express, { Request, Response } from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import authorsRouter  from './routes/authors.js'; 
import booksRouter from './routes/books.js';
import { funct } from './checker.js';
import cors from 'cors';
import userRouter from './routes/auth.js';
import sequelize from './models/sequelizeInstance.js';
import dotenv from 'dotenv';
import { createProxyMiddleware } from 'http-proxy-middleware';


const app = express();
app.use(cors());
app.use(express.json());
let author = [{ id: 9, name: 'John Doe', bio: 'Lorem ipsum dolor sit amet' },]


app.use(express.static('dist'));
// Start the server
const port = process.env.PORT || 3008;

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store');
    next();
  });

sqlite3.verbose(); // enable better error messages
let db = await open({
    filename: "./database.db",
    driver: sqlite3.Database,

});
let A1 = await funct();
const startServer = async () => {
    try {
        // Sync Sequelize models with the database
        await sequelize.sync();
        console.log('Database synced.');

    } catch (error) {
        console.error('Failed to sync database:', error);
    }
};

startServer();
//console.log(A1.data);
// Use routes
app.use('/api/authors', authorsRouter);
app.use('/api/books', booksRouter);
app.use('/api/users', userRouter)


export default app;