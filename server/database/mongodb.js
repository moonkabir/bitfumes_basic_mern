import mongoose from 'mongoose';

async function connect() {
    // First work when conection work then the DB connected
    await mongoose.connect('mongodb+srv://bitfumes_basic_mern:Moon123$@cluster0.32hdevq.mongodb.net/?retryWrites=true&w=majority')
    .then(()=>console.log("MongoDB Connection is successful"))
    .catch((err)=> console.log(err));
}

export default connect;