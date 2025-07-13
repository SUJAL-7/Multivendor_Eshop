/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import express from 'express';
import * as path from 'path';
import { errorMiddleware } from '@multivendor-eshop/common-utils';

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res) => {
  res.send({message: 'Welcome to auth-service!'});
})

app.use(errorMiddleware);

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to auth-service API!' });
});

const port = process.env.PORT || 6001;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', (err) =>{
  console.log('Server error:', err);
});
