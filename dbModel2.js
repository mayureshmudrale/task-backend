import mongoose from 'mongoose';

const instance = mongoose.Schema({
    add_api_count:Number,
    update_api_count:Number,
    
});

export default mongoose.model('api_count ',instance);