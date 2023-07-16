const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

const multer = require('multer');
const path = require('path');

const authRouter = require('./routes/api/auth');
const contactsRouter = require('./routes/api/contacts');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

const tempDir = path.join(__dirname, 'temp');
const multerConfig = multer.diskStorage({
  destination: tempDir,
});

const upload = multer({
  storage: multerConfig,
});

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/users', authRouter);
app.use('/api/contacts', contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

module.exports = app;
