

const cors=require("cors")
const express = require("express");
const app = express();
app.use(cors())

// Activer le parsing JSON avant les routes
app.use(express.json());

const routetache = require("./routes/tacheRoute");
app.use('/api/auth', require('./routes/authentRoute'));

const { db } = require("./dbs/db");
db();

app.use("/api/taches", routetache);



app.listen(process.env.PORT, () => {
  console.log(`Le serveur lancé avec succès sur le port : ${process.env.PORT}`);
});
