import express from 'express';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(routes);

const port = process.env.PORT || 8080;
app.listen(8080, () => console.log(`Server started on port ${port}`));
