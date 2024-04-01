// const mongoose =require('mongoose');
// mongoose.connect('mongodb://localhost:27017/e-commerce','');
const connectionUrl = 'mongodb+srv://yuvarajualladi6:8h8IOwHnO1NQyd2Z@e-commerce-web.4i6yjkg.mongodb.net/'
const mongoose = require('mongoose')
mongoose.connect(connectionUrl, {
    // useNewUrlParser: true,
    // useFindAndModify: false,
    // useUnifiedTopology: true
},).then(() => console.log('Connected to database')).catch((error) => console.log(error))
