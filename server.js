import express from 'express';
import cors from "cors";
import "dotenv/config";
import connectDB from './dbconfigs/db.js';
import route from './routes/route.js';

const PORT = process.env.PORT
const app = express();

app.use(cors());
app.use(express.json());
await connectDB();

app.use('/api/users', route)

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
});