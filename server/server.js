const express = require("express");
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const app = express();
const cookieParser = require('cookie-parser')

const port = process.env.PORT || 5001;
const uri = process.env.MONGO_URI;

const userRouter = require('./routes/userRoutes.js');
const authRouter = require('./routes/auth.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);
app.use('/api/oauth',authRouter);



mongoose.connect(uri, {
    useNewUrlParser: true,
});
const connection = mongoose.connection;

connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

app.use(express.static(`${__dirname}/../client/build`));

app.get("/*", function (req, res) {
    res.sendFile(`${__dirname}/../client/build/index.html`, function (err) {
        if (err) {
            res.status(500).send(err);
        }
    });
});

// log your server is running and the port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
    console.log(`Click here to open: http://localhost:${port}`)
});