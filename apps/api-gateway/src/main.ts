import express from 'express';
// import path from 'path';
import cors from 'cors';
import proxy from 'express-http-proxy';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
// import swaggerUi from 'swagger-ui-express';
// import axios from 'axios';
import cookieParser from 'cookie-parser';
// import { error } from 'console';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) :8080;

const app = express();

app.use(cors({
  origin:['http://localhost:3000'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(morgan('dev'));
app.use(express.json({limit:"100mb"}));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));
app.use(cookieParser());

app.set('trust proxy', true);


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: (req:any) => (req.user ? 1000 : 100), // 1000 requests for authenticated users, 100 for others
  message: {error: 'Too many requests, please try again later.'},
  standardHeaders: true,
  legacyHeaders: true,
  keyGenerator : (req:any) => req.ip,
});
app.use(limiter);

app.get('/gateway_health', (req, res) => {
  res.send({ message: 'Welcome to API gateway' });
});

app.use('/',proxy("http://localhost:6001"));

const server = app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});

server.on('error',console.error);
