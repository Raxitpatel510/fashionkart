const mongoose=require('mongoose');

const productSchema=new mongoose.Schema({
    photo:String,
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    reviewNumbers:{
        type:String,
        required:true
    },
    actualPrice:{
        type:Number,
        required:true
    },
    MRP:{
        type:Number,
        required:true
    },
    discounts:Number,
    category: {
        type: String,
        enum: ['men', 'women', 'kids', 'home-living', 'beauty', 'studio'],
        default: 'women',
        index: true,
    },
});

module.exports=mongoose.model('Product',productSchema);