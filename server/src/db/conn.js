const mongoose = require('mongoose');

const DB = process.env.DATABASE;

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('connection successful with the database: el-chat');
}).catch((err) => {
    console.log('Erro connecting to the database (el-chat) : ', err);
});