const mongoose = require('mongoose');

const app = require('./app');

const DB_HOST =
  'mongodb+srv://Kate:Rn1B2t02XwdxkR5B@cluster0.3w0l7ye.mongodb.net/db_contacts?retryWrites=true&w=majority';

mongoose.set('strictQuery', true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
    console.log('Database connection successful');
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
