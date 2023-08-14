const express = require('express');
const jokenMiddleware = require("./jwt.middleware")
const app = express()
const mongoose = require('mongoose');
require('dotenv').config()
//console.log(process.env)
let schema = mongoose.Schema
// mongoose connect
mongoose.connect(process.env.DBURL) 

const database =mongoose.connection
database.on('connected',() => console.log('Database Connected'))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.post('/cars', async function (req, res) {
  let createcars = new carsschema(req.body)
  let createdcars = await createcars.save()
  res.status(200).send({
    status: 200,
    result: createdcars,
    message: "created successfully"
  })
})

app.get('/cars', async function (req, res) {

  let viewcars = await carsschema.find().populate("ingreedients")
  res.status(200).send({
    status: 200,
    result: viewcars,
    message: "created successfully"
  })
})


app.patch('/cars/:carsId', async function (req, res) {
  console.log(req.params.carsId);
  let uniqueId = new mongoose.Types.ObjectId(req.params.carsId)
  console.log(uniqueId);

  let updatecars = await carsschema.updateMany({ _id: uniqueId }, req.body, { upsert: true })
  res.status(200).send({
    status: 200,
    result: updatecars,
    message: "updated successfully"
  })
})



app.delete('/cars/:carsId', async function (req, res) {
  console.log(req.params.carsId);
  let uniqueId = new mongoose.Types.ObjectId(req.params.carsId)
  console.log(uniqueId);
  let updatecars = await carsschema.deleteOne({ _id: uniqueId })
  res.status(200).send({
    status: 200,
    result: updatecars,
    message: "data del successfully"
  })
})

app.post('/ingredients', async function (req, res) {
  let createingredients = new ingreedientsModel(req.body)
  let createingredient = await createingredients.save()
  res.status(200).send({
    status: 200,
    result: createingredient,
    message: " Data created successfully"
  })
})


app.get('/ingredients', async function (req, res) {
  let getIngredients = new ingreedientsModel(req.body)
  let getIngredient = await getIngredients.find()
  res.status(200).send({
    status: 200,
    result: getIngredient,
    message: " Data created successfully"
  })
})

app.post('/cars/token', async function (req, res) {

  try {
    let getcars = await carsschema.findOne({ RollsRoyce: req.body.RollsRoyce })
    //console.log(getcars)
    if (!getcars) { throw "car not founds" }
    //console.log(getcars)
    if (!getcars) { throw "Dish not fount" }
    let getToken = await jokenMiddleware.createToken(getcars)
    res.status(200).send({
      status: 200,
      result: { token: getToken },
      message: "created successfully"
    })
  }
  catch (error) {

    res.status(404).send({
      status: 404,
      message: "No cars found"
    })
  }

})



app.get('/cars/token', async function (req, res) {
  try {
     console.log(req.headers.authorization);
    let verifiedData = await jokenMiddleware.verifyToken(req.headers.authorization);
    console.log(verifiedData);
    //console.log(req.headers.verifiedData);
    let getcars = await carsschema.find().populate('ingreedients')
    if(verifiedData){
    let getcars = "hai"
    res.status(200).send({
      status: 200,
      result: getcars,
      message: "created successfully"
    })
  }else{
    req.send("error");
  }
  }

  catch (error) {
    console.log(error);
    res.status(404).send({
      status: 404,
      message: "Invlid Token"
    })
  }
})

app.listen(3000, () => {
  console.log("Server is running... " + 3000);
});

let carscoltschema = new schema({

  RollsRoyce: String,
  price: Number,
  Fuel: String,
  fueltank: Number,

  ingreedients: [{ type: schema.Types.ObjectId, ref: "ingreedients" }]

})
let ingredientsschems = new schema({

  Ford: String,
  price: Number,
  Fuel: String,
  fueltank: Number

})

let carsschema = mongoose.model('cars', carscoltschema)
let ingreedientsModel = mongoose.model("ingreedientsModel", ingredientsschems)
























