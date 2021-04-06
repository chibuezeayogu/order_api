import "regenerator-runtime/runtime.js";
import express, { json, urlencoded } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import morgan from 'morgan';
import routes from './routes/index';
import { routeNotFound, errorHandler } from './middleware/errorHandlers';

config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(
  json(),
  urlencoded({ extended: false }),
  morgan('dev'),
  cors(),
);

app.use('/api/v1', routes);
app.use(routeNotFound, errorHandler);

app.listen(PORT, () => {
  console.log(`App listing on http://localhost:${PORT}`);
})

export default app;
