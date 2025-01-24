import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    productType:String,
    image:String,
    company:String,
    model:String,
    price:String,
    catageory:String,
    description:String
})
export default mongoose.model('products', productSchema);