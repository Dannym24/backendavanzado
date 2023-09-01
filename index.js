
const express = require('express');
const mongoose = require('mongoose');
//const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

const app = express();
const PORT = process.env.PORT || 3000;
//const MONGODB_URI = "mongodb+srv://dannymeyercastro:antonella27@atlascluster.ndvtmyi.mongodb.net/?retryWrites=true&w=majority";

//app.use(bodyParser.json());
app.use(express.json())
const mongoConect = async () => {
  try{
      await mongoose.connect (
        "mongodb+srv://dannymeyercastro:antonella27@atlascluster.ndvtmyi.mongodb.net/?retryWrites=true&w=majority"
          ) 
          console.log ('conectado correctamente con mongo')
  }
  catch (err) {
      console.log (err)
  }
}

mongoConect()



//mongoose.connect(MONGODB_URI, {
 // useNewUrlParser: true,
  //useUnifiedTopology: true,
//});

app.use('/auth', authRoutes);
app.use('/user', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
