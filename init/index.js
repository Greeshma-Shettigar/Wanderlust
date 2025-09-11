const mongoose=require("mongoose");
const initData=require("./data.js"); //Node will look for data.js inside the same folder as index.js (i.e., src/data.js).Whatever is exported from data.js will be stored in the variable initData
const Listing=require("../models/listing.js");//Node will go up one level from seed to the parent folder, and then into models, and load listing.js.

const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";

main()
.then(()=>{
    console.log("connected to db");
})
.catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(MONGO_URL);
}
const initDB= async ()=>{
    await Listing.deleteMany({}); //It will delete all the data in database if any
    await Listing.insertMany(initData.data);//after deleting it will insert all data in the data file to database
    console.log("Data was inserted");
};
initDB();