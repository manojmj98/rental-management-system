require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const app = express();
const path = require('path');

const port = process.env.PORT || 5001;
const uri = process.env.MONGO_URI;

const userRouter = require('./routes/userRoutes.js');
const authRouter = require('./routes/auth.js');
const productRouter = require('./routes/productRoutes.js');
const orderRouter = require('./routes/orderRoutes.js');
const complaintRouter = require('./routes/complaintRoutes.js');
const messageRouter = require('./routes/messageRoutes.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/product', productRouter);
app.use('/api/order', orderRouter);
app.use('/api/complaint', complaintRouter);
app.use('/api/message', messageRouter);

mongoose.connect(uri, {
  useNewUrlParser: true,
});
const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

app.use(express.static(`${__dirname}/../client/build`));

app.get('*', function (req, res) {
  res.sendFile(
    path.join(__dirname, '../client/build', 'index.html'),
    function (err) {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      }
    }
  );
});

// log your server is running and the port
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Click here to open: http://localhost:${port}`);
});

const io = new Server(server, {
  cors: {
    credentials: true,
  },
});

let onlineUsers = new Map()
io.on('connection', (socket) => {
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const recipients = data.recipients
    let recipientSockets = []
    recipients.forEach(element => {
      recipientSockets.push(onlineUsers.get(element))
    });

    if (recipientSockets) {
      socket.to(recipientSockets).emit("msg-receive", {
        message: data.message,
        from: data.from,
        users: [data.from,...recipients]
      });
    }
  });
});
