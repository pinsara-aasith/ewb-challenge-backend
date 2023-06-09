require('dotenv').config();

import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import serveStatic from 'serve-static';
import cookieParser from 'cookie-parser';
import connectDB from './utils/connectDB';
import path from 'path';
import helmet from "helmet";
import nocache from 'nocache';
import ReportRouter from './reports/report.route';

const app = express();

app.use(nocache());
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }));

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

if (process.env.NODE_ENV === 'development') {
	app.set('views', path.join(__dirname, '../client/pages'))
} else {
	app.set('views', path.join(__dirname, '../client/dist/pages'))
}

if (process.env.NODE_ENV === 'production') {
	app.use(
		cors({
			// origin: (process.env.NODE_ENV === 'development') ? 'http://localhost:5173' : process.env.ORIGIN,
			origin: process.env.ORIGIN,
			credentials: true,
		})
	);
}

app.use(ReportRouter);

app.get('/health', (req: Request, res: Response, next: NextFunction) => {
	res.status(200).json({
		status: 'success',
		message: 'service is running ✅',
		more: 'content type: ' + req.accepts('html'),
	});
});


/* Unknown Routes */
app.all('*', (req: Request, res: Response, next: NextFunction) => {
	const err = new Error(`Route ${req.originalUrl} not found`) as any;
	err.statusCode = 404;

	next(err);
});


app.use((err: any, req: Request, res: Response, next: NextFunction) => {
	err.status = err.status || 'error';
	err.statusCode = err.statusCode || 500;

	console.error(err)

	res.status(err.statusCode).json({
		status: err.status,
		message: err.message,
	});
});

const port = Number(process.env.PORT);

app.listen(port, () => {
	console.log(`Server started on port: ${port}`);
	connectDB();
});
