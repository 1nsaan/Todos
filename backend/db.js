const mongoose = require("mongoose")
const mongoDbUrl = process.env.MONGODB_URI;
mongoose.connect(mongoDbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const todoSchema =mongoose.Schema({
    title:String,
    description: String,
    uname:{
        type:String, 
        index:true
    },
    completed:Boolean,
    
})


const todo = mongoose.model('todos',todoSchema);
module.exports = {
    todo
}

//