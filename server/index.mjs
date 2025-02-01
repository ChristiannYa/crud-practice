import express from 'express';
import './config/db.mjs';
import routes from './routes/index.mjs';

const app = express();

app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Running on Port: ${PORT}`);
});
