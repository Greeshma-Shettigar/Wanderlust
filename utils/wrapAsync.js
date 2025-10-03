module.exports =(fn) =>{
    return (req,res,next)=>{
        fn(req,res,next).catch(next);  //if there is any error it will be passed to next function which is error handling middleware
    };
};

//this is a higher order function which takes a function as an argument and returns a new function which wraps the original function in a try catch block
//this will help us to avoid writing try catch block in every route handler
//we can use this function in app.js like this
//const wrapAsync=require("./utils/wrapasync");
//app.get("/listings/:id",wrapAsync(async (req,res)=>{
  //  let {id}=req.params;
    //const listing= await Listing.findById(id);//we will parse  this data to show.ejs
    // res.render("listings/show.ejs",{listing});
 //}));