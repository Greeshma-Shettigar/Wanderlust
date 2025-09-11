const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const listingSchema=new Schema({
    title:{
        type:String,
        required: true,
    },
    description : String,
    image:{
        type:String,
        default:"https://c8.alamy.com/comp/E7323M/beautiful-maple-with-nice-background-for-adv-or-others-purpose-use-E7323M.jpg",
        //default is used when image is undefined or we didn't send any img then set to default
        set:(v)=> v===""?"https://c8.alamy.com/comp/E7323M/beautiful-maple-with-nice-background-for-adv-or-others-purpose-use-E7323M.jpg":v,
       //set is used to set default image when image is used but it is empty
       },
     //  image: { 
    //filename: { type: String, required: true },
    //url: { type: String, required: true }

    //},
    price:Number,
    location:String,
    country:String,

});
const Listing=mongoose.model("Listing",listingSchema);//This model gives you methods to interact with the MongoDB collection (like Listing.find(
module.exports=Listing;
