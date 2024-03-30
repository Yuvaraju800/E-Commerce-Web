// const mongoose =require('mongoose');
// mongoose.connect('mongodb://localhost:27017/e-commerce','');
const connectionUrl = 'mongodb://127.0.0.1:27017/e-commerce'
const mongoose = require('mongoose')
mongoose.connect(connectionUrl, {
    // useNewUrlParser: true,
    // useFindAndModify: false,
    // useUnifiedTopology: true
},).then(() => console.log('Connected to database')).catch((error) => console.log(error))
