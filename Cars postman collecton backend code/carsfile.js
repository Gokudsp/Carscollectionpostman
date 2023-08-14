const express = require('express');
const jokenMiddleware = require("./jwt.middleware")
const app = express()
const mongoose = require('mongoose');
let schema = mongoose.Schema

var cron = require('node-cron');

cron.schedule('* * * * *', async () => {
  let a = 1 + 12
  let createcars = new  carsschema({ RollsRoyce:"newcar"})
      let createdcars = await createcars.save()
  console.log('running a task every minute',a);
});

//const baseurl ='https://localhost:3000'
const multer  = require('multer')

const storage = multer.diskStorage({
destination: function (req, file, cb) {
  cb(null, './uploads')
},
filename: function (req, file, cb) {
  console.log(file);
  const uniqueSuffix ="Goku"
  cb(null, uniqueSuffix + '-' + file.originalname)
}
})
const upload = multer({ storage: storage })

app.patch('/cars-images/:id', upload.single('newFile'), async function (req , res, next) {
  let recivedFilepath = baseurl + req.file.destination + '/' + req.file.uploads
  let updatecars = await carsschema.updateMany({ _Id: req.params.id }, { image:recivedFilepath} ,{ upsert: true })

 res.status(200).send({
    status: 200,
    result: updatecars,
    message: "updated successfully"
  })

})
  
mongoose.connect('mongodb+srv://gokultech:Gokulsp01%40@cluster0.pt2tkvu.mongodb.net/goku')
  .then(() => console.log('Connected!'));
  
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

  let getcars = await carsschema.find()
  res.status(200).send({
    status: 200,
    result: getcars,
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

app.get('/uploads/:filename', function (req, res) {
 let file = `./uploads/${req.params.filename}`

 console.log(file);
 res.download(file);
  
})

app.delete('/cars/:carsId', async function (req, res) {
  console.log(req.params.carsId);
  let uniqueId = new mongoose.Types.ObjectId(req.params.carsId)
  console.log(uniqueId);
  let deletecars = await carsschema.deleteOne({ _id: uniqueId })
  res.status(200).send({
    status: 200,
    result: deletecars,
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
  let getIngredient = await getIngredient.find()
  res.status(200).send({
    status: 200,
    result: getIngredient,
    message: " Data created successfully"
  })
})

app.post('/cars/token', async function (req, res) {

  try {
    let getcars = await carsschema.findOne({ RollsRoyce: req.body.RollsRoyce })
    if (!getcars) { throw "car not founds" }
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
    
    let verifiedData = await jokenMiddleware.verifyToken(req.headers.authorization);
    console.log(verifiedData_id);
     let getcars = await carsschema.find({_id: verifiedData. _id}).populate('ingreedient')
    res.status(200).send({
      status: 200,
      result: getcars,
      message: "created successfully"
    })
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


