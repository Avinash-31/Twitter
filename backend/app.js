const express = require('express');
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require('body-parser');
const initalRoutes = require('./routes/initialRoutes');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const geoipMiddleware = require('./middlewares/geoipMiddleware');
const useragentMiddleware = require('./middlewares/useragentMiddleware');
const emailService = require('./utils/emailService');
const path = require('path');
const requestIp = require('request-ip');
const useragent = require('express-useragent');

const app = express();
app.use(cors());
app.use(useragent.express());
app.use(requestIp.mw());

dotenv.config();
app.use('/payment', paymentRoutes);
app.use(bodyParser.json());


app.use(geoipMiddleware);
app.use(useragentMiddleware);

app.use('/auth', authRoutes);
app.use('/posts', postRoutes);
app.use('/user', userRoutes);

// Initialize the email service
emailService.init();

if (process.env.NODE_ENV === "production") {
    const __dirname1 = path.resolve().split('\\').slice(0, -1).join('\\');
    app.use(express.static(path.join(__dirname1, "/frontend/build")));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"));
    });
}
else {
    app.use('/', initalRoutes);
}

module.exports = app;

