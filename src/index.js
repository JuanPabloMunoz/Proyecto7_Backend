require('dotenv').config();
const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');

const userRouter = require('./routes/user.routes');
const guitarRouter = require('./routes/guitar.routes');
const cartRouter = require('./routes/cart.routes');

const PORT = process.env.PORT || 5000;

const app = express();

connectDB();

//Lista blanca de dominios permitidos
const allowedOrigins = [
    'https://proyecto7-backend.onrender.com',
    'https://p7-e-comerce.netlify.app/',
    'http://localhost:5173'
];

//middlewares
app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("No permitido por CORS"));
        }
    },
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/users', userRouter); // localhost:3000/api/v1/users
app.use('/api/v1/guitars', guitarRouter); // localhost:3000/api/v1/guitars
app.use('/api/v1/carts', cartRouter); // localhost:3000/api/v1/carts

app.listen(PORT, () => {
    console.log('servidor corriendo en el puerto: ', PORT);
})