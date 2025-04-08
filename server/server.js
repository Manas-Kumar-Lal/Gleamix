import './config/dotenv.config.js'
import express from 'express';
import './db/connection1.db.js'
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello world!');
})

import imageRoute from './routes/image.route.js'

app.use('/api/v1/image', imageRoute);

app.listen(8080, () => {
    console.log(`App listening on http://localhost:8080`);
})