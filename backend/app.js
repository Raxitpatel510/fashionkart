require('dotenv').config();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require("cors");

const { default: mongoose } = require('mongoose');
const homeRouter = require('./routes/homeRouter');
const adminRouter = require('./routes/adminRouter');
const bagRouter = require('./routes/bagRouter');
const authRouter = require('./routes/authRouter');

const DBpath = process.env.MONGO_STR;
const secret = process.env.JWT_SECRET;

const app = express();  // backend deployed on https://fashionKart-ultg.onrender.com

app.use(cors({
    origin: (origin, callback) => {
        const allowedOrigins = [
            process.env.CLIENT_URL,
            "http://localhost:5173",
            "http://127.0.0.1:5173"
        ].filter(Boolean);

        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error("Not allowed by CORS"));
    },
    credentials: true
}));

app.use(express.urlencoded());
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res, next) => {
    console.log(req.url, req.method);
    next();
});

app.use(authRouter);
app.use(homeRouter);

app.use((req, res, next) => {
    console.log("my cookies : ", req.cookies);
    if (!req.cookies.uid) {
        return res.status(401).json({ message: "Login first.." });
    }

    try {
        const decoded = jwt.verify(req.cookies.uid, secret);
        if (decoded.userType === "customer" || decoded.userType === "admin") {
            return next();
        }
        return res.status(401).json({ message: "Login first.." });
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired login session" });
    }
})

app.use('/admin', adminRouter);
app.use('/bag', bagRouter);

const PORT = process.env.PORT || 3030;
mongoose.connect(DBpath).then(() => {
    console.log("connecting to mongo..");
    app.listen(PORT, () => {
        console.log(`running server at http://localhost:${PORT}`);
    });
}).catch(err => {
    console.log("error while connection mongo..", err);
});
