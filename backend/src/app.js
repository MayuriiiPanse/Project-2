const express = require('express');
const cookieParser = require('cookie-parser');
const router = require('./routes/auth.routes');
const prouter = require('./routes/post.routes');
const chatrouter = require('./routes/chatRoutes');

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', router);
app.use('/api/posts', prouter);
app.use('/api/chat', chatrouter);

module.exports = app;