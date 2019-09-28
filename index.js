const mongoose = require('mongoose');
const app = require('./src/app');


mongoose.set('useUnifiedTopology', true);

mongoose.connect(process.env.DATABASE_CONN, { useNewUrlParser: true }, () => {
    app.listen(3000);
});