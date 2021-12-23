import mongoose from 'mongoose';

const instance = mongoose.Schema({
    movie:String,
    rating:String,
});

export default mongoose.model('movie_rate ',instance);