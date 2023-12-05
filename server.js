import express from 'express';
import dotenv from 'dotenv';
import routes from './routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use('/api', routes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});