const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing=require("./models/listing.js");
const path=require("path");//for ejs
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
//connect to database
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

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));//this is used to override method in forms
app.engine("ejs",ejsMate);//this is used to use ejs-mate
app.use(express.static(path.join(__dirname,"/public")));//this is used to serve static files like css,js,images etc.
//root route
app.get("/",(req,res)=>{
    res.send("Hi,I am root");
});
//index route
app.get("/listings", async (req, res) => {
    try {
        const allListings = await Listing.find({});
        res.render("listings/index", { allListings }); // ✅ No "/" before "listings/index"
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching listings");
    }
});
//new route.This will only take us to form but it will not make changes to db.for that we need to create route.

app.get("/listings/new",(req,res)=>{
    res.render("listings/new");
});

//show route
app.get("/listings/:id",async (req,res)=>{
   let {id}=req.params;
    const listing= await Listing.findById(id);//we will parse  this data to show.ejs
     res.render("listings/show.ejs",{listing});
});
 //create route. This will send post request.from this we will make changes to db so we use async and await.
//create route-this is reqired when we click on create new listing button it will show us a form, after filling the form and submitting it will make changes to db
app.post("/listings",async(req,res)=>{
    //let {title,description,image,price,country,location}=req.body;
    //we can simplify above method by modifying new.ejs <input name="title" this to name="listing(title)"
    //here listing is the key and title is the value
   const newListing= new Listing(req.body.listing); // create a new list
    await newListing.save();
    res.redirect("/listings");
});
//edit route
//this will only take us to edit form but it will not make changes to db.for that we need to update route.
app.get("/listings/:id/edit",async(req,res)=>{
    let {id}=req.params;
    const listing= await Listing.findById(id);
    res.render("listings/edit",{listing});
});

//update route
app.put("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    const updatedListing=await Listing.findByIdAndUpdate(id,{...req.body.listing});//... is spread operator which will take all the properties of req.body.listing and put it in the object
    //we can also use req.body instead of req.body.listing but it is not a good practice as it may contain other properties which we don't want to update
    res.redirect(`/listings/${updatedListing._id}`);//after updating it will take us to show page of that listing
});

//delete route
app.delete("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    let deletedlisting= await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
});

//app.get("/testListing",async (req,res)=>{
  //  let sampleListing=new Listing({
    //    title:"My New Villa",
      //  description:"By the beach",
        //price:1200,
      //  location:"Calangutee,Goa",
        //country:"India",
    //});
    //await sampleListing.save();
    //console.log("sample was saved");
    //res.send("sucessful testing");
    
//});
app.listen(8080,()=>{
    console.log("server is listening to the port");
});