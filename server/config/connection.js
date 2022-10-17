const mongoose = require('mongoose');

// connection to mongoDb
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/react-fitness', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;