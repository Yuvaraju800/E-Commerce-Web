const express = require("express");
const cors = require("cors");
require("./db/config");
const User = require("./db/user");
const Product = require("./db/Product");
//json web token authentication
const Jwt=require('jsonwebtoken');
const jwtKey="e-comm";
const app = express();
app.use(cors());
app.use(express.json());
//for register add details in postman and fetch from database
app.post("/register", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password; //delete password from response
  //JWt for signin
  Jwt.sign({result},jwtKey,{expiresIn:"2h"},(err,token)=>{
    if(err){
      res.send({result:"Something went wrong,please try after sometime."})
    }
    res.send({result,auth:token});
  });
  // user.save() .then(() => {
  //     res.send(user);
  //   })
  //   .catch((err) => {
  //     // res.send(err);
  //   });
});
//For login add details in postman and fetch from database
app.post("/login", async (req, res) => {
  console.log(req.body);
  if (req.body.email && req.body.password) {
    let user = await User.findOne(req.body).select("-password"); //delete password from response
    if (user) {
      Jwt.sign({user},jwtKey,{expiresIn:"2h"},(err,token)=>{
        if(err){
          res.status(400).send("Something went wrong,please try after sometime.");
        }
        res.send({user,auth:token});
      })
      
    } else {
      res.status(400).send("User not found");
    }
  }
});
//route for Product
app.post("/add-product", async (req, res) => {
  let product = new Product(req.body);
  let result = await product.save();
  res.send(result);
});
//route for product list
app.get("/product-list", async (req, res) => {
  let products = await Product.find();
  if (products.length === 0) {
    res.status(400).send("No product found");
  }
  res.send(products);
});
//route for delete
app.delete("/product/:id", async (req, res) => {
  const result = await Product.deleteOne({ _id: req.params.id });
  res.send(result);
});
//Api forgetting product details tgrough id from database to update product
app.get("/product/:id", async (req, res) => {
  let product = await Product.findOne({ _id: req.params.id });
  if (product) {
    res.send(product);
  } else {
    res.status(400).send("Product not found");
  }
});
//route for update
app.put("/product/:id", async (req, res) => {
  let product= await Product.updateOne(
    {_id:req.params.id},
    {
     $set:req.body
    }
    );
  res.send(product);
});
//Api for search
app.get("/search/:key", async (req, res) =>{
let result=await Product.find({
  "$or":[
    {name:{$regex:req.params.key}},
    {company:{$regex:req.params.key}},
    {category:{$regex:req.params.key}}
  ]
});
res.send(result);
});
const port = 5000;
app.listen(port, () => {
  console.log("listening on port " + port);
});
